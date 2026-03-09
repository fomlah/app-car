'use client';

import { useState, useMemo } from 'react';
import { COMPANIES, getCategoryLabel, getCategoryIcon } from '@/lib/db';
import { useIncomes, useExpenses, useCompanies } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Filter, TrendingUp, TrendingDown, Trash2, Pencil, X, Check, ChevronLeft, ChevronRight, Search } from 'lucide-react';

type FilterType = 'all' | 'income' | 'expense';
type DatePeriod = 'all' | 'daily' | 'monthly' | 'yearly';

interface TransactionItem {
  id: number;
  type: 'income' | 'expense';
  date: string;
  amount: number;
  label: string;
  icon: string;
  notes: string;
  company?: string;
  category?: string;
  customCategory?: string;
  createdAt: string;
}

const COMPANY_BG: Record<string, string> = { Uber: '#000000', Didi: '#ff7d00', InDrive: '#B2F75B' };
const CATEGORY_OPTIONS = [
  { id: 'fuel', label: 'وقود', icon: '⛽' },
  { id: 'maintenance', label: 'صيانة', icon: '🔧' },
  { id: 'data', label: 'إنترنت', icon: '📶' },
  { id: 'cleaning', label: 'غسيل', icon: '🧽' },
  { id: 'other', label: 'أخرى', icon: '📦' },
];
const MONTH_NAMES = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateStr: string): Date {
  return parseISO(dateStr);
}

