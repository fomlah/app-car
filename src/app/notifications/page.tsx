'use client';

import { useState, useEffect } from 'react';
import { LABELS } from '@/constants/labels';
import { Bell, CheckCheck, Mail, MailOpen } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setNotifications(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: number) => {
    await fetch('/api/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    await fetch('/api/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'all' }),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'الآن';
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header - Stitch style */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4 h-16">
          <div>
            <h1 className="text-lg font-bold text-foreground">{LABELS.nav.notifications}</h1>
            <p className="text-xs text-muted">
              {unreadCount > 0 ? `${unreadCount} ${LABELS.common.unreadNotifications || 'إشعار غير مقروء'}` : LABELS.common.noNewNotifications || 'لا توجد إشعارات جديدة'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-primary font-semibold hover:brightness-110 transition-colors">
              <CheckCheck size={14} />
              <span>{LABELS.common.readAll || 'قراءة الكل'}</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 px-4 pt-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={40} className="text-muted mx-auto mb-3 opacity-20" />
            <p className="text-sm text-muted">{LABELS.common.noNotifications || 'لا توجد إشعارات'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => !n.read && markAsRead(n.id)}
                className={`w-full text-right rounded-xl p-4 transition-all bg-card border ${
                  !n.read ? 'border-primary/30 bg-primary/5' : 'border-border opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    !n.read ? 'bg-primary/10' : 'bg-accent'
                  }`}>
                    {!n.read ? <Mail size={16} className="text-primary" /> : <MailOpen size={16} className="text-muted" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm font-bold truncate ${!n.read ? 'text-foreground' : 'text-muted'}`}>
                        {n.title}
                      </h3>
                      <span className="text-[9px] text-muted shrink-0">{timeAgo(n.createdAt)}</span>
                    </div>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{n.message}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
