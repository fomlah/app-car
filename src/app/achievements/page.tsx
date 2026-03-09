'use client';

import { useMemo } from 'react';
import { useIncomes, useExpenses } from '@/lib/useData';
import { ArrowRight, Flame, Settings, Star, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LABELS } from '@/constants/labels';

export default function AchievementsPage() {
  const router = useRouter();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();

  const totalDays = new Set(incomes.map((i) => i.date)).size;

  const achievements = useMemo(() => {
    const list: Array<{
      icon: LucideIcon;
      title: string;
      desc: string;
      earned: boolean;
      progress: number;
      medal: 'gold' | 'silver' | 'locked';
    }> = [];

    list.push({
      icon: Trophy,
      title: LABELS.achievements.ironDriver,
      desc: totalDays >= 100 ? LABELS.achievements.ironDriverDone : `${totalDays} / 100 ${LABELS.common.days}`,
      earned: totalDays >= 100,
      progress: totalDays / 100,
      medal: 'silver',
    });

    const uniqueDays = new Set(incomes.map((i) => i.date));
    list.push({
      icon: Flame,
      title: LABELS.achievements.nightOwl,
      desc: uniqueDays.size >= 50 ? LABELS.achievements.nightOwlDone : `${uniqueDays.size} / 50 ${LABELS.common.days}`,
      earned: uniqueDays.size >= 50,
      progress: uniqueDays.size / 50,
      medal: 'gold',
    });

    const totalIncomes = incomes.length;
    list.push({
      icon: Star,
      title: LABELS.common.goalAchiever,
      desc: totalIncomes >= 200 ? LABELS.achievements.achievedGoalDone : `${Math.min(Math.floor(totalIncomes / 67), 3)} / 3 ${LABELS.common.achievedGoals}`,
      earned: totalIncomes >= 200,
      progress: Math.min(totalIncomes / 200, 1),
      medal: 'locked',
    });

    list.push({
      icon: Settings,
      title: LABELS.achievements.maintenanceKing,
      desc: expenses.length > 0 ? LABELS.achievements.maintenanceDone : LABELS.achievements.maintenancePrompt,
      earned: expenses.length > 0,
      progress: expenses.length > 0 ? 1 : 0,
      medal: 'gold',
    });

    return list;
  }, [totalDays, incomes, expenses]);

  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-foreground"
        >
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center pl-2">{LABELS.achievements.title}</h1>
        <div className="w-10" />
      </header>

      <main className="max-w-[480px] mx-auto p-4 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-extrabold text-foreground">{LABELS.achievements.badgesTitle}</p>
          <p className="text-xs text-muted mt-1">{earnedCount} / {achievements.length} {LABELS.achievements.completed}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className={`flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border transition-all ${
                  !a.earned ? 'opacity-40 grayscale' : 'hover:bg-accent/30'
                }`}
              >
                <div className="mb-3 w-16 h-16 flex items-center justify-center rounded-full bg-accent">
                  <Icon
                    size={28}
                    className={
                      a.earned
                        ? a.medal === 'gold'
                          ? 'text-yellow-500'
                          : 'text-gray-400'
                        : 'text-muted'
                    }
                  />
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
      </main>
    </div>
  );
}
