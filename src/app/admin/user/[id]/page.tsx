'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { useRouter, useParams } from 'next/navigation';
import { getCategoryLabel, getCategoryIcon } from '@/lib/db';
import { useCompanies } from '@/lib/useData';
import {
  User, ArrowRight, TrendingUp, TrendingDown, Wallet, Calendar,
  BarChart3, PieChart, Activity, Clock, Phone,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: string;
  suspended?: boolean;
  createdAt: string;
  incomes: Array<{ id: number; date: string; company: string; amount: number; notes: string | null }>;
  expenses: Array<{ id: number; date: string; category: string; customCategory: string | null; amount: number; notes: string | null }>;
}

type ViewTab = 'overview' | 'incomes' | 'expenses';

const COMPANY_COLORS: Record<string, string> = { Uber: '#000000', Didi: '#f97316', InDrive: '#16a34a' };
const CATEGORY_LABELS: Record<string, string> = { fuel: '⛽ بنزين', maintenance: '🔧 صيانة', mobile: '📱 موبايل', cleaning: '🧹 تنظيف', other: '📋 أخرى' };

export default function AdminUserPage() {
  const { isAdmin } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewTab, setViewTab] = useState<ViewTab>('overview');
  const { companies } = useCompanies();

  useEffect(() => {
    if (!isAdmin) { router.replace('/'); return; }
    fetch(`/api/admin/users/${params.id}`)
      .then((r) => r.json())
      .then(setUserData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAdmin, router, params.id]);

  const incomes = userData?.incomes ?? [];
  const expenses = userData?.expenses ?? [];
  const totalIncome = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0), [incomes]);
  const totalExpense = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  // Monthly breakdown
  const monthlyData = useMemo(() => {
    if (!userData) return [];
    const map: Record<string, { income: number; expense: number }> = {};
    incomes.forEach((i) => {
      const m = i.date.substring(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      map[m].income += i.amount;
    });
    expenses.forEach((e) => {
      const m = e.date.substring(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      map[m].expense += e.amount;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0])).slice(-6).map(([month, data]) => ({ month, ...data, profit: data.income - data.expense }));
  }, [userData, incomes, expenses]);

  // Company breakdown
  const companyBreakdown = useMemo(() => {
    if (!userData) return {};
    const map: Record<string, number> = {};
    incomes.forEach((i) => { map[i.company] = (map[i.company] || 0) + i.amount; });
    return map;
  }, [userData, incomes]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    if (!userData) return {};
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const label = e.category === 'other' && e.customCategory ? e.customCategory : e.category;
      map[label] = (map[label] || 0) + e.amount;
    });
    return map;
  }, [userData, expenses]);

  // Daily average
  const dailyAvg = useMemo(() => {
    if (!userData || incomes.length === 0) return 0;
    const dates = new Set(incomes.map((i) => i.date));
    return totalIncome / dates.size;
  }, [userData, totalIncome]);

  const isDark = theme === 'dark';
  const chartText = isDark ? '#94a3b8' : '#64748b';
  const chartGrid = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.06)';

  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const monthLabel = (m: string) => { const [y, mo] = m.split('-'); return `${monthNames[parseInt(mo) - 1]}`; };

  const monthlyChartData = {
    labels: monthlyData.map((d) => monthLabel(d.month)),
    datasets: [
      { label: 'الدخل', data: monthlyData.map((d) => d.income), backgroundColor: 'rgba(34,197,94,0.7)', borderRadius: 5 },
      { label: 'المصروفات', data: monthlyData.map((d) => d.expense), backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: 5 },
    ],
  };

  const companyChartData = {
    labels: Object.keys(companyBreakdown),
    datasets: [{ data: Object.values(companyBreakdown), backgroundColor: Object.keys(companyBreakdown).map((c) => COMPANY_COLORS[c] || '#6366f1'), borderWidth: 0 }],
  };

  const catColors = ['#f97316', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];
  const categoryChartData = {
    labels: Object.keys(categoryBreakdown).map((c) => CATEGORY_LABELS[c] || c),
    datasets: [{ data: Object.values(categoryBreakdown), backgroundColor: catColors, borderWidth: 0 }],
  };

  const barOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: chartText, font: { size: 10 } }, position: 'top' as const } },
    scales: { x: { ticks: { color: chartText, font: { size: 9 } }, grid: { display: false } }, y: { ticks: { color: chartText, font: { size: 9 } }, grid: { color: chartGrid } } },
  };
  const doughOpts = {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'bottom' as const, labels: { color: chartText, font: { size: 10 }, padding: 10 } } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4 pt-8 text-center">
        <p className="text-muted">المستخدم غير موجود</p>
        <Link href="/admin" className="text-primary text-sm mt-2 inline-block">العودة للإدارة</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="gradient-primary px-4 pt-5 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin" className="flex items-center gap-1 text-white/70 hover:text-white text-xs transition-colors">
              <ArrowRight size={14} /><span>العودة</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${userData.role === 'ADMIN' ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'}`}>
                {userData.role === 'ADMIN' ? '🛡️ أدمن' : '👤 مشترك'}
              </span>
              {userData.suspended && <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-red-500/30 text-white">🚫 موقوف</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {userData.profileImage ? (
              <Image src={userData.profileImage} alt={userData.name} width={56} height={56} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20" />
            ) : (
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold text-white">{userData.name}</h1>
              <p className="text-xs text-white/60" dir="ltr">{userData.email}</p>
              {userData.phone && <p className="text-[10px] text-white/50 flex items-center gap-1" dir="ltr"><Phone size={9} /> {userData.phone}</p>}
              <p className="text-[10px] text-white/40 mt-0.5 flex items-center gap-1"><Calendar size={10} /> انضم {new Date(userData.createdAt).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - overlapping header */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-4 gap-2">
          <div className="glass-card rounded-xl p-3 text-center shadow-lg">
            <TrendingUp size={14} className="text-success mx-auto mb-1" />
            <p className="text-[9px] text-muted">الدخل</p>
            <p className="text-sm font-extrabold text-success">{totalIncome.toFixed(0)}</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center shadow-lg">
            <TrendingDown size={14} className="text-danger mx-auto mb-1" />
            <p className="text-[9px] text-muted">المصروفات</p>
            <p className="text-sm font-extrabold text-danger">{totalExpense.toFixed(0)}</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center shadow-lg">
            <Wallet size={14} className="text-primary mx-auto mb-1" />
            <p className="text-[9px] text-muted">الربح</p>
            <p className={`text-sm font-extrabold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{netProfit.toFixed(0)}</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center shadow-lg">
            <Activity size={14} className="text-warning mx-auto mb-1" />
            <p className="text-[9px] text-muted">العمليات</p>
            <p className="text-sm font-extrabold text-foreground">{incomes.length + expenses.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-5 space-y-4">
        {/* Extra Stats */}
        <div className="glass-card rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[9px] text-muted">نسبة الربح</p>
              <p className={`text-lg font-extrabold ${profitMargin >= 0 ? 'text-primary' : 'text-danger'}`}>{profitMargin.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-[9px] text-muted">متوسط يومي</p>
              <p className="text-lg font-extrabold text-success">{dailyAvg.toFixed(0)}</p>
              <p className="text-[8px] text-muted">ج.م/يوم</p>
            </div>
            <div>
              <p className="text-[9px] text-muted">نسبة المصروفات</p>
              <p className="text-lg font-extrabold text-danger">{totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : '0'}%</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 bg-accent rounded-xl p-1">
          {([
            { key: 'overview' as ViewTab, label: 'نظرة عامة', icon: BarChart3 },
            { key: 'incomes' as ViewTab, label: `الدخل (${incomes.length})`, icon: TrendingUp },
            { key: 'expenses' as ViewTab, label: `المصروفات (${expenses.length})`, icon: TrendingDown },
          ]).map((t) => (
            <button key={t.key} onClick={() => setViewTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-medium transition-all ${viewTab === t.key ? 'bg-card text-primary shadow-sm' : 'text-muted hover:text-foreground'}`}>
              <t.icon size={12} />{t.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {viewTab === 'overview' && (
          <>
            {/* Monthly Chart */}
            {monthlyData.length > 0 && (
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><BarChart3 size={14} className="text-primary" /> الأداء الشهري</h3>
                <div style={{ height: 200 }}><Bar data={monthlyChartData} options={barOpts} /></div>
              </div>
            )}

            {/* Company + Category */}
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(companyBreakdown).length > 0 && (
                <div className="glass-card rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1"><PieChart size={12} className="text-success" /> الشركات</h3>
                  <div style={{ height: 150 }}><Doughnut data={companyChartData} options={doughOpts} /></div>
                  <div className="mt-2 space-y-1">
                    {Object.entries(companyBreakdown).sort((a, b) => b[1] - a[1]).map(([c, v]) => (
                      <div key={c} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COMPANY_COLORS[c] || '#6366f1' }} /><span className="text-[10px] text-foreground">{c}</span></div>
                        <span className="text-[10px] font-bold text-foreground">{v.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {Object.keys(categoryBreakdown).length > 0 && (
                <div className="glass-card rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1"><PieChart size={12} className="text-danger" /> المصروفات</h3>
                  <div style={{ height: 150 }}><Doughnut data={categoryChartData} options={doughOpts} /></div>
                  <div className="mt-2 space-y-1">
                    {Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]).map(([c, v]) => (
                      <div key={c} className="flex items-center justify-between">
                        <span className="text-[10px] text-foreground">{CATEGORY_LABELS[c] || c}</span>
                        <span className="text-[10px] font-bold text-foreground">{v.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Table */}
            {monthlyData.length > 0 && (
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1"><Calendar size={12} className="text-blue-500" /> تفاصيل الأشهر</h3>
                <div className="space-y-1.5">
                  {monthlyData.slice().reverse().map((m) => (
                    <div key={m.month} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                      <span className="text-[10px] font-bold text-foreground">{monthLabel(m.month)}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-success font-bold">+{m.income.toFixed(0)}</span>
                        <span className="text-[10px] text-danger font-bold">-{m.expense.toFixed(0)}</span>
                        <span className={`text-[10px] font-extrabold ${m.profit >= 0 ? 'text-primary' : 'text-danger'}`}>{m.profit.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== INCOMES TAB ===== */}
        {viewTab === 'incomes' && (
          <div>
            {incomes.length === 0 ? (
              <div className="text-center py-8"><TrendingUp size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">لا توجد سجلات دخل</p></div>
            ) : (
              <div className="space-y-1.5">
                {[...incomes].sort((a, b) => b.date.localeCompare(a.date)).map((i) => (
                  <div key={i.id} className="glass-card rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm overflow-hidden" style={{ backgroundColor: (COMPANY_COLORS[i.company] || '#6366f1') + '15' }}>
                        {companies.find(c => c.name === i.company)?.logo ? (
                          <img src={companies.find(c => c.name === i.company)?.logo!} alt={i.company} className="w-full h-full object-contain p-0.5" />
                        ) : (
                          i.company === 'Uber' ? '🚗' : i.company === 'Didi' ? '🟠' : '🟢'
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground">{i.company}</span>
                        <p className="text-[10px] text-muted">{i.date}</p>
                        {i.notes && <p className="text-[9px] text-muted/70 truncate max-w-[150px]">{i.notes}</p>}
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-success">+{i.amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== EXPENSES TAB ===== */}
        {viewTab === 'expenses' && (
          <div>
            {expenses.length === 0 ? (
              <div className="text-center py-8"><TrendingDown size={32} className="text-muted mx-auto mb-2 opacity-30" /><p className="text-sm text-muted">لا توجد سجلات مصروفات</p></div>
            ) : (
              <div className="space-y-1.5">
                {[...expenses].sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
                  <div key={e.id} className="glass-card rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center text-sm">
                        {getCategoryIcon(e.category)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground">{getCategoryLabel(e.category, e.customCategory || undefined)}</span>
                        <p className="text-[10px] text-muted">{e.date}</p>
                        {e.notes && <p className="text-[9px] text-muted/70 truncate max-w-[150px]">{e.notes}</p>}
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-danger">-{e.amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
