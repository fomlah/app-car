'use client';

import { useMemo } from 'react';
import { useIncomes, useExpenses } from '@/lib/useData';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ArrowRight, BarChart3, CalendarDays, TrendingUp, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForecastPage() {
  const router = useRouter();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');

  const monthIncomeTotal = useMemo(
    () => incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0),
    [incomes, monthStart, monthEnd]
  );

  const monthExpenseTotal = useMemo(
    () => expenses.filter((e) => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0),
    [expenses, monthStart, monthEnd]
  );

  const monthProfit = monthIncomeTotal - monthExpenseTotal;

  const daysPassed = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(daysInMonth - daysPassed, 0);

  const dailyAvgIncome = daysPassed > 0 ? monthIncomeTotal / daysPassed : 0;
  const dailyAvgExpense = daysPassed > 0 ? monthExpenseTotal / daysPassed : 0;

  const projectedIncome = monthIncomeTotal + dailyAvgIncome * daysRemaining;
  const projectedExpense = monthExpenseTotal + dailyAvgExpense * daysRemaining;
  const projectedProfit = projectedIncome - projectedExpense;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-foreground"
        >
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center pl-2">التوقعات</h1>
        <div className="w-10" />
      </header>

      <main className="max-w-[480px] mx-auto p-4 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs text-muted font-medium">
            <CalendarDays size={14} />
            <span>{format(startOfMonth(today), 'd MMMM', { locale: ar })} - {format(today, 'd MMMM', { locale: ar })}</span>
            <span className="mx-1">•</span>
            <span dir="ltr">{todayStr}</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="bg-accent border border-border rounded-xl p-3 text-center">
              <TrendingUp size={16} className="text-primary mx-auto mb-1" />
              <p className="text-[10px] text-muted">دخل الشهر</p>
              <p className="text-sm font-extrabold text-primary">{monthIncomeTotal.toFixed(0)}</p>
            </div>
            <div className="bg-accent border border-border rounded-xl p-3 text-center">
              <BarChart3 size={16} className="text-danger mx-auto mb-1" />
              <p className="text-[10px] text-muted">مصروفات</p>
              <p className="text-sm font-extrabold text-danger">{monthExpenseTotal.toFixed(0)}</p>
            </div>
            <div className="bg-accent border border-border rounded-xl p-3 text-center">
              <Wallet size={16} className="text-foreground mx-auto mb-1" />
              <p className="text-[10px] text-muted">صافي</p>
              <p className={`text-sm font-extrabold ${monthProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{monthProfit.toFixed(0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1c2e24] border border-white/5 rounded-2xl p-5 shadow-lg">
          <p className="text-sm font-bold text-white">توقع نهاية الشهر</p>
          <p className="text-xs text-gray-400 mt-1">بناءً على المتوسط اليومي حتى الآن</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-black/25 border border-white/5 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 font-bold">دخل متوقع</p>
              <p className="text-xl font-extrabold text-primary mt-1">{projectedIncome.toFixed(0)} <span className="text-xs text-gray-400">ج.م</span></p>
              <p className="text-[10px] text-gray-400 mt-1">متوسط يومي: {dailyAvgIncome.toFixed(0)}</p>
            </div>
            <div className="bg-black/25 border border-white/5 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 font-bold">مصروف متوقع</p>
              <p className="text-xl font-extrabold text-danger mt-1">{projectedExpense.toFixed(0)} <span className="text-xs text-gray-400">ج.م</span></p>
              <p className="text-[10px] text-gray-400 mt-1">متوسط يومي: {dailyAvgExpense.toFixed(0)}</p>
            </div>
          </div>

          <div className="mt-4 bg-black/20 border border-white/5 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 font-bold">صافي ربح متوقع</p>
            <p className={`text-2xl font-extrabold mt-1 ${projectedProfit >= 0 ? 'text-white' : 'text-danger'}`}>{projectedProfit.toFixed(0)} <span className="text-xs text-gray-400">ج.م</span></p>
            <p className="text-[10px] text-gray-400 mt-1">أيام متبقية: {daysRemaining}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
