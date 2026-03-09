export const Colors = {
  dark: {
    background: '#0f1a14',
    card: '#162016',
    accent: '#1c2e24',
    border: '#2a3d2a',
    foreground: '#e8f5e8',
    muted: '#7a9a7a',
    primary: '#20df6c',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#16a34a',
    white: '#ffffff',
    black: '#000000',
  },
  light: {
    background: '#f8faf8',
    card: '#ffffff',
    accent: '#f0f5f0',
    border: '#e0e8e0',
    foreground: '#1a2e1a',
    muted: '#6b7b6b',
    primary: '#16a34a',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#16a34a',
    white: '#ffffff',
    black: '#000000',
  },
};

export const COMPANIES = ['Uber', 'Didi', 'InDrive'] as const;

export const COMPANY_COLORS: Record<string, { bg: string; text: string }> = {
  Uber: { bg: '#000000', text: '#ffffff' },
  Didi: { bg: '#ff7d00', text: '#ffffff' },
  InDrive: { bg: '#B2F75B', text: '#000000' },
};

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
