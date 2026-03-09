import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, } from 'react-native';
import Text from '../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIncomes, useExpenses, useCompanies } from '../hooks/useData';
import { COMPANY_COLORS, getCategoryLabel, getCategoryIcon } from '../constants/theme';

type Period = 'daily' | 'monthly' | 'yearly';

const MONTH_NAMES = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const DAY_NAMES = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ReportsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { incomes, refresh: refreshIncomes } = useIncomes();
  const { expenses, refresh: refreshExpenses } = useExpenses();
  const { companies } = useCompanies();
  const [period, setPeriod] = useState<Period>('monthly');
  const [refreshing, setRefreshing] = useState(false);

  // Date navigation state
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshIncomes(), refreshExpenses()]);
    setRefreshing(false);
  };

  const navigateDate = (dir: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    if (period === 'daily') d.setDate(d.getDate() + (dir === 'next' ? 1 : -1));
    else if (period === 'monthly') d.setMonth(d.getMonth() + (dir === 'next' ? 1 : -1));
    else d.setFullYear(d.getFullYear() + (dir === 'next' ? 1 : -1));
    setSelectedDate(d);
  };

  const dateRangeLabel = useMemo(() => {
    if (period === 'daily') {
      const today = formatDate(new Date());
      const sel = formatDate(selectedDate);
      if (sel === today) return 'اليوم';
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (sel === formatDate(yesterday)) return 'أمس';
      return `${DAY_NAMES[selectedDate.getDay()]} ${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]}`;
    }
    if (period === 'monthly') return `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
    return `${selectedDate.getFullYear()}`;
  }, [period, selectedDate]);

  // Filter data by period
  const { periodIncomes, periodExpenses } = useMemo(() => {
    let startDate: string, endDate: string;
    if (period === 'daily') {
      startDate = endDate = formatDate(selectedDate);
    } else if (period === 'monthly') {
      startDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-01`;
      const last = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      endDate = formatDate(last);
    } else {
      startDate = `${selectedDate.getFullYear()}-01-01`;
      endDate = `${selectedDate.getFullYear()}-12-31`;
    }
    return {
      periodIncomes: incomes.filter(i => i.date >= startDate && i.date <= endDate),
      periodExpenses: expenses.filter(e => e.date >= startDate && e.date <= endDate),
    };
  }, [incomes, expenses, period, selectedDate]);

  const totalIncome = periodIncomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = periodExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitPct = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  // Company breakdown
  const companyData = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    periodIncomes.forEach(i => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    const entries = Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
    return entries;
  }, [periodIncomes]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const map: Record<string, { amount: number; count: number }> = {};
    periodExpenses.forEach(e => {
      const label = getCategoryLabel(e.category, e.customCategory || undefined);
      if (!map[label]) map[label] = { amount: 0, count: 0 };
      map[label].amount += e.amount;
      map[label].count += 1;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [periodExpenses]);

  // Chart data (last 7 days / 12 months of selected year / last 5 years)
  const chartData = useMemo(() => {
    const bars: { label: string; income: number; expense: number }[] = [];
    if (period === 'daily') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - i);
        const ds = formatDate(d);
        const inc = incomes.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
        const exp = expenses.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: String(d.getDate()), income: inc, expense: exp });
      }
    } else if (period === 'monthly') {
      // 12 months of selected year
      for (let m = 0; m < 12; m++) {
        const start = `${selectedDate.getFullYear()}-${String(m + 1).padStart(2, '0')}-01`;
        const last = new Date(selectedDate.getFullYear(), m + 1, 0);
        const end = formatDate(last);
        const inc = incomes.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        const exp = expenses.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: MONTH_NAMES[m].substring(0, 3), income: inc, expense: exp });
      }
    } else {
      // Last 5 years
      for (let i = 4; i >= 0; i--) {
        const y = selectedDate.getFullYear() - i;
        const start = `${y}-01-01`;
        const end = `${y}-12-31`;
        const inc = incomes.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        const exp = expenses.filter(x => x.date >= start && x.date <= end).reduce((s, x) => s + x.amount, 0);
        bars.push({ label: y.toString(), income: inc, expense: exp });
      }
    }
    return bars;
  }, [incomes, expenses, period, selectedDate]);

  const maxChartVal = Math.max(...chartData.map(b => Math.max(b.income, b.expense)), 1);

  // Daily averages and stats
  const stats = useMemo(() => {
    const expenseCount = periodExpenses.length;
    let days = 1;
    if (period === 'monthly') {
      days = Math.min(selectedDate.getDate(), new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate());
      const today = new Date();
      if (selectedDate.getFullYear() === today.getFullYear() && selectedDate.getMonth() === today.getMonth()) {
        days = today.getDate();
      }
    } else if (period === 'yearly') {
      const today = new Date();
      if (selectedDate.getFullYear() === today.getFullYear()) {
        const start = new Date(today.getFullYear(), 0, 1);
        days = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      } else {
        const y = selectedDate.getFullYear();
        const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
        days = isLeap ? 366 : 365;
      }
    }
    const avgDailyIncome = days > 0 ? totalIncome / days : 0;
    const avgDailyExpense = days > 0 ? totalExpense / days : 0;
    return { expenseCount, avgDailyIncome, avgDailyExpense, days };
  }, [periodIncomes, periodExpenses, totalIncome, totalExpense, period, selectedDate]);

  // Recent transactions
  const recentTransactions = useMemo(() => {
    const all = [
      ...periodIncomes.map(i => ({ id: `i-${i.id}`, type: 'income' as const, label: i.company, amount: i.amount, date: i.date, company: i.company })),
      ...periodExpenses.map(e => ({ id: `e-${e.id}`, type: 'expense' as const, label: getCategoryLabel(e.category, e.customCategory || undefined), amount: e.amount, date: e.date, category: e.category })),
    ];
    all.sort((a, b) => (a.date > b.date ? -1 : 1));
    return all.slice(0, 5);
  }, [periodIncomes, periodExpenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>التقارير المالية</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Period Selector */}
        <View style={[styles.periodRow, { backgroundColor: colors.accent, borderColor: colors.border }]}>
          {(['daily', 'monthly', 'yearly'] as Period[]).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.periodTab, period === p && { backgroundColor: colors.primary }]}
              onPress={() => { setPeriod(p); setSelectedDate(new Date()); }}
            >
              <Text style={[styles.periodText, { color: period === p ? '#000' : colors.muted }]}>
                {p === 'daily' ? 'يومي' : p === 'monthly' ? 'شهري' : 'سنوي'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Navigation */}
        <View style={styles.dateNav}>
          <TouchableOpacity onPress={() => navigateDate('next')} style={styles.dateNavBtn}>
            <Ionicons name="chevron-forward" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.dateNavLabel, { color: colors.foreground }]}>{dateRangeLabel}</Text>
          <TouchableOpacity onPress={() => navigateDate('prev')} style={styles.dateNavBtn}>
            <Ionicons name="chevron-back" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Performance Chart */}
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>أداء الفترة</Text>
          <View style={styles.chartRow}>
            {chartData.map((bar, idx) => (
              <View key={idx} style={styles.chartBarGroup}>
                <View style={styles.chartBarsWrap}>
                  <View
                    style={[
                      styles.chartBarIncome,
                      {
                        height: Math.max((bar.income / maxChartVal) * 80, 4),
                        backgroundColor: colors.primary
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.chartBarExpense,
                      {
                        height: Math.max((bar.expense / maxChartVal) * 80, 4),
                        backgroundColor: colors.danger,
                        opacity: 0.6
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.chartLabel, { color: colors.muted }]}>{bar.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendText, { color: colors.muted }]}>دخل</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.danger, opacity: 0.6 }]} />
              <Text style={[styles.legendText, { color: colors.muted }]}>مصروفات</Text>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: 'rgba(32,223,108,0.08)', borderColor: 'rgba(32,223,108,0.2)' }]}>
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(32,223,108,0.15)' }]}>
              <Ionicons name="arrow-down" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>إجمالي الدخل</Text>
            <Text style={[styles.metricValue, { color: colors.primary }]}>{totalIncome.toFixed(0)}</Text>
            <Text style={[styles.metricUnit, { color: colors.muted }]}>ج.م • {stats.days} يوم</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }]}>
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(239,68,68,0.15)' }]}>
              <Ionicons name="arrow-up" size={16} color={colors.danger} />
            </View>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>إجمالي المصاريف</Text>
            <Text style={[styles.metricValue, { color: colors.danger }]}>{totalExpense.toFixed(0)}</Text>
            <Text style={[styles.metricUnit, { color: colors.muted }]}>ج.م • {stats.expenseCount} عملية</Text>
          </View>
        </View>

        {/* Net Profit Card */}
        <View style={[styles.profitCard, { borderColor: netProfit >= 0 ? 'rgba(32,223,108,0.3)' : 'rgba(239,68,68,0.3)' }]}>
          <View style={styles.profitRow}>
            <View>
              <Text style={[styles.profitLabel, { color: colors.muted }]}>صافي الربح</Text>
              <Text style={[styles.profitValue, { color: netProfit >= 0 ? colors.primary : colors.danger }]}>
                {netProfit.toFixed(0)} ج.م
              </Text>
            </View>
            <View style={[
              styles.profitBadge,
              { backgroundColor: netProfit >= 0 ? 'rgba(32,223,108,0.15)' : 'rgba(239,68,68,0.15)' },
            ]}>
              <Ionicons name={netProfit >= 0 ? 'trending-up' : 'trending-down'} size={14} color={netProfit >= 0 ? colors.primary : colors.danger} />
              <Text style={{ color: netProfit >= 0 ? colors.primary : colors.danger, fontSize: 13, fontWeight: '700' }}>
                {profitPct.toFixed(0)}%
              </Text>
            </View>
          </View>
          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.muted }]}>متوسط الدخل اليومي</Text>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{stats.avgDailyIncome.toFixed(0)} ج.م</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.muted }]}>عدد الأيام</Text>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{stats.days} يوم</Text>
            </View>
          </View>
        </View>

        {/* Platform Breakdown */}
        {companyData.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>توزيع الدخل حسب المنصة</Text>
            {companyData.map(([company, data]) => {
              const pct = totalIncome > 0 ? (data.amount / totalIncome) * 100 : 0;
              const companyObj = companies.find((c) => c.name === company);
              const bg = companyObj?.color || COMPANY_COLORS[company]?.bg || '#333';
              const text = COMPANY_COLORS[company]?.text || '#fff';
              return (
                <View key={company} style={styles.platformRow}>
                  <View style={styles.platformInfo}>
                    <View style={[styles.platformLogo, { backgroundColor: bg }]}>
                      <Text style={[styles.platformLogoText, { color: text }]}>
                        {companyObj?.nameAr?.[0] || company[0]}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.platformNameRow}>
                        <Text style={[styles.platformName, { color: colors.foreground }]}>{companyObj?.nameAr || company}</Text>
                        <Text style={[styles.platformAmount, { color: colors.foreground }]}>{data.amount.toFixed(0)} ج.م</Text>
                      </View>
                      <Text style={[styles.platformMeta, { color: colors.muted }]}>{pct.toFixed(0)}%</Text>
                      <View style={[styles.platformBar, { backgroundColor: colors.accent }]}>
                        <View style={[styles.platformBarFill, { width: `${pct}%`, backgroundColor: bg }]} />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Expense Breakdown */}
        {categoryData.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>توزيع المصاريف حسب الفئة</Text>
            {categoryData.map(([cat, data]) => {
              const pct = totalExpense > 0 ? (data.amount / totalExpense) * 100 : 0;
              return (
                <View key={cat} style={styles.categoryRow}>
                  <View style={styles.categoryInfo}>
                    <Text style={{ fontSize: 22 }}>{getCategoryIcon(cat)}</Text>
                    <View style={{ flex: 1 }}>
                      <View style={styles.platformNameRow}>
                        <Text style={[styles.platformName, { color: colors.foreground }]}>{getCategoryLabel(cat)}</Text>
                        <Text style={[styles.platformAmount, { color: colors.danger }]}>-{data.amount.toFixed(0)} ج.م</Text>
                      </View>
                      <Text style={[styles.platformMeta, { color: colors.muted }]}>{data.count} عملية • {pct.toFixed(0)}%</Text>
                      <View style={[styles.platformBar, { backgroundColor: colors.accent }]}>
                        <View style={[styles.platformBarFill, { width: `${pct}%`, backgroundColor: colors.danger, opacity: 0.7 }]} />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>آخر العمليات</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                <Text style={[styles.sectionLink, { color: colors.primary }]}>عرض الكل</Text>
              </TouchableOpacity>
            </View>
            {recentTransactions.map(tx => {
              const companyObj = tx.type === 'income' ? companies.find((c) => c.name === tx.company) : null;
              return (
                <View key={tx.id} style={[styles.txRow, { borderTopColor: colors.border }]}>
                  <View style={[
                    styles.txIcon,
                    tx.type === 'income'
                      ? { backgroundColor: companyObj?.color || COMPANY_COLORS[tx.company || '']?.bg || '#16a34a' }
                      : { backgroundColor: 'rgba(239,68,68,0.1)' },
                  ]}>
                    {tx.type === 'income' ? (
                      <Text style={{ color: '#fff', fontSize: 8, fontWeight: '800' }}>
                        {companyObj?.nameAr?.[0] || tx.company?.[0] || ''}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 16 }}>{getCategoryIcon(tx.category || '')}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.txLabel, { color: colors.foreground }]}>{tx.label}</Text>
                    <Text style={[styles.txDate, { color: colors.muted }]}>{tx.date}</Text>
                  </View>
                  <Text style={[styles.txAmount, { color: tx.type === 'income' ? colors.primary : colors.danger }]}>
                    {tx.type === 'income' ? '+' : '-'}{tx.amount.toFixed(0)}
                  </Text>
                </View>
              )
            })}
          </View>
        )}

        {/* Empty state */}
        {totalIncome === 0 && totalExpense === 0 && (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="analytics-outline" size={48} color={colors.muted} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>لا يوجد بيانات</Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>ابدأ بإضافة دخل أو مصروفات لتظهر التقارير هنا</Text>
            <View style={styles.emptyActions}>
              <TouchableOpacity
                style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('AddIncome')}
              >
                <Ionicons name="add" size={18} color="#000" />
                <Text style={styles.emptyBtnText}>إضافة دخل</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.emptyBtn, { backgroundColor: 'rgba(239,68,68,0.15)', borderWidth: 1, borderColor: colors.danger }]}
                onPress={() => navigation.navigate('AddExpense')}
              >
                <Ionicons name="remove" size={18} color={colors.danger} />
                <Text style={[styles.emptyBtnText, { color: colors.danger }]}>إضافة مصروف</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
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
  content: { padding: 16 },
  // Period selector
  periodRow: {
    flexDirection: 'row', borderRadius: 14, borderWidth: 1, padding: 4,
  },
  periodTab: {
    flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
  },
  periodText: { fontSize: 14, fontWeight: '700' },
  // Date navigation
  dateNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, gap: 16,
  },
  dateNavBtn: { padding: 6 },
  dateNavLabel: { fontSize: 16, fontWeight: '700' },
  // Chart
  chartCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  chartRow: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end',
    height: 100, marginBottom: 8,
  },
  chartBarGroup: { alignItems: 'center', flex: 1 },
  chartBarsWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginBottom: 6 },
  chartBarIncome: { width: 12, borderRadius: 4 },
  chartBarExpense: { width: 12, borderRadius: 4 },
  chartLabel: { fontSize: 10, fontWeight: '600' },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11 },
  // Metrics
  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  metricCard: {
    flex: 1, borderRadius: 16, padding: 16, borderWidth: 1,
  },
  metricIcon: {
    width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: { fontSize: 11, fontWeight: '500', marginBottom: 4 },
  metricValue: { fontSize: 22, fontWeight: '800' },
  metricUnit: { fontSize: 11, marginTop: 4 },
  // Profit card
  profitCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
    backgroundColor: 'rgba(32,223,108,0.04)',
  },
  profitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  profitLabel: { fontSize: 13, fontWeight: '500', marginBottom: 4 },
  profitValue: { fontSize: 28, fontWeight: '800' },
  profitBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
  },
  statsRow: { flexDirection: 'row' },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 11, marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: '700' },
  statDivider: { width: 1, height: '100%', marginHorizontal: 8 },
  // Platform breakdown
  sectionCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 8,
  },
  sectionLink: { fontSize: 12, fontWeight: '600' },
  platformRow: { marginBottom: 14 },
  platformInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  platformLogo: {
    width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
  },
  platformLogoText: { fontSize: 9, fontWeight: '800' },
  platformNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  platformName: { fontSize: 14, fontWeight: '600' },
  platformAmount: { fontSize: 14, fontWeight: '700' },
  platformMeta: { fontSize: 11, marginTop: 2, marginBottom: 6 },
  platformBar: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
  platformBarFill: { height: '100%', borderRadius: 3 },
  // Category breakdown
  categoryRow: { marginBottom: 14 },
  categoryInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  // Recent transactions
  txRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1,
  },
  txIcon: {
    width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    marginLeft: 12,
  },
  txLabel: { fontSize: 14, fontWeight: '600' },
  txDate: { fontSize: 11, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '700' },
  // Empty state
  emptyCard: {
    borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center', marginTop: 20, gap: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyText: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  emptyActions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  emptyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
  },
  emptyBtnText: { color: '#000', fontSize: 13, fontWeight: '700' },
});
