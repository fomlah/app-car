'use client';

import { useState, useEffect, useMemo } from 'react';
import { useIncomes } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Target, Trash2, Check, TrendingUp, Flame, Trophy, Star, Zap, Award } from 'lucide-react';

interface Goal {
  id: number;
  month: string;
  targetAmount: number;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [targetAmount, setTargetAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const { incomes } = useIncomes();
  const today = new Date();
  const currentMonth = format(today, 'yyyy-MM');

  useEffect(() => {
    fetch('/api/goals')
      .then((r) => r.json())
      .then(setGoals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getMonthIncome = (m: string) => {
    const start = m + '-01';
    const end = format(endOfMonth(new Date(m + '-01')), 'yyyy-MM-dd');
    return incomes.filter((i) => i.date >= start && i.date <= end).reduce((s, i) => s + i.amount, 0);
  };

  // Current month goal
  const currentGoal = useMemo(() => goals.find((g) => g.month === currentMonth), [goals, currentMonth]);
  const currentMonthIncome = useMemo(() => getMonthIncome(currentMonth), [incomes, currentMonth]);
  const currentPct = currentGoal ? Math.min((currentMonthIncome / currentGoal.targetAmount) * 100, 100) : 0;
  const remaining = currentGoal ? Math.max(currentGoal.targetAmount - currentMonthIncome, 0) : 0;

  // Daily target calculation
  const daysLeft = useMemo(() => {
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return lastDay - today.getDate();
  }, [today]);
  const dailyTarget = daysLeft > 0 && remaining > 0 ? remaining / daysLeft : 0;

  // Streak: count unique income days this month
  const monthStreak = useMemo(() => {
    const monthStart = currentMonth + '-01';
    const monthEnd = format(endOfMonth(new Date(monthStart)), 'yyyy-MM-dd');
    const days = new Set(incomes.filter((i) => i.date >= monthStart && i.date <= monthEnd).map((i) => i.date));
    return days.size;
  }, [incomes, currentMonth]);

  // Milestones
  const milestones = useMemo(() => {
    const list = [];
    list.push({
      icon: Flame,
      title: `${LABELS.common.streak} ${monthStreak} ${LABELS.common.days}`,
      desc: monthStreak >= 7 ? LABELS.goals.streakDone : `${monthStreak} / 7 ${LABELS.common.days} ${LABELS.common.thisMonth}`,
      color: 'text-orange-500', bg: 'bg-orange-500/10', earned: monthStreak >= 7,
    });
    const totalDays = new Set(incomes.map((i) => i.date)).size;
    list.push({
      icon: Trophy,
      title: LABELS.common.bestDriver,
      desc: totalDays >= 50 ? LABELS.goals.topDrivers : `${totalDays} يوم عمل`,
      color: 'text-yellow-500', bg: 'bg-yellow-500/10', earned: totalDays >= 50,
    });
    const goalsAchieved = goals.filter((g) => getMonthIncome(g.month) >= g.targetAmount).length;
    list.push({
      icon: Star,
      title: LABELS.common.goalAchiever,
      desc: goalsAchieved >= 3 ? LABELS.goals.goalAchieverDone : `${goalsAchieved} / 3 ${LABELS.common.achievedGoals}`,
      color: 'text-primary', bg: 'bg-primary/10', earned: goalsAchieved >= 3,
    });
    return list;
  }, [monthStreak, incomes, goals]);

  const handleSave = async () => {
    const amount = parseFloat(targetAmount);
    if (!month || !amount || amount <= 0) return;
    setSaving(true);
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month, targetAmount: amount }),
      });
      if (res.ok) {
        const goal = await res.json();
        setGoals((prev) => {
          const filtered = prev.filter((g) => g.month !== month);
          return [goal, ...filtered].sort((a, b) => b.month.localeCompare(a.month));
        });
        setTargetAmount('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(LABELS.goals.deleteConfirm)) return;
    const res = await fetch('/api/goals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // SVG circular progress
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-transparent z-10">
        <div className="w-10" />
        <h1 className="text-lg font-bold tracking-tight text-foreground">{LABELS.goals.title}</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-6 space-y-6">
        {success && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2">
            <Check size={18} className="text-primary" />
            <span className="text-sm text-primary font-medium">{LABELS.goals.savedSuccess}</span>
          </div>
        )}

        {/* Hero Goal Card - Stitch style with circular progress */}
        {currentGoal && (
          <div className="relative w-full bg-[#1c2e24] rounded-[2rem] p-8 shadow-lg border border-white/5 flex flex-col items-center">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6">
              {LABELS.goals.monthGoal} {format(today, 'MMMM', { locale: ar })}
            </h2>
            {/* Circular Progress Ring */}
            <div className="relative w-52 h-52 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#2a3d2a" strokeWidth="8" strokeLinecap="round" />
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(32,223,108,0.4))', transition: 'stroke-dashoffset 1s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-extrabold text-white tracking-tighter">
                  {currentPct.toFixed(0)}<span className="text-2xl text-primary">%</span>
                </span>
                <span className="text-gray-400 text-sm mt-1">{currentPct >= 100 ? LABELS.goals.achievedDone : LABELS.goals.achieved}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl font-bold text-white tracking-tight">
                {currentMonthIncome.toFixed(0)} <span className="text-lg font-medium text-gray-400">{LABELS.common.currency}</span>
              </div>
              <div className="text-sm font-medium text-gray-400">{LABELS.goals.target}: {currentGoal.targetAmount.toFixed(0)} {LABELS.common.currency}</div>
            </div>
          </div>
        )}

        {/* Daily Target Widget - Stitch style */}
        {currentGoal && remaining > 0 && (
          <div className="w-full bg-gradient-to-l from-[#162216] to-[#1b2a1b] rounded-xl p-5 border border-primary/20 flex flex-col gap-3 relative overflow-hidden group">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
            <div className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Zap size={20} />
              </div>
              <h3 className="text-white font-bold text-lg">{LABELS.goals.dailyTarget}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed z-10">
              {LABELS.goals.dailyTargetDesc} <span className="text-primary font-bold text-base">{dailyTarget.toFixed(0)} {LABELS.common.currency}</span> {LABELS.goals.dailyTargetSuffix}
            </p>
            <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(currentPct, 100)}%`, boxShadow: '0 0 8px var(--primary)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>{LABELS.goals.remainingDays} {daysLeft} {LABELS.common.days}</span>
              <span>{LABELS.goals.remainingDays} {remaining.toFixed(0)} {LABELS.common.currency}</span>
            </div>
          </div>
        )}

        {/* Milestones - Stitch style */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-foreground">{LABELS.goals.achievements}</h2>
            <span className="text-xs font-bold text-primary">{milestones.filter((m) => m.earned).length} / {milestones.length}</span>
          </div>
          <div className="space-y-3">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl bg-card border border-border ${!m.earned ? 'opacity-40 grayscale' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${m.bg}`}>
                    <Icon size={22} className={m.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{m.title}</p>
                    <p className="text-xs text-muted">{m.desc}</p>
                  </div>
                  {m.earned && <span className="text-primary text-lg font-bold">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Goal */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-bold text-foreground">{LABELS.goals.addOrEditGoal}</h2>
          <div>
            <label className="block text-xs text-muted mb-1.5">{LABELS.goals.month}</label>
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-accent border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">{LABELS.goals.targetAmountLabel}</label>
            <input type="number" placeholder={LABELS.goals.targetAmountPlaceholder} value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full bg-accent border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-center text-lg font-bold" min="0" />
          </div>
          <button onClick={handleSave} disabled={saving || !targetAmount}
            className={`w-full py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] ${
              !saving && targetAmount ? 'bg-primary text-black hover:brightness-110 shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'
            }`}>
            {saving ? LABELS.goals.saving : LABELS.goals.saveGoal}
          </button>
        </div>

        {/* Goals List */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-foreground">{LABELS.goals.allGoals}</h2>
          {loading ? (
            <div className="text-center py-8"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : goals.length === 0 ? (
            <div className="text-center py-8">
              <Target size={32} className="text-muted mx-auto mb-2 opacity-30" />
              <p className="text-sm text-muted">{LABELS.goals.noGoalsYet}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map((g) => {
                const achieved = getMonthIncome(g.month);
                const pct = Math.min((achieved / g.targetAmount) * 100, 100);
                const isComplete = pct >= 100;
                const monthDate = new Date(g.month + '-01');
                return (
                  <div key={g.id} className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isComplete ? 'bg-primary/10' : 'bg-primary/10'}`}>
                          {isComplete ? <Check size={14} className="text-primary" /> : <Target size={14} className="text-primary" />}
                        </div>
                        <span className="text-sm font-bold text-foreground">{format(monthDate, 'MMMM yyyy', { locale: ar })}</span>
                      </div>
                      <button onClick={() => handleDelete(g.id)} className="text-muted hover:text-danger transition-colors"><Trash2 size={15} /></button>
                    </div>
                    <div className="flex justify-between text-xs text-muted mb-1.5">
                      <span>{LABELS.goals.achieved}: {achieved.toFixed(0)} {LABELS.common.currency}</span>
                      <span>{LABELS.goals.target}: {g.targetAmount.toFixed(0)} {LABELS.common.currency}</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-3 overflow-hidden">
                      <div className={`h-3 rounded-full transition-all duration-700 bg-primary`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className={`text-xs font-bold mt-1.5 text-primary`}>{pct.toFixed(1)}%{isComplete ? ` 🎉 ${LABELS.goals.goalAchieved}` : ''}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
