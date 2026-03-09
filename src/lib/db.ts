import Dexie, { type EntityTable } from 'dexie';

export interface Income {
  id?: number;
  date: string; // YYYY-MM-DD
  company: string;
  amount: number;
  notes: string;
  createdAt: number;
}

export interface Expense {
  id?: number;
  date: string; // YYYY-MM-DD
  category: string;
  customCategory?: string;
  amount: number;
  notes: string;
  createdAt: number;
}

export const COMPANIES = ['Uber', 'Didi', 'InDrive'];

export const EXPENSE_CATEGORIES = [
  { id: 'fuel', label: 'بنزين', icon: '⛽' },
  { id: 'maintenance', label: 'صيانة', icon: '🔧' },
  { id: 'mobile', label: 'باقة موبايل', icon: '📱' },
  { id: 'cleaning', label: 'تنظيف وغسيل', icon: '🧹' },
  { id: 'other', label: 'أخرى', icon: '📋' },
];

export function getCategoryLabel(id: string, customCategory?: string): string {
  if (id === 'other' && customCategory) return customCategory;
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === id);
  return cat ? cat.label : id;
}

export function getCategoryIcon(id: string): string {
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === id);
  return cat ? cat.icon : '📋';
}

const db = new Dexie('DriverIncomeDB') as Dexie & {
  incomes: EntityTable<Income, 'id'>;
  expenses: EntityTable<Expense, 'id'>;
};

db.version(1).stores({
  incomes: '++id, date, company, createdAt',
  expenses: '++id, date, category, createdAt',
});

export { db };
