'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { useIncomes, useExpenses, useCompanies } from '@/lib/useData';
import { getCategoryLabel, getCategoryIcon } from '@/lib/db';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ar } from 'date-fns/locale';
import { LABELS } from '@/constants/labels';
import { TrendingUp, TrendingDown, Sun, Moon, Zap, Target, Bell, Check, ChevronLeft, Plus, Minus, Settings } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

const COMPANY_BG: Record<string, string> = { Uber: '#000000', Didi: '#ff7d00', InDrive: '#B2F75B' };
const COMPANY_TEXT: Record<string, string> = { Uber: 'text-white', Didi: 'text-white', InDrive: 'text-black' };

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Home() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();
  const { companies } = useCompanies();
  const [monthGoal, setMonthGoal] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const today = new Date();
  const todayStr = fmtDate(today);
  const monthStart = fmtDate(startOfMonth(today));
  const monthEnd = fmtDate(endOfMonth(today));
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    fetch('/api/goals').then((r) => r.json()).then((goals) => { if (Array.isArray(goals)) { const g = goals.find((g: { month: string }) => g.month === currentMonth); if (g) setMonthGoal(g.targetAmount); } }).catch(() => { });
    fetch('/api/notifications').then((r) => r.json()).then((data) => { if (Array.isArray(data)) setUnreadCount(data.filter((n: { read: boolean }) => !n.read).length); }).catch(() => { });
  }, [currentMonth]);

  const todayIncomeTotal = useMemo(() => incomes.filter((i) => i.date === todayStr).reduce((s, i) => s + i.amount, 0), [incomes, todayStr]);
  const todayExpenseTotal = useMemo(() => expenses.filter((e) => e.date === todayStr).reduce((s, e) => s + e.amount, 0), [expenses, todayStr]);

  const monthIncomeTotal = useMemo(() => incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0), [incomes, monthStart, monthEnd]);
  const monthExpenseTotal = useMemo(() => expenses.filter((e) => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);
  const monthProfit = monthIncomeTotal - monthExpenseTotal;

  const totalAllExpense = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const totalExpenseCount = expenses.length;

  const totalExpenseCategoryBreakdown = useMemo(() => {
    const map: Record<string, { amount: number; count: number }> = {};
    expenses.forEach(e => {
      const label = getCategoryLabel(e.category, e.customCategory || undefined);
      if (!map[label]) map[label] = { amount: 0, count: 0 };
      map[label].amount += e.amount;
      map[label].count += 1;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [expenses]);

  const daysInMonth = today.getDate();
  const dailyAverage = daysInMonth > 0 ? monthIncomeTotal / daysInMonth : 0;
  const daysRemaining = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - daysInMonth;
  const projectedMonthEnd = monthIncomeTotal + (dailyAverage * daysRemaining);
  const profitPct = monthIncomeTotal > 0 ? ((monthProfit / monthIncomeTotal) * 100) : 0;

  const companyBreakdown = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).forEach((i) => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [incomes, monthStart, monthEnd]);

  // Total (all-time) company breakdown
  const totalCompanyBreakdown = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    incomes.forEach((i) => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [incomes]);

  const totalAllIncome = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0), [incomes]);

  const todayActivity = useMemo(() => {
    const items: Array<{ id: string; type: 'income' | 'expense'; company?: string; category?: string; customCategory?: string | null; amount: number; notes?: string | null; date: string }> = [];
    incomes.filter((i) => i.date === todayStr).forEach((i) => items.push({ id: `i-${i.id}`, type: 'income', company: i.company, amount: i.amount, notes: i.notes, date: i.date }));
    expenses.filter((e) => e.date === todayStr).forEach((e) => items.push({ id: `e-${e.id}`, type: 'expense', category: e.category, customCategory: e.customCategory, amount: e.amount, notes: e.notes, date: e.date }));
    return items.slice(0, 5);
  }, [incomes, expenses, todayStr]);

  return (
    <div className="pb-24">
      {/* Header - Stitch style */}
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold text-sm">
                {user?.name?.charAt(0) || 'س'}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-card" />
            </div>
            <div>
              <p className="text-xs text-muted font-medium">{LABELS.common.welcome}</p>
              <h1 className="text-base font-bold leading-tight text-foreground">{user?.name || LABELS.nav.profile}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-accent transition-colors">
              <Bell size={20} className="text-muted" />
              {unreadCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-danger rounded-full text-[8px] text-white font-bold flex items-center justify-center">{unreadCount}</span>}
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-accent transition-colors">
              {theme === 'dark' ? <Sun size={20} className="text-muted" /> : <Moon size={20} className="text-muted" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-6 p-4">
        {/* Net Profit Card - Stitch style dark card */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-[#1c2e24] p-6 shadow-lg border border-white/5">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-400">{LABELS.admin.netProfit}</p>
                {profitPct > 0 && (
                  <span className="flex items-center text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">
                    <TrendingUp size={12} className="ml-1" />
                    {profitPct.toFixed(0)}%
                  </span>
                )}
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white mt-2">{monthProfit.toFixed(0)} <span className="text-lg text-gray-500">{LABELS.common.currency}</span></h2>
              <p className="text-xs text-gray-500 mt-1">
                {format(startOfMonth(today), 'd MMMM', { locale: ar })} - {format(today, 'd MMMM', { locale: ar })}
              </p>
            </div>
          </div>
        </section>

        {/* Ad Banners */}
        <AdBanner />

        {/* Income Source - Stitch horizontal scroll cards */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-lg font-bold text-foreground">{LABELS.admin.totalIncome}</h3>
            <Link href="/reports" className="text-xs font-semibold text-primary">{LABELS.common.all}</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {companies.map((c) => {
              const data = companyBreakdown.find(([comp]) => comp === c.name);
              const amount = data ? data[1].amount : 0;
              return (
                <div key={c.id} className="shrink-0 min-w-[140px] flex-1 rounded-xl bg-card border border-border p-4 flex flex-col justify-between h-32">
                  <div className="flex justify-between items-start">
                    <div className="rounded-lg p-1.5 w-9 h-9 flex items-center justify-center overflow-hidden" style={{ backgroundColor: c.color || COMPANY_BG[c.name] || '#6366f1' }}>
                      {c.logo ? (
                        <img src={c.logo} alt={c.nameAr || c.name} className="w-full h-full object-contain bg-white rounded-md p-0.5" />
                      ) : (
                        <span className={`font-bold text-xs tracking-tighter ${COMPANY_TEXT[c.name] || 'text-white'}`}>
                          {c.nameAr || c.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{amount.toFixed(0)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Total Income Breakdown (All-Time) */}
        <section>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">إجمالي الدخل حسب الشركة</h3>
            {companies.map((c) => {
              const data = totalCompanyBreakdown.find(([comp]) => comp === c.name);
              const amount = data ? data[1].amount : 0;
              const pct = totalAllIncome > 0 ? (amount / totalAllIncome) * 100 : 0;
              return (
                <div key={c.id} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="flex items-center gap-2 w-20 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color || COMPANY_BG[c.name] || '#6366f1' }} />
                    <span className="text-xs font-semibold text-foreground truncate">{c.nameAr || c.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: c.color || COMPANY_BG[c.name] || '#6366f1' }} />
                    </div>
                  </div>
                  <div className="text-left min-w-[70px]">
                    <p className="text-sm font-bold text-foreground">{amount.toFixed(0)}</p>
                    <p className="text-[10px] text-muted">{pct.toFixed(0)}%</p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
              <span className="text-xs font-semibold text-muted">الإجمالي</span>
              <span className="text-base font-bold text-primary">{totalAllIncome.toFixed(0)} ج.م</span>
            </div>
          </div>
        </section>

        {/* Total Expenses Card (All-Time) */}
        <section>
          <div className="rounded-2xl border border-danger/25 bg-danger/[0.04] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center">
                  <TrendingDown size={18} className="text-danger" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">إجمالي المصروفات</p>
                  <p className="text-[10px] text-muted">منذ البداية · {totalExpenseCount} عملية</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-danger bg-danger/10 px-2 py-1 rounded-lg">الكل</span>
            </div>
            <p className="text-3xl font-extrabold text-danger mb-4">{totalAllExpense.toFixed(0)} <span className="text-sm text-muted font-normal">{LABELS.common.currency}</span></p>
            {totalExpenseCategoryBreakdown.length > 0 && (
              <div className="space-y-2.5">
                {totalExpenseCategoryBreakdown.slice(0, 4).map(([label, data], idx) => {
                  const pct = totalAllExpense > 0 ? (data.amount / totalAllExpense) * 100 : 0;
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 w-[90px] shrink-0">
                        <span className="text-xs font-semibold text-foreground truncate">{label}</span>
                        {idx === 0 && <span className="text-[7px] font-extrabold text-danger bg-danger/10 px-1 py-0.5 rounded">الأعلى</span>}
                      </div>
                      <div className="flex-1 h-1.5 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-danger/50 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-bold text-danger w-[55px] text-left">-{data.amount.toFixed(0)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions - Stitch style */}
        <section>
          <h3 className="text-lg font-bold mb-3 px-1 text-foreground">{LABELS.nav.add}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/income" className="relative group overflow-hidden rounded-xl bg-primary hover:brightness-110 transition-all p-4 h-24 flex flex-col justify-center items-center shadow-lg shadow-primary/20">
              <div className="bg-black/10 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Plus size={22} className="text-black" strokeWidth={3} />
              </div>
              <span className="text-black font-bold text-sm">{LABELS.activity.actions.INCOME_ADD}</span>
            </Link>
            <Link href="/expense" className="relative group overflow-hidden rounded-xl bg-[#2a1818] border border-danger/30 hover:border-danger hover:bg-[#381a1a] transition-all p-4 h-24 flex flex-col justify-center items-center">
              <div className="bg-danger/10 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Minus size={22} className="text-danger" strokeWidth={3} />
              </div>
              <span className="text-danger font-bold text-sm">{LABELS.activity.actions.EXPENSE_ADD}</span>
            </Link>
          </div>
        </section>

        {/* Today's Activity - Stitch style */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-lg font-bold text-foreground">{LABELS.admin.todaySummary}</h3>
            <Link href="/transactions" className="text-xs font-semibold text-muted hover:text-foreground transition-colors flex items-center gap-0.5">
              {LABELS.common.all} <ChevronLeft size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {todayActivity.length === 0 ? (
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="text-sm text-muted">{LABELS.common.noResults}</p>
              </div>
            ) : (
              todayActivity.map((item) => (
                <div key={item.id} className="flex items-center p-3 rounded-xl bg-card border border-border shadow-sm">
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ml-3 overflow-hidden ${item.type === 'expense' ? 'bg-danger/10' : ''}`}
                    style={item.type === 'income' ? { backgroundColor: companies.find((c) => c.name === item.company)?.color || COMPANY_BG[item.company || ''] || '#16a34a' } : {}}>
                    {item.type === 'income' ? (
                      companies.find(c => c.name === item.company)?.logo ? (
                        <img src={companies.find(c => c.name === item.company)?.logo!} alt={item.company} className="w-full h-full object-contain bg-white p-1 rounded-full" />
                      ) : (
                        <span className={`text-[10px] font-bold ${COMPANY_TEXT[item.company || ''] || 'text-white'}`}>
                          {companies.find((c) => c.name === item.company)?.nameAr || item.company}
                        </span>
                      )
                    ) : (
                      <span className="text-sm">{getCategoryIcon(item.category || 'other')}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.type === 'income' ? item.company : getCategoryLabel(item.category || 'other', item.customCategory || undefined)}
                    </p>
                    {item.notes && <p className="text-xs text-muted truncate max-w-[180px]">{item.notes}</p>}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${item.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                      {item.type === 'income' ? '+' : '-'} {item.amount.toFixed(0)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Monthly Goal Progress */}
        {monthGoal && (
          <section className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${monthIncomeTotal >= monthGoal ? 'bg-primary/10' : 'bg-primary/10'}`}>
                  {monthIncomeTotal >= monthGoal ? <Check size={14} className="text-primary" /> : <Target size={14} className="text-primary" />}
                </div>
                <span className="text-xs font-bold text-foreground">هدف الشهر</span>
              </div>
              <Link href="/goals" className="text-[10px] text-primary font-semibold">تعديل</Link>
            </div>
            <div className="flex justify-between text-[10px] text-muted mb-1">
              <span>{monthIncomeTotal.toFixed(0)} / {monthGoal.toFixed(0)} ج.م</span>
              <span className={monthIncomeTotal >= monthGoal ? 'text-primary font-bold' : ''}>{Math.min((monthIncomeTotal / monthGoal) * 100, 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-accent rounded-full h-2.5 overflow-hidden">
              <div className={`h-2.5 rounded-full transition-all duration-700 bg-primary`} style={{ width: `${Math.min((monthIncomeTotal / monthGoal) * 100, 100)}%` }} />
            </div>
          </section>
        )}

        {/* Smart Insights */}
        <section>
          <h3 className="text-lg font-bold mb-3 px-1 text-foreground">إحصائيات ذكية</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-warning" />
                </div>
                <p className="text-[10px] text-muted">متوسط يومي</p>
              </div>
              <p className="text-xl font-extrabold text-foreground">{dailyAverage.toFixed(0)}</p>
              <p className="text-[10px] text-muted">ج.م / يوم</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target size={14} className="text-primary" />
                </div>
                <p className="text-[10px] text-muted">توقع نهاية الشهر</p>
              </div>
              <p className="text-xl font-extrabold text-primary">{projectedMonthEnd.toFixed(0)}</p>
              <p className="text-[10px] text-muted">ج.م متوقع</p>
            </div>
          </div>
        </section>

        {/* Expense Alert */}
        {monthExpenseTotal > monthIncomeTotal * 0.7 && monthIncomeTotal > 0 && (
          <section className="bg-warning/10 border border-warning/20 rounded-2xl p-4">
            <p className="text-sm font-bold text-warning mb-1">⚠️ تنبيه المصروفات</p>
            <p className="text-xs text-muted">المصروفات تجاوزت 70% من الدخل هذا الشهر. حاول تقليل المصاريف لزيادة صافي الربح.</p>
          </section>
        )}
      </main>
    </div>
  );
}
