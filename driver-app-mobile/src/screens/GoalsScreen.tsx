import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIncomes } from '../hooks/useData';
import { goalsAPI } from '../services/api';
import Svg, { Circle } from 'react-native-svg';

const MONTH_NAMES_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

interface Goal {
  id: number;
  month: string;
  targetAmount: number;
}

export default function GoalsScreen() {
  const { colors } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const [month, setMonth] = useState(currentMonth);
  const [targetAmount, setTargetAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const { incomes } = useIncomes();

  useEffect(() => {
    goalsAPI.getAll().then(setGoals).catch(console.error).finally(() => setLoading(false));
  }, []);

  const getMonthIncome = (m: string) => {
    const start = m + '-01';
    const lastDay = new Date(parseInt(m.split('-')[0]), parseInt(m.split('-')[1]), 0);
    const end = `${m}-${String(lastDay.getDate()).padStart(2, '0')}`;
    return incomes.filter(i => i.date >= start && i.date <= end).reduce((s, i) => s + i.amount, 0);
  };

  const currentGoal = useMemo(() => goals.find(g => g.month === currentMonth), [goals, currentMonth]);
  const currentMonthIncome = useMemo(() => getMonthIncome(currentMonth), [incomes, currentMonth]);
  const currentPct = currentGoal ? Math.min((currentMonthIncome / currentGoal.targetAmount) * 100, 100) : 0;
  const remaining = currentGoal ? Math.max(currentGoal.targetAmount - currentMonthIncome, 0) : 0;

  const daysLeft = useMemo(() => {
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return lastDay - today.getDate();
  }, []);
  const dailyTarget = daysLeft > 0 && remaining > 0 ? remaining / daysLeft : 0;

  const monthStreak = useMemo(() => {
    const monthStart = currentMonth + '-01';
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const monthEnd = `${currentMonth}-${String(lastDay.getDate()).padStart(2, '0')}`;
    const days = new Set(incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).map(i => i.date));
    return days.size;
  }, [incomes, currentMonth]);

  const milestones = useMemo(() => {
    const list = [];
    list.push({
      icon: 'flame', title: `سلسلة ${monthStreak} يوم`,
      desc: monthStreak >= 7 ? 'عملت 7 أيام متتالية!' : `${monthStreak} / 7 أيام هذا الشهر`,
      color: '#f97316', bg: 'rgba(249,115,22,0.1)', earned: monthStreak >= 7,
    });
    const workDays = new Set(incomes.map(i => i.date)).size;
    list.push({
      icon: 'trophy', title: 'أفضل سائق',
      desc: workDays >= 50 ? 'أفضل 5% من السائقين!' : `${workDays} يوم عمل`,
      color: '#eab308', bg: 'rgba(234,179,8,0.1)', earned: workDays >= 50,
    });
    const goalsAchieved = goals.filter(g => getMonthIncome(g.month) >= g.targetAmount).length;
    list.push({
      icon: 'star', title: 'محقق الأهداف',
      desc: goalsAchieved >= 3 ? 'حققت هدفك 3 مرات!' : `${goalsAchieved} / 3 أهداف محققة`,
      color: colors.primary, bg: 'rgba(32,223,108,0.1)', earned: goalsAchieved >= 3,
    });
    return list;
  }, [monthStreak, incomes, goals]);

  const handleSave = async () => {
    const amount = parseFloat(targetAmount);
    if (!month || !amount || amount <= 0) return;
    setSaving(true);
    try {
      const goal = await goalsAPI.save(month, amount);
      setGoals(prev => {
        const filtered = prev.filter(g => g.month !== month);
        return [goal, ...filtered].sort((a, b) => b.month.localeCompare(a.month));
      });
      setTargetAmount('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    Alert.alert('حذف الهدف', 'حذف هذا الهدف؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: async () => {
        try {
          await goalsAPI.delete(id);
          setGoals(prev => prev.filter(g => g.id !== id));
        } catch {}
      }},
    ]);
  };

  // Circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>الأهداف المالية</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {success && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={18} color="#20df6c" />
            <Text style={styles.successText}>تم حفظ الهدف بنجاح!</Text>
          </View>
        )}

        {/* Hero Goal Card */}
        {currentGoal && (
          <View style={styles.heroCard}>
            <Text style={styles.heroLabel}>هدف {MONTH_NAMES_AR[today.getMonth()]}</Text>
            <View style={styles.circleContainer}>
              <Svg width={160} height={160} viewBox="0 0 160 160" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx="80" cy="80" r={radius} fill="transparent" stroke="#2a3d2a" strokeWidth={10} />
                <Circle cx="80" cy="80" r={radius} fill="transparent" stroke={colors.primary} strokeWidth={10}
                  strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
              </Svg>
              <View style={styles.circleText}>
                <Text style={styles.circlePct}>{currentPct.toFixed(0)}<Text style={styles.circlePctSign}>%</Text></Text>
                <Text style={styles.circleStatus}>{currentPct >= 100 ? 'تم التحقيق!' : 'المحقق'}</Text>
              </View>
            </View>
            <Text style={styles.heroAmount}>
              {currentMonthIncome.toFixed(0)} <Text style={styles.heroCurrency}>ج.م</Text>
            </Text>
            <Text style={styles.heroTarget}>الهدف: {currentGoal.targetAmount.toFixed(0)} ج.م</Text>
          </View>
        )}

        {/* Daily Target */}
        {currentGoal && remaining > 0 && (
          <View style={styles.dailyCard}>
            <View style={styles.dailyHeader}>
              <View style={styles.dailyIcon}>
                <Ionicons name="flash" size={20} color={colors.primary} />
              </View>
              <Text style={styles.dailyTitle}>الهدف اليومي</Text>
            </View>
            <Text style={styles.dailyDesc}>
              اكسب <Text style={styles.dailyHighlight}>{dailyTarget.toFixed(0)} ج.م</Text> إضافية اليوم للبقاء على المسار
            </Text>
            <View style={styles.dailyBar}>
              <View style={[styles.dailyBarFill, { width: `${Math.min(currentPct, 100)}%` }]} />
            </View>
            <View style={styles.dailyFooter}>
              <Text style={styles.dailyFooterText}>متبقي {daysLeft} يوم</Text>
              <Text style={styles.dailyFooterText}>متبقي {remaining.toFixed(0)} ج.م</Text>
            </View>
          </View>
        )}

        {/* Milestones */}
        <View style={styles.milestonesHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>الإنجازات</Text>
          <Text style={[styles.milestonesCount, { color: colors.primary }]}>
            {milestones.filter(m => m.earned).length} / {milestones.length}
          </Text>
        </View>
        {milestones.map((m, i) => (
          <View key={i} style={[styles.milestoneCard, { backgroundColor: colors.card, borderColor: colors.border }, !m.earned && styles.milestoneDisabled]}>
            <View style={[styles.milestoneIcon, { backgroundColor: m.bg }]}>
              <Ionicons name={m.icon as any} size={22} color={m.color} />
            </View>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneName, { color: colors.foreground }]}>{m.title}</Text>
              <Text style={[styles.milestoneDesc, { color: colors.muted }]}>{m.desc}</Text>
            </View>
            {m.earned && <Text style={{ color: colors.primary, fontSize: 18, fontWeight: '700' }}>✓</Text>}
          </View>
        ))}

        {/* Add Goal Form */}
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.formTitle, { color: colors.foreground }]}>إضافة / تعديل هدف</Text>
          <Text style={[styles.formLabel, { color: colors.muted }]}>الشهر</Text>
          <TextInput
            style={[styles.formInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
            value={month}
            onChangeText={setMonth}
            placeholder="مثال: 2026-02"
            placeholderTextColor={colors.muted}
            textAlign="center"
          />
          <Text style={[styles.formLabel, { color: colors.muted }]}>الهدف (ج.م)</Text>
          <TextInput
            style={[styles.formInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
            value={targetAmount}
            onChangeText={setTargetAmount}
            placeholder="مثال: 15000"
            placeholderTextColor={colors.muted}
            keyboardType="numeric"
            textAlign="center"
          />
          <TouchableOpacity
            style={[styles.formBtn, (!targetAmount || saving) && styles.formBtnDisabled]}
            onPress={handleSave}
            disabled={saving || !targetAmount}
          >
            <Text style={styles.formBtnText}>{saving ? 'جاري الحفظ...' : 'حفظ الهدف'}</Text>
          </TouchableOpacity>
        </View>

        {/* Goals List */}
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24, marginBottom: 12 }]}>جميع الأهداف</Text>
        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" style={{ paddingVertical: 32 }} />
        ) : goals.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Ionicons name="flag-outline" size={32} color={colors.muted} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>لم تحدد أي أهداف بعد</Text>
          </View>
        ) : (
          goals.map(g => {
            const achieved = getMonthIncome(g.month);
            const pct = Math.min((achieved / g.targetAmount) * 100, 100);
            const isComplete = pct >= 100;
            const monthIdx = parseInt(g.month.split('-')[1]) - 1;
            const year = g.month.split('-')[0];
            return (
              <View key={g.id} style={[styles.goalItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.goalItemHeader}>
                  <View style={styles.goalItemLeft}>
                    <View style={[styles.goalItemIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                      <Ionicons name={isComplete ? 'checkmark' : 'flag'} size={14} color={colors.primary} />
                    </View>
                    <Text style={[styles.goalItemMonth, { color: colors.foreground }]}>
                      {MONTH_NAMES_AR[monthIdx]} {year}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(g.id)}>
                    <Ionicons name="trash-outline" size={15} color={colors.muted} />
                  </TouchableOpacity>
                </View>
                <View style={styles.goalItemProgress}>
                  <Text style={[styles.goalItemText, { color: colors.muted }]}>المحقق: {achieved.toFixed(0)} ج.م</Text>
                  <Text style={[styles.goalItemText, { color: colors.muted }]}>الهدف: {g.targetAmount.toFixed(0)} ج.م</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.accent }]}>
                  <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: colors.primary }]} />
                </View>
                <Text style={[styles.goalItemPct, { color: colors.primary }]}>
                  {pct.toFixed(1)}%{isComplete ? ' 🎉 تم تحقيق الهدف!' : ''}
                </Text>
              </View>
            );
          })
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 24, gap: 16 },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
    borderRadius: 12, padding: 12,
  },
  successText: { color: '#20df6c', fontSize: 14, fontWeight: '500' },
  heroCard: {
    backgroundColor: '#1c2e24', borderRadius: 24, padding: 32, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  heroLabel: { color: '#9ca3af', fontSize: 14, fontWeight: '500', marginBottom: 24, textTransform: 'uppercase', letterSpacing: 2 },
  circleContainer: { position: 'relative', width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  circleText: { position: 'absolute', alignItems: 'center' },
  circlePct: { fontSize: 44, fontWeight: '800', color: '#fff' },
  circlePctSign: { fontSize: 22, color: '#20df6c' },
  circleStatus: { color: '#9ca3af', fontSize: 14, marginTop: 4 },
  heroAmount: { fontSize: 28, fontWeight: '700', color: '#fff' },
  heroCurrency: { fontSize: 16, color: '#9ca3af' },
  heroTarget: { fontSize: 14, color: '#9ca3af', marginTop: 4 },
  dailyCard: {
    backgroundColor: '#162216', borderRadius: 12, padding: 20,
    borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
  },
  dailyHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  dailyIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(32,223,108,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  dailyTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  dailyDesc: { color: '#d1d5db', fontSize: 14, lineHeight: 22 },
  dailyHighlight: { color: '#20df6c', fontWeight: '700', fontSize: 16 },
  dailyBar: {
    width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.4)', marginTop: 12, overflow: 'hidden',
  },
  dailyBarFill: { height: '100%', borderRadius: 3, backgroundColor: '#20df6c' },
  dailyFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  dailyFooterText: { color: '#6b7280', fontSize: 12, fontWeight: '500' },
  milestonesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  milestonesCount: { fontSize: 12, fontWeight: '700' },
  milestoneCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16,
    borderRadius: 16, borderWidth: 1,
  },
  milestoneDisabled: { opacity: 0.4 },
  milestoneIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  milestoneInfo: { flex: 1 },
  milestoneName: { fontSize: 14, fontWeight: '700' },
  milestoneDesc: { fontSize: 12, marginTop: 2 },
  formCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 12 },
  formTitle: { fontSize: 16, fontWeight: '700' },
  formLabel: { fontSize: 12, marginBottom: -4 },
  formInput: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14,
  },
  formBtn: {
    backgroundColor: '#20df6c', borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  formBtnDisabled: { backgroundColor: 'rgba(128,128,128,0.3)' },
  formBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
  goalItem: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  goalItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  goalItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalItemIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  goalItemMonth: { fontSize: 14, fontWeight: '700' },
  goalItemProgress: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  goalItemText: { fontSize: 12 },
  progressBar: { width: '100%', height: 12, borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 6 },
  goalItemPct: { fontSize: 12, fontWeight: '700', marginTop: 6 },
  emptyText: { fontSize: 14, marginTop: 8 },
});
