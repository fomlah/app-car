'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCompanies } from '@/lib/useData';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Clock, Play, Square, Trash2, Check } from 'lucide-react';
import { LABELS } from '@/constants/labels';

interface WorkSession {
  id: number;
  date: string;
  startTime: string;
  endTime: string | null;
  company: string;
  notes: string | null;
  createdAt: string;
}

function calcDuration(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return mins;
}

function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} ${LABELS.workSessions.hour} ${m > 0 ? `${LABELS.workSessions.and} ${m} ${LABELS.workSessions.minute}` : ''}`;
}

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function WorkSessionsPage() {
  const { companies } = useCompanies();
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(fmtDate(new Date()));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadSessions = () => {
    fetch('/api/work-sessions')
      .then((r) => r.json())
      .then(setSessions)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadSessions(); }, []);

  const activeSession = sessions.find((s) => !s.endTime);

  const handleStart = async () => {
    if (!company) return;
    setSaving(true);
    try {
      const now = format(new Date(), 'HH:mm');
      const res = await fetch('/api/work-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, startTime: startTime || now, company, notes: notes || null }),
      });
      if (res.ok) {
        loadSessions();
        setStartTime('');
        setNotes('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleStop = async (id: number) => {
    const now = format(new Date(), 'HH:mm');
    const res = await fetch('/api/work-sessions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, endTime: endTime || now }),
    });
    if (res.ok) {
      loadSessions();
      setEndTime('');
    }
  };

  const handleAddManual = async () => {
    if (!company || !startTime || !endTime) return;
    setSaving(true);
    try {
      const res = await fetch('/api/work-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, startTime, endTime, company, notes: notes || null }),
      });
      if (res.ok) {
        loadSessions();
        setStartTime('');
        setEndTime('');
        setNotes('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(LABELS.workSessions.deleteConfirm)) return;
    const res = await fetch('/api/work-sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) loadSessions();
  };

  const todaySessions = sessions.filter((s) => s.date === date);
  const todayTotal = todaySessions
    .filter((s) => s.endTime)
    .reduce((sum, s) => sum + calcDuration(s.startTime, s.endTime!), 0);

  const getCompanyColor = (c: string) => {
    const comp = companies.find((com) => com.name === c);
    return comp?.color || '#6366f1';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header - Stitch style */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center p-4 h-16">
          <h1 className="text-lg font-bold tracking-tight text-foreground">{LABELS.workSessions.title}</h1>
        </div>
      </header>

      <div className="flex-1 px-4 pt-4 space-y-5">
        {success && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2">
            <Check size={18} className="text-primary" />
            <span className="text-sm text-primary font-medium">{LABELS.workSessions.saved}</span>
          </div>
        )}

        {/* Active Session */}
        {activeSession && (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-bold text-primary">{LABELS.workSessions.activeNow}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white`} style={{ backgroundColor: getCompanyColor(activeSession.company) }}>
                {companies.find(c => c.name === activeSession.company)?.nameAr || activeSession.company}
              </span>
            </div>
            <p className="text-xs text-muted mb-2">{LABELS.workSessions.startedAt}: {activeSession.startTime}</p>
            <div className="flex gap-2">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1 bg-accent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none"
              />
              <button
                onClick={() => handleStop(activeSession.id)}
                className="px-4 py-2 bg-danger text-white rounded-lg font-bold text-sm flex items-center gap-1 hover:opacity-90"
              >
                <Square size={14} />
                {LABELS.workSessions.end}
              </button>
            </div>
          </div>
        )}

        {/* Add Session */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-foreground">{activeSession ? LABELS.workSessions.addManualSession : LABELS.workSessions.startNew}</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="grid grid-cols-3 gap-2">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => setCompany(c.name)}
                className={`rounded-lg border-2 p-2 text-xs font-bold transition-all ${company === c.name ? `text-white border-transparent shadow-md` : 'bg-card border-border text-foreground'
                  }`}
                style={company === c.name ? { backgroundColor: c.color || '#6366f1' } : {}}
              >
                {c.nameAr || c.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-muted mb-1">{LABELS.workSessions.startTime}</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted mb-1">{LABELS.workSessions.endTime}</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder={LABELS.workSessions.notesOptional}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none"
          />
          <div className="flex gap-2">
            {!activeSession && (
              <button
                onClick={handleStart}
                disabled={!company || saving}
                className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${company && !saving ? 'bg-blue-500 hover:opacity-90 shadow-lg shadow-blue-500/25' : 'bg-muted cursor-not-allowed'
                  }`}
              >
                <Play size={16} />
                {LABELS.workSessions.startNow}
              </button>
            )}
            <button
              onClick={handleAddManual}
              disabled={!company || !startTime || !endTime || saving}
              className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${company && startTime && endTime && !saving ? 'gradient-primary hover:opacity-90 shadow-lg shadow-primary/25' : 'bg-muted cursor-not-allowed'
                }`}
            >
              {LABELS.workSessions.addManual}
            </button>
          </div>
        </div>

        {/* Today Summary */}
        {todaySessions.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="bg-blue-500/10 p-3 text-center">
              <p className="text-[10px] text-muted">{LABELS.workSessions.todayTotalHours}</p>
              <p className="text-xl font-extrabold text-blue-600">{formatDuration(todayTotal)}</p>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div>
          <h2 className="text-sm font-bold mb-3 text-foreground">{LABELS.workSessions.sessions} ({todaySessions.length})</h2>
          {todaySessions.length === 0 ? (
            <div className="text-center py-6">
              <Clock size={28} className="text-muted mx-auto mb-2 opacity-30" />
              <p className="text-xs text-muted">{LABELS.workSessions.noSessionsToday}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todaySessions.map((s) => {
                const dur = s.endTime ? calcDuration(s.startTime, s.endTime) : null;
                return (
                  <div key={s.id} className="glass-card rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white`} style={{ backgroundColor: getCompanyColor(s.company) }}>
                        {companies.find(c => c.name === s.company)?.nameAr?.[0] || s.company?.[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{companies.find(c => c.name === s.company)?.nameAr || s.company}</span>
                          {!s.endTime && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                        </div>
                        <p className="text-[10px] text-muted">
                          {s.startTime} → {s.endTime || '...'}
                          {dur !== null && <span className="text-blue-500 font-bold mr-1"> ({formatDuration(dur)})</span>}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(s.id)} className="text-muted hover:text-danger transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
