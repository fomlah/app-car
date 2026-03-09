'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIncomes, useExpenses, useCompanies } from '@/lib/useData';
import { ArrowRight, TrendingUp, Calendar, Wrench, BarChart3, Loader2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ar } from 'date-fns/locale';
import Link from 'next/link';

const COMPANY_BG: Record<string, string> = { Uber: '#000000', Didi: '#FF7D00', InDrive: '#B2E637' };
const COMPANY_TEXT: Record<string, string> = { Uber: 'text-white', Didi: 'text-white', InDrive: 'text-black' };

export default function PredictionsPage() {
  const router = useRouter();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();
  const { companies } = useCompanies();
  const today = new Date();
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');

  const daysInMonth = today.getDate();
  const totalDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = totalDaysInMonth - daysInMonth;

  const [targetDays, setTargetDays] = useState(daysRemaining);
  const [goalFromDB, setGoalFromDB] = useState<number>(0);
  const [goalLoading, setGoalLoading] = useState(true);

  useEffect(() => {
    const currentMonth = format(today, 'yyyy-MM');
    fetch('/api/goals')
      .then((r) => r.json())
      .then((goals: { month: string; targetAmount: number }[]) => {
        const current = goals.find((g) => g.month === currentMonth);
        if (current) setGoalFromDB(current.targetAmount);
      })
      .catch(console.error)
      .finally(() => setGoalLoading(false));
  }, []);

  const monthIncome = useMemo(() => incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0), [incomes, monthStart, monthEnd]);
  const monthExpense = useMemo(() => expenses.filter((e) => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);

  const dailyAvgIncome = daysInMonth > 0 ? monthIncome / daysInMonth : 0;
  const dailyAvgExpense = daysInMonth > 0 ? monthExpense / daysInMonth : 0;

  const projectedIncome = monthIncome + (dailyAvgIncome * targetDays);
  const projectedExpense = monthExpense + (dailyAvgExpense * targetDays);
  const projectedNet = projectedIncome - projectedExpense;

  const monthGoal = goalFromDB > 0 ? goalFromDB : projectedNet > 0 ? projectedNet : 1;
  const goalPct = Math.min((projectedNet / monthGoal) * 100, 100);

  const circumference = 2 * Math.PI * 42;
  const progressPct = Math.min(goalPct / 100, 1);
  const strokeDashoffset = circumference * (1 - progressPct);

  const companyBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).forEach((i) => {
      if (!map[i.company]) map[i.company] = 0;
      map[i.company] += i.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [incomes, monthStart, monthEnd]);

  const maxCompanyAmount = companyBreakdown.length > 0 ? companyBreakdown[0][1] : 1;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6 pb-2 sticky top-0 z-20 bg-card/90 backdrop-blur-md border-b border-border">
        <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-accent transition-colors text-foreground">
          <ArrowRight size={22} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-foreground">توقعات الأرباح</h2>
        <div className="w-10" />
      </div>

      <main className="flex-1 flex flex-col px-5 pb-8 space-y-8">
        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center pt-4 relative">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--accent)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="transparent"
                stroke="var(--primary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ filter: 'drop-shadow(0 0 8px rgba(32,223,108,0.3))', transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
              <span className="text-sm font-medium text-muted mb-1 uppercase tracking-wide">صافي متوقع</span>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground mb-1">{projectedNet.toFixed(0)}</h1>
              <div className="flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <TrendingUp size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary">ج.م</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs font-medium text-muted mt-2">
            توقع بناءً على {daysInMonth} يوم من البيانات
          </p>
        </div>

        {/* Target Working Days Slider */}
        <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">أيام العمل المستهدفة</h3>
              <p className="text-xs text-muted mt-0.5">عدّل لرؤية التأثير على الربح</p>
            </div>
            <div className="text-left flex flex-col items-end">
              <span className="text-2xl font-bold text-primary leading-none">{targetDays}</span>
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">يوم متبقي</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={totalDaysInMonth}
            value={targetDays}
            onChange={(e) => setTargetDays(parseInt(e.target.value))}
            className="w-full h-2 bg-accent rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-wider px-1 mt-2">
            <span>راحة</span>
            <span>عمل مكثف</span>
          </div>
        </div>

        {/* Prediction Insights Grid */}
        <div>
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3 pr-1">رؤى التوقعات</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-2xl border border-border flex flex-col justify-between h-32 relative overflow-hidden group">
              <div className="absolute left-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar size={36} className="text-blue-500" />
              </div>
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Calendar size={16} />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">متوسط الدخل اليومي</p>
                <p className="text-xl font-bold mt-0.5 text-foreground">{dailyAvgIncome.toFixed(0)} ج.م</p>
              </div>
            </div>

            <div className="bg-card p-4 rounded-2xl border border-border flex flex-col justify-between h-32 relative overflow-hidden group">
              <div className="absolute left-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wrench size={36} className="text-red-500" />
              </div>
              <div className="flex justify-between items-start">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <Wrench size={16} />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">مصروفات متوقعة</p>
                <p className="text-xl font-bold mt-0.5 text-foreground">{projectedExpense.toFixed(0)} ج.م</p>
                <p className="text-[10px] text-muted mt-1">وقود وصيانة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-gradient-to-l from-[#1c2e24] to-[#162e21] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">حالة الهدف</span>
                <span className="text-2xl font-bold text-white">{goalFromDB > 0 ? monthGoal.toFixed(0) : '—'} ج.م</span>
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-400">الحالي</span>
                <p className="text-sm font-semibold text-white">{projectedNet.toFixed(0)} ج.م</p>
              </div>
            </div>
            <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-primary flex items-center justify-end px-2 transition-all" style={{ width: `${goalPct}%` }}>
                <span className="text-[9px] font-black text-black">{goalPct.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              أنت على الطريق لتحقيق {goalPct.toFixed(0)}% من هدفك الشهري
            </p>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="pb-6">
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3 pr-1">توزيع المنصات</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {companies.map((companyObj) => {
              const company = companyObj.name;
              const data = companyBreakdown.find(([c]) => c === company);
              const amount = data ? data[1] : 0;
              const pct = monthIncome > 0 ? (amount / monthIncome) * 100 : 0;
              const bgColor = companyObj.color || COMPANY_BG[company] || '#16a34a';
              return (
                <div key={companyObj.id} className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg overflow-hidden"
                    style={{ backgroundColor: bgColor }}
                  >
                    {companyObj.logo ? (
                      <img src={companyObj.logo} alt={companyObj.nameAr || company} className="w-full h-full object-contain bg-white p-0.5" />
                    ) : (
                      <span className={`font-bold text-xs text-white`}>
                        {companyObj.nameAr?.[0] || company[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-sm text-foreground truncate">{companyObj.nameAr || company}</span>
                      <span className="font-bold text-sm text-foreground">{amount.toFixed(0)} ج.م</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: bgColor === '#000000' ? 'var(--foreground)' : bgColor }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4 z-20">
        <Link href="/reports" className="w-full py-4 bg-primary active:brightness-110 text-[#112117] font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(32,223,108,0.2)] flex items-center justify-center gap-2">
          <BarChart3 size={18} />
          عرض التقرير المفصل
        </Link>
      </div>
    </div>
  );
}
