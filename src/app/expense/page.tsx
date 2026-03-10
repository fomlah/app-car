'use client';

import { useState } from 'react';
import { getCategoryLabel, getCategoryIcon, EXPENSE_CATEGORIES } from '@/lib/db';
import { useExpenses } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Check, ArrowRight, Calendar, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenses();
  const [date, setDate] = useState(fmtDate(new Date()));
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseNotes, setExpenseNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    const numAmount = parseFloat(amount);
    if (!category || numAmount <= 0 || isNaN(numAmount)) return;
    if (category === 'other' && !customCategory.trim()) return;
    setSaving(true);
    try {
      await addExpense({ date, category, customCategory: category === 'other' ? customCategory.trim() : undefined, amount: numAmount, notes: expenseNotes });
      setSuccess(true);
      setCategory('');
      setCustomCategory('');
      setAmount('');
      setExpenseNotes('');
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const isValid = category && parseFloat(amount) > 0 && (category !== 'other' || customCategory.trim());

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center px-4 h-16">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <ArrowRight size={20} className="text-foreground" />
          </button>
          <h2 className="flex-1 text-center text-base font-bold text-foreground mr-10">
            {LABELS.activity.actions.EXPENSE_ADD}
          </h2>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {success && (
          <div className="mx-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check size={18} className="text-primary" />
              </div>
              <span className="text-sm text-primary font-bold">{LABELS.common.success}</span>
            </div>
          </div>
        )}

        {/* Date Section */}
        <div className="px-4 pt-6">
          <div className="bg-card border border-border/60 rounded-[2rem] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-danger font-bold">
                <Calendar size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{LABELS.common.date}</span>
                <span className="text-sm font-bold text-foreground">
                  {date ? format(parseISO(date), 'EEEE، d MMMM yyyy', { locale: ar }) : ''}
                </span>
              </div>
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:ring-2 focus:ring-danger/20 transition-all"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col items-center justify-center pt-12 pb-10 px-4">
          <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">{LABELS.common.amount}</label>
          <div className="relative flex items-center justify-center w-full">
            <span className="text-2xl font-black text-danger mr-2">{LABELS.common.currency}</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none p-0 text-6xl font-black text-foreground placeholder-muted/10 focus:ring-0 w-64 text-center"
              min="0"
              step="0.01"
              autoFocus
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-black text-foreground uppercase tracking-tight">{LABELS.common.type}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {EXPENSE_CATEGORIES.map((cat) => {
              const icon = getCategoryIcon(cat.id);
              const isSelected = category === cat.id;
              const bgColor = '#ef4444'; // danger color
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`group relative flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all duration-300 ${isSelected
                    ? 'border-transparent shadow-lg scale-105'
                    : 'border-border/20 bg-card/40 hover:bg-accent/40 backdrop-blur-sm'
                    }`}
                  style={isSelected ? { backgroundColor: `${bgColor}15`, boxShadow: `0 8px 30px -4px ${bgColor}40`, borderColor: `${bgColor}50` } : {}}
                >
                  <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center mb-3 text-2xl group-hover:scale-105 transition-transform duration-500 shadow-md ring-1 ring-black/5 dark:ring-white/10 ${isSelected ? 'bg-danger text-white' : 'bg-accent text-muted'
                    }`}>
                    {icon}
                  </div>
                  <span className={`text-[11px] font-black transition-colors duration-300 ${isSelected ? 'text-foreground' : 'text-muted'}`}>
                    {LABELS.common[cat.id as keyof typeof LABELS.common] || cat.label}
                  </span>
                  {isSelected && (
                    <div
                      className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-danger rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300 ring-2 ring-background"
                    >
                      <Check size={14} className="text-white" strokeWidth={4} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Category */}
        {category === 'other' && (
          <div className="px-4 mt-6 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-card rounded-[1.5rem] border border-border/60 p-5 shadow-sm">
              <input
                type="text"
                placeholder={LABELS.common.chooseType}
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-sm font-black text-foreground placeholder-muted/30 focus:ring-0"
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="px-4 mt-8 pb-40">
          <div className="bg-card rounded-[2rem] border border-border/60 p-6 shadow-sm">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-muted group-focus-within:text-danger transition-colors">
                <FileText size={18} />
              </div>
              <input
                type="text"
                placeholder={`${LABELS.common.notes} (${LABELS.common.optional})`}
                value={expenseNotes}
                onChange={(e) => setExpenseNotes(e.target.value)}
                className="w-full bg-accent/40 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-foreground placeholder-muted/40 focus:ring-2 focus:ring-danger/10 focus:bg-accent/60 transition-all"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Premium Floating Save Button */}
      <div className="fixed bottom-10 left-0 right-0 z-50 px-8 pointer-events-none">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSave}
            disabled={!isValid || saving}
            className={`pointer-events-auto w-full group relative h-16 rounded-full font-black text-lg transition-all duration-500 active:scale-[0.95] ${isValid && !saving
              ? 'bg-danger text-white shadow-[0_20px_50px_rgba(239,68,68,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(239,68,68,0.5)]'
              : 'bg-muted/20 text-muted cursor-not-allowed opacity-50 shadow-none'
              }`}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              {saving ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isValid && !saving ? 'bg-white/10 group-hover:bg-white/20' : 'bg-muted/10'}`}>
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
              <span className="tracking-tight">{saving ? LABELS.common.loading : LABELS.common.save}</span>
            </div>

            {/* Ambient Glow Effect */}
            {isValid && !saving && (
              <div className="absolute inset-0 rounded-full bg-danger blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Visual Spacer/Fade at bottom of list */}
      <div className="h-40" />
    </div>
  );
}
