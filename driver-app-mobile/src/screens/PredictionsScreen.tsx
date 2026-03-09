import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import Text from '../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIncomes, useExpenses, useCompanies } from '../hooks/useData';
import { goalsAPI } from '../services/api';
import { COMPANY_COLORS } from '../constants/theme';
import Svg, { Circle } from 'react-native-svg';

const MONTH_NAMES_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function PredictionsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();
  const { companies } = useCompanies();
  const today = new Date();

  const monthStart = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthEnd = formatDate(lastDay);

  const daysInMonth = today.getDate();
  const totalDaysInMonth = lastDay.getDate();
  const daysRemaining = totalDaysInMonth - daysInMonth;

  const [targetDays, setTargetDays] = useState(daysRemaining);
  const [goalFromDB, setGoalFromDB] = useState(0);

  useEffect(() => {
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    goalsAPI.getAll().then(goals => {
      const current = goals.find((g: any) => g.month === currentMonth);
      if (current) setGoalFromDB(current.targetAmount);
    }).catch(() => { });
  }, []);

  const monthIncome = useMemo(() =>
    incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0),
    [incomes, monthStart, monthEnd]);

  const monthExpense = useMemo(() =>
    expenses.filter(e => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0),
    [expenses, monthStart, monthEnd]);

  const dailyAvgIncome = daysInMonth > 0 ? monthIncome / daysInMonth : 0;
  const dailyAvgExpense = daysInMonth > 0 ? monthExpense / daysInMonth : 0;

  const projectedIncome = monthIncome + (dailyAvgIncome * targetDays);
  const projectedExpense = monthExpense + (dailyAvgExpense * targetDays);
  const projectedNet = projectedIncome - projectedExpense;

  const monthGoal = goalFromDB > 0 ? goalFromDB : projectedNet > 0 ? projectedNet : 1;
  const goalPct = Math.min((projectedNet / monthGoal) * 100, 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(goalPct / 100, 1));

  const companyBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).forEach(i => {
      map[i.company] = (map[i.company] || 0) + i.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [incomes, monthStart, monthEnd]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>توقعات الأرباح</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Circular Gauge */}
        <View style={styles.gaugeContainer}>
          <View style={styles.gaugeBox}>
            <Svg width={180} height={180} viewBox="0 0 180 180" style={{ transform: [{ rotate: '-90deg' }] }}>
              <Circle cx="90" cy="90" r={radius} fill="transparent" stroke={colors.accent} strokeWidth={8} />
              <Circle cx="90" cy="90" r={radius} fill="transparent" stroke={colors.primary} strokeWidth={8}
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </Svg>
            <View style={styles.gaugeText}>
              <Text style={[styles.gaugeLabel, { color: colors.muted }]}>صافي متوقع</Text>
              <Text style={[styles.gaugeValue, { color: colors.foreground }]}>{projectedNet.toFixed(0)}</Text>
              <View style={styles.gaugeBadge}>
                <Ionicons name="trending-up" size={14} color={colors.primary} />
                <Text style={[styles.gaugeBadgeText, { color: colors.primary }]}>ج.م</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.gaugeHint, { color: colors.muted }]}>
            توقع بناءً على {daysInMonth} يوم من البيانات
          </Text>
        </View>

        {/* Target Days Slider */}
        <View style={[styles.sliderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sliderHeader}>
            <View>
              <Text style={[styles.sliderTitle, { color: colors.foreground }]}>أيام العمل المستهدفة</Text>
              <Text style={[styles.sliderSub, { color: colors.muted }]}>عدّل لرؤية التأثير على الربح</Text>
            </View>
            <View style={styles.sliderValueBox}>
              <Text style={[styles.sliderValue, { color: colors.primary }]}>{targetDays}</Text>
              <Text style={[styles.sliderUnit, { color: colors.muted }]}>يوم متبقي</Text>
            </View>
          </View>
          <View style={styles.sliderBtns}>
            <TouchableOpacity onPress={() => setTargetDays(Math.max(0, targetDays - 1))} style={[styles.sliderBtn, { backgroundColor: colors.accent }]}>
              <Ionicons name="remove" size={20} color={colors.foreground} />
            </TouchableOpacity>
            <View style={[styles.sliderTrack, { backgroundColor: colors.accent }]}>
              <View style={[styles.sliderFill, { width: `${(targetDays / totalDaysInMonth) * 100}%`, backgroundColor: colors.primary }]} />
            </View>
            <TouchableOpacity onPress={() => setTargetDays(Math.min(totalDaysInMonth, targetDays + 1))} style={[styles.sliderBtn, { backgroundColor: colors.accent }]}>
              <Ionicons name="add" size={20} color={colors.foreground} />
            </TouchableOpacity>
          </View>
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabelText, { color: colors.muted }]}>راحة</Text>
            <Text style={[styles.sliderLabelText, { color: colors.muted }]}>عمل مكثف</Text>
          </View>
        </View>

        {/* Insights Grid */}
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>رؤى التوقعات</Text>
        <View style={styles.insightsGrid}>
          <View style={[styles.insightCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.insightIconBox, { backgroundColor: 'rgba(59,130,246,0.1)' }]}>
              <Ionicons name="calendar" size={16} color="#3b82f6" />
            </View>
            <Text style={[styles.insightLabel, { color: colors.muted }]}>متوسط الدخل اليومي</Text>
            <Text style={[styles.insightValue, { color: colors.foreground }]}>{dailyAvgIncome.toFixed(0)} ج.م</Text>
          </View>
          <View style={[styles.insightCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.insightIconBox, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
              <Ionicons name="construct" size={16} color="#ef4444" />
            </View>
            <Text style={[styles.insightLabel, { color: colors.muted }]}>مصروفات متوقعة</Text>
            <Text style={[styles.insightValue, { color: colors.foreground }]}>{projectedExpense.toFixed(0)} ج.م</Text>
          </View>
        </View>

        {/* Goal Progress */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalLabel}>حالة الهدف</Text>
              <Text style={styles.goalAmount}>{goalFromDB > 0 ? monthGoal.toFixed(0) : '—'} ج.م</Text>
            </View>
            <View>
              <Text style={styles.goalCurrentLabel}>الحالي</Text>
              <Text style={styles.goalCurrentValue}>{projectedNet.toFixed(0)} ج.م</Text>
            </View>
          </View>
          <View style={styles.goalBar}>
            <View style={[styles.goalBarFill, { width: `${goalPct}%` }]}>
              <Text style={styles.goalBarPct}>{goalPct.toFixed(0)}%</Text>
            </View>
          </View>
          <Text style={styles.goalHint}>
            أنت على الطريق لتحقيق {goalPct.toFixed(0)}% من هدفك الشهري
          </Text>
        </View>

        {/* Platform Breakdown */}
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>توزيع المنصات</Text>
        <View style={[styles.platformCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {companies.map(company => {
            const data = companyBreakdown.find(([c]) => c === company.name);
            const amount = data ? data[1] : 0;
            const pct = monthIncome > 0 ? (amount / monthIncome) * 100 : 0;
            const bg = company.color || COMPANY_COLORS[company.name]?.bg || '#16a34a';
            const text = COMPANY_COLORS[company.name]?.text || '#FFFFFF';

            return (
              <View key={company.id} style={[styles.platformItem, { borderBottomColor: colors.border }]}>
                <View style={[styles.platformLogo, { backgroundColor: bg }]}>
                  <Text style={[styles.platformLogoText, { color: text }]}>
                    {company.nameAr?.[0] || company.name[0]}
                  </Text>
                </View>
                <View style={styles.platformInfo}>
                  <View style={styles.platformInfoHeader}>
                    <Text style={[styles.platformName, { color: colors.foreground }]}>{company.nameAr || company.name}</Text>
                    <Text style={[styles.platformAmount, { color: colors.foreground }]}>{amount.toFixed(0)} ج.م</Text>
                  </View>
                  <View style={[styles.platformBar, { backgroundColor: colors.accent }]}>
                    <View style={[styles.platformBarFill, { width: `${pct}%`, backgroundColor: bg === '#000000' ? colors.foreground : bg }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom Action */}
        <TouchableOpacity
          style={[styles.reportBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('التقارير')}
          activeOpacity={0.8}
        >
          <Ionicons name="bar-chart" size={18} color="#000" />
          <Text style={styles.reportBtnText}>عرض التقرير المفصل</Text>
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
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12, borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16, gap: 20 },
  gaugeContainer: { alignItems: 'center', paddingTop: 8 },
  gaugeBox: { width: 180, height: 180, justifyContent: 'center', alignItems: 'center' },
  gaugeText: { position: 'absolute', alignItems: 'center' },
  gaugeLabel: { fontSize: 12, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  gaugeValue: { fontSize: 36, fontWeight: '700' },
  gaugeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(32,223,108,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)', marginTop: 4,
  },
  gaugeBadgeText: { fontSize: 12, fontWeight: '700' },
  gaugeHint: { fontSize: 12, marginTop: 8 },
  sliderCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 16 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sliderTitle: { fontSize: 16, fontWeight: '600' },
  sliderSub: { fontSize: 12, marginTop: 4 },
  sliderValueBox: { alignItems: 'flex-end' },
  sliderValue: { fontSize: 28, fontWeight: '700' },
  sliderUnit: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  sliderBtns: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sliderBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  sliderTrack: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: 4 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabelText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  insightsGrid: { flexDirection: 'row', gap: 12 },
  insightCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16, gap: 8, height: 120, justifyContent: 'space-between' },
  insightIconBox: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  insightLabel: { fontSize: 12, fontWeight: '500' },
  insightValue: { fontSize: 20, fontWeight: '700' },
  goalCard: {
    backgroundColor: '#1c2e24', borderRadius: 16, padding: 20, gap: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  goalLabel: { fontSize: 12, fontWeight: '700', color: '#20df6c', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  goalAmount: { fontSize: 24, fontWeight: '700', color: '#fff' },
  goalCurrentLabel: { fontSize: 12, color: '#9ca3af' },
  goalCurrentValue: { fontSize: 14, fontWeight: '600', color: '#fff' },
  goalBar: {
    height: 16, width: '100%', backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  goalBarFill: {
    height: '100%', backgroundColor: '#20df6c', borderRadius: 8,
    justifyContent: 'center', alignItems: 'flex-end', paddingRight: 8,
  },
  goalBarPct: { fontSize: 9, fontWeight: '800', color: '#000' },
  goalHint: { fontSize: 10, color: '#9ca3af', textAlign: 'center' },
  platformCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  platformItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderBottomWidth: 1 },
  platformLogo: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  platformLogoText: { fontSize: 10, fontWeight: '700' },
  platformInfo: { flex: 1, gap: 6 },
  platformInfoHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  platformName: { fontSize: 14, fontWeight: '600' },
  platformAmount: { fontSize: 14, fontWeight: '700' },
  platformBar: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
  platformBarFill: { height: '100%', borderRadius: 3 },
  reportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 56, borderRadius: 12,
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  reportBtnText: { color: '#000', fontSize: 14, fontWeight: '700' },
});
