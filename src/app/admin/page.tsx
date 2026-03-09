'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import { LABELS } from '@/constants/labels';
import {
  Shield, Users, TrendingUp, TrendingDown, Wallet, Trash2, Eye, Edit,
  LogOut, Sun, Moon, UserPlus, Activity, Calendar, Search, ChevronDown, ChevronUp,
  Bell, Send, Download, Ban, ShieldCheck, ShieldOff, Clock, BarChart3, Loader2,
  Crown, Zap, PieChart, ArrowUpDown, Car, Wrench, AlertTriangle, Settings, Phone, Mail, Lock,
  Megaphone, Image, Link2, Video, GripVertical, ToggleLeft, ToggleRight, Plus, X,
  Building2, Ticket, Bug, Database, Save, RefreshCw, MessageSquare, CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend, PointElement, LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, PointElement, LineElement);

type Tab = 'dashboard' | 'users' | 'reports' | 'activity' | 'notifications' | 'vehicles' | 'ads' | 'settings' | 'companies' | 'tickets' | 'error-logs' | 'backup';
type RoleFilter = 'all' | 'ADMIN' | 'SUBSCRIBER' | 'suspended';
type LogFilter = 'all' | 'LOGIN' | 'INCOME_ADD' | 'INCOME_DELETE' | 'EXPENSE_ADD' | 'EXPENSE_DELETE' | 'ROLE_CHANGE' | 'USER_SUSPENDED' | 'USER_UNSUSPENDED';

interface AdminUser {
  id: number; name: string; email: string; role: string; suspended?: boolean;
  createdAt: string; _count: { incomes: number; expenses: number };
}
interface AdminStats {
  totalUsers: number; totalIncomes: number; totalExpenses: number;
  totalIncomeAmount: number; totalExpenseAmount: number; netProfit: number;
}
interface AdvancedStats {
  mostActive: { name: string; count: number; email: string };
  highestIncome: { name: string; amount: number; email: string };
  highestExpense: { name: string; amount: number; email: string };
  totalUsers: number; activeUsers: number; suspendedUsers: number; avgIncomePerUser: number;
  chartData: { month: string; income: number; expense: number; profit: number }[];
  companyData: Record<string, number>;
  categoryData: Record<string, number>;
  weekdayStats: { day: string; dayNum: number; avgIncome: number; totalIncome: number; count: number }[];
  todayData: { income: number; expense: number };
  last7Days: { date: string; dayName: string; income: number; expense: number }[];
  userStats: { id: number; name: string; email: string; role: string; suspended: boolean; income: number; expense: number; profit: number; incomeCount: number; expenseCount: number }[];
  totalVehicles: number; totalMaintenanceItems: number; totalAlertSettings: number; totalNotifSettings: number;
}
interface AdminAd {
  id: number; title: string; type: 'BANNER_TEXT' | 'BANNER_LINK' | 'BANNER_VIDEO';
  imageUrl: string; text: string | null; linkUrl: string | null; videoUrl: string | null;
  active: boolean; order: number; createdAt: string; updatedAt: string;
}

interface AdminVehicle {
  id: number; name: string; model: string; year: number; licensePlate: string | null;
  odometer: number; avgConsumption: number; isActive: boolean; userId: number;
  user: { name: string; email: string };
  maintenanceItems: { id: number; nameAr: string; status: string; remainingPct: number; enabled: boolean }[];
}
interface LogEntry {
  id: number; action: string; details: string | null; createdAt: string;
  user: { id: number; name: string; email: string; role: string };
}

interface SettingItem {
  id: number; key: string; value: string; description: string | null; updatedAt: string;
}

interface CompanyItem {
  id: number; name: string; nameAr: string; logo: string | null; color: string; commission: number;
  active: boolean; order: number; createdAt: string; updatedAt: string;
}

interface SupportTicketItem {
  id: number; subject: string; message: string; status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; category: string;
  user: { id: number; name: string; email: string };
  _count: { responses: number };
  createdAt: string; updatedAt: string; resolvedAt: string | null;
}

interface ErrorLogItem {
  id: number; message: string; stack: string | null; route: string | null;
  userId: number | null; createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  fuel: LABELS.common.fuel,
  maintenance: LABELS.common.maintenance,
  mobile: LABELS.common.mobile,
  cleaning: LABELS.common.cleaning,
  other: LABELS.common.other,
};

const COMPANY_COLORS: Record<string, string> = { Uber: '#000000', Didi: '#f97316', InDrive: '#16a34a' };

// Helper function to get month label
const getMonthLabel = (m: string) => {
  const [y, mo] = m.split('-');
  return `${LABELS.months[parseInt(mo) - 1]} ${y}`;
};

// Helper function for time ago
const getTimeAgo = (d: string) => {
  const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 1) return LABELS.timeAgo.now;
  if (mins < 60) return LABELS.timeAgo.minutes(mins);
  const h = Math.floor(mins / 60);
  if (h < 24) return LABELS.timeAgo.hours(h);
  return LABELS.timeAgo.days(Math.floor(h / 24));
};

