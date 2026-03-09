'use client';

import Link from 'next/link';
import { ArrowRight, Bell, Car, CircleHelp, LineChart, Receipt, Shield, Target, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-foreground"
        >
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center pl-2">المساعدة</h1>
        <div className="w-10" />
      </header>

      <main className="max-w-[480px] mx-auto p-4 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CircleHelp className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-foreground">إزاي تستخدم التطبيق؟</p>
              <p className="text-xs text-muted mt-0.5">اختصارات لأهم الصفحات وشرح سريع للفكرة</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/income" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Receipt size={18} className="text-primary" />
              <span className="font-semibold text-foreground">إضافة دخل</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/expense" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Receipt size={18} className="text-danger" />
              <span className="font-semibold text-foreground">إضافة مصروف</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/transactions" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Receipt size={18} className="text-muted" />
              <span className="font-semibold text-foreground">سجل العمليات</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/reports" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <LineChart size={18} className="text-primary" />
              <span className="font-semibold text-foreground">التقارير</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/goals" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Target size={18} className="text-primary" />
              <span className="font-semibold text-foreground">الأهداف والميزانية</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/vehicle" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Car size={18} className="text-primary" />
              <span className="font-semibold text-foreground">ملف السيارة والصيانة</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/notifications" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-muted" />
              <span className="font-semibold text-foreground">الإشعارات</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/profile" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted" />
              <span className="font-semibold text-foreground">حسابي</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>

          <Link href="/settings/notifications" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-accent/30 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-muted" />
              <span className="font-semibold text-foreground">إعدادات التنبيهات</span>
            </div>
            <ArrowRight size={16} className="text-muted rotate-180" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-bold text-foreground">معلومة سريعة</p>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            لو عايز تتابع أرباحك بشكل صحيح: سجل كل دخلك من المنصات وسجل المصروفات (بنزين/صيانة/عمولة)، وبعدها راجع التقارير والأهداف.
          </p>
        </div>
      </main>
    </div>
  );
}
