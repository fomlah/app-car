'use client';

import { useState, useMemo } from 'react';
import { getCategoryLabel, getCategoryIcon } from '@/lib/db';
import { useIncomes, useExpenses, useCompanies } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import { format, isLeapYear, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { TrendingUp, TrendingDown, Wallet, ChevronLeft, ChevronRight, Car, Calendar, DollarSign, BarChart3, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Period = 'daily' | 'monthly' | 'yearly';
const COMPANY_BG: Record<string, string> = { Uber: '#000000', Didi: '#ff7d00', InDrive: '#B2F75B' };
const COMPANY_CHART_COLORS: Record<string, string> = {
  Uber: 'rgba(0,0,0,0.8)',
  Didi: 'rgba(255,125,0,0.8)',
  InDrive: 'rgba(180,240,146,0.8)',
};

type RecentTx =
  | { id: string; type: 'income'; label: string; amount: number; date: string; company: string }
  | { id: string; type: 'expense'; label: string; amount: number; date: string; catId: string };

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateStr: string): Date {
  // IMPORTANT: new Date('YYYY-MM-DD') is treated as UTC by JS and can shift the day.
  // date-fns parseISO treats it as local time.
  return parseISO(dateStr);
}

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { incomes: allIncomes } = useIncomes();
  const { expenses: allExpenses } = useExpenses();
  const { companies } = useCompanies();

  // Date navigation
  const navigateDate = (dir: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    if (period === 'daily') d.setDate(d.getDate() + (dir === 'next' ? 1 : -1));
    else if (period === 'monthly') d.setMonth(d.getMonth() + (dir === 'next' ? 1 : -1));
    else d.setFullYear(d.getFullYear() + (dir === 'next' ? 1 : -1));
    setSelectedDate(d);
  };

  const dateLabel = useMemo(() => {
    if (period === 'daily') {
      const today = fmtDate(new Date());
      const sel = fmtDate(selectedDate);
      if (sel === today) return 'اليوم';
      const y = new Date(); y.setDate(y.getDate() - 1);
      if (sel === fmtDate(y)) return 'أمس';
      return format(selectedDate, 'EEEE، d MMMM yyyy', { locale: ar });
    }
    if (period === 'monthly') return format(selectedDate, 'MMMM yyyy', { locale: ar });
    return `${selectedDate.getFullYear()}`;
  }, [period, selectedDate]);

  // Filter data by period
  const { periodIncomes, periodExpenses } = useMemo(() => {
    let startDate: string, endDate: string;
    if (period === 'daily') {
      startDate = endDate = fmtDate(selectedDate);
    } else if (period === 'monthly') {
      startDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-01`;
      const last = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      endDate = fmtDate(last);
    } else {
      startDate = `${selectedDate.getFullYear()}-01-01`;
      endDate = `${selectedDate.getFullYear()}-12-31`;
    }
    return {
      periodIncomes: allIncomes.filter(i => i.date >= startDate && i.date <= endDate),
      periodExpenses: allExpenses.filter(e => e.date >= startDate && e.date <= endDate),
    };
  }, [allIncomes, allExpenses, period, selectedDate]);

  const totalIncome = periodIncomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = periodExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitPct = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  // Company breakdown
  const companyData = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    periodIncomes.forEach(i => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [periodIncomes]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const map: Record<string, { amount: number; count: number; catId: string }> = {};
    periodExpenses.forEach(e => {
      const label = getCategoryLabel(e.category, e.customCategory || undefined);
      if (!map[label]) map[label] = { amount: 0, count: 0, catId: e.category };
      map[label].amount += e.amount;
      map[label].count += 1;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [periodExpenses]);

  // Best company
  const bestCompany = companyData.length > 0 ? companyData[0][0] : '';

  // Stats
  const stats = useMemo(() => {
    const expenseCount = periodExpenses.length;
    let days = 1;
    if (period === 'monthly') {
      const today = new Date();
      if (selectedDate.getFullYear() === today.getFullYear() && selectedDate.getMonth() === today.getMonth()) {
        days = today.getDate();
      } else {
        days = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
      }
    } else if (period === 'yearly') {
      const today = new Date();
      if (selectedDate.getFullYear() === today.getFullYear()) {
        const start = new Date(today.getFullYear(), 0, 1);
        days = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      } else {
        const y = selectedDate.getFullYear();
        days = isLeapYear(new Date(y, 0, 1)) ? 366 : 365;
      }
    }
    const avgDailyIncome = days > 0 ? totalIncome / days : 0;
    const avgDailyExpense = days > 0 ? totalExpense / days : 0;
    return { expenseCount, avgDailyIncome, avgDailyExpense, days };
  }, [periodIncomes, periodExpenses, totalIncome, totalExpense, period, selectedDate]);

  // Chart data
  const chartData = useMemo(() => {
    const bars: { label: string; income: number; expense: number }[] = [];
    if (period === 'daily') {
      // Last 7 days from selected date
      for (let i = 6; i >= 0; i--) {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - i);
        const ds = fmtDate(d);
        const inc = allIncomes.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
        const exp = allExpenses.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: format(d, 'd', { locale: ar }), income: inc, expense: exp });
      }
    } else if (period === 'monthly') {
      // 12 months of selected year
      for (let m = 0; m < 12; m++) {
        const start = `${selectedDate.getFullYear()}-${String(m + 1).padStart(2, '0')}-01`;
        const last = new Date(selectedDate.getFullYear(), m + 1, 0);
        const end = fmtDate(last);
        const inc = allIncomes.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        const exp = allExpenses.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: format(new Date(selectedDate.getFullYear(), m, 1), 'MMM', { locale: ar }), income: inc, expense: exp });
      }
    } else {
      // Last 5 years
      for (let i = 4; i >= 0; i--) {
        const y = selectedDate.getFullYear() - i;
        const start = `${y}-01-01`;
        const end = `${y}-12-31`;
        const inc = allIncomes.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        const exp = allExpenses.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: y.toString(), income: inc, expense: exp });
      }
    }
    return bars;
  }, [allIncomes, allExpenses, period, selectedDate]);

  // Company doughnut chart
  const companyDoughnutData = useMemo(() => {
    const activeComps = companies.filter(c => {
      const d = companyData.find(([name]) => name === c.name);
      return d && d[1].amount > 0;
    });
    return {
      labels: activeComps.map(c => c.nameAr || c.name),
      datasets: [{
        data: activeComps.map(c => {
          const d = companyData.find(([name]) => name === c.name);
          return d ? d[1].amount : 0;
        }),
        backgroundColor: activeComps.map(c => c.color || COMPANY_CHART_COLORS[c.name] || 'rgba(99,102,241,0.8)'),
        borderWidth: 0,
      }],
    };
  }, [companyData, companies]);

  // Expense doughnut chart
  const expenseDoughnutData = useMemo(() => {
    const catColors = ['rgba(239,68,68,0.8)', 'rgba(249,115,22,0.8)', 'rgba(234,179,8,0.8)', 'rgba(59,130,246,0.8)', 'rgba(168,85,247,0.8)', 'rgba(20,184,166,0.8)'];
    return {
      labels: categoryData.map(([label]) => label),
      datasets: [{
        data: categoryData.map(([, d]) => d.amount),
        backgroundColor: catColors.slice(0, categoryData.length),
        borderWidth: 0,
      }],
    };
  }, [categoryData]);

  // Recent transactions
  const recentTx = useMemo(() => {
    const all: RecentTx[] = [
      ...periodIncomes.map(i => ({ id: `i-${i.id}`, type: 'income' as const, label: i.company, amount: i.amount, date: i.date, company: i.company })),
      ...periodExpenses.map(e => ({ id: `e-${e.id}`, type: 'expense' as const, label: getCategoryLabel(e.category, e.customCategory || undefined), amount: e.amount, date: e.date, catId: e.category })),
    ];
    all.sort((a, b) => b.date.localeCompare(a.date));
    return all.slice(0, 8);
  }, [periodIncomes, periodExpenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { font: { size: 10 } } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { font: { size: 11 }, padding: 12 } },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center p-4 h-16">
          <h1 className="text-lg font-bold text-foreground">{LABELS.nav.reports}</h1>
        </div>
      </header>

      <div className="flex-1 px-4 space-y-4 pt-4">
        {/* Period Selector */}
        <div className="flex gap-1 bg-accent rounded-xl p-1 border border-border">
          {([
            { value: 'daily' as Period, label: 'يومي' },
            { value: 'monthly' as Period, label: 'شهري' },
            { value: 'yearly' as Period, label: 'سنوي' },
          ]).map(p => (
            <button
              key={p.value}
              onClick={() => { setPeriod(p.value); setSelectedDate(new Date()); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${period === p.value ? 'bg-primary text-black shadow-sm' : 'text-muted hover:text-foreground'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center gap-4 py-1">
          <button onClick={() => navigateDate('next')} className="p-1.5 rounded-full hover:bg-accent transition-colors">
            <ChevronRight size={18} className="text-foreground" />
          </button>
          <span className="text-sm font-bold text-foreground min-w-[150px] text-center">{dateLabel}</span>
          <button onClick={() => navigateDate('prev')} className="p-1.5 rounded-full hover:bg-accent transition-colors">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <TrendingUp size={16} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] text-muted mb-0.5">الدخل</p>
            <p className="text-sm font-bold text-primary">+{totalIncome.toFixed(0)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <TrendingDown size={16} className="text-danger mx-auto mb-1" />
            <p className="text-[10px] text-muted mb-0.5">المصروفات</p>
            <p className="text-sm font-bold text-danger">-{totalExpense.toFixed(0)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <Wallet size={16} className={`mx-auto mb-1 ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`} />
            <p className="text-[10px] text-muted mb-0.5">الصافي</p>
            <p className={`text-sm font-bold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{netProfit.toFixed(0)}</p>
          </div>
        </div>

        {/* Net Profit Card */}
        <div className={`rounded-2xl p-4 border ${netProfit >= 0 ? 'bg-primary/5 border-primary/20' : 'bg-danger/5 border-danger/20'}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted mb-1">صافي الربح</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>
                {netProfit.toFixed(0)} ج.م
              </p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${netProfit >= 0 ? 'bg-primary/10' : 'bg-danger/10'}`}>
              {netProfit >= 0 ? <TrendingUp size={14} className="text-primary" /> : <TrendingDown size={14} className="text-danger" />}
              <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{profitPct.toFixed(0)}%</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/50">
            <div className="text-center">
              <p className="text-[10px] text-muted">متوسط يومي</p>
              <p className="text-xs font-bold text-foreground">{stats.avgDailyIncome.toFixed(0)} ج.م</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted">عدد الأيام</p>
              <p className="text-xs font-bold text-foreground">{stats.days}</p>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" />
              أداء الفترة
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] text-muted">دخل</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-danger opacity-60" />
                <span className="text-[10px] text-muted">مصروفات</span>
              </div>
            </div>
          </div>
          <div className="h-48">
            <Bar
              data={{
                labels: chartData.map(b => b.label),
                datasets: [
                  { label: 'الدخل', data: chartData.map(b => b.income), backgroundColor: 'rgba(32,223,108,0.7)', borderRadius: 4 },
                  { label: 'المصروفات', data: chartData.map(b => b.expense), backgroundColor: 'rgba(239,68,68,0.5)', borderRadius: 4 },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Company Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
            <Car size={16} className="text-primary" />
            توزيع الدخل حسب المنصة
          </h3>

          {companyData.length > 0 ? (
            <>
              {/* Doughnut Chart */}
              <div className="h-40 mb-4">
                <Doughnut data={companyDoughnutData} options={doughnutOptions} />
              </div>

              {/* Company Details */}
              <div className="space-y-3">
                {companies.map(companyObj => {
                  const company = companyObj.name;
                  const d = companyData.find(([name]) => name === company);
                  const amount = d ? d[1].amount : 0;
                  if (amount === 0) return null;
                  const pct = totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
                  const bgColor = companyObj.color || COMPANY_BG[company] || '#16a34a';
                  return (
                    <div key={companyObj.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor }}>
                            {companyObj.logo ? (
                              <img src={companyObj.logo} alt={companyObj.nameAr || company} className="w-full h-full object-contain bg-white p-0.5" />
                            ) : (
                              <span className={`text-[8px] font-bold text-white`}>
                                {companyObj.nameAr?.[0] || company[0]}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-foreground">{companyObj.nameAr || company}</span>
                          {company === bestCompany && amount > 0 && (
                            <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">الأعلى</span>
                          )}
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-bold text-foreground">{amount.toFixed(0)} ج.م</span>
                        </div>
                      </div>
                      <div className="w-full bg-accent rounded-full h-1.5 mb-1">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: bgColor }} />
                      </div>
                      <p className="text-[10px] text-muted">{pct.toFixed(1)}% من الإجمالي</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted text-center py-6">لا يوجد دخل مسجل في هذه الفترة</p>
          )}
        </div>

        {/* Expense Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
            <PieChart size={16} className="text-danger" />
            توزيع المصاريف حسب الفئة
          </h3>

          {categoryData.length > 0 ? (
            <>
              {/* Doughnut Chart */}
              <div className="h-40 mb-4">
                <Doughnut data={expenseDoughnutData} options={doughnutOptions} />
              </div>

              {/* Category Details */}
              <div className="space-y-3">
                {categoryData.map(([label, data]) => {
                  const pct = totalExpense > 0 ? (data.amount / totalExpense) * 100 : 0;
                  const icon = getCategoryIcon(data.catId);
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{icon}</span>
                          <span className="text-sm font-semibold text-foreground">{label}</span>
                          {categoryData[0][0] === label && (
                            <span className="text-[9px] bg-danger/10 text-danger px-1.5 py-0.5 rounded-full font-bold">الأعلى</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-danger">-{data.amount.toFixed(0)} ج.م</span>
                      </div>
                      <div className="w-full bg-accent rounded-full h-1.5 mb-1">
                        <div className="bg-danger/70 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] text-muted">{data.count} عملية · {pct.toFixed(1)}% من الإجمالي</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted text-center py-6">لا يوجد مصاريف مسجلة في هذه الفترة</p>
          )}
        </div>

        {/* Statistics Detail */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
            <DollarSign size={16} className="text-primary" />
            إحصائيات تفصيلية
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">إجمالي الدخل</span>
              <span className="text-sm font-bold text-primary">+{totalIncome.toFixed(0)} ج.م</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">إجمالي المصروفات</span>
              <span className="text-sm font-bold text-danger">-{totalExpense.toFixed(0)} ج.م</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">صافي الربح</span>
              <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{netProfit.toFixed(0)} ج.م</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">عدد المصروفات</span>
              <span className="text-sm font-bold text-foreground">{stats.expenseCount}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-xs text-muted">متوسط الدخل اليومي</span>
              <span className="text-sm font-bold text-foreground">{stats.avgDailyIncome.toFixed(0)} ج.م</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted">متوسط المصروف اليومي</span>
              <span className="text-sm font-bold text-foreground">{stats.avgDailyExpense.toFixed(0)} ج.م</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        {recentTx.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-muted" />
              آخر العمليات
            </h3>
            <div className="space-y-2">
              {recentTx.map(tx => (
                <div key={tx.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${tx.type === 'expense' ? 'bg-danger/10' : ''}`}
                    style={tx.type === 'income' ? { backgroundColor: companies.find(c => c.name === tx.company)?.color || COMPANY_BG[tx.company || ''] || '#16a34a' } : {}}
                  >
                    {tx.type === 'income' ? (
                      companies.find(c => c.name === tx.company)?.logo ? (
                        <img src={companies.find(c => c.name === tx.company)?.logo!} alt={tx.company || ''} className="w-full h-full object-contain bg-white p-0.5" />
                      ) : (
                        <span className={`text-[8px] font-bold text-white`}>
                          {companies.find(c => c.name === tx.company)?.nameAr?.[0] || (tx.company || '')[0]}
                        </span>
                      )
                    ) : (
                      <span className="text-sm">{getCategoryIcon(tx.catId)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{tx.label}</p>
                    <p className="text-[10px] text-muted">{format(parseLocalDate(tx.date), 'd MMM yyyy', { locale: ar })}</p>
                  </div>
                  <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                    {tx.type === 'income' ? '+' : '-'}{tx.amount.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {totalIncome === 0 && totalExpense === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-sm font-semibold text-foreground mb-1">لا يوجد بيانات</p>
            <p className="text-xs text-muted">ابدأ بإضافة دخل أو مصروفات لتظهر التقارير</p>
          </div>
        )}
      </div>
    </div>
  );
}