export default function AdminPage() {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [advStats, setAdvStats] = useState<AdvancedStats | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [adminVehicles, setAdminVehicles] = useState<AdminVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  // Users filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'incomes' | 'amount'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  // Activity log filters
  const [logFilter, setLogFilter] = useState<LogFilter>('all');
  const [logSearch, setLogSearch] = useState('');
  // Notification form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifTarget, setNotifTarget] = useState('all');
  const [notifSending, setNotifSending] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState('');
  // Edit user modal
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserPassword, setEditUserPassword] = useState('');
  const [editUserSaving, setEditUserSaving] = useState(false);
  const [editUserMsg, setEditUserMsg] = useState('');
  const [editUserError, setEditUserError] = useState('');
  // Ads
  const [ads, setAds] = useState<AdminAd[]>([]);
  const [adModal, setAdModal] = useState(false);
  const [editingAd, setEditingAd] = useState<AdminAd | null>(null);
  const [adTitle, setAdTitle] = useState('');
  const [adType, setAdType] = useState<'BANNER_TEXT' | 'BANNER_LINK' | 'BANNER_VIDEO'>('BANNER_TEXT');
  const [adImageUrl, setAdImageUrl] = useState('');
  const [adText, setAdText] = useState('');
  const [adLinkUrl, setAdLinkUrl] = useState('');
  const [adVideoUrl, setAdVideoUrl] = useState('');
  const [adActive, setAdActive] = useState(true);
  const [adOrder, setAdOrder] = useState(0);
  const [adSaving, setAdSaving] = useState(false);
  const [adMsg, setAdMsg] = useState('');
  const [adError, setAdError] = useState('');
  // Settings
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [siteLogoUrl, setSiteLogoUrl] = useState('');
  const [siteFaviconUrl, setSiteFaviconUrl] = useState('');
  const [siteSaving, setSiteSaving] = useState(false);
  // Companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [companyModal, setCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyItem | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyNameAr, setCompanyNameAr] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyColor, setCompanyColor] = useState('#6366f1');
  const [companyCommission, setCompanyCommission] = useState(0);
  const [companyOrder, setCompanyOrder] = useState(0);
  const [companySaving, setCompanySaving] = useState(false);
  // Support Tickets
  const [tickets, setTickets] = useState<SupportTicketItem[]>([]);
  const [ticketFilter, setTicketFilter] = useState<'all' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicketItem | null>(null);
  const [ticketResponse, setTicketResponse] = useState('');
  // Error Logs
  const [errorLogs, setErrorLogs] = useState<ErrorLogItem[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  const [selectedReportUserId, setSelectedReportUserId] = useState<string>('all');

  useEffect(() => {
    if (!isAdmin) { router.replace('/'); return; }
    loadData();
  }, [isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        fetch(`/api/admin/stats?userId=${selectedReportUserId}`).then(safeJson),
        fetch(`/api/admin/advanced-stats?userId=${selectedReportUserId}`).then(safeJson)
      ]).then(([s, a]) => {
        if (s) setStats(s);
        if (a) setAdvStats(a);
      }).catch(console.error);
    }
  }, [selectedReportUserId, isAdmin]);

  const safeJson = async (r: Response) => { if (!r.ok) return null; const t = await r.text(); if (!t) return null; try { return JSON.parse(t); } catch { return null; } };
  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/users').then(safeJson),
      fetch(`/api/admin/stats?userId=${selectedReportUserId}`).then(safeJson),
      fetch(`/api/admin/advanced-stats?userId=${selectedReportUserId}`).then(safeJson),
    ])
      .then(([u, s, a]) => { if (u) setUsers(u); if (s) setStats(s); if (a) setAdvStats(a); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const loadLogs = useCallback(() => {
    fetch('/api/admin/activity-log').then(safeJson).then((d) => { if (d) setLogs(d); }).catch(console.error);
  }, []);

  const loadVehicles = useCallback(() => {
    fetch('/api/admin/vehicles').then(safeJson).then((d) => { if (d) setAdminVehicles(d); }).catch(console.error);
  }, []);

  const loadAds = useCallback(() => {
    fetch('/api/admin/ads').then(safeJson).then((d) => { if (d) setAds(d); }).catch(console.error);
  }, []);

  const loadSettings = useCallback(() => {
    setSettingsLoading(true);
    fetch('/api/admin/settings').then(safeJson).then((d) => { if (d) setSettings(d); }).catch(console.error).finally(() => setSettingsLoading(false));
  }, []);

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    setSiteName(map['site.name'] || '');
    setSiteDescription(map['site.description'] || '');
    setSiteLogoUrl(map['site.logoUrl'] || '');
    setSiteFaviconUrl(map['site.faviconUrl'] || '');
  }, [settings]);

  const loadCompanies = useCallback(() => {
    fetch('/api/admin/companies').then(safeJson).then((d) => { if (d) setCompanies(d); }).catch(console.error);
  }, []);

  const loadTickets = useCallback(() => {
    fetch('/api/admin/tickets').then(safeJson).then((d) => { if (d) setTickets(d); }).catch(console.error);
  }, []);

  const loadErrorLogs = useCallback(() => {
    setLogsLoading(true);
    fetch('/api/admin/error-logs').then(safeJson).then((d) => { if (d) setErrorLogs(d); }).catch(console.error).finally(() => setLogsLoading(false));
  }, []);

  useEffect(() => { if (tab === 'activity') loadLogs(); }, [tab, loadLogs]);
  useEffect(() => { if (tab === 'vehicles') loadVehicles(); }, [tab, loadVehicles]);
  useEffect(() => { if (tab === 'ads') loadAds(); }, [tab, loadAds]);
  useEffect(() => { if (tab === 'settings') loadSettings(); }, [tab, loadSettings]);
  useEffect(() => { if (tab === 'companies') loadCompanies(); }, [tab, loadCompanies]);
  useEffect(() => { if (tab === 'tickets') loadTickets(); }, [tab, loadTickets]);
  useEffect(() => { if (tab === 'error-logs') loadErrorLogs(); }, [tab, loadErrorLogs]);

  // ===== HANDLERS =====
  const handleDeleteUser = async (id: number, name: string) => {
    if (!confirm(LABELS.users.deleteConfirm(name))) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) { setUsers((p) => p.filter((u) => u.id !== id)); loadData(); }
  };
  const handleToggleRole = async (id: number, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'SUBSCRIBER' : 'ADMIN';
    if (!confirm(LABELS.users.toggleRoleConfirm(newRole))) return;
    const res = await fetch(`/api/admin/users/${id}/role`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: newRole }) });
    if (res.ok) setUsers((p) => p.map((u) => u.id === id ? { ...u, role: newRole } : u));
  };
  const handleToggleSuspend = async (id: number, sus: boolean) => {
    if (!confirm(LABELS.users.suspendConfirm(!sus))) return;
    const res = await fetch(`/api/admin/users/${id}/suspend`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suspended: !sus }) });
    if (res.ok) setUsers((p) => p.map((u) => u.id === id ? { ...u, suspended: !sus } : u));
  };
  const handleSendNotification = async () => {
    if (!notifTitle || !notifMessage) return;
    setNotifSending(true);
    try {
      const res = await fetch('/api/admin/notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: notifTitle, message: notifMessage, userId: notifTarget }) });
      if (res.ok) {
        const d = await res.json();
        setNotifSuccess(notifTarget === 'all' ? LABELS.notifications.sentToCount(d.count) : LABELS.notifications.sent);
        setNotifTitle(''); setNotifMessage(''); setTimeout(() => setNotifSuccess(''), 3000);
      }
    } catch (e) { console.error(e); } finally { setNotifSending(false); }
  };
  const openEditUser = (u: AdminUser) => {
    setEditUserId(u.id);
    setEditUserName(u.name);
    setEditUserEmail(u.email);
    setEditUserPhone('');
    setEditUserPassword('');
    setEditUserMsg('');
    setEditUserError('');
    // Fetch phone from API
    fetch(`/api/admin/users/${u.id}`).then((r) => r.json()).then((d) => { if (d.phone) setEditUserPhone(d.phone); }).catch(() => { });
  };
  const handleSaveEditUser = async () => {
    if (!editUserId) return;
    setEditUserSaving(true);
    setEditUserMsg('');
    setEditUserError('');
    try {
      const body: Record<string, string> = { name: editUserName, email: editUserEmail, phone: editUserPhone };
      if (editUserPassword) body.newPassword = editUserPassword;
      const res = await fetch(`/api/admin/users/${editUserId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setEditUserError(data.error || LABELS.common.error); }
      else {
        setEditUserMsg(LABELS.common.success);
        setUsers((p) => p.map((u) => u.id === editUserId ? { ...u, name: editUserName, email: editUserEmail } : u));
        setTimeout(() => setEditUserId(null), 1200);
      }
    } catch { setEditUserError(LABELS.common.error); }
    finally { setEditUserSaving(false); }
  };
  const handleDeleteVehicle = async (id: number) => {
    if (!confirm(LABELS.vehicles.deleteConfirm)) return;
    const res = await fetch('/api/admin/vehicles', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (res.ok) { setAdminVehicles((p) => p.filter((v) => v.id !== id)); }
  };
  const handleLogout = async () => { await logout(); router.replace('/login'); };

  // ===== AD HANDLERS =====
  const openAdModal = (ad?: AdminAd) => {
    if (ad) {
      setEditingAd(ad);
      setAdTitle(ad.title);
      setAdType(ad.type);
      setAdImageUrl(ad.imageUrl);
      setAdText(ad.text || '');
      setAdLinkUrl(ad.linkUrl || '');
      setAdVideoUrl(ad.videoUrl || '');
      setAdActive(ad.active);
      setAdOrder(ad.order);
    } else {
      setEditingAd(null);
      setAdTitle('');
      setAdType('BANNER_TEXT');
      setAdImageUrl('');
      setAdText('');
      setAdLinkUrl('');
      setAdVideoUrl('');
      setAdActive(true);
      setAdOrder(ads.length);
    }
    setAdMsg('');
    setAdError('');
    setAdModal(true);
  };
  const closeAdModal = () => { setAdModal(false); setEditingAd(null); };
  const handleSaveAd = async () => {
    if (!adTitle || !adImageUrl) { setAdError(LABELS.ads.requiredTitle); return; }
    setAdSaving(true); setAdMsg(''); setAdError('');
    try {
      const body = { title: adTitle, type: adType, imageUrl: adImageUrl, text: adText || null, linkUrl: adLinkUrl || null, videoUrl: adVideoUrl || null, active: adActive, order: adOrder };
      const url = editingAd ? `/api/admin/ads/${editingAd.id}` : '/api/admin/ads';
      const method = editingAd ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setAdError(data.error || LABELS.common.error); }
      else { setAdMsg(editingAd ? LABELS.common.success : LABELS.common.success); loadAds(); setTimeout(() => closeAdModal(), 1000); }
    } catch { setAdError(LABELS.common.error); }
    finally { setAdSaving(false); }
  };
  const handleDeleteAd = async (id: number, title: string) => {
    if (!confirm(LABELS.ads.deleteConfirm(title))) return;
    const res = await fetch(`/api/admin/ads/${id}`, { method: 'DELETE' });
    if (res.ok) setAds((p) => p.filter((a) => a.id !== id));
  };
  const handleToggleAdActive = async (ad: AdminAd) => {
    const res = await fetch(`/api/admin/ads/${ad.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !ad.active }) });
    if (res.ok) setAds((p) => p.map((a) => a.id === ad.id ? { ...a, active: !a.active } : a));
  };
  const getAdTypeLabel = (t: string) => {
    const m: Record<string, string> = {
      BANNER_TEXT: `📝 ${LABELS.ads.bannerText}`,
      BANNER_LINK: `🔗 ${LABELS.ads.bannerLink}`,
      BANNER_VIDEO: `🎬 ${LABELS.ads.bannerVideo}`
    };
    return m[t] || t;
  };

  // ===== COMPANY HANDLERS =====
  const openCompanyModal = (company?: CompanyItem) => {
    if (company) {
      setEditingCompany(company);
      setCompanyName(company.name);
      setCompanyNameAr(company.nameAr);
      setCompanyLogo(company.logo || '');
      setCompanyColor(company.color);
      setCompanyCommission(company.commission);
      setCompanyOrder(company.order);
    } else {
      setEditingCompany(null);
      setCompanyName('');
      setCompanyNameAr('');
      setCompanyLogo('');
      setCompanyColor('#6366f1');
      setCompanyCommission(0);
      setCompanyOrder(companies.length);
    }
    setCompanyModal(true);
  };
  const closeCompanyModal = () => { setCompanyModal(false); setEditingCompany(null); };
  const handleSaveCompany = async () => {
    if (!companyName || !companyNameAr) return;
    setCompanySaving(true);
    try {
      const body = { name: companyName, nameAr: companyNameAr, logo: companyLogo || null, color: companyColor, commission: companyCommission, order: companyOrder };
      const url = editingCompany ? `/api/admin/companies` : '/api/admin/companies';
      const method = editingCompany ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingCompany ? { ...body, id: editingCompany.id } : body) });
      if (res.ok) { loadCompanies(); closeCompanyModal(); }
    } catch (e) { console.error(e); }
    finally { setCompanySaving(false); }
  };
  const handleDeleteCompany = async (id: number) => {
    if (!confirm(LABELS.companies.deleteConfirm)) return;
    const res = await fetch(`/api/admin/companies?id=${id}`, { method: 'DELETE' });
    if (res.ok) setCompanies((p) => p.filter((c) => c.id !== id));
  };
  const handleToggleCompanyActive = async (company: CompanyItem) => {
    const res = await fetch('/api/admin/companies', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: company.id, active: !company.active }) });
    if (res.ok) setCompanies((p) => p.map((c) => c.id === company.id ? { ...c, active: !c.active } : c));
  };

  // ===== TICKET HANDLERS =====
  const handleUpdateTicketStatus = async (id: number, status: string) => {
    const res = await fetch('/api/admin/tickets', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (res.ok) { loadTickets(); setSelectedTicket(null); }
  };
  const handleReplyToTicket = async (id: number) => {
    if (!ticketResponse.trim()) return;
    const res = await fetch('/api/admin/tickets', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'IN_PROGRESS', response: ticketResponse }) });
    if (res.ok) { setTicketResponse(''); loadTickets(); }
  };
  const handleDeleteTicket = async (id: number) => {
    if (!confirm(LABELS.tickets.deleteConfirm)) return;
    const res = await fetch('/api/admin/tickets', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (res.ok) { setTickets((p) => p.filter((t) => t.id !== id)); setSelectedTicket(null); }
  };

  // ===== SETTINGS HANDLERS =====
  const handleSaveSettings = async (key: string, value: string) => {
    setSettingsLoading(true);
    try {
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings: [{ key, value }] }) });
      if (res.ok) {
        setSettingsMsg(LABELS.settings.saved);
        setTimeout(() => setSettingsMsg(''), 2000);
        loadSettings();
      }
    } catch { setSettingsMsg(LABELS.common.error); }
    finally { setSettingsLoading(false); }
  };

  const handleSaveSiteSettings = async () => {
    setSiteSaving(true);
    setSettingsMsg('');
    try {
      const payload = {
        settings: [
          { key: 'site.name', value: siteName.trim() },
          { key: 'site.description', value: siteDescription.trim() },
          { key: 'site.logoUrl', value: siteLogoUrl.trim() },
          { key: 'site.faviconUrl', value: siteFaviconUrl.trim() },
        ],
      };
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setSettingsMsg(data.error || LABELS.common.error);
      } else {
        setSettingsMsg(LABELS.settings.saved);
        setTimeout(() => setSettingsMsg(''), 2000);
        loadSettings();
      }
    } catch {
      setSettingsMsg(LABELS.common.error);
    } finally {
      setSiteSaving(false);
    }
  };

  // ===== BACKUP HANDLER =====
  const handleBackup = async () => {
    if (!confirm(LABELS.backup.confirm)) return;
    try {
      const res = await fetch('/api/admin/export', { method: 'GET' });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch { alert(LABELS.common.error); }
  };

  // ===== ERROR LOGS HANDLER =====
  const handleClearErrorLogs = async (days: number = 7) => {
    if (!confirm(LABELS.errorLogs.clearOld(days))) return;
    const res = await fetch(`/api/admin/error-logs?days=${days}`, { method: 'DELETE' });
    if (res.ok) loadErrorLogs();
  };

  // ===== COMPUTED =====
  const filteredUsers = users
    .filter((u) => {
      if (roleFilter === 'suspended') return u.suspended;
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      return u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'date') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortBy === 'incomes') cmp = a._count.incomes - b._count.incomes;
      else if (sortBy === 'amount') {
        const aInc = advStats?.userStats.find((s) => s.id === a.id)?.income || 0;
        const bInc = advStats?.userStats.find((s) => s.id === b.id)?.income || 0;
        cmp = aInc - bInc;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

  const filteredLogs = logs
    .filter((l) => logFilter === 'all' || l.action === logFilter)
    .filter((l) => !logSearch || l.user.name.toLowerCase().includes(logSearch.toLowerCase()) || (l.details || '').toLowerCase().includes(logSearch.toLowerCase()));

  const subscriberCount = users.filter((u) => u.role === 'SUBSCRIBER').length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const suspendedCount = users.filter((u) => u.suspended).length;

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const getActionLabel = (a: string) => {
    const m: Record<string, string> = {
      LOGIN: `🔑 ${LABELS.activity.actions.LOGIN}`,
      INCOME_ADD: `💰 +${LABELS.activity.actions.INCOME_ADD}`,
      INCOME_DELETE: `🗑️ -${LABELS.activity.actions.INCOME_DELETE}`,
      EXPENSE_ADD: `💸 +${LABELS.activity.actions.EXPENSE_ADD}`,
      EXPENSE_DELETE: `🗑️ -${LABELS.activity.actions.EXPENSE_DELETE}`,
      ROLE_CHANGE: `🛡️ ${LABELS.activity.actions.ROLE_CHANGE}`,
      USER_SUSPENDED: `🚫 ${LABELS.activity.actions.USER_SUSPENDED}`,
      USER_UNSUSPENDED: `✅ ${LABELS.activity.actions.USER_UNSUSPENDED}`,
      VEHICLE_ADD: `🚗 +${LABELS.activity.actions.VEHICLE_ADD}`,
      VEHICLE_UPDATE: `🚗 ${LABELS.activity.actions.VEHICLE_UPDATE}`,
      VEHICLE_DELETE: `🚗 -${LABELS.activity.actions.VEHICLE_DELETE}`,
      MAINTENANCE_ADD: `🔧 +${LABELS.activity.actions.MAINTENANCE_ADD}`,
      MAINTENANCE_UPDATE: `🔧 ${LABELS.activity.actions.MAINTENANCE_UPDATE}`,
      MAINTENANCE_DELETE: `🔧 -${LABELS.activity.actions.MAINTENANCE_DELETE}`,
      ALERT_SETTING_UPDATE: `🔔 ${LABELS.activity.actions.ALERT_SETTING_UPDATE}`,
      NOTIFICATION_SETTING_UPDATE: `📱 ${LABELS.activity.actions.NOTIFICATION_SETTING_UPDATE}`,
    };
    return m[a] || a;
  };
  const timeAgo = (d: string) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 1) return LABELS.timeAgo.now;
    if (mins < 60) return LABELS.timeAgo.minutes(mins);
    const h = Math.floor(mins / 60);
    if (h < 24) return LABELS.timeAgo.hours(h);
    return LABELS.timeAgo.days(Math.floor(h / 24));
  };
  const monthLabel = (m: string) => {
    return getMonthLabel(m);
  };

  // ===== CHART CONFIGS =====
  const isDark = theme === 'dark';
  const chartTextColor = isDark ? '#94a3b8' : '#64748b';
  const chartGridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.06)';

  const monthlyChartData = advStats ? {
    labels: advStats.chartData.map((d) => monthLabel(d.month)),
    datasets: [
      { label: LABELS.admin.totalIncome, data: advStats.chartData.map((d) => d.income), backgroundColor: 'rgba(34,197,94,0.7)', borderRadius: 6 },
      { label: LABELS.admin.totalExpenses, data: advStats.chartData.map((d) => d.expense), backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: 6 },
      { label: LABELS.admin.netProfit, data: advStats.chartData.map((d) => d.profit), backgroundColor: 'rgba(99,102,241,0.7)', borderRadius: 6 },
    ],
  } : null;

  const companyChartData = advStats ? {
    labels: Object.keys(advStats.companyData),
    datasets: [{ data: Object.values(advStats.companyData), backgroundColor: Object.keys(advStats.companyData).map((c) => COMPANY_COLORS[c] || '#6366f1'), borderWidth: 0 }],
  } : null;

  const categoryChartData = advStats ? {
    labels: Object.keys(advStats.categoryData).map((c) => CATEGORY_LABELS[c] || c),
    datasets: [{ data: Object.values(advStats.categoryData), backgroundColor: ['#f97316', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6', '#f43f5e'], borderWidth: 0 }],
  } : null;

  const last7ChartData = advStats ? {
    labels: advStats.last7Days.map((d) => d.dayName),
    datasets: [
      { label: LABELS.admin.totalIncome, data: advStats.last7Days.map((d) => d.income), backgroundColor: 'rgba(34,197,94,0.6)', borderRadius: 4 },
      { label: LABELS.admin.totalExpenses, data: advStats.last7Days.map((d) => d.expense), backgroundColor: 'rgba(239,68,68,0.6)', borderRadius: 4 },
    ],
  } : null;

  const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: chartTextColor, font: { size: 10, family: 'inherit' } }, position: 'top' as const } },
    scales: { x: { ticks: { color: chartTextColor, font: { size: 9 } }, grid: { display: false } }, y: { ticks: { color: chartTextColor, font: { size: 9 } }, grid: { color: chartGridColor } } },
  };
  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'bottom' as const, labels: { color: chartTextColor, font: { size: 10 }, padding: 12 } } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm font-medium">{LABELS.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* ===== HEADER ===== */}
      <div className="gradient-primary sticky top-0 z-50 shadow-lg shadow-primary/10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><Shield className="text-white" size={22} /></div>
              <div><h1 className="text-base font-bold text-white">{LABELS.admin.title}</h1><p className="text-[10px] text-white/60">{user?.name} • {LABELS.admin.role}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => window.open('/api/admin/export', '_blank')} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all" title={LABELS.admin.exportCSV}><Download size={16} /></button>
              <button onClick={toggleTheme} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
              <button onClick={handleLogout} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/30 transition-all"><LogOut size={16} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-1">
          <div className="flex gap-0.5 overflow-x-auto scrollbar-hide">
            {([
              { key: 'dashboard' as Tab, label: LABELS.nav.dashboard, icon: Activity },
              { key: 'reports' as Tab, label: LABELS.nav.reports, icon: BarChart3 },
              { key: 'users' as Tab, label: LABELS.nav.users, icon: Users },
              { key: 'vehicles' as Tab, label: LABELS.nav.vehicles, icon: Car },
              { key: 'companies' as Tab, label: LABELS.nav.companies, icon: Building2 },
              { key: 'tickets' as Tab, label: LABELS.nav.tickets, icon: Ticket },
              { key: 'activity' as Tab, label: LABELS.nav.activity, icon: Clock },
              { key: 'notifications' as Tab, label: LABELS.nav.notifications, icon: Bell },
              { key: 'ads' as Tab, label: LABELS.nav.ads, icon: Megaphone },
              { key: 'settings' as Tab, label: LABELS.nav.settings, icon: Settings },
              { key: 'error-logs' as Tab, label: LABELS.nav.errorLogs, icon: Bug },
              { key: 'backup' as Tab, label: LABELS.nav.backup, icon: Database },
            ]).map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1 px-3 py-1.5 rounded-t-lg text-[11px] font-medium transition-all whitespace-nowrap ${tab === t.key ? 'bg-background text-primary' : 'text-white/60 hover:text-white/90'}`}>
                <t.icon size={13} />{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-5">

        {/* ==================== DASHBOARD ==================== */}
        {tab === 'dashboard' && stats && advStats && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-card rounded-2xl p-4 animate-in fade-in">
                <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Users size={16} className="text-primary" /></div><span className="text-[10px] text-muted">{LABELS.admin.totalUsers}</span></div>
                <p className="text-2xl font-extrabold text-foreground">{stats.totalUsers}</p>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">{adminCount} {LABELS.admin.admins}</span>
                  <span className="text-[9px] bg-accent text-muted px-1.5 py-0.5 rounded-full font-bold">{subscriberCount} {LABELS.admin.subscribers}</span>
                  {suspendedCount > 0 && <span className="text-[9px] bg-danger/10 text-danger px-1.5 py-0.5 rounded-full font-bold">{suspendedCount} {LABELS.admin.suspended}</span>}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center"><TrendingUp size={16} className="text-success" /></div><span className="text-[10px] text-muted">{LABELS.admin.totalIncome}</span></div><p className="text-xl font-extrabold text-success">{stats.totalIncomeAmount.toFixed(0)}</p><p className="text-[10px] text-muted mt-1">{stats.totalIncomes} {LABELS.common.operations}</p></div>
              <div className="glass-card rounded-2xl p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 bg-danger/10 rounded-lg flex items-center justify-center"><TrendingDown size={16} className="text-danger" /></div><span className="text-[10px] text-muted">{LABELS.admin.totalExpenses}</span></div><p className="text-xl font-extrabold text-danger">{stats.totalExpenseAmount.toFixed(0)}</p><p className="text-[10px] text-muted mt-1">{stats.totalExpenses} {LABELS.common.operations}</p></div>
              <div className="glass-card rounded-2xl p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Wallet size={16} className="text-primary" /></div><span className="text-[10px] text-muted">{LABELS.admin.netProfit}</span></div><p className={`text-xl font-extrabold ${stats.netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{stats.netProfit.toFixed(0)}</p><p className="text-[10px] text-muted mt-1">{LABELS.common.currency}</p></div>
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-3 gap-2">
              <div className="glass-card rounded-xl p-3 text-center">
                <Crown size={18} className="text-warning mx-auto mb-1" />
                <p className="text-[9px] text-muted">{LABELS.admin.mostActive}</p>
                <p className="text-xs font-bold text-foreground truncate">{advStats.mostActive.name}</p>
                <p className="text-[10px] text-warning font-bold">{advStats.mostActive.count} {LABELS.common.operations}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <TrendingUp size={18} className="text-success mx-auto mb-1" />
                <p className="text-[9px] text-muted">{LABELS.admin.highestIncome}</p>
                <p className="text-xs font-bold text-foreground truncate">{advStats.highestIncome.name}</p>
                <p className="text-[10px] text-success font-bold">{advStats.highestIncome.amount.toFixed(0)} {LABELS.common.currency}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <Zap size={18} className="text-primary mx-auto mb-1" />
                <p className="text-[9px] text-muted">{LABELS.admin.avgIncomePerUser}</p>
                <p className="text-lg font-extrabold text-primary">{advStats.avgIncomePerUser.toFixed(0)}</p>
                <p className="text-[9px] text-muted">{LABELS.common.currency}</p>
              </div>
            </div>

            {/* Today + Performance */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className={`p-4 text-center ${stats.netProfit >= 0 ? 'bg-primary/5' : 'bg-danger/5'}`}>
                <p className="text-xs text-muted mb-1">{LABELS.admin.todaySummary}</p>
                <div className="flex justify-around">
                  <div><p className="text-[10px] text-muted">{LABELS.admin.todayIncome}</p><p className="text-lg font-bold text-success">+{advStats.todayData.income.toFixed(0)}</p></div>
                  <div className="w-px bg-border" />
                  <div><p className="text-[10px] text-muted">{LABELS.admin.todayExpenses}</p><p className="text-lg font-bold text-danger">-{advStats.todayData.expense.toFixed(0)}</p></div>
                  <div className="w-px bg-border" />
                  <div><p className="text-[10px] text-muted">{LABELS.admin.todayNet}</p><p className={`text-lg font-bold ${advStats.todayData.income - advStats.todayData.expense >= 0 ? 'text-primary' : 'text-danger'}`}>{(advStats.todayData.income - advStats.todayData.expense).toFixed(0)}</p></div>
                </div>
              </div>
            </div>

            {/* User Performance Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">{LABELS.reports.userPerformance}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-accent/30 border-b border-border/50">
                      <th className="text-right py-2 px-3 text-muted font-medium">{LABELS.common.name}</th>
                      <th className="text-center py-2 px-1 text-muted font-medium">{LABELS.common.income}</th>
                      <th className="text-center py-2 px-1 text-muted font-medium">{LABELS.common.expenses}</th>
                      <th className="text-center py-2 px-1 text-muted font-medium">{LABELS.common.profit}</th>
                      <th className="text-center py-2 px-1 text-muted font-medium">{LABELS.common.operations}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advStats.userStats.slice(0, 10).map((u) => (
                      <tr key={u.id} className="border-b border-border/30 last:border-0">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${u.role === 'ADMIN' ? 'gradient-primary text-white' : 'bg-accent text-foreground'}`}>{u.name.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-foreground truncate max-w-[100px]">{u.name}</p>
                              {u.suspended && <span className="text-[8px] text-danger">{LABELS.users.suspendedLabel}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2 px-1 font-bold text-success">{u.income.toFixed(0)}</td>
                        <td className="text-center py-2 px-1 font-bold text-danger">{u.expense.toFixed(0)}</td>
                        <td className={`text-center py-2 px-1 font-bold ${u.profit >= 0 ? 'text-primary' : 'text-danger'}`}>{u.profit.toFixed(0)}</td>
                        <td className="text-center py-2 px-1 text-muted">{u.incomeCount + u.expenseCount} {LABELS.common.operations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Month Comparison */}
            {advStats.chartData.length >= 2 && (
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><ArrowUpDown size={16} className="text-blue-500" /> {LABELS.reports.monthComparison}</h3>
                <div className="space-y-3">
                  {advStats.chartData.slice(-3).reverse().map((m, i, arr) => {
                    const prev = arr[i + 1];
                    const incomeChange = prev ? ((m.income - prev.income) / (prev.income || 1)) * 100 : 0;
                    return (
                      <div key={m.month} className={`p-3 rounded-xl ${i === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-accent/50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-foreground">{monthLabel(m.month)}</span>
                          {i === 0 && <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{LABELS.reports.current}</span>}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div><p className="text-[9px] text-muted">{LABELS.common.income}</p><p className="text-sm font-bold text-success">{m.income.toFixed(0)}</p></div>
                          <div><p className="text-[9px] text-muted">{LABELS.common.expenses}</p><p className="text-sm font-bold text-danger">{m.expense.toFixed(0)}</p></div>
                          <div><p className="text-[9px] text-muted">{LABELS.common.profit}</p><p className={`text-sm font-bold ${m.profit >= 0 ? 'text-primary' : 'text-danger'}`}>{m.profit.toFixed(0)}</p></div>
                        </div>
                        {prev && (
                          <div className="mt-2 pt-2 border-t border-border/50 flex items-center gap-1">
                            {incomeChange >= 0 ? <TrendingUp size={12} className="text-success" /> : <TrendingDown size={12} className="text-danger" />}
                            <span className={`text-[10px] font-bold ${incomeChange >= 0 ? 'text-success' : 'text-danger'}`}>{incomeChange >= 0 ? '+' : ''}{incomeChange.toFixed(1)}% {LABELS.reports.fromLastMonth}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* ==================== REPORTS ==================== */}
        {tab === 'reports' && advStats && monthlyChartData && companyChartData && categoryChartData && last7ChartData && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> {LABELS.nav.reports}</h2>
              <div className="flex items-center gap-2 bg-accent/30 px-3 py-1.5 rounded-lg border border-border/50">
                <span className="text-xs font-medium text-muted whitespace-nowrap">إحصائيات المستخدم:</span>
                <select
                  value={selectedReportUserId}
                  onChange={(e) => setSelectedReportUserId(e.target.value)}
                  className="bg-background border border-border/50 text-foreground text-xs rounded-md px-2 py-1 focus:outline-none focus:border-primary min-w-[150px]"
                >
                  <option value="all">جميع المستخدمين (الكل)</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4 min-h-[300px]">
                <h3 className="text-xs font-bold text-foreground mb-4">{LABELS.reports.monthComparison || 'إحصائيات شهرية'}</h3>
                <div className="h-64"><Bar data={monthlyChartData} options={barOptions} /></div>
              </div>
              <div className="glass-card rounded-2xl p-4 min-h-[300px]">
                <h3 className="text-xs font-bold text-foreground mb-4">أداء آخر 7 أيام</h3>
                <div className="h-64"><Bar data={last7ChartData} options={barOptions} /></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4 min-h-[300px]">
                <h3 className="text-xs font-bold text-foreground mb-4">الدخل حسب الشركات</h3>
                <div className="h-64"><Doughnut data={companyChartData} options={doughnutOptions} /></div>
              </div>
              <div className="glass-card rounded-2xl p-4 min-h-[300px]">
                <h3 className="text-xs font-bold text-foreground mb-4">المصروفات حسب التصنيف</h3>
                <div className="h-64"><Doughnut data={categoryChartData} options={doughnutOptions} /></div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-xs font-bold text-foreground mb-4">أفضل أيام الأسبوع</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {advStats.weekdayStats.map((w, i) => (
                  <div key={w.dayNum} className={`p-2 rounded-xl text-center ${i === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-accent/50'}`}>
                    {i === 0 && <Crown size={12} className="text-warning mx-auto mb-1" />}
                    <p className="text-[10px] text-muted">{w.day}</p>
                    <p className={`text-xs font-bold ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{w.totalIncome.toFixed(0)}</p>
                    <p className="text-[9px] text-muted">{w.count} عملية</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* ==================== USERS ==================== */}
        {tab === 'users' && (
          <>
            <div className="glass-card rounded-xl p-3 space-y-2">
              <div className="relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" placeholder={LABELS.users.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-input-bg border border-border rounded-lg pr-9 pl-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              {/* Role Filter */}
              <div className="flex gap-1.5 flex-wrap">
                {([
                  { key: 'all' as RoleFilter, label: `${LABELS.common.all} (${users.length})` },
                  { key: 'ADMIN' as RoleFilter, label: `${LABELS.users.roleAdmin} (${adminCount})` },
                  { key: 'SUBSCRIBER' as RoleFilter, label: `${LABELS.users.roleSubscriber} (${subscriberCount})` },
                  { key: 'suspended' as RoleFilter, label: `${LABELS.users.suspendedLabel} (${suspendedCount})` },
                ]).map((f) => (
                  <button key={f.key} onClick={() => setRoleFilter(f.key)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${roleFilter === f.key ? 'gradient-primary text-white shadow-sm' : 'bg-accent text-muted hover:text-foreground'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <div className="flex gap-1.5 flex-wrap">
                {([
                  { key: 'date' as const, label: LABELS.common.date, icon: Calendar },
                  { key: 'name' as const, label: LABELS.common.name, icon: Users },
                  { key: 'incomes' as const, label: LABELS.nav.activity, icon: Activity },
                  { key: 'amount' as const, label: LABELS.common.amount, icon: Wallet },
                ]).map((s) => (
                  <button key={s.key} onClick={() => toggleSort(s.key)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${sortBy === s.key ? 'bg-blue-500/10 text-blue-500' : 'bg-accent/50 text-muted hover:text-foreground'}`}>
                    <s.icon size={10} />{s.label}
                    {sortBy === s.key && (sortDir === 'desc' ? <ChevronDown size={9} /> : <ChevronUp size={9} />)}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-muted">{filteredUsers.length} {LABELS.common.results}</p>

            <div className="space-y-2">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8"><Users size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.common.noResults}</p></div>
              ) : filteredUsers.map((u) => {
                const uStat = advStats?.userStats.find((s) => s.id === u.id);
                return (
                  <div key={u.id} className={`glass-card rounded-xl p-3 hover:shadow-md transition-shadow ${u.suspended ? 'opacity-60 border border-danger/20' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 ${u.suspended ? 'bg-danger/50' : u.role === 'ADMIN' ? 'gradient-primary' : 'bg-accent text-foreground'}`}>{u.name.charAt(0).toUpperCase()}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-bold text-foreground truncate">{u.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${u.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-accent text-muted'}`}>{u.role === 'ADMIN' ? `🛡️ ${LABELS.users.roleAdmin}` : `👤 ${LABELS.users.roleSubscriber}`}</span>
                            {u.suspended && <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-danger/10 text-danger">🚫 {LABELS.users.suspendedLabel}</span>}
                          </div>
                          <p className="text-[11px] text-muted truncate" dir="ltr">{u.email}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[10px] text-success flex items-center gap-0.5"><TrendingUp size={10} /> {uStat?.income.toFixed(0) || 0} {LABELS.common.currency}</span>
                            <span className="text-[10px] text-danger flex items-center gap-0.5"><TrendingDown size={10} /> {uStat?.expense.toFixed(0) || 0} {LABELS.common.currency}</span>
                            <span className={`text-[10px] font-bold flex items-center gap-0.5 ${(uStat?.profit || 0) >= 0 ? 'text-primary' : 'text-danger'}`}><Wallet size={10} /> {uStat?.profit.toFixed(0) || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 mr-1">
                        <Link href={`/admin/user/${u.id}`} className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" title={LABELS.common.details}><Eye size={13} /></Link>
                        {u.id !== user?.id && (
                          <>
                            <button onClick={() => openEditUser(u)} className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" title={LABELS.common.edit}><Edit size={13} /></button>
                            <button onClick={() => handleToggleRole(u.id, u.role)} className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 hover:bg-blue-500/20 transition-colors" title={u.role === 'ADMIN' ? LABELS.common.edit : LABELS.common.edit}>{u.role === 'ADMIN' ? <ShieldOff size={13} /> : <ShieldCheck size={13} />}</button>
                            <button onClick={() => handleToggleSuspend(u.id, !!u.suspended)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${u.suspended ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-warning/10 text-warning hover:bg-warning/20'}`} title={u.suspended ? LABELS.common.confirm : LABELS.common.confirm}><Ban size={13} /></button>
                            <button onClick={() => handleDeleteUser(u.id, u.name)} className="w-7 h-7 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors" title={LABELS.common.delete}><Trash2 size={13} /></button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ==================== ACTIVITY LOG ==================== */}
        {tab === 'activity' && (
          <div>
            <div className="glass-card rounded-xl p-3 space-y-2 mb-4">
              <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" placeholder={LABELS.activity.search} value={logSearch} onChange={(e) => setLogSearch(e.target.value)}
                  className="w-full bg-input-bg border border-border rounded-lg pr-8 pl-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {([
                  { key: 'all' as LogFilter, label: LABELS.common.all },
                  { key: 'LOGIN' as LogFilter, label: `🔑 ${LABELS.activity.actions.LOGIN}` },
                  { key: 'INCOME_ADD' as LogFilter, label: `💰 +${LABELS.common.income}` },
                  { key: 'EXPENSE_ADD' as LogFilter, label: `💸 +${LABELS.common.expenses}` },
                  { key: 'ROLE_CHANGE' as LogFilter, label: `🛡️ ${LABELS.activity.actions.ROLE_CHANGE}` },
                  { key: 'USER_SUSPENDED' as LogFilter, label: `🚫 ${LABELS.activity.actions.USER_SUSPENDED}` },
                ]).map((f) => (
                  <button key={f.key} onClick={() => setLogFilter(f.key)}
                    className={`px-2 py-1 rounded-md text-[9px] font-medium transition-all ${logFilter === f.key ? 'gradient-primary text-white' : 'bg-accent text-muted hover:text-foreground'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-muted mb-2">{filteredLogs.length} {LABELS.nav.activity}</p>
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8"><Clock size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.common.noResults}</p></div>
            ) : (
              <div className="space-y-1.5">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-foreground font-bold text-xs shrink-0">{log.user.name.charAt(0).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="text-xs font-bold text-foreground truncate">{log.user.name}</span><span className="text-[9px] text-muted">{getActionLabel(log.action)}</span></div>
                      {log.details && <p className="text-[10px] text-muted truncate">{log.details}</p>}
                    </div>
                    <span className="text-[9px] text-muted shrink-0">{timeAgo(log.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== VEHICLES ==================== */}
        {tab === 'vehicles' && (
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-sm font-black text-foreground uppercase tracking-tight">{LABELS.nav.vehicles}</h3>
              <span className="text-[10px] text-muted">{adminVehicles.length} {LABELS.admin.totalIncome || LABELS.common.count}</span>
            </div>
            {adminVehicles.length === 0 ? (
              <div className="text-center py-8"><Car size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.common.noVehicleYet}</p></div>
            ) : (
              <div className="space-y-3">
                {adminVehicles.map((v) => (
                  <div key={v.id} className="glass-card rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${v.isActive ? 'bg-primary/10 text-primary' : 'bg-accent text-muted'}`}>
                          <Car size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">{v.name} {v.model}</span>
                            {v.isActive && <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">{LABELS.common.activeLabel}</span>}
                          </div>
                          <p className="text-[11px] text-muted">{v.year}{v.licensePlate ? ` • ${v.licensePlate}` : ''}</p>
                          <p className="text-[10px] text-muted mt-0.5">{LABELS.common.owner}: {v.user.name} ({v.user.email})</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteVehicle(v.id)} className="w-7 h-7 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors" title={LABELS.common.delete}><Trash2 size={13} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-accent rounded-lg p-2 text-center">
                        <p className="text-[9px] text-muted">{LABELS.common.odometer}</p>
                        <p className="text-xs font-bold text-foreground">{v.odometer.toLocaleString()} {LABELS.common.distanceUnit}</p>
                      </div>
                      <div className="bg-accent rounded-lg p-2 text-center">
                        <p className="text-[9px] text-muted">{LABELS.common.consumptionLabel}</p>
                        <p className="text-xs font-bold text-foreground">{v.avgConsumption || '—'} {LABELS.common.consumptionUnit}</p>
                      </div>
                    </div>
                    {v.maintenanceItems.length > 0 && (
                      <div>
                        <p className="text-[10px] text-muted font-bold mb-1.5 flex items-center gap-1"><Wrench size={10} /> {LABELS.common.maintenanceLabel} ({v.maintenanceItems.length})</p>
                        <div className="space-y-1.5">
                          {v.maintenanceItems.map((m) => (
                            <div key={m.id} className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.status === 'warning' ? 'bg-orange-400' : m.status === 'urgent' ? 'bg-danger' : 'bg-primary'}`} />
                              <span className="text-[11px] text-foreground flex-1 truncate">{m.nameAr}</span>
                              <div className="w-16 bg-accent rounded-full h-1.5 overflow-hidden">
                                <div className={`h-1.5 rounded-full ${m.status === 'warning' ? 'bg-orange-400' : m.status === 'urgent' ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${m.remainingPct}%` }} />
                              </div>
                              <span className="text-[9px] text-muted w-8 text-left">{m.remainingPct}%</span>
                              <span className={`text-[8px] px-1 py-0.5 rounded ${m.enabled ? 'bg-primary/10 text-primary' : 'bg-accent text-muted'}`}>{m.enabled ? LABELS.common.enabled : LABELS.common.disabled}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== ADS MANAGEMENT ==================== */}
        {tab === 'ads' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2"><Megaphone size={16} className="text-orange-500" /> {LABELS.nav.ads}</h2>
              <button onClick={() => openAdModal()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-primary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                <Plus size={14} /> {LABELS.ads.add}
              </button>
            </div>

            {ads.length === 0 ? (
              <div className="text-center py-12">
                <Megaphone size={40} className="text-muted mx-auto mb-3 opacity-30" />
                <p className="text-sm text-muted mb-1">{LABELS.admin.noAds}</p>
                <p className="text-xs text-muted">{LABELS.admin.addAdsDesc}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {ads.map((ad) => (
                  <div key={ad.id} className={`glass-card rounded-xl overflow-hidden transition-all ${!ad.active ? 'opacity-60' : ''}`}>
                    {/* Banner Preview */}
                    <div className="relative w-full h-36 bg-accent overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Status badge */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold backdrop-blur-sm ${ad.active ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-danger/20 text-danger border border-danger/30'}`}>
                          {ad.active ? `✅ ${LABELS.ads.statusActive}` : `⏸️ ${LABELS.ads.statusPaused}`}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-black/40 text-white/80 backdrop-blur-sm">
                          {getAdTypeLabel(ad.type)}
                        </span>
                      </div>
                      {/* Order badge */}
                      <div className="absolute top-2 left-2">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-black/40 text-white/80 backdrop-blur-sm flex items-center gap-1">
                          <GripVertical size={10} /> #{ad.order + 1}
                        </span>
                      </div>
                    </div>
                    {/* Ad Info */}
                    <div className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-foreground truncate">{ad.title}</h4>
                          {ad.type === 'BANNER_TEXT' && ad.text && (
                            <p className="text-[11px] text-muted mt-1 line-clamp-2">{ad.text}</p>
                          )}
                          {ad.type === 'BANNER_LINK' && ad.linkUrl && (
                            <p className="text-[11px] text-blue-400 mt-1 truncate flex items-center gap-1"><Link2 size={10} /> {ad.linkUrl}</p>
                          )}
                          {ad.type === 'BANNER_VIDEO' && ad.videoUrl && (
                            <p className="text-[11px] text-purple-400 mt-1 truncate flex items-center gap-1"><Video size={10} /> {ad.videoUrl}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => handleToggleAdActive(ad)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${ad.active ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-accent text-muted hover:text-foreground'}`} title={ad.active ? LABELS.admin.suspend : LABELS.admin.activate}>
                            {ad.active ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                          </button>
                          <button onClick={() => openAdModal(ad)} className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 hover:bg-blue-500/20 transition-colors" title={LABELS.common.edit}><Edit size={13} /></button>
                          <button onClick={() => handleDeleteAd(ad.id, ad.title)} className="w-7 h-7 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors" title={LABELS.common.delete}><Trash2 size={13} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== SETTINGS ==================== */}
        {tab === 'settings' && (
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Settings size={16} className="text-primary" /> {LABELS.nav.settings}</h3>
              {settingsMsg && <span className="text-[11px] text-success">{settingsMsg}</span>}
            </div>
            {settingsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={24} /></div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2"><Image size={15} className="text-primary" /> إعدادات الموقع</h4>
                    <button
                      onClick={handleSaveSiteSettings}
                      disabled={siteSaving}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-black text-[11px] font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {siteSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      حفظ
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-muted mb-1">اسم الموقع / التطبيق</label>
                      <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="مثال: إدارة دخل السائق"
                        className="w-full bg-input-bg border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-muted mb-1">وصف الموقع</label>
                      <textarea
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        placeholder="وصف قصير يظهر في نتائج البحث ومشاركة الروابط"
                        className="w-full bg-input-bg border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted mb-1">رابط اللوجو</label>
                      <input
                        type="text"
                        value={siteLogoUrl}
                        onChange={(e) => setSiteLogoUrl(e.target.value)}
                        placeholder="https://.../logo.png"
                        className="w-full bg-input-bg border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      {siteLogoUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={siteLogoUrl} alt="logo" className="w-9 h-9 rounded-lg border border-border object-contain bg-white" />
                          <span className="text-[10px] text-muted">معاينة</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted mb-1">رابط الـ favicon</label>
                      <input
                        type="text"
                        value={siteFaviconUrl}
                        onChange={(e) => setSiteFaviconUrl(e.target.value)}
                        placeholder="https://.../favicon.ico"
                        className="w-full bg-input-bg border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-muted mt-3">
                    سيتم تطبيق الاسم/الوصف تلقائياً على عنوان الصفحة (SEO). اللوجو/الأيقونة تحتاج أن تكون روابط عامة.
                  </p>
                </div>

                {settings.length === 0 ? (
                  <div className="text-center py-8 text-muted">
                    <Settings size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">{LABELS.settings.noSettings}</p>
                    <p className="text-[11px] mt-1">{LABELS.settings.autoAddNote}</p>
                  </div>
                ) : (
                  settings.map((s) => (
                    <div key={s.key} className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-xs font-bold text-foreground">{s.key}</p>
                        {s.description && <p className="text-[10px] text-muted">{s.description}</p>}
                      </div>
                      <input
                        type="text"
                        defaultValue={s.value}
                        onBlur={(e) => handleSaveSettings(s.key, e.target.value)}
                        className="w-48 bg-input-bg border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== COMPANIES ==================== */}
        {tab === 'companies' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Building2 size={16} className="text-primary" /> {LABELS.companies.title}</h3>
              <button onClick={() => openCompanyModal()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-black text-[11px] font-bold hover:bg-primary/90 transition-colors">
                <Plus size={14} /> {LABELS.companies.add}
              </button>
            </div>
            {companies.length === 0 ? (
              <div className="text-center py-8"><Building2 size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.companies.noCompanies}</p></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.map((c) => (
                  <div key={c.id} className={`glass-card rounded-xl p-3 ${!c.active ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {c.logo ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1" style={{ border: `2px solid ${c.color}` }}>
                            <img src={c.logo} alt={c.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: c.color }}>{c.name.charAt(0)}</div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-foreground">{c.nameAr}</p>
                          <p className="text-[10px] text-muted" dir="ltr">{c.name}</p>
                          {c.commission > 0 && <p className="text-[10px] text-warning">{LABELS.common.commission}: {c.commission}%</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleToggleCompanyActive(c)} className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.active ? 'bg-success/10 text-success' : 'bg-accent text-muted'}`}>
                          {c.active ? <CheckCircle size={13} /> : <X size={13} />}
                        </button>
                        <button onClick={() => openCompanyModal(c)} className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><Edit size={13} /></button>
                        <button onClick={() => handleDeleteCompany(c.id)} className="w-7 h-7 rounded-lg bg-danger/10 text-danger flex items-center justify-center"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TICKETS ==================== */}
        {tab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Ticket size={16} className="text-primary" /> {LABELS.tickets.title}</h3>
              <div className="flex gap-1.5">
                {(['all', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map((f) => (
                  <button key={f} onClick={() => setTicketFilter(f)} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${ticketFilter === f ? 'bg-primary text-black' : 'bg-accent text-muted'}`}>
                    {f === 'all' ? LABELS.tickets.all : f === 'OPEN' ? LABELS.tickets.open : f === 'IN_PROGRESS' ? LABELS.tickets.inProgress : LABELS.tickets.resolved}
                  </button>
                ))}
              </div>
            </div>
            {tickets.length === 0 ? (
              <div className="text-center py-8"><Ticket size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.tickets.noTickets}</p></div>
            ) : (
              <div className="space-y-2">
                {tickets.filter((t) => ticketFilter === 'all' || t.status === ticketFilter).map((t) => (
                  <div key={t.id} onClick={() => setSelectedTicket(t)} className="glass-card rounded-xl p-3 cursor-pointer hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${t.status === 'OPEN' ? 'bg-success/10 text-success' : t.status === 'IN_PROGRESS' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                            {t.status === 'OPEN' ? LABELS.tickets.open : t.status === 'IN_PROGRESS' ? LABELS.tickets.inProgress : t.status === 'RESOLVED' ? LABELS.tickets.resolved : LABELS.tickets.closed}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${t.priority === 'URGENT' ? 'bg-danger/10 text-danger' : t.priority === 'HIGH' ? 'bg-warning/10 text-warning' : 'bg-accent text-muted'}`}>
                            {t.priority === 'URGENT' ? LABELS.tickets.urgent : t.priority === 'HIGH' ? LABELS.tickets.high : t.priority === 'MEDIUM' ? LABELS.tickets.medium : LABELS.tickets.low}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-foreground mt-1">{t.subject}</p>
                        <p className="text-[10px] text-muted">{t.user.name} • {timeAgo(t.createdAt)}</p>
                      </div>
                      {t._count.responses > 0 && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t._count.responses} {LABELS.tickets.responses}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== ERROR LOGS ==================== */}
        {tab === 'error-logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Bug size={16} className="text-danger" /> {LABELS.errorLogs.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleClearErrorLogs(7)} className="px-2.5 py-1.5 rounded-lg bg-danger/10 text-danger text-[10px] font-bold hover:bg-danger/20 transition-colors">
                  {LABELS.errorLogs.clearOld(7)}
                </button>
                <button onClick={loadErrorLogs} className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-muted hover:text-foreground"><RefreshCw size={14} /></button>
              </div>
            </div>
            {logsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={24} /></div>
            ) : errorLogs.length === 0 ? (
              <div className="text-center py-8"><Bug size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">{LABELS.errorLogs.noLogs}</p></div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {errorLogs.map((log) => (
                  <div key={log.id} className="glass-card rounded-xl p-3 border-l-2 border-l-danger">
                    <p className="text-xs text-foreground line-clamp-2">{log.message}</p>
                    {log.route && <p className="text-[10px] text-muted mt-1" dir="ltr">{log.route}</p>}
                    <p className="text-[9px] text-muted mt-1">{new Date(log.createdAt).toLocaleString('ar-EG')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== BACKUP ==================== */}
        {tab === 'backup' && (
          <div className="glass-card rounded-2xl p-6">
            <div className="text-center">
              <Database size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{LABELS.backup.title}</h3>
              <p className="text-sm text-muted mb-6">{LABELS.backup.description}</p>
              <button onClick={handleBackup} className="px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto">
                <Download size={18} /> {LABELS.backup.download}
              </button>
              <p className="text-[10px] text-muted mt-4">{LABELS.backup.includes}</p>
            </div>
          </div>
        )}

        {/* ==================== NOTIFICATIONS ==================== */}
        {tab === 'notifications' && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2"><Send size={16} className="text-success" /> {LABELS.admin.sendNotification}</h2>
              {notifSuccess && <div className="bg-success/10 border border-success/20 rounded-lg p-2 text-xs text-success font-medium text-center">{notifSuccess}</div>}
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.admin.sendTo}</label>
              <select value={notifTarget} onChange={(e) => setNotifTarget(e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="all">{LABELS.admin.allUsers}</option>
                {users.map((u) => (<option key={u.id} value={u.id.toString()}>{u.name} ({u.email})</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.admin.notificationTitle}</label>
              <input type="text" placeholder={LABELS.admin.notificationTitle} value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.admin.notificationMessage}</label>
              <textarea placeholder={LABELS.admin.notificationMessage} value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} rows={3} className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
            <button onClick={handleSendNotification} disabled={notifSending || !notifTitle || !notifMessage}
              className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${!notifSending && notifTitle && notifMessage ? 'gradient-primary hover:opacity-90 shadow-lg shadow-primary/25' : 'bg-muted cursor-not-allowed'}`}>
              {notifSending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send size={16} /><span>{LABELS.common.submit}</span></>}
            </button>
          </div>
        )}
      </div>

      {/* ==================== AD MODAL ==================== */}
      {adModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 space-y-4 border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2"><Megaphone size={16} className="text-orange-500" /> {editingAd ? LABELS.ads.edit : LABELS.ads.add}</h3>
              <button onClick={closeAdModal} className="text-muted hover:text-foreground text-lg"><X size={18} /></button>
            </div>
            {adMsg && <div className="bg-success/10 border border-success/20 rounded-lg p-2 text-xs text-success font-medium text-center">{adMsg}</div>}
            {adError && <div className="bg-danger/10 border border-danger/20 rounded-lg p-2 text-xs text-danger font-medium text-center">{adError}</div>}

            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Megaphone size={11} /> {LABELS.ads.adTitle} *</label>
              <input type="text" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder={LABELS.ads.adTitlePlaceholder}
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>

            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.common.type}</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: 'BANNER_TEXT' as const, label: LABELS.ads.bannerText, icon: Image, color: 'text-green-500' },
                  { key: 'BANNER_LINK' as const, label: LABELS.ads.bannerLink, icon: Link2, color: 'text-blue-500' },
                  { key: 'BANNER_VIDEO' as const, label: LABELS.ads.bannerVideo, icon: Video, color: 'text-purple-500' },
                ]).map((t) => (
                  <button key={t.key} onClick={() => setAdType(t.key)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-[10px] font-bold transition-all ${adType === t.key ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-accent text-muted hover:text-foreground'}`}>
                    <t.icon size={18} className={adType === t.key ? 'text-primary' : t.color} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Image size={11} /> {LABELS.ads.imageUrl} *</label>
              <input type="url" value={adImageUrl} onChange={(e) => setAdImageUrl(e.target.value)} placeholder={LABELS.ads.imagePlaceholder} dir="ltr"
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {adImageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border h-28 bg-accent">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adImageUrl} alt={LABELS.common.details} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>

            {adType === 'BANNER_TEXT' && (
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.ads.text}</label>
                <textarea value={adText} onChange={(e) => setAdText(e.target.value)} placeholder={LABELS.ads.textPlaceholder} rows={3}
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
            )}

            {adType === 'BANNER_LINK' && (
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Link2 size={11} /> {LABELS.ads.linkUrl}</label>
                <input type="url" value={adLinkUrl} onChange={(e) => setAdLinkUrl(e.target.value)} placeholder="https://example.com" dir="ltr"
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            )}

            {adType === 'BANNER_VIDEO' && (
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Video size={11} /> {LABELS.ads.videoUrl}</label>
                <input type="url" value={adVideoUrl} onChange={(e) => setAdVideoUrl(e.target.value)} placeholder={LABELS.ads.videoPlaceholder} dir="ltr"
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><GripVertical size={11} /> {LABELS.common.order}</label>
                <input type="number" value={adOrder} onChange={(e) => setAdOrder(parseInt(e.target.value) || 0)} min={0}
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.common.status}</label>
                <button onClick={() => setAdActive(!adActive)}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold transition-all ${adActive ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-accent text-muted'}`}>
                  {adActive ? <><ToggleRight size={16} /> {LABELS.ads.statusActive}</> : <><ToggleLeft size={16} /> {LABELS.ads.statusPaused}</>}
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={closeAdModal} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-accent text-foreground hover:bg-accent/80 transition-colors">{LABELS.common.cancel}</button>
              <button onClick={handleSaveAd} disabled={adSaving || !adTitle || !adImageUrl}
                className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${!adSaving && adTitle && adImageUrl ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
                {adSaving ? <Loader2 className="animate-spin mx-auto" size={18} /> : (editingAd ? LABELS.admin.saveChanges : LABELS.admin.createAd)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== EDIT USER MODAL ==================== */}
      {editUserId !== null && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 space-y-4 border border-border shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2"><Edit size={16} className="text-primary" /> {LABELS.users.editUser}</h3>
              <button onClick={() => setEditUserId(null)} className="text-muted hover:text-foreground text-lg">✕</button>
            </div>
            {editUserMsg && <div className="bg-success/10 border border-success/20 rounded-lg p-2 text-xs text-success font-medium text-center">{editUserMsg}</div>}
            {editUserError && <div className="bg-danger/10 border border-danger/20 rounded-lg p-2 text-xs text-danger font-medium text-center">{editUserError}</div>}
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Users size={11} /> {LABELS.common.name}</label>
              <input type="text" value={editUserName} onChange={(e) => setEditUserName(e.target.value)}
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Mail size={11} /> {LABELS.common.email}</label>
              <input type="email" value={editUserEmail} onChange={(e) => setEditUserEmail(e.target.value)} dir="ltr"
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Phone size={11} /> {LABELS.common.phone}</label>
              <input type="tel" value={editUserPhone} onChange={(e) => setEditUserPhone(e.target.value)} dir="ltr" placeholder={LABELS.users.phonePlaceholder}
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1"><Lock size={11} /> {LABELS.users.newPassword}</label>
              <input type="password" value={editUserPassword} onChange={(e) => setEditUserPassword(e.target.value)} placeholder={LABELS.users.passwordPlaceholder}
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditUserId(null)} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-accent text-foreground hover:bg-accent/80 transition-colors">{LABELS.common.cancel}</button>
              <button onClick={handleSaveEditUser} disabled={editUserSaving || !editUserName || !editUserEmail}
                className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${!editUserSaving && editUserName && editUserEmail ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
                {editUserSaving ? <Loader2 className="animate-spin mx-auto" size={18} /> : LABELS.admin.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== COMPANY MODAL ==================== */}
      {companyModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 space-y-4 border border-border shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2"><Building2 size={16} className="text-primary" /> {editingCompany ? LABELS.companies.edit : LABELS.companies.add}</h3>
              <button onClick={closeCompanyModal} className="text-muted hover:text-foreground text-lg"><X size={18} /></button>
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.companies.nameAr}</label>
              <input type="text" value={companyNameAr} onChange={(e) => setCompanyNameAr(e.target.value)}
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1">الاسم الإنجليزي</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} dir="ltr"
                className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[11px] text-muted mb-1 flex justify-between">
                <span>رابط الشعار (صورة)</span>
                {companyLogo && <span className="text-primary cursor-pointer hover:underline" onClick={() => window.open(companyLogo, '_blank')}>استعراض</span>}
              </label>
              <div className="flex gap-2 items-center">
                {companyLogo && <div className="w-8 h-8 rounded shrink-0 bg-white p-0.5 border border-border flex items-center justify-center overflow-hidden"><img src={companyLogo} className="w-full h-full object-contain" alt="Logo" /></div>}
                <input type="url" value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} dir="ltr" placeholder="https://example.com/logo.png"
                  className="w-full h-9 bg-accent border border-border rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.common.color}</label>
                <input type="color" value={companyColor} onChange={(e) => setCompanyColor(e.target.value)}
                  className="w-full h-10 bg-accent border border-border rounded-lg cursor-pointer" />
              </div>
              <div>
                <label className="flex items-center gap-1 text-[11px] text-muted mb-1">{LABELS.companies.commissionPercent}</label>
                <input type="number" value={companyCommission} onChange={(e) => setCompanyCommission(parseFloat(e.target.value) || 0)} min={0} max={100}
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={closeCompanyModal} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-accent text-foreground hover:bg-accent/80 transition-colors">{LABELS.common.cancel}</button>
              <button onClick={handleSaveCompany} disabled={companySaving || !companyNameAr}
                className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${!companySaving && companyNameAr ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
                {companySaving ? <Loader2 className="animate-spin mx-auto" size={18} /> : (editingCompany ? LABELS.common.save : LABELS.common.add)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TICKET DETAIL MODAL ==================== */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl p-6 space-y-4 border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedTicket.status === 'OPEN' ? 'bg-success/10 text-success' : selectedTicket.status === 'IN_PROGRESS' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                  {selectedTicket.status === 'OPEN' ? LABELS.tickets.open : selectedTicket.status === 'IN_PROGRESS' ? LABELS.tickets.inProgress : selectedTicket.status === 'RESOLVED' ? LABELS.tickets.resolved : LABELS.tickets.closed}
                </span>
                <h3 className="text-base font-bold text-foreground">{selectedTicket.subject}</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-muted hover:text-foreground text-lg"><X size={18} /></button>
            </div>
            <div className="p-3 bg-accent/50 rounded-xl">
              <p className="text-sm text-foreground">{selectedTicket.message}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-muted">{selectedTicket.user.name} • {new Date(selectedTicket.createdAt).toLocaleString('ar-EG')}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${selectedTicket.priority === 'URGENT' ? 'bg-danger/10 text-danger' : selectedTicket.priority === 'HIGH' ? 'bg-warning/10 text-warning' : 'bg-accent text-muted'}`}>
                  {selectedTicket.priority === 'URGENT' ? LABELS.tickets.urgent : selectedTicket.priority === 'HIGH' ? LABELS.tickets.high : selectedTicket.priority === 'MEDIUM' ? LABELS.tickets.medium : LABELS.tickets.low}
                </span>
              </div>
            </div>
            {/* Reply Section */}
            {selectedTicket.status !== 'CLOSED' && selectedTicket.status !== 'RESOLVED' && (
              <div className="space-y-2">
                <label className="text-[11px] text-muted">{LABELS.tickets.reply}</label>
                <textarea value={ticketResponse} onChange={(e) => setTicketResponse(e.target.value)} rows={3} placeholder={LABELS.tickets.replyPlaceholder}
                  className="w-full bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                <div className="flex gap-2">
                  <button onClick={() => handleReplyToTicket(selectedTicket.id)} disabled={!ticketResponse.trim()}
                    className="flex-1 py-2 rounded-lg font-bold text-sm bg-primary text-black hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {LABELS.tickets.sendReply}
                  </button>
                  <button onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'RESOLVED')}
                    className="px-4 py-2 rounded-lg font-bold text-sm bg-success/10 text-success hover:bg-success/20 transition-colors">
                    {LABELS.tickets.resolve}
                  </button>
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2 border-t border-border">
              <button onClick={() => setSelectedTicket(null)} className="flex-1 py-2 rounded-lg font-bold text-sm bg-accent text-foreground hover:bg-accent/80 transition-colors">{LABELS.common.close}</button>
              <button onClick={() => handleDeleteTicket(selectedTicket.id)} className="px-4 py-2 rounded-lg font-bold text-sm bg-danger/10 text-danger hover:bg-danger/20 transition-colors">{LABELS.common.delete}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
