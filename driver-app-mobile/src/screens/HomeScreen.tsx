import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image, } from 'react-native';
import Text from '../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useIncomes, useExpenses, useCompanies } from '../hooks/useData';
import { goalsAPI, notificationsAPI, adsAPI } from '../services/api';
import { COMPANY_COLORS, getCategoryLabel, getCategoryIcon } from '../constants/theme';
import { Linking } from 'react-native';

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonthStart(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

function getMonthEnd(d: Date): string {
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return formatDate(last);
}

const MONTH_NAMES_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
  const { settings: site } = useSiteSettings();
  const { incomes, refresh: refreshIncomes } = useIncomes();
  const { expenses, refresh: refreshExpenses } = useExpenses();
  const { companies } = useCompanies();
  const [monthGoal, setMonthGoal] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [ads, setAds] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const today = new Date();
  const todayStr = formatDate(today);
  const monthStart = getMonthStart(today);
  const monthEnd = getMonthEnd(today);
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    loadGoalsAndNotifications();
  }, []);

  const loadGoalsAndNotifications = async () => {
    try {
      const goals = await goalsAPI.getAll();
      const g = goals.find((g: any) => g.month === currentMonth);
      if (g) setMonthGoal(g.targetAmount);
    } catch { }
    try {
      const notifs = await notificationsAPI.getAll();
      setUnreadCount(notifs.filter((n: any) => !n.read).length);
    } catch { }
    try {
      const allAds = await adsAPI.getAll();
      setAds(allAds.filter((a: any) => a.isActive));
    } catch { }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshIncomes(), refreshExpenses(), loadGoalsAndNotifications()]);
    setRefreshing(false);
  };

  const todayIncomeTotal = useMemo(() =>
    incomes.filter(i => i.date === todayStr).reduce((s, i) => s + i.amount, 0), [incomes, todayStr]);
  const todayExpenseTotal = useMemo(() =>
    expenses.filter(e => e.date === todayStr).reduce((s, e) => s + e.amount, 0), [expenses, todayStr]);

  const monthIncomeTotal = useMemo(() =>
    incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0), [incomes, monthStart, monthEnd]);
  const monthExpenseTotal = useMemo(() =>
    expenses.filter(e => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);

  const monthProfit = monthIncomeTotal - monthExpenseTotal;
  const daysInMonth = today.getDate();
  const dailyAverage = daysInMonth > 0 ? monthIncomeTotal / daysInMonth : 0;
  const daysRemaining = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - daysInMonth;
  const projectedMonthEnd = monthIncomeTotal + (dailyAverage * daysRemaining);
  const profitPct = monthIncomeTotal > 0 ? (monthProfit / monthIncomeTotal) * 100 : 0;
  const goalPct = monthGoal ? Math.min((monthIncomeTotal / monthGoal) * 100, 100) : 0;

  const companyBreakdown = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).forEach(i => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    return map;
  }, [incomes, monthStart, monthEnd]);

  // Total (all-time) company breakdown
  const totalCompanyBreakdown = useMemo(() => {
    const map: Record<string, { amount: number }> = {};
    incomes.forEach(i => {
      if (!map[i.company]) map[i.company] = { amount: 0 };
      map[i.company].amount += i.amount;
    });
    return map;
  }, [incomes]);

  const totalAllIncome = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0), [incomes]);
  const totalAllExpense = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const totalExpenseCount = expenses.length;

  // All-time expense category breakdown
  const totalExpenseCategoryBreakdown = useMemo(() => {
    const map: Record<string, { amount: number; count: number }> = {};
    expenses.forEach(e => {
      const label = getCategoryLabel(e.category, e.customCategory || undefined);
      if (!map[label]) map[label] = { amount: 0, count: 0 };
      map[label].amount += e.amount;
      map[label].count += 1;
    });
    return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
  }, [expenses]);

  const todayActivity = useMemo(() => {
    const items: any[] = [];
    incomes.filter(i => i.date === todayStr).forEach(i =>
      items.push({ id: `i-${i.id}`, type: 'income', company: i.company, amount: i.amount, notes: i.notes }));
    expenses.filter(e => e.date === todayStr).forEach(e =>
      items.push({ id: `e-${e.id}`, type: 'expense', category: e.category, customCategory: e.customCategory, amount: e.amount, notes: e.notes }));
    return items.slice(0, 5);
  }, [incomes, expenses, todayStr]);

  // Last 7 days data for mini chart
  const weeklyData = useMemo(() => {
    const days: { label: string; income: number; expense: number }[] = [];
    const dayNames = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = formatDate(d);
      const inc = incomes.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
      const exp = expenses.filter(x => x.date === ds).reduce((s, x) => s + x.amount, 0);
      days.push({ label: dayNames[d.getDay()], income: inc, expense: exp });
    }
    return days;
  }, [incomes, expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>{user?.name?.charAt(0) || 'س'}</Text>
            <View style={[styles.avatarDot, { backgroundColor: colors.primary, borderColor: colors.card }]} />
          </View>
          <View>
            {!!site.name && (
              <Text style={[styles.appName, { color: colors.muted }]} numberOfLines={1}>
                {site.name}
              </Text>
            )}
            <Text style={[styles.greeting, { color: colors.muted }]}>مرحباً بك</Text>
            <Text style={[styles.userName, { color: colors.foreground }]}>{user?.name || 'سائق'}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {!!site.logoUrl && (
            <Image source={{ uri: site.logoUrl }} style={styles.appLogo} />
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={colors.muted} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.muted} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Ads Section */}
        {ads.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.adsScroll}
          >
            {ads.map((ad, idx) => (
              <TouchableOpacity
                key={ad.id || idx}
                activeOpacity={0.9}
                onPress={() => ad.link ? Linking.openURL(ad.link) : null}
                style={[styles.adCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                {ad.imageUrl ? (
                  <Image source={{ uri: ad.imageUrl }} style={styles.adImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.adImagePlaceholder, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                    <Ionicons name="megaphone-outline" size={32} color={colors.primary} />
                  </View>
                )}
                <View style={styles.adContent}>
                  <Text style={[styles.adTitle, { color: colors.foreground }]} numberOfLines={1}>{ad.title}</Text>
                  {ad.description ? (
                    <Text style={[styles.adDesc, { color: colors.muted }]} numberOfLines={2}>{ad.description}</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Net Profit Card */}
        <View style={styles.profitCard}>
          <View style={styles.profitHeader}>
            <Text style={styles.profitLabel}>صافي الربح الشهري</Text>
            {profitPct > 0 && (
              <View style={styles.profitBadge}>
                <Ionicons name="trending-up" size={12} color="#20df6c" />
                <Text style={styles.profitBadgeText}>{profitPct.toFixed(0)}%</Text>
              </View>
            )}
          </View>
          <Text style={styles.profitAmount}>{monthProfit.toFixed(0)} <Text style={styles.profitCurrency}>ج.م</Text></Text>
          <Text style={styles.profitDate}>
            1 {MONTH_NAMES_AR[today.getMonth()]} - {today.getDate()} {MONTH_NAMES_AR[today.getMonth()]}
          </Text>
        </View>

        {/* Today's Summary */}
        <View style={styles.todaySummaryRow}>
          <View style={[styles.todayCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.todayIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
              <Ionicons name="arrow-down" size={14} color={colors.primary} />
            </View>
            <Text style={[styles.todayLabel, { color: colors.muted }]}>دخل اليوم</Text>
            <Text style={[styles.todayValue, { color: colors.primary }]}>{todayIncomeTotal.toFixed(0)}</Text>
          </View>
          <View style={[styles.todayCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.todayIcon, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
              <Ionicons name="arrow-up" size={14} color={colors.danger} />
            </View>
            <Text style={[styles.todayLabel, { color: colors.muted }]}>مصروف اليوم</Text>
            <Text style={[styles.todayValue, { color: colors.danger }]}>{todayExpenseTotal.toFixed(0)}</Text>
          </View>
        </View>

        {/* Weekly Mini Chart */}
        <View style={[styles.weeklyChart, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.weeklyHeader}>
            <Text style={[styles.weeklyTitle, { color: colors.foreground }]}>أداء الأسبوع</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
              <Text style={[styles.sectionLink, { color: colors.primary }]}>التفاصيل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weeklyBars}>
            {weeklyData.map((day, idx) => {
              const maxVal = Math.max(...weeklyData.map(d => d.income), 1);
              const barH = Math.max((day.income / maxVal) * 48, 4);
              const isToday = idx === 6;
              return (
                <View key={idx} style={styles.weeklyBarCol}>
                  <View style={[
                    styles.weeklyBar,
                    {
                      height: barH,
                      backgroundColor: isToday ? colors.primary : 'rgba(32,223,108,0.3)',
                      borderRadius: 4,
                    },
                  ]} />
                  <Text style={[
                    styles.weeklyBarLabel,
                    { color: isToday ? colors.primary : colors.muted },
                  ]}>{day.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Income Sources - Monthly */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>مصادر الدخل - {MONTH_NAMES_AR[today.getMonth()]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
            <Text style={[styles.sectionLink, { color: colors.primary }]}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.companyScroll}>
          {companies.map((company: any) => {
            const data = companyBreakdown[company.name];
            const amount = data ? data.amount : 0;
            const pct = monthIncomeTotal > 0 ? ((amount / monthIncomeTotal) * 100).toFixed(0) : '0';
            const bg = company.color || COMPANY_COLORS[company.name]?.bg || '#16a34a';
            const text = COMPANY_COLORS[company.name]?.text || '#FFFFFF';
            return (
              <View key={company.id} style={[styles.companyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.companyLogo, { backgroundColor: bg }]}>
                  <Text style={[styles.companyLogoText, { color: text }]}>
                    {company.nameAr?.[0] || company.name[0]}
                  </Text>
                </View>
                <Text style={[styles.companyAmount, { color: colors.foreground }]}>{amount.toFixed(0)} <Text style={{ fontSize: 11, color: colors.muted }}>ج.م</Text></Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>{pct}%</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Total Income Breakdown */}
        <View style={[styles.totalBreakdownCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.totalBreakdownTitle, { color: colors.foreground }]}>إجمالي الدخل حسب الشركة</Text>
          {companies.map((company: any) => {
            const data = totalCompanyBreakdown[company.name];
            const amount = data ? data.amount : 0;
            const pct = totalAllIncome > 0 ? (amount / totalAllIncome) * 100 : 0;
            const bg = company.color || COMPANY_COLORS[company.name]?.bg || '#16a34a';
            return (
              <View key={company.id} style={styles.breakdownRow}>
                <View style={styles.breakdownLeft}>
                  <View style={[styles.breakdownDot, { backgroundColor: bg }]} />
                  <Text style={[styles.breakdownName, { color: colors.foreground }]}>{company.nameAr || company.name}</Text>
                </View>
                <View style={styles.breakdownBarWrap}>
                  <View style={[styles.breakdownBarBg, { backgroundColor: colors.accent }]}>
                    <View style={[styles.breakdownBarFill, { width: `${pct}%`, backgroundColor: bg }]} />
                  </View>
                </View>
                <View style={styles.breakdownRight}>
                  <Text style={[styles.breakdownAmount, { color: colors.foreground }]}>{amount.toFixed(0)}</Text>
                  <Text style={[styles.breakdownPct, { color: colors.muted }]}>{pct.toFixed(0)}%</Text>
                </View>
              </View>
            );
          })}
          <View style={[styles.breakdownTotal, { borderTopColor: colors.border }]}>
            <Text style={[styles.breakdownTotalLabel, { color: colors.muted }]}>الإجمالي</Text>
            <Text style={[styles.breakdownTotalValue, { color: colors.primary }]}>{totalAllIncome.toFixed(0)} ج.م</Text>
          </View>
        </View>

        {/* Total Expenses Card (All-Time) */}
        <View style={[styles.totalExpenseCard, { borderColor: 'rgba(239,68,68,0.25)' }]}>
          <View style={styles.totalExpenseHeader}>
            <View style={styles.totalExpenseHeaderLeft}>
              <View style={styles.totalExpenseIconBox}>
                <Ionicons name="wallet-outline" size={18} color="#ef4444" />
              </View>
              <View>
                <Text style={[styles.totalExpenseTitle, { color: colors.foreground }]}>إجمالي المصروفات</Text>
                <Text style={[styles.totalExpenseSubtitle, { color: colors.muted }]}>منذ البداية · {totalExpenseCount} عملية</Text>
              </View>
            </View>
            <View style={styles.totalExpenseBadge}>
              <Text style={styles.totalExpenseBadgeText}>الكل</Text>
            </View>
          </View>
          <Text style={styles.totalExpenseAmount}>{totalAllExpense.toFixed(0)} <Text style={styles.totalExpenseCurrency}>ج.م</Text></Text>
          {totalExpenseCategoryBreakdown.length > 0 && (
            <View style={styles.totalExpenseCategories}>
              {totalExpenseCategoryBreakdown.slice(0, 4).map(([label, data], idx) => {
                const pct = totalAllExpense > 0 ? (data.amount / totalAllExpense) * 100 : 0;
                return (
                  <View key={label} style={styles.totalExpenseCatRow}>
                    <View style={styles.totalExpenseCatInfo}>
                      <Text style={[styles.totalExpenseCatName, { color: colors.foreground }]}>{label}</Text>
                      {idx === 0 && <View style={styles.highestTag}><Text style={styles.highestTagText}>الأعلى</Text></View>}
                    </View>
                    <View style={styles.totalExpenseCatBarWrap}>
                      <View style={[styles.totalExpenseCatBarBg, { backgroundColor: colors.accent }]}>
                        <View style={[styles.totalExpenseCatBarFill, { width: `${pct}%` }]} />
                      </View>
                    </View>
                    <Text style={[styles.totalExpenseCatAmount, { color: colors.danger || '#ef4444' }]}>-{data.amount.toFixed(0)}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24, marginBottom: 12 }]}>إجراءات سريعة</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('AddIncome')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconBox}>
              <Ionicons name="add" size={24} color="#000" />
            </View>
            <Text style={styles.actionTextDark}>إضافة دخل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#2a1818', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' }]}
            onPress={() => navigation.navigate('AddExpense')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
              <Ionicons name="remove" size={24} color="#ef4444" />
            </View>
            <Text style={[styles.actionTextDark, { color: '#ef4444' }]}>إضافة مصروف</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Activity */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>نشاط اليوم</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={[styles.sectionLink, { color: colors.muted }]}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        {todayActivity.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>لا يوجد نشاط اليوم بعد</Text>
          </View>
        ) : (
          todayActivity.map(item => (
            <View key={item.id} style={[styles.activityItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[
                styles.activityIcon,
                item.type === 'income'
                  ? { backgroundColor: COMPANY_COLORS[item.company]?.bg || '#16a34a' }
                  : { backgroundColor: 'rgba(239,68,68,0.1)' }
              ]}>
                {item.type === 'income' ? (
                  <Text style={{ color: COMPANY_COLORS[item.company]?.text || '#fff', fontSize: 10, fontWeight: '700' }}>
                    {item.company === 'InDrive' ? 'inD' : item.company}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>{getCategoryIcon(item.category)}</Text>
                )}
              </View>
              <View style={styles.activityInfo}>
                <Text style={[styles.activityTitle, { color: colors.foreground }]}>
                  {item.type === 'income' ? item.company : getCategoryLabel(item.category, item.customCategory)}
                </Text>
                {item.notes ? <Text style={[styles.activityNotes, { color: colors.muted }]} numberOfLines={1}>{item.notes}</Text> : null}
              </View>
              <Text style={[styles.activityAmount, { color: item.type === 'income' ? colors.primary : colors.danger }]}>
                {item.type === 'income' ? '+' : '-'} {item.amount.toFixed(0)}
              </Text>
            </View>
          ))
        )}

        {/* Monthly Goal Progress */}
        {monthGoal ? (
          <View style={[styles.goalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.goalHeader}>
              <View style={styles.goalHeaderLeft}>
                <View style={[styles.goalIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                  <Ionicons name={goalPct >= 100 ? 'checkmark' : 'flag'} size={14} color={colors.primary} />
                </View>
                <Text style={[styles.goalTitle, { color: colors.foreground }]}>هدف الشهر</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                <Text style={[styles.goalEdit, { color: colors.primary }]}>تعديل</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalProgress}>
              <Text style={[styles.goalProgressText, { color: colors.muted }]}>
                {monthIncomeTotal.toFixed(0)} / {monthGoal.toFixed(0)} ج.م
              </Text>
              <Text style={[styles.goalPct, goalPct >= 100 && { color: colors.primary }]}>
                {goalPct.toFixed(0)}%
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.accent }]}>
              <View style={[styles.progressFill, { width: `${goalPct}%`, backgroundColor: colors.primary }]} />
            </View>
          </View>
        ) : null}

        {/* Smart Insights */}
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24, marginBottom: 12 }]}>إحصائيات ذكية</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(245,158,11,0.1)' }]}>
              <Ionicons name="flash" size={14} color="#f59e0b" />
            </View>
            <Text style={[styles.statLabel, { color: colors.muted }]}>متوسط يومي</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{dailyAverage.toFixed(0)}</Text>
            <Text style={[styles.statUnit, { color: colors.muted }]}>ج.م / يوم</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
              <Ionicons name="flag" size={14} color={colors.primary} />
            </View>
            <Text style={[styles.statLabel, { color: colors.muted }]}>توقع نهاية الشهر</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>{projectedMonthEnd.toFixed(0)}</Text>
            <Text style={[styles.statUnit, { color: colors.muted }]}>ج.م متوقع</Text>
          </View>
        </View>

        {/* Expense Alert */}
        {monthExpenseTotal > monthIncomeTotal * 0.7 && monthIncomeTotal > 0 ? (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ تنبيه المصروفات</Text>
            <Text style={styles.alertText}>المصروفات تجاوزت 70% من الدخل هذا الشهر. حاول تقليل المصاريف لزيادة صافي الربح.</Text>
          </View>
        ) : null}

        {/* Smart Profit Tracking Banner */}
        <TouchableOpacity
          style={[styles.promoBanner, { borderColor: 'rgba(32,223,108,0.2)' }]}
          onPress={() => navigation.navigate('Predictions')}
          activeOpacity={0.8}
        >
          <View style={styles.promoBannerContent}>
            <View style={[styles.promoBannerIcon, { backgroundColor: 'rgba(32,223,108,0.15)' }]}>
              <Ionicons name="analytics-outline" size={22} color="#20df6c" />
            </View>
            <View style={styles.promoBannerInfo}>
              <Text style={styles.promoBannerTitle}>تتبع الأرباح الذكي</Text>
              <Text style={styles.promoBannerDesc}>تابع أرباحك الشهرية بتحليلات ذكية وتوقعات دقيقة</Text>
            </View>
          </View>
          <View style={styles.promoBannerFooter}>
            <Text style={[styles.promoBannerLink, { color: colors.primary }]}>عرض التوقعات</Text>
            <Ionicons name="chevron-back" size={14} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Maintenance Reminder Banner */}
        <TouchableOpacity
          style={[styles.promoBanner, { borderColor: 'rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.05)' }]}
          onPress={() => navigation.navigate('Vehicle')}
          activeOpacity={0.8}
        >
          <View style={styles.promoBannerContent}>
            <View style={[styles.promoBannerIcon, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
              <Ionicons name="construct-outline" size={22} color="#f59e0b" />
            </View>
            <View style={styles.promoBannerInfo}>
              <Text style={styles.promoBannerTitle}>تذكير الصيانة الدورية</Text>
              <Text style={styles.promoBannerDesc}>لا تنسَ مواعيد تغيير الزيت والفلاتر وفحص الإطارات</Text>
            </View>
          </View>
          <View style={styles.promoBannerFooter}>
            <Text style={[styles.promoBannerLink, { color: '#f59e0b' }]}>إدارة الصيانة</Text>
            <Ionicons name="chevron-back" size={14} color="#f59e0b" />
          </View>
        </TouchableOpacity>

        {/* Exclusive Maintenance Offers Banner */}
        <TouchableOpacity
          style={[styles.promoBanner, { borderColor: 'rgba(139,92,246,0.2)', backgroundColor: 'rgba(139,92,246,0.05)' }]}
          activeOpacity={0.8}
        >
          <View style={styles.promoBannerContent}>
            <View style={[styles.promoBannerIcon, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
              <Ionicons name="pricetag-outline" size={22} color="#8b5cf6" />
            </View>
            <View style={styles.promoBannerInfo}>
              <Text style={styles.promoBannerTitle}>عروض الصيانة الحصرية</Text>
              <Text style={styles.promoBannerDesc}>احصل على خصومات حصرية من مراكز الصيانة المعتمدة</Text>
            </View>
          </View>
          <View style={[styles.promoTag, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
            <Ionicons name="gift-outline" size={12} color="#8b5cf6" />
            <Text style={[styles.promoTagText, { color: '#8b5cf6' }]}>عروض خاصة</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  appName: { fontSize: 11, fontWeight: '700', maxWidth: 180 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(32,223,108,0.2)', borderWidth: 2, borderColor: '#20df6c',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700' },
  avatarDot: {
    position: 'absolute', bottom: 0, right: 0, width: 12, height: 12,
    borderRadius: 6, borderWidth: 2,
  },
  greeting: { fontSize: 12, fontWeight: '500' },
  userName: { fontSize: 16, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  appLogo: { width: 28, height: 28, borderRadius: 8, marginRight: 6, backgroundColor: 'rgba(255,255,255,0.06)' },
  iconBtn: { padding: 8, borderRadius: 20, position: 'relative' },
  badge: {
    position: 'absolute', top: 2, right: 2, width: 16, height: 16,
    borderRadius: 8, backgroundColor: '#ef4444',
    justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: '700' },
  content: { padding: 16 },
  profitCard: {
    borderRadius: 16, backgroundColor: '#1c2e24', padding: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  profitHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profitLabel: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  profitBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(32,223,108,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12,
  },
  profitBadgeText: { color: '#20df6c', fontSize: 12, fontWeight: '700' },
  profitAmount: { fontSize: 36, fontWeight: '800', color: '#fff', marginTop: 8 },
  profitCurrency: { fontSize: 18, color: '#6b7280' },
  profitDate: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionLink: { fontSize: 12, fontWeight: '600' },
  companyScroll: { gap: 12 },
  companyCard: {
    width: 140, height: 128, borderRadius: 12, borderWidth: 1,
    padding: 16, justifyContent: 'space-between',
  },
  companyLogo: {
    width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  companyLogoText: { fontSize: 10, fontWeight: '700' },
  companyAmount: { fontSize: 22, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 12 },
  actionCard: {
    flex: 1, height: 96, borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  actionIconBox: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  actionTextDark: { fontSize: 14, fontWeight: '700', color: '#000' },
  emptyCard: {
    borderRadius: 12, borderWidth: 1, padding: 24, alignItems: 'center',
  },
  emptyText: { fontSize: 14 },
  activityItem: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderRadius: 12, borderWidth: 1, marginBottom: 8,
  },
  activityIcon: {
    width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 12,
  },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '600' },
  activityNotes: { fontSize: 12, marginTop: 2 },
  activityAmount: { fontSize: 14, fontWeight: '700' },
  goalCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 24 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  goalHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 12, fontWeight: '700' },
  goalEdit: { fontSize: 10, fontWeight: '600' },
  goalProgress: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  goalProgressText: { fontSize: 10 },
  goalPct: { fontSize: 10, color: '#9ca3af' },
  progressBar: { width: '100%', height: 10, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16 },
  statIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statLabel: { fontSize: 10, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statUnit: { fontSize: 10, marginTop: 2 },
  alertCard: {
    backgroundColor: 'rgba(245,158,11,0.1)', borderWidth: 1, borderColor: 'rgba(245,158,11,0.2)',
    borderRadius: 16, padding: 16, marginTop: 24,
  },
  alertTitle: { fontSize: 14, fontWeight: '700', color: '#f59e0b', marginBottom: 4 },
  alertText: { fontSize: 12, color: '#9ca3af', lineHeight: 20 },
  promoBanner: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 16,
    backgroundColor: 'rgba(32,223,108,0.03)',
  },
  promoBannerContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  promoBannerIcon: {
    width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  promoBannerInfo: { flex: 1 },
  promoBannerTitle: { fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 4 },
  promoBannerDesc: { fontSize: 12, color: '#9ca3af', lineHeight: 18 },
  promoBannerFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    gap: 4, marginTop: 12,
  },
  promoBannerLink: { fontSize: 12, fontWeight: '700' },
  promoTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 20, marginTop: 12,
  },
  promoTagText: { fontSize: 11, fontWeight: '700' },
  // Today's summary
  todaySummaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  todayCard: {
    flex: 1, borderRadius: 14, borderWidth: 1, padding: 12, alignItems: 'center', gap: 6,
  },
  todayIcon: {
    width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  todayLabel: { fontSize: 10, fontWeight: '500' },
  todayValue: { fontSize: 18, fontWeight: '800' },
  // Weekly chart
  weeklyChart: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
  },
  weeklyHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
  },
  weeklyTitle: { fontSize: 14, fontWeight: '700' },
  weeklyBars: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 60,
  },
  weeklyBarCol: { alignItems: 'center', flex: 1, gap: 4 },
  weeklyBar: { width: 16, minHeight: 4 },
  weeklyBarLabel: { fontSize: 9, fontWeight: '600' },
  // Total income breakdown
  totalBreakdownCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginTop: 16,
  },
  totalBreakdownTitle: { fontSize: 14, fontWeight: '700', marginBottom: 14 },
  breakdownRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10,
  },
  breakdownLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 80 },
  breakdownDot: { width: 10, height: 10, borderRadius: 5 },
  breakdownName: { fontSize: 13, fontWeight: '600' },
  breakdownBarWrap: { flex: 1 },
  breakdownBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  breakdownBarFill: { height: 8, borderRadius: 4 },
  breakdownRight: { alignItems: 'flex-end', minWidth: 75 },
  breakdownAmount: { fontSize: 14, fontWeight: '700' },
  breakdownPct: { fontSize: 10 },
  breakdownTotal: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, paddingTop: 12, marginTop: 4,
  },
  breakdownTotalLabel: { fontSize: 13, fontWeight: '600' },
  breakdownTotalValue: { fontSize: 16, fontWeight: '800' },
  // Total Expense Card
  totalExpenseCard: {
    borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 16,
    backgroundColor: 'rgba(239,68,68,0.04)',
  },
  totalExpenseHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
  },
  totalExpenseHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  totalExpenseIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  totalExpenseTitle: { fontSize: 14, fontWeight: '700' },
  totalExpenseSubtitle: { fontSize: 10, marginTop: 2 },
  totalExpenseBadge: {
    backgroundColor: 'rgba(239,68,68,0.12)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  totalExpenseBadgeText: { fontSize: 10, fontWeight: '700', color: '#ef4444' },
  totalExpenseAmount: { fontSize: 32, fontWeight: '800', color: '#ef4444', marginBottom: 14 },
  totalExpenseCurrency: { fontSize: 16, color: '#9ca3af' },
  totalExpenseCategories: { gap: 8 },
  totalExpenseCatRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  totalExpenseCatInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 90 },
  totalExpenseCatName: { fontSize: 12, fontWeight: '600' },
  highestTag: {
    backgroundColor: 'rgba(239,68,68,0.12)', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6,
  },
  highestTagText: { fontSize: 7, fontWeight: '800', color: '#ef4444' },
  totalExpenseCatBarWrap: { flex: 1 },
  totalExpenseCatBarBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
  totalExpenseCatBarFill: { height: 6, borderRadius: 3, backgroundColor: 'rgba(239,68,68,0.55)' },
  totalExpenseCatAmount: { fontSize: 12, fontWeight: '700', width: 55, textAlign: 'right' },
  // Ads Elements
  adsScroll: { marginBottom: 24, overflow: 'visible' },
  adCard: {
    width: 280,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    overflow: 'hidden',
  },
  adImage: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  adImagePlaceholder: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContent: {
    padding: 12,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  adDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
});
