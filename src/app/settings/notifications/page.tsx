'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sun, TrendingUp, TimerOff, Moon, Send, Loader2, Check } from 'lucide-react';

interface NotifSettingDB {
  id: number;
  settingType: string;
  enabled: boolean;
  timeValue: string | null;
}

const SETTING_META: Record<string, { nameAr: string; descriptionAr: string; icon: React.ElementType; iconColor: string; iconBg: string; label: string }> = {
  morning: { nameAr: 'تحفيز الصباح', descriptionAr: 'تذكير بالهدف اليومي عند بدء العمل', icon: Sun, iconColor: 'text-orange-400', iconBg: 'bg-orange-400/10', label: 'وقت التنبيه' },
  progress: { nameAr: 'تحديث التقدم', descriptionAr: 'تنبيه عند الوصول لنسبة من الهدف', icon: TrendingUp, iconColor: 'text-primary', iconBg: 'bg-primary/10', label: 'نسبة الإنجاز' },
  inactivity: { nameAr: 'تنبيه الخمول', descriptionAr: 'تذكير إذا لم يتم تسجيل دخل لفترة', icon: TimerOff, iconColor: 'text-red-400', iconBg: 'bg-red-400/10', label: 'مدة الخمول (ساعات)' },
  evening: { nameAr: 'ملخص المساء', descriptionAr: 'تقرير الأرباح النهائي لليوم', icon: Moon, iconColor: 'text-blue-400', iconBg: 'bg-blue-400/10', label: 'وقت التنبيه' },
};

const formatTimeDisplay = (type: string, value: string | null) => {
  if (!value) return '—';
  if (type === 'morning') return value;
  if (type === 'evening') return value;
  if (type === 'progress') return `${value}%`;
  if (type === 'inactivity') return `${value} ساعات`;
  return value;
};

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotifSettingDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [testSent, setTestSent] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/notification-settings');
      if (res.ok) setSettings(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadSettings(); }, [loadSettings]);

  const toggleSetting = async (settingType: string, currentEnabled: boolean) => {
    setSettings((prev) => prev.map((s) => s.settingType === settingType ? { ...s, enabled: !currentEnabled } : s));
    await fetch('/api/notification-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settingType, enabled: !currentEnabled }),
    });
  };

  const updateTimeValue = async (settingType: string, timeValue: string) => {
    setSettings((prev) => prev.map((s) => s.settingType === settingType ? { ...s, timeValue } : s));
    await fetch('/api/notification-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settingType, timeValue }),
    });
  };

  const handleTestAlert = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="flex items-center p-4 justify-between sticky top-0 bg-card/80 backdrop-blur-md z-10 border-b border-border">
        <button onClick={() => router.back()} className="text-foreground flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-accent transition-colors">
          <ArrowRight size={22} />
        </button>
        <h2 className="text-lg font-extrabold leading-tight tracking-tight flex-1 text-center text-foreground">إشعارات الأهداف الذكية</h2>
        <div className="w-10" />
      </div>

      {/* Lock Screen Preview */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-muted mb-4 px-2">معاينة التنبيهات</p>
        <div className="relative w-full rounded-xl bg-gradient-to-br from-[#1c2e24] to-[#112117] p-6 border border-border shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-primary/40 blur-3xl" />
          </div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-black text-[10px] font-bold">🚗</span>
                </div>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">DRIVE PROFIT</span>
              </div>
              <span className="text-[10px] text-white/60">الآن</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-white">تحديث الهدف اليومي 🚀</h4>
              <p className="text-xs text-white/90">باقي 200 جنيه على هدفك اليوم! استمر 🚗</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-12">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Sun size={16} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Moon size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Test Alert Success */}
      {testSent && (
        <div className="mx-4 mb-2 bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2">
          <Check size={18} className="text-primary" />
          <span className="text-sm text-primary font-medium">تم إرسال تنبيه تجريبي!</span>
        </div>
      )}

      {/* Settings List */}
      <div className="px-4 flex flex-col gap-6 pb-24">
        <h3 className="text-lg font-bold pt-4 text-foreground">إعدادات التنبيهات الذكية</h3>

        {settings.map((setting) => {
          const meta = SETTING_META[setting.settingType];
          if (!meta) return null;
          const Icon = meta.icon;
          return (
            <div key={setting.id} className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${meta.iconColor} flex items-center justify-center rounded-lg ${meta.iconBg} shrink-0 w-12 h-12`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-foreground">{meta.nameAr}</p>
                    <p className="text-xs text-muted">{meta.descriptionAr}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={setting.enabled} onChange={() => toggleSetting(setting.settingType, setting.enabled)} className="sr-only peer" />
                  <div className="w-12 h-7 bg-accent rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              {setting.timeValue && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium text-foreground">{meta.label}</span>
                  {(setting.settingType === 'morning' || setting.settingType === 'evening') ? (
                    <input
                      type="time"
                      value={setting.timeValue}
                      onChange={(e) => updateTimeValue(setting.settingType, e.target.value)}
                      className="bg-accent px-3 py-1 rounded-lg text-sm font-bold text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                      dir="ltr"
                    />
                  ) : (
                    <input
                      type="number"
                      value={setting.timeValue.replace('%', '')}
                      onChange={(e) => updateTimeValue(setting.settingType, e.target.value)}
                      className="bg-accent px-3 py-1 rounded-lg text-sm font-bold text-foreground border border-border w-20 text-center focus:outline-none focus:ring-2 focus:ring-primary/30"
                      dir="ltr"
                      min="1"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
        <div className="max-w-[480px] mx-auto">
          <button onClick={handleTestAlert} className="w-full bg-primary text-[#112117] font-extrabold py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(32,223,108,0.3)] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
            <Send size={20} />
            إرسال تنبيه تجريبي
          </button>
        </div>
      </div>
    </div>
  );
}
