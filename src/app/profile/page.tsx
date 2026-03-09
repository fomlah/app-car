'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { useIncomes, useExpenses } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp, Wallet, LogOut, Shield, ChevronLeft, Settings, Star,
  Zap, Clock, Flame, Trophy, Car, ArrowRight, Edit, Bell, BarChart3, AlertTriangle,
  Camera, X, Loader2, Check, Lock, Phone, Mail, User,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, isAdmin, refreshUser } = useAuth();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (showEdit && user) {
      setEditName(user.name);
      setEditEmail(user.email);
      setEditPhone(user.phone || '');
      setCurrentPassword('');
      setNewPassword('');
      setSaveMsg('');
      setSaveError('');
    }
  }, [showEdit, user]);

  const totalIncome = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0), [incomes]);
  const totalExpense = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const netProfit = totalIncome - totalExpense;
  const totalDays = new Set(incomes.map((i) => i.date)).size;
  const totalIncomes = incomes.length;

  const achievements = useMemo(() => {
    const list = [];
    list.push({ icon: Trophy, title: 'سائق حديدي', desc: totalDays >= 100 ? '100 يوم عمل مكتمل' : `${totalDays} / 100 يوم`, earned: totalDays >= 100, progress: totalDays / 100, medal: 'silver' });
    const uniqueDays = new Set(incomes.map((i) => i.date));
    list.push({ icon: Flame, title: 'بومة الليل', desc: uniqueDays.size >= 50 ? '50 يوم عمل مكتمل' : `${uniqueDays.size} / 50 يوم`, earned: uniqueDays.size >= 50, progress: uniqueDays.size / 50, medal: 'gold' });
    list.push({ icon: Star, title: 'محقق الأهداف', desc: totalIncomes >= 200 ? 'حققت هدفك 3 مرات' : `${Math.min(Math.floor(totalIncomes / 67), 3)} / 3 أهداف`, earned: totalIncomes >= 200, progress: Math.min(totalIncomes / 200, 1), medal: 'locked' });
    list.push({ icon: Settings, title: 'ملك الصيانة', desc: expenses.length > 0 ? 'كل مصاريف السيارة مسجلة' : 'سجل مصاريفك', earned: expenses.length > 0, progress: expenses.length > 0 ? 1 : 0, medal: 'gold' });
    return list;
  }, [totalDays, totalIncomes, incomes, expenses]);

  const earnedCount = achievements.filter((a) => a.earned).length;

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg('');
    setSaveError('');
    try {
      const body: Record<string, string> = { name: editName, email: editEmail, phone: editPhone };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(LABELS.common.error);
      } else {
        setSaveMsg(LABELS.common.save);
        await refreshUser();
        setTimeout(() => setShowEdit(false), 1200);
      }
    } catch { setSaveError(LABELS.common.error); }
    finally { setSaving(false); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/auth/profile/image', { method: 'POST', body: formData });
      if (res.ok) {
        await refreshUser();
      }
    } catch (err) { console.error(err); }
    finally { setUploadingImage(false); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Top Bar */}
      <div className="flex items-center p-4 pt-6 justify-between sticky top-0 z-10 bg-card/80 backdrop-blur-md">
        <div className="w-10" />
        <h2 className="text-lg font-bold text-foreground">الملف الشخصي</h2>
        <Link href="/notifications" className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-accent text-muted">
          <Settings size={20} />
        </Link>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center px-4 py-6 gap-4">
        <div className="relative">
          {user?.profileImage ? (
            <Image src={user.profileImage} alt="صورة الملف الشخصي" width={128} height={128}
              className="w-32 h-32 rounded-full ring-4 ring-primary/20 border-2 border-primary object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full ring-4 ring-primary/20 border-2 border-primary bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl">
              {user?.name?.charAt(0).toUpperCase() || 'س'}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="absolute bottom-1 left-1 w-9 h-9 bg-primary rounded-full border-2 border-background flex items-center justify-center text-black hover:brightness-110 transition-all"
          >
            {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <div className="absolute bottom-1 right-1 bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-background text-black uppercase">
            PRO
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{user?.name || 'سائق'}</h1>
          <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-semibold text-muted">{user?.role === 'ADMIN' ? 'أدمن' : 'سائق'}</span>
            <span className="mx-1 text-border">•</span>
            <span className="text-sm font-medium text-muted" dir="ltr">{user?.email}</span>
          </div>
          {user?.phone && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <Phone size={12} className="text-muted" />
              <span className="text-sm text-muted" dir="ltr">{user.phone}</span>
            </div>
          )}
        </div>
        <button onClick={() => setShowEdit(true)} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-xl transition-all active:scale-[0.98]">
          <Edit size={18} />
          <span>تعديل الملف الشخصي</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="px-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-2xl p-4 bg-card border border-border shadow-sm">
            <p className="text-muted text-xs font-bold uppercase tracking-wider">أيام العمل</p>
            <p className="text-2xl font-extrabold tracking-tight text-foreground">{totalDays.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-primary text-xs mt-1">
              <TrendingUp size={12} />
              <span>{totalDays > 0 ? '+12%' : '0%'} عن الشهر الماضي</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl p-4 bg-card border border-border shadow-sm">
            <p className="text-muted text-xs font-bold uppercase tracking-wider">صافي الربح</p>
            <p className="text-2xl font-extrabold tracking-tight text-primary">{netProfit.toLocaleString()} ج.م</p>
            <div className="flex items-center gap-1 text-primary text-xs mt-1">
              <Wallet size={12} />
              <span>بعد المصروفات</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">الإنجازات والشارات</h3>
          <span className="text-xs font-bold text-primary">{earnedCount} / {achievements.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className={`flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border transition-all ${!a.earned ? 'opacity-40 grayscale' : 'hover:bg-accent/30'}`}>
                <div className="mb-3 w-16 h-16 flex items-center justify-center rounded-full bg-accent">
                  <Icon size={28} className={a.earned ? (a.medal === 'gold' ? 'text-yellow-500' : 'text-gray-400') : 'text-muted'} />
                </div>
                <p className="text-sm font-bold mb-1 text-foreground">{a.title}</p>
                <p className="text-[11px] text-muted leading-tight">{a.desc}</p>
                {!a.earned && (
                  <>
                    <div className="w-full bg-accent rounded-full h-1 mt-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(a.progress * 100, 100)}%` }} />
                    </div>
                    <p className="text-[9px] font-bold mt-1 text-primary">{Math.round(a.progress * 100)}%</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Utility Links */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <Link href="/transactions" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-muted" />
            <span className="font-semibold text-foreground">سجل المعاملات</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/fuel" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-muted" />
            <span className="font-semibold text-foreground">حاسبة الوقود</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/work-sessions" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <Car size={20} className="text-muted" />
            <span className="font-semibold text-foreground">ساعات العمل</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/vehicle" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-muted" />
            <span className="font-semibold text-foreground">ملف السيارة والصيانة</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/predictions" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <BarChart3 size={20} className="text-muted" />
            <span className="font-semibold text-foreground">توقعات الأرباح</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/alerts" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-muted" />
            <span className="font-semibold text-foreground">تنبيهات المصروفات</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        <Link href="/settings/notifications" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-muted" />
            <span className="font-semibold text-foreground">إشعارات الأهداف الذكية</span>
          </div>
          <ChevronLeft size={16} className="text-muted" />
        </Link>
        {isAdmin && (
          <Link href="/admin" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-muted" />
              <span className="font-semibold text-foreground">لوحة التحكم</span>
            </div>
            <ChevronLeft size={16} className="text-muted" />
          </Link>
        )}
      </div>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button onClick={() => logout()} className="w-full flex items-center justify-center gap-2 text-rose-500 font-bold h-12 rounded-xl hover:bg-rose-500/10 transition-colors">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
        <p className="text-center text-[10px] text-muted mt-4 mb-2 uppercase tracking-[0.2em]">إصدار التطبيق 2.4.1 (مستقر)</p>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-card w-full max-w-[480px] rounded-t-3xl p-6 space-y-4 border-t border-border max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">تعديل الملف الشخصي</h3>
              <button onClick={() => setShowEdit(false)} className="text-muted hover:text-foreground"><X size={20} /></button>
            </div>

            {saveMsg && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2">
                <Check size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">{saveMsg}</span>
              </div>
            )}
            {saveError && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-3">
                <span className="text-sm text-danger font-medium">{saveError}</span>
              </div>
            )}

            <div>
              <label className="flex items-center gap-1.5 text-xs text-muted mb-1.5"><User size={12} /> الاسم</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-muted mb-1.5"><Mail size={12} /> البريد الإلكتروني</label>
              <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} dir="ltr"
                className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-muted mb-1.5"><Phone size={12} /> رقم التليفون</label>
              <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} dir="ltr" placeholder="01xxxxxxxxx"
                className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted mb-3 flex items-center gap-1.5"><Lock size={12} /> تغيير كلمة المرور (اختياري)</p>
              <div className="space-y-3">
                <input type="password" placeholder="كلمة المرور الحالية" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="password" placeholder="كلمة المرور الجديدة" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <button onClick={handleSaveProfile} disabled={saving || !editName || !editEmail}
              className={`w-full py-3.5 rounded-xl font-bold transition-all ${!saving && editName && editEmail ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
              {saving ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'حفظ التغييرات'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
