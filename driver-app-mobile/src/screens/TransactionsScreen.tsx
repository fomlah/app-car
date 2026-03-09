import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, ActivityIndicator, RefreshControl, Platform, } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIncomes, useExpenses, useCompanies, Income, Expense, Company } from '../hooks/useData';
import { COMPANY_COLORS, EXPENSE_CATEGORIES, getCategoryLabel, getCategoryIcon } from '../constants/theme';

// Cross-platform confirm dialog
function confirmDelete(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${message}`)) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: onConfirm },
    ]);
  }
}

type Filter = string;
type DatePeriod = 'all' | 'daily' | 'monthly' | 'yearly';
type TransactionItem = {
  id: number;
  uniqueKey: string;
  type: 'income' | 'expense';
  date: string;
  amount: number;
  label: string;
  sublabel: string;
  company?: string;
  category?: string;
  customCategory?: string;
  notes: string | null;
};

const BASE_FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'income', label: 'الدخل' },
  { key: 'expense', label: 'المصاريف' },
];

const MONTH_NAMES = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const DAY_NAMES = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateLabel(dateStr: string): string {
  const today = new Date();
  const d = new Date(dateStr + 'T00:00:00');
  const todayStr = fmtDate(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = fmtDate(yesterday);
  if (dateStr === todayStr) return 'اليوم';
  if (dateStr === yStr) return 'أمس';
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

export default function TransactionsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { incomes, refresh: refreshIncomes, updateIncome, deleteIncome } = useIncomes();
  const { expenses, refresh: refreshExpenses, updateExpense, deleteExpense } = useExpenses();
  const { companies } = useCompanies();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const dynamicFilters = useMemo(() => {
    return [
      ...BASE_FILTERS,
      ...companies.map(c => ({ key: c.name, label: c.nameAr || c.name }))
    ];
  }, [companies]);

  // Date period filter
  const [datePeriod, setDatePeriod] = useState<DatePeriod>('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<TransactionItem | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshIncomes(), refreshExpenses()]);
    setRefreshing(false);
  };

  // Date period label
  const datePeriodLabel = useMemo(() => {
    if (datePeriod === 'all') return 'كل الفترات';
    if (datePeriod === 'daily') {
      const todayStr = fmtDate(new Date());
      const selStr = fmtDate(selectedDate);
      if (selStr === todayStr) return 'اليوم';
      const y = new Date(); y.setDate(y.getDate() - 1);
      if (selStr === fmtDate(y)) return 'أمس';
      return `${DAY_NAMES[selectedDate.getDay()]} ${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]}`;
    }
    if (datePeriod === 'monthly') return `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
    return `${selectedDate.getFullYear()}`;
  }, [datePeriod, selectedDate]);

  const navigateDate = (dir: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    if (datePeriod === 'daily') d.setDate(d.getDate() + (dir === 'next' ? 1 : -1));
    else if (datePeriod === 'monthly') d.setMonth(d.getMonth() + (dir === 'next' ? 1 : -1));
    else if (datePeriod === 'yearly') d.setFullYear(d.getFullYear() + (dir === 'next' ? 1 : -1));
    setSelectedDate(d);
  };

  const allTransactions: TransactionItem[] = useMemo(() => {
    const items: TransactionItem[] = [];
    incomes.forEach(i => items.push({
      id: i.id, uniqueKey: `i-${i.id}`, type: 'income',
      date: i.date, amount: i.amount,
      label: i.company, sublabel: `دخل من ${i.company}`,
      company: i.company, notes: i.notes,
    }));
    expenses.forEach(e => items.push({
      id: e.id, uniqueKey: `e-${e.id}`, type: 'expense',
      date: e.date, amount: e.amount,
      label: getCategoryLabel(e.category, e.customCategory || undefined), sublabel: 'مصروف',
      category: e.category, customCategory: e.customCategory || undefined, notes: e.notes,
    }));
    items.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
    return items;
  }, [incomes, expenses]);

  const filtered = useMemo(() => {
    let list = allTransactions;
    if (filter === 'income') list = list.filter(t => t.type === 'income');
    else if (filter === 'expense') list = list.filter(t => t.type === 'expense');
    else if (companies.map((c) => c.name).includes(filter)) list = list.filter(t => t.company === filter);

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
      list = list.filter(t => t.date >= startDate && t.date <= endDate);
    }

    if (search.trim()) {
      const s = search.trim().toLowerCase();
      list = list.filter(t => t.label.toLowerCase().includes(s) || (t.notes || '').toLowerCase().includes(s));
    }
    return list;
  }, [allTransactions, filter, search, datePeriod, selectedDate]);

  const grouped = useMemo(() => {
    const map: Record<string, TransactionItem[]> = {};
    filtered.forEach(t => {
      if (!map[t.date]) map[t.date] = [];
      map[t.date].push(t);
    });
    return Object.entries(map).sort((a, b) => (a[0] > b[0] ? -1 : 1));
  }, [filtered]);

  const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netIncome = totalIncome - totalExpense;

  const openEdit = (item: TransactionItem) => {
    setEditItem(item);
    setEditAmount(item.amount.toString());
    setEditDate(item.date);
    setEditNotes(item.notes || '');
    setEditCompany(item.company || '');
    setEditCategory(item.category || '');
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editItem || !editAmount || parseFloat(editAmount) <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح');
      return;
    }
    setSaving(true);
    try {
      if (editItem.type === 'income') {
        await updateIncome(editItem.id, {
          amount: parseFloat(editAmount),
          date: editDate,
          company: editCompany,
          notes: editNotes,
        });
      } else {
        await updateExpense(editItem.id, {
          amount: parseFloat(editAmount),
          date: editDate,
          category: editCategory,
          notes: editNotes,
        });
      }
      setEditModalVisible(false);
      setEditItem(null);
    } catch {
      Alert.alert('خطأ', 'فشل في حفظ التعديلات');
    }
    setSaving(false);
  };

  const handleDeleteDirect = async (item: TransactionItem) => {
    setDeleting(true);
    try {
      if (item.type === 'income') {
        await deleteIncome(item.id);
      } else {
        await deleteExpense(item.id);
      }
    } catch {
      Alert.alert('خطأ', 'فشل في حذف العملية');
    }
    setDeleting(false);
  };

  const handleDeleteFromModal = () => {
    if (!editItem) return;
    const item = editItem;
    confirmDelete(
      'حذف العملية',
      `هل أنت متأكد من حذف "${item.label}" بمبلغ ${item.amount} ج.م؟`,
      async () => {
        setEditModalVisible(false);
        setEditItem(null);
        await handleDeleteDirect(item);
      }
    );
  };

  const handleDeleteFromList = (item: TransactionItem) => {
    confirmDelete(
      'حذف العملية',
      `هل أنت متأكد من حذف "${item.label}" بمبلغ ${item.amount} ج.م؟`,
      () => handleDeleteDirect(item)
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>سجل العمليات</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* SINGLE ScrollView for everything */}
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainScrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        showsVerticalScrollIndicator={true}
      >
        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="ابحث عن عملية..."
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
            textAlign="right"
          />
        </View>

        {/* Date Period Selector */}
        <View style={[styles.datePeriodRow, { backgroundColor: colors.accent, borderColor: colors.border }]}>
          {(['all', 'daily', 'monthly', 'yearly'] as DatePeriod[]).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.datePeriodTab, datePeriod === p && { backgroundColor: colors.primary }]}
              onPress={() => { setDatePeriod(p); setSelectedDate(new Date()); }}
            >
              <Text style={[styles.datePeriodText, { color: datePeriod === p ? '#000' : colors.muted }]}>
                {p === 'all' ? 'الكل' : p === 'daily' ? 'يوم' : p === 'monthly' ? 'شهر' : 'سنة'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Navigation */}
        {datePeriod !== 'all' && (
          <View style={styles.dateNav}>
            <TouchableOpacity onPress={() => navigateDate('next')} style={styles.dateNavBtn}>
              <Ionicons name="chevron-forward" size={20} color={colors.foreground} />
            </TouchableOpacity>
            <Text style={[styles.dateNavLabel, { color: colors.foreground }]}>{datePeriodLabel}</Text>
            <TouchableOpacity onPress={() => navigateDate('prev')} style={styles.dateNavBtn}>
              <Ionicons name="chevron-back" size={20} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        )}

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {dynamicFilters.map(f => (
            <TouchableOpacity
              key={f.key}
              style={[
                styles.filterChip,
                filter === f.key
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
              ]}
              onPress={() => setFilter(f.key)}
            >
              <Text style={[
                styles.filterText,
                { color: filter === f.key ? '#000' : colors.foreground },
              ]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.muted }]}>الدخل</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>+{totalIncome.toFixed(0)}</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.muted }]}>المصروفات</Text>
            <Text style={[styles.summaryValue, { color: colors.danger }]}>-{totalExpense.toFixed(0)}</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.summaryLabel, { color: colors.muted }]}>الصافي</Text>
            <Text style={[styles.summaryValue, { color: netIncome >= 0 ? colors.primary : colors.danger }]}>{netIncome.toFixed(0)}</Text>
          </View>
        </View>

        {/* Transactions List */}
        {grouped.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="receipt-outline" size={48} color={colors.muted} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>لا توجد عمليات</Text>
            {datePeriod !== 'all' && (
              <Text style={[styles.emptySubtext, { color: colors.muted }]}>جرب تغيير الفترة أو الفلتر</Text>
            )}
          </View>
        ) : (
          grouped.map(([date, items]) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={[styles.dateLabel, { color: colors.muted }]}>{formatDateLabel(date)}</Text>
              {items.map(item => (
                <View
                  key={item.uniqueKey}
                  style={[styles.txRow, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={[styles.txIcon,
                  item.type === 'income'
                    ? { backgroundColor: companies.find((c) => c.name === item.company)?.color || COMPANY_COLORS[item.company || '']?.bg || '#16a34a' }
                    : { backgroundColor: 'rgba(239,68,68,0.1)' },
                  ]}>
                    {item.type === 'income' ? (
                      <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>
                        {companies.find((c) => c.name === item.company)?.nameAr?.[0] || item.company?.[0] || ''}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 18 }}>{getCategoryIcon(item.category || '')}</Text>
                    )}
                  </View>
                  <TouchableOpacity style={styles.txInfo} onPress={() => openEdit(item)} activeOpacity={0.7}>
                    <Text style={[styles.txLabel, { color: colors.foreground }]}>{item.label}</Text>
                    <Text style={[styles.txSublabel, { color: colors.muted }]} numberOfLines={1}>
                      {item.notes || item.sublabel}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.txAmount, { color: item.type === 'income' ? colors.primary : colors.danger }]}>
                    {item.type === 'income' ? '+' : '-'}{item.amount.toFixed(0)}
                  </Text>
                  <View style={styles.txActions}>
                    <TouchableOpacity
                      style={[styles.txActionBtn, { backgroundColor: 'rgba(32,223,108,0.1)' }]}
                      onPress={() => openEdit(item)}
                    >
                      <Ionicons name="create-outline" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.txActionBtn, { backgroundColor: 'rgba(239,68,68,0.1)' }]}
                      onPress={() => handleDeleteFromList(item)}
                    >
                      <Ionicons name="trash-outline" size={16} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>
                تعديل {editItem?.type === 'income' ? 'الدخل' : 'المصروف'}
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.fieldLabel, { color: colors.primary }]}>المبلغ (ج.م)</Text>
              <TextInput
                style={[styles.fieldInput, { backgroundColor: colors.accent, color: colors.foreground, borderColor: colors.border }]}
                value={editAmount}
                onChangeText={setEditAmount}
                keyboardType="numeric"
                textAlign="right"
              />

              <Text style={[styles.fieldLabel, { color: colors.primary }]}>التاريخ</Text>
              <TextInput
                style={[styles.fieldInput, { backgroundColor: colors.accent, color: colors.foreground, borderColor: colors.border }]}
                value={editDate}
                onChangeText={setEditDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.muted}
                textAlign="right"
              />

              {editItem?.type === 'income' && (
                <>
                  <Text style={[styles.fieldLabel, { color: colors.primary }]}>الشركة</Text>
                  <View style={styles.companyRow}>
                    {companies.map(c => (
                      <TouchableOpacity
                        key={c.id}
                        style={[
                          styles.companyChip,
                          {
                            backgroundColor: editCompany === c.name ? c.color || COMPANY_COLORS[c.name]?.bg || '#16a34a' : colors.accent,
                            borderColor: editCompany === c.name ? c.color || COMPANY_COLORS[c.name]?.bg || '#16a34a' : colors.border,
                          },
                        ]}
                        onPress={() => setEditCompany(c.name)}
                      >
                        <Text style={{
                          color: editCompany === c.name ? '#fff' : colors.foreground,
                          fontSize: 13, fontWeight: '700',
                        }}>{c.nameAr || c.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {editItem?.type === 'expense' && (
                <>
                  <Text style={[styles.fieldLabel, { color: colors.primary }]}>الفئة</Text>
                  <View style={styles.categoryGrid}>
                    {EXPENSE_CATEGORIES.map(cat => (
                      <TouchableOpacity
                        key={cat.id}
                        style={[
                          styles.categoryChip,
                          {
                            backgroundColor: editCategory === cat.id ? 'rgba(32,223,108,0.15)' : colors.accent,
                            borderColor: editCategory === cat.id ? colors.primary : colors.border,
                          },
                        ]}
                        onPress={() => setEditCategory(cat.id)}
                      >
                        <Text style={{ fontSize: 16 }}>{cat.icon}</Text>
                        <Text style={[styles.categoryChipText, { color: editCategory === cat.id ? colors.primary : colors.foreground }]}>
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <Text style={[styles.fieldLabel, { color: colors.primary }]}>ملاحظات</Text>
              <TextInput
                style={[styles.fieldInput, styles.notesInput, { backgroundColor: colors.accent, color: colors.foreground, borderColor: colors.border }]}
                value={editNotes}
                onChangeText={setEditNotes}
                placeholder="ملاحظات اختيارية..."
                placeholderTextColor={colors.muted}
                multiline
                textAlign="right"
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.deleteBtn, { borderColor: colors.danger, backgroundColor: 'rgba(239,68,68,0.08)' }]}
                onPress={handleDeleteFromModal}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color={colors.danger} size="small" />
                ) : (
                  <>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                    <Text style={[styles.deleteBtnText, { color: colors.danger }]}>حذف</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveEdit}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <>
                    <Ionicons name="checkmark" size={18} color="#000" />
                    <Text style={styles.saveBtnText}>حفظ التعديلات</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 14, borderBottomWidth: 1,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  // Main scrollable area
  mainScroll: { flex: 1 },
  mainScrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },
  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, height: 44,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 14, height: 44 },
  // Date period
  datePeriodRow: {
    flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 3,
    marginBottom: 8,
  },
  datePeriodTab: {
    flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center',
  },
  datePeriodText: { fontSize: 13, fontWeight: '700' },
  dateNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 6, gap: 14, marginBottom: 4,
  },
  dateNavBtn: { padding: 4 },
  dateNavLabel: { fontSize: 14, fontWeight: '700' },
  // Filter chips - simple row, no nested ScrollView
  filterRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  filterText: { fontSize: 13, fontWeight: '600' },
  // Summary
  summaryRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  summaryCard: {
    flex: 1, borderRadius: 12, borderWidth: 1, padding: 12, alignItems: 'center',
  },
  summaryLabel: { fontSize: 10, marginBottom: 4 },
  summaryValue: { fontSize: 16, fontWeight: '800' },
  // Transactions
  dateGroup: { marginBottom: 4 },
  dateLabel: { fontSize: 13, fontWeight: '700', marginTop: 8, marginBottom: 8 },
  txRow: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 14, borderWidth: 1, marginBottom: 8,
  },
  txIcon: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
  },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontWeight: '600' },
  txSublabel: { fontSize: 12, marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '700', marginHorizontal: 8 },
  txActions: { flexDirection: 'row', gap: 6, marginLeft: 4 },
  txActionBtn: {
    width: 32, height: 32, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  emptyCard: {
    borderRadius: 16, borderWidth: 1, padding: 40, alignItems: 'center',
    marginTop: 40, gap: 12,
  },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptySubtext: { fontSize: 13 },
  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 24, paddingTop: 20, paddingBottom: 36,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  fieldLabel: { fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 16 },
  fieldInput: {
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 14,
    height: 48, fontSize: 16,
  },
  notesInput: { height: 80, textAlignVertical: 'top', paddingTop: 12 },
  companyRow: { flexDirection: 'row', gap: 10 },
  companyChip: {
    flex: 1, height: 44, borderRadius: 12, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1,
  },
  categoryChipText: { fontSize: 13, fontWeight: '600' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14,
    borderWidth: 1,
  },
  deleteBtnText: { fontSize: 14, fontWeight: '700' },
  saveBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 14,
  },
  saveBtnText: { color: '#000', fontSize: 15, fontWeight: '700' },
});