export default function TransactionsPage() {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [datePeriod, setDatePeriod] = useState<DatePeriod>('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Edit modal state
  const [editItem, setEditItem] = useState<TransactionItem | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [saving, setSaving] = useState(false);

  const { incomes, deleteIncome, updateIncome } = useIncomes();
  const { expenses, deleteExpense, updateExpense } = useExpenses();
  const { companies } = useCompanies();

  // Date period label
  const datePeriodLabel = useMemo(() => {
    if (datePeriod === 'all') return 'كل الفترات';
    const d = selectedDate;
    if (datePeriod === 'daily') {
      const todayStr = fmtDate(new Date());
      const selStr = fmtDate(d);
      if (selStr === todayStr) return 'اليوم';
      const y = new Date(); y.setDate(y.getDate() - 1);
      if (selStr === fmtDate(y)) return 'أمس';
      return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    }
    if (datePeriod === 'monthly') return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    return `${d.getFullYear()}`;
  }, [datePeriod, selectedDate]);

  const navigateDate = (dir: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    if (datePeriod === 'daily') d.setDate(d.getDate() + (dir === 'next' ? 1 : -1));
    else if (datePeriod === 'monthly') d.setMonth(d.getMonth() + (dir === 'next' ? 1 : -1));
    else if (datePeriod === 'yearly') d.setFullYear(d.getFullYear() + (dir === 'next' ? 1 : -1));
    setSelectedDate(d);
  };

  const transactions = useMemo(() => {
    const all: TransactionItem[] = [];
    incomes.forEach((i) => {
      const dbC = companies.find(c => c.name === i.company);
      all.push({
        id: i.id, type: 'income', date: i.date, amount: i.amount,
        label: dbC?.nameAr || i.company, icon: dbC?.logo || (dbC ? (dbC.nameAr?.[0] || i.company?.[0]) : (i.company === 'Uber' ? '🚗' : i.company === 'Didi' ? '🟠' : '🟢')),
        notes: i.notes || '', company: i.company, createdAt: i.createdAt,
      });
    });
    expenses.forEach((e) => all.push({
      id: e.id, type: 'expense', date: e.date, amount: e.amount,
      label: getCategoryLabel(e.category, e.customCategory || undefined),
      icon: getCategoryIcon(e.category), notes: e.notes || '',
      category: e.category, customCategory: e.customCategory || undefined, createdAt: e.createdAt,
    }));

    let filtered = all;

    // Type filter
    if (filterType !== 'all') filtered = filtered.filter((t) => t.type === filterType);

    // Date period filter
    if (datePeriod !== 'all') {
      let startDate: string, endDate: string;
      if (datePeriod === 'daily') {
        startDate = endDate = fmtDate(selectedDate);
      } else if (datePeriod === 'monthly') {
        startDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-01`;
        const last = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        endDate = fmtDate(last);
      } else {
        startDate = `${selectedDate.getFullYear()}-01-01`;
        endDate = `${selectedDate.getFullYear()}-12-31`;
      }
      filtered = filtered.filter(t => t.date >= startDate && t.date <= endDate);
    }

    // Search
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(t => t.label.toLowerCase().includes(s) || t.notes.toLowerCase().includes(s));
    }

    filtered.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
    return filtered;
  }, [incomes, expenses, filterType, search, datePeriod, selectedDate, companies]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};
    transactions.forEach((t) => {
      if (!groups[t.date]) groups[t.date] = [];
      groups[t.date].push(t);
    });
    return groups;
  }, [transactions]);

  const handleDelete = (type: 'income' | 'expense', id: number, label: string) => {
    if (!confirm(`هل أنت متأكد من حذف "${label}"؟`)) return;
    if (type === 'income') deleteIncome(id);
    else deleteExpense(id);
  };

  const openEdit = (item: TransactionItem) => {
    setEditItem(item);
    setEditAmount(item.amount.toString());
    setEditDate(item.date);
    setEditNotes(item.notes);
    setEditCompany(item.company || '');
    setEditCategory(item.category || '');
  };

  const handleSaveEdit = async () => {
    if (!editItem || !editAmount || parseFloat(editAmount) <= 0) return;
    setSaving(true);
    try {
      if (editItem.type === 'income') {
        await updateIncome(editItem.id, {
          amount: parseFloat(editAmount), date: editDate, company: editCompany, notes: editNotes,
        });
      } else {
        await updateExpense(editItem.id, {
          amount: parseFloat(editAmount), date: editDate, category: editCategory, notes: editNotes,
        });
      }
      setEditItem(null);
    } catch { }
    setSaving(false);
  };

  const handleDeleteFromModal = () => {
    if (!editItem) return;
    if (!confirm(`هل أنت متأكد من حذف "${editItem.label}" بمبلغ ${editItem.amount} ج.م؟`)) return;
    if (editItem.type === 'income') deleteIncome(editItem.id);
    else deleteExpense(editItem.id);
    setEditItem(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4 h-16">
          <div>
            <h1 className="text-lg font-bold text-foreground">{LABELS.nav.transactions}</h1>
            <p className="text-xs text-muted">{transactions.length} {LABELS.common.operations}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 pt-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن عملية..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
            dir="rtl"
          />
        </div>

        {/* Date Period Tabs */}
        <div className="flex bg-accent rounded-xl p-1 border border-border">
          {([
            { key: 'all' as DatePeriod, label: 'الكل' },
            { key: 'daily' as DatePeriod, label: 'يوم' },
            { key: 'monthly' as DatePeriod, label: 'شهر' },
            { key: 'yearly' as DatePeriod, label: 'سنة' },
          ]).map(p => (
            <button
              key={p.key}
              onClick={() => { setDatePeriod(p.key); setSelectedDate(new Date()); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${datePeriod === p.key ? 'bg-primary text-black shadow-sm' : 'text-muted hover:text-foreground'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Date Navigation */}
        {datePeriod !== 'all' && (
          <div className="flex items-center justify-center gap-4 py-1">
            <button onClick={() => navigateDate('next')} className="p-1 rounded-full hover:bg-accent transition-colors">
              <ChevronRight size={18} className="text-foreground" />
            </button>
            <span className="text-sm font-bold text-foreground min-w-[140px] text-center">{datePeriodLabel}</span>
            <button onClick={() => navigateDate('prev')} className="p-1 rounded-full hover:bg-accent transition-colors">
              <ChevronLeft size={18} className="text-foreground" />
            </button>
          </div>
        )}

        {/* Type Filter Chips */}
        <div className="flex gap-2">
          {([
            { value: 'all' as FilterType, label: 'الكل' },
            { value: 'income' as FilterType, label: 'الدخل' },
            { value: 'expense' as FilterType, label: 'المصاريف' },
          ]).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${filterType === opt.value
                ? 'bg-primary text-black'
                : 'bg-card border border-border text-muted hover:text-foreground'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-[10px] text-muted mb-1">الدخل</p>
            <p className="text-sm font-bold text-primary">+{totalIncome.toFixed(0)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-[10px] text-muted mb-1">المصروفات</p>
            <p className="text-sm font-bold text-danger">-{totalExpense.toFixed(0)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-[10px] text-muted mb-1">الصافي</p>
            <p className={`text-sm font-bold ${netProfit >= 0 ? 'text-primary' : 'text-danger'}`}>{netProfit.toFixed(0)}</p>
          </div>
        </div>

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-muted text-sm">{LABELS.transactions.noTransactions}</p>
            {datePeriod !== 'all' && <p className="text-muted text-xs mt-1">جرب تغيير الفترة أو الفلتر</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedByDate).map(([date, items]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">
                    {format(parseLocalDate(date), 'EEEE، d MMMM yyyy', { locale: ar })}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-2">
                  {items.map((t) => (
                    <div key={`${t.type}-${t.id}`} className="flex items-center p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group">
                      {/* Icon */}
                      <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ml-3 ${t.type === 'expense' ? 'bg-danger/10' : ''}`}
                        style={t.type === 'income' ? { backgroundColor: companies.find((c) => c.name === t.company)?.color || COMPANY_BG[t.label] || '#16a34a' } : {}}>
                        {t.type === 'income' ? (
                          t.icon.startsWith('http') || t.icon.startsWith('/') ? (
                            <img src={t.icon} alt={t.label} className="w-full h-full object-contain p-1 rounded-full" />
                          ) : (
                            <span className={`text-[10px] font-bold text-white`}>
                              {t.icon}
                            </span>
                          )
                        ) : (
                          <span className="text-sm">{t.icon}</span>
                        )}
                      </div>

                      {/* Info - clickable to edit */}
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openEdit(t)}>
                        <p className="text-sm font-semibold text-foreground truncate">{t.label}</p>
                        {t.notes && <p className="text-xs text-muted truncate mt-0.5">{t.notes}</p>}
                      </div>

                      {/* Amount */}
                      <span className={`text-sm font-bold mx-2 ${t.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                        {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(0)}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(t)}
                          className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                          title="تعديل"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.type, t.id, t.label)}
                          className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setEditItem(null)}>
          <div
            className="bg-card w-full max-w-[480px] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">
                تعديل {editItem.type === 'income' ? 'الدخل' : 'المصروف'}
              </h2>
              <button onClick={() => setEditItem(null)} className="p-1 rounded-full hover:bg-accent transition-colors">
                <X size={20} className="text-muted" />
              </button>
            </div>

            {/* Amount */}
            <label className="block text-xs font-bold text-primary mb-1.5 mt-3">المبلغ (ج.م)</label>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full bg-accent border border-border rounded-xl px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              dir="rtl"
            />

            {/* Date */}
            <label className="block text-xs font-bold text-primary mb-1.5 mt-4">التاريخ</label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="w-full bg-accent border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />

            {/* Company (income) */}
            {editItem.type === 'income' && (
              <>
                <label className="block text-xs font-bold text-primary mb-1.5 mt-4">الشركة</label>
                <div className="flex gap-2">
                  {companies.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setEditCompany(c.name)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${editCompany === c.name
                        ? 'text-white border-transparent'
                        : 'bg-accent border-border text-foreground hover:border-primary/30'
                        }`}
                      style={editCompany === c.name ? { backgroundColor: c.color || COMPANY_BG[c.name] || '#16a34a' } : {}}
                    >
                      {c.nameAr || c.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Category (expense) */}
            {editItem.type === 'expense' && (
              <>
                <label className="block text-xs font-bold text-primary mb-1.5 mt-4">الفئة</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setEditCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${editCategory === cat.id
                        ? 'bg-primary/15 border-primary text-primary'
                        : 'bg-accent border-border text-foreground hover:border-primary/30'
                        }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Notes */}
            <label className="block text-xs font-bold text-primary mb-1.5 mt-4">ملاحظات</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="ملاحظات اختيارية..."
              className="w-full bg-accent border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20"
              dir="rtl"
            />

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDeleteFromModal}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-danger text-danger bg-danger/5 hover:bg-danger/10 transition-colors font-bold text-sm"
              >
                <Trash2 size={16} />
                <span>حذف</span>
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? (
                  <span>جاري الحفظ...</span>
                ) : (
                  <>
                    <Check size={16} />
                    <span>حفظ التعديلات</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
