'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useExpenses, useIncomes } from '@/lib/useData';
import { ArrowRight, Settings, CheckCircle, Fuel, Wrench, Wallet, Shield, SlidersHorizontal, Loader2, X } from 'lucide-react';
import { startOfMonth, endOfMonth, format, startOfWeek, endOfWeek } from 'date-fns';

interface AlertSettingDB {
  id: number;
  alertType: string;
  nameAr: string;
  enabled: boolean;
  limitAmount: number | null;
}

const ALERT_ICONS: Record<string, React.ElementType> = { fuel: Fuel, maintenance: Wrench, daily: Wallet, insurance: Shield };
const ALERT_COLORS: Record<string, { icon: string; border: string }> = {
  fuel: { icon: 'text-amber-500', border: 'border-amber-500/20 hover:border-amber-500/40' },
  maintenance: { icon: 'text-red-500', border: 'border-red-500/20 hover:border-red-500/40' },
  daily: { icon: 'text-foreground/70', border: 'border-border hover:border-border' },
  insurance: { icon: 'text-foreground/70', border: 'border-border hover:border-border' },
};

export default function AlertsPage() {
  const router = useRouter();
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const [alertSettings, setAlertSettings] = useState<AlertSettingDB[]>([]);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [showLimits, setShowLimits] = useState(false);
  const [editLimits, setEditLimits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const today = new Date();
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');
  const weekStart = format(startOfWeek(today), 'yyyy-MM-dd');
  const weekEnd = format(endOfWeek(today), 'yyyy-MM-dd');

  const monthExpenses = useMemo(() => expenses.filter((e) => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);
  const weekIncome = useMemo(() => incomes.filter((i) => i.date >= weekStart && i.date <= weekEnd).reduce((s, i) => s + i.amount, 0), [incomes, weekStart, weekEnd]);

  const fuelExpenses = useMemo(() => expenses.filter((e) => e.category === 'fuel' && e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);
  const maintenanceExpenses = useMemo(() => expenses.filter((e) => e.category === 'maintenance' && e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);

  const loadAlertSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/alert-settings');
      if (res.ok) {
        const data = await res.json();
        setAlertSettings(data);
      }
    } catch (e) { console.error(e); }
    finally { setLoadingSettings(false); }
  }, []);

  useEffect(() => { loadAlertSettings(); }, [loadAlertSettings]);

  // Compute total budget limit from all alert limits
  const totalBudgetLimit = useMemo(() => {
    const total = alertSettings.reduce((s, a) => s + (a.limitAmount || 0), 0);
    return total > 0 ? total : 2000;
  }, [alertSettings]);

  const budgetPct = Math.min((monthExpenses / totalBudgetLimit) * 100, 100);
  const projProfit = weekIncome - (monthExpenses / 4);

  const getUsedAmount = (alertType: string) => {
    if (alertType === 'fuel') return fuelExpenses;
    if (alertType === 'maintenance') return maintenanceExpenses;
    if (alertType === 'daily') return monthExpenses;
    return 0;
  };

  const getLevel = (alertType: string, limit: number | null): 'amber' | 'red' | 'normal' | 'inactive' => {
    const used = getUsedAmount(alertType);
    if (!limit || limit === 0) return 'inactive';
    const pct = used / limit;
    if (pct >= 0.9) return 'red';
    if (pct >= 0.6) return 'amber';
    return 'normal';
  };

  const getLevelLabel = (level: string) => {
    if (level === 'red') return 'تحذير عاجل';
    if (level === 'amber') return 'تحذير متوسط';
    if (level === 'inactive') return 'غير محدد';
    return 'عادي';
  };

  const toggleAlert = async (alertType: string, currentEnabled: boolean) => {
    setAlertSettings((prev) => prev.map((a) => a.alertType === alertType ? { ...a, enabled: !currentEnabled } : a));
    await fetch('/api/alert-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertType, enabled: !currentEnabled }),
    });
  };

  const handleSaveLimits = async () => {
    setSaving(true);
    try {
      for (const [alertType, value] of Object.entries(editLimits)) {
        await fetch('/api/alert-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alertType, limitAmount: value || null }),
        });
      }
      await loadAlertSettings();
      setShowLimits(false);
      setEditLimits({});
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-card/95 backdrop-blur-md border-b border-border">
        <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-accent transition-colors text-foreground">
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold tracking-tight flex-1 text-center text-foreground">تنبيهات المصروفات الذكية</h1>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-accent transition-colors text-foreground">
          <Settings size={20} />
        </button>
      </header>

      <main className="flex-1 w-full max-w-[480px] mx-auto p-4 pb-24 flex flex-col gap-6">
        {/* Health Status Card */}
        <section className="relative overflow-hidden rounded-2xl bg-card shadow-lg border border-border">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative z-20 p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-1">حالة الميزانية</h2>
                <p className="text-2xl font-bold text-foreground">{budgetPct < 50 ? 'مستقرة' : budgetPct < 80 ? 'متوسطة' : 'مرتفعة'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted">الميزانية الشهرية</span>
                <span className="text-foreground">{budgetPct.toFixed(0)}%</span>
              </div>
              <div className="h-3 w-full bg-accent rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${budgetPct >= 80 ? 'bg-red-500' : budgetPct >= 50 ? 'bg-amber-500' : 'bg-primary'}`} style={{ width: `${budgetPct}%` }} />
              </div>
              <p className="text-xs text-muted text-left">{monthExpenses.toFixed(0)} ج.م من {totalBudgetLimit.toFixed(0)} ج.م</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-accent p-3 rounded-lg border border-border">
                <p className="text-xs text-muted mb-1">الدخل (أسبوعي)</p>
                <p className="text-lg font-bold text-foreground">{weekIncome.toFixed(0)} ج.م</p>
              </div>
              <div className="bg-accent p-3 rounded-lg border border-border">
                <p className="text-xs text-muted mb-1">ربح متوقع</p>
                <p className="text-lg font-bold text-primary">+{projProfit > 0 ? projProfit.toFixed(0) : 0} ج.م</p>
              </div>
            </div>
          </div>
        </section>

        {/* Active Alerts Header */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-xl font-bold text-foreground">التنبيهات النشطة</h2>
          <span className="text-xs text-muted">{alertSettings.filter((a) => a.enabled).length} نشط</span>
        </div>

        {/* Alerts List */}
        {loadingSettings ? (
          <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={28} /></div>
        ) : (
          <div className="flex flex-col gap-4">
            {alertSettings.map((alert) => {
              const Icon = ALERT_ICONS[alert.alertType] || Wallet;
              const colors = ALERT_COLORS[alert.alertType] || ALERT_COLORS.daily;
              const used = getUsedAmount(alert.alertType);
              const level = getLevel(alert.alertType, alert.limitAmount);
              return (
                <div
                  key={alert.id}
                  className={`group bg-card rounded-xl p-4 shadow-sm border ${colors.border} transition-all ${
                    level === 'inactive' || !alert.enabled ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      level === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                      level === 'red' ? 'bg-red-500/10 text-red-500' :
                      'bg-accent text-foreground/70'
                    }`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">{alert.nameAr}</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={alert.enabled} onChange={() => toggleAlert(alert.alertType, alert.enabled)} className="sr-only peer" />
                          <div className="w-9 h-5 bg-accent rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      <p className={`text-xs font-medium mb-3 ${
                        level === 'amber' ? 'text-amber-400' :
                        level === 'red' ? 'text-red-400' :
                        'text-muted'
                      }`}>{getLevelLabel(level)}</p>

                      {alert.limitAmount && alert.limitAmount > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-muted">
                            <span>{used.toFixed(0)} ج.م مستخدم</span>
                            <span>{alert.limitAmount.toFixed(0)} ج.م الحد</span>
                          </div>
                          <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                level === 'amber' ? 'bg-amber-500' :
                                level === 'red' ? 'bg-red-500' :
                                'bg-primary'
                              }`}
                              style={{ width: `${Math.min((used / alert.limitAmount) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Set Limits Modal */}
      {showLimits && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-card w-full max-w-[480px] rounded-t-3xl p-6 space-y-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">تعيين الحدود</h3>
              <button onClick={() => setShowLimits(false)} className="text-muted hover:text-foreground"><X size={20} /></button>
            </div>
            {alertSettings.map((a) => (
              <div key={a.id}>
                <label className="block text-xs text-muted mb-1">{a.nameAr} (ج.م)</label>
                <input
                  type="number"
                  placeholder={a.limitAmount?.toString() || '0'}
                  value={editLimits[a.alertType] ?? (a.limitAmount?.toString() || '')}
                  onChange={(e) => setEditLimits((prev) => ({ ...prev, [a.alertType]: e.target.value }))}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  dir="ltr"
                />
              </div>
            ))}
            <button onClick={handleSaveLimits} disabled={saving}
              className={`w-full py-3.5 rounded-xl font-bold transition-all ${!saving ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
              {saving ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'حفظ الحدود'}
            </button>
          </div>
        </div>
      )}

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-xl border-t border-border z-50">
        <div className="max-w-[480px] mx-auto">
          <button onClick={() => setShowLimits(true)} className="w-full bg-primary hover:brightness-110 text-[#112117] font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(32,223,108,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base">
            <SlidersHorizontal size={20} />
            تعيين الميزانيات والحدود
          </button>
        </div>
      </div>
    </div>
  );
}
