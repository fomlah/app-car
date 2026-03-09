import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Modal, Switch, ActivityIndicator,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useExpenses, useIncomes } from '../hooks/useData';
import { BASE_URL, getToken } from '../services/api';

interface AlertSettingDB {
  id: number;
  alertType: string;
  nameAr: string;
  enabled: boolean;
  limitAmount: number | null;
}

const ALERT_ICONS: Record<string, string> = { fuel: 'flame', maintenance: 'construct', daily: 'wallet', insurance: 'shield-checkmark' };
const ALERT_COLORS: Record<string, { icon: string; bg: string }> = {
  fuel: { icon: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  maintenance: { icon: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  daily: { icon: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
  insurance: { icon: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
};

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

function getWeekStart(d: Date): string {
  const day = d.getDay();
  const diff = d.getDate() - day;
  const ws = new Date(d.getFullYear(), d.getMonth(), diff);
  return formatDate(ws);
}

function getWeekEnd(d: Date): string {
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  const we = new Date(d.getFullYear(), d.getMonth(), diff);
  return formatDate(we);
}

export default function AlertsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const [alertSettings, setAlertSettings] = useState<AlertSettingDB[]>([]);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [showLimits, setShowLimits] = useState(false);
  const [editLimits, setEditLimits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const today = new Date();
  const monthStart = getMonthStart(today);
  const monthEnd = getMonthEnd(today);
  const weekStart = getWeekStart(today);
  const weekEnd = getWeekEnd(today);

  const monthExpenses = useMemo(() => expenses.filter(e => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);
  const weekIncome = useMemo(() => incomes.filter(i => i.date >= weekStart && i.date <= weekEnd).reduce((s, i) => s + i.amount, 0), [incomes, weekStart, weekEnd]);
  const fuelExpenses = useMemo(() => expenses.filter(e => e.category === 'fuel' && e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);
  const maintenanceExpenses = useMemo(() => expenses.filter(e => e.category === 'maintenance' && e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0), [expenses, monthStart, monthEnd]);

  const authedFetch = useCallback(async (path: string, init?: RequestInit) => {
    const token = await getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init?.headers as any),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${BASE_URL}${path}`, { ...init, headers });
  }, []);

  const loadAlertSettings = useCallback(async () => {
    try {
      const res = await authedFetch('/api/alert-settings');
      if (res.ok) setAlertSettings(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoadingSettings(false); }
  }, [authedFetch]);

  useEffect(() => { loadAlertSettings(); }, [loadAlertSettings]);

  const totalBudgetLimit = useMemo(() => {
    const total = alertSettings.reduce((s, a) => s + (a.limitAmount || 0), 0);
    return total > 0 ? total : 2000;
  }, [alertSettings]);

  const budgetPct = Math.min((monthExpenses / totalBudgetLimit) * 100, 100);
  const projProfit = weekIncome - (monthExpenses / 4);

  const getUsedAmount = (alertType: string) => {
    if (alertType === 'fuel') return fuelExpenses;
    if (alertType === 'maintenance') return maintenanceExpenses;
    if (alertType === 'daily') return monthExpenses;
    return 0;
  };

  const getLevel = (alertType: string, limit: number | null): 'amber' | 'red' | 'normal' | 'inactive' => {
    const used = getUsedAmount(alertType);
    if (!limit || limit === 0) return 'inactive';
    const pct = used / limit;
    if (pct >= 0.9) return 'red';
    if (pct >= 0.6) return 'amber';
    return 'normal';
  };

  const getLevelLabel = (level: string) => {
    if (level === 'red') return 'تحذير عاجل';
    if (level === 'amber') return 'تحذير متوسط';
    if (level === 'inactive') return 'غير محدد';
    return 'عادي';
  };

  const getLevelColor = (level: string) => {
    if (level === 'red') return '#ef4444';
    if (level === 'amber') return '#f59e0b';
    return colors.muted;
  };

  const toggleAlert = async (alertType: string, currentEnabled: boolean) => {
    setAlertSettings(prev => prev.map(a => a.alertType === alertType ? { ...a, enabled: !currentEnabled } : a));
    try {
      await authedFetch('/api/alert-settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertType, enabled: !currentEnabled }),
      });
    } catch {}
  };

  const handleSaveLimits = async () => {
    setSaving(true);
    try {
      for (const [alertType, value] of Object.entries(editLimits)) {
        await authedFetch('/api/alert-settings', {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alertType, limitAmount: value ? parseInt(value) : null }),
        });
      }
      await loadAlertSettings();
      setShowLimits(false);
      setEditLimits({});
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>تنبيهات المصروفات الذكية</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Health Status Card */}
        <View style={[styles.healthCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.healthHeader}>
            <View>
              <Text style={[styles.healthLabel, { color: colors.primary }]}>حالة الميزانية</Text>
              <Text style={[styles.healthStatus, { color: colors.foreground }]}>
                {budgetPct < 50 ? 'مستقرة' : budgetPct < 80 ? 'متوسطة' : 'مرتفعة'}
              </Text>
            </View>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(32,223,108,0.2)' }]}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            </View>
          </View>
          <View style={styles.healthProgress}>
            <View style={styles.healthProgressHeader}>
              <Text style={[styles.healthProgressLabel, { color: colors.muted }]}>الميزانية الشهرية</Text>
              <Text style={[styles.healthProgressPct, { color: colors.foreground }]}>{budgetPct.toFixed(0)}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.accent }]}>
              <View style={[styles.progressFill, {
                width: `${budgetPct}%`,
                backgroundColor: budgetPct >= 80 ? '#ef4444' : budgetPct >= 50 ? '#f59e0b' : colors.primary,
              }]} />
            </View>
            <Text style={[styles.healthProgressText, { color: colors.muted }]}>
              {monthExpenses.toFixed(0)} ج.م من {totalBudgetLimit.toFixed(0)} ج.م
            </Text>
          </View>
          <View style={styles.healthGrid}>
            <View style={[styles.healthGridItem, { backgroundColor: colors.accent, borderColor: colors.border }]}>
              <Text style={[styles.healthGridLabel, { color: colors.muted }]}>الدخل (أسبوعي)</Text>
              <Text style={[styles.healthGridValue, { color: colors.foreground }]}>{weekIncome.toFixed(0)} ج.م</Text>
            </View>
            <View style={[styles.healthGridItem, { backgroundColor: colors.accent, borderColor: colors.border }]}>
              <Text style={[styles.healthGridLabel, { color: colors.muted }]}>ربح متوقع</Text>
              <Text style={[styles.healthGridValue, { color: colors.primary }]}>+{projProfit > 0 ? projProfit.toFixed(0) : 0} ج.م</Text>
            </View>
          </View>
        </View>

        {/* Active Alerts */}
        <View style={styles.alertsHeader}>
          <Text style={[styles.alertsTitle, { color: colors.foreground }]}>التنبيهات النشطة</Text>
          <Text style={[styles.alertsCount, { color: colors.muted }]}>{alertSettings.filter(a => a.enabled).length} نشط</Text>
        </View>

        {loadingSettings ? (
          <ActivityIndicator color={colors.primary} size="large" style={{ paddingVertical: 32 }} />
        ) : (
          alertSettings.map(alert => {
            const iconName = ALERT_ICONS[alert.alertType] || 'wallet';
            const ac = ALERT_COLORS[alert.alertType] || ALERT_COLORS.daily;
            const used = getUsedAmount(alert.alertType);
            const level = getLevel(alert.alertType, alert.limitAmount);
            const levelColor = getLevelColor(level);
            return (
              <View key={alert.id} style={[styles.alertCard, { backgroundColor: colors.card, borderColor: colors.border }, (!alert.enabled || level === 'inactive') && { opacity: 0.6 }]}>
                <View style={styles.alertCardInner}>
                  <View style={[styles.alertIcon, {
                    backgroundColor: level === 'amber' ? 'rgba(245,158,11,0.1)' : level === 'red' ? 'rgba(239,68,68,0.1)' : ac.bg,
                  }]}>
                    <Ionicons name={iconName as any} size={22} color={level === 'amber' ? '#f59e0b' : level === 'red' ? '#ef4444' : ac.icon} />
                  </View>
                  <View style={styles.alertInfo}>
                    <View style={styles.alertInfoHeader}>
                      <Text style={[styles.alertName, { color: colors.foreground }]}>{alert.nameAr}</Text>
                      <Switch
                        value={alert.enabled}
                        onValueChange={() => toggleAlert(alert.alertType, alert.enabled)}
                        trackColor={{ false: colors.accent, true: colors.primary }}
                        thumbColor="#fff"
                      />
                    </View>
                    <Text style={[styles.alertLevel, { color: levelColor }]}>{getLevelLabel(level)}</Text>
                    {alert.limitAmount && alert.limitAmount > 0 && (
                      <View style={styles.alertProgress}>
                        <View style={styles.alertProgressHeader}>
                          <Text style={[styles.alertProgressText, { color: colors.muted }]}>{used.toFixed(0)} ج.م مستخدم</Text>
                          <Text style={[styles.alertProgressText, { color: colors.muted }]}>{alert.limitAmount.toFixed(0)} ج.م الحد</Text>
                        </View>
                        <View style={[styles.progressBar, { backgroundColor: colors.accent }]}>
                          <View style={[styles.progressFill, {
                            width: `${Math.min((used / alert.limitAmount) * 100, 100)}%`,
                            backgroundColor: level === 'amber' ? '#f59e0b' : level === 'red' ? '#ef4444' : colors.primary,
                          }]} />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.fab, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={[styles.fabBtn, { backgroundColor: colors.primary }]} onPress={() => setShowLimits(true)} activeOpacity={0.8}>
          <Ionicons name="options" size={20} color="#000" />
          <Text style={styles.fabBtnText}>تعيين الميزانيات والحدود</Text>
        </TouchableOpacity>
      </View>

      {/* Set Limits Modal */}
      <Modal visible={showLimits} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>تعيين الحدود</Text>
              <TouchableOpacity onPress={() => setShowLimits(false)}>
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {alertSettings.map(a => (
                <View key={a.id} style={{ marginBottom: 12 }}>
                  <Text style={[styles.modalLabel, { color: colors.muted }]}>{a.nameAr} (ج.م)</Text>
                  <TextInput
                    style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                    placeholder={a.limitAmount?.toString() || '0'}
                    placeholderTextColor={colors.muted}
                    value={editLimits[a.alertType] ?? (a.limitAmount?.toString() || '')}
                    onChangeText={v => setEditLimits(prev => ({ ...prev, [a.alertType]: v }))}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalSaveBtn, saving && { backgroundColor: 'rgba(128,128,128,0.3)' }]}
              onPress={handleSaveLimits} disabled={saving}
            >
              {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.modalSaveBtnText}>حفظ الحدود</Text>}
            </TouchableOpacity>
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
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12, borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
  content: { padding: 16, gap: 16 },
  healthCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 16 },
  healthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  healthLabel: { fontSize: 12, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  healthStatus: { fontSize: 24, fontWeight: '700' },
  healthIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  healthProgress: { gap: 8 },
  healthProgressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  healthProgressLabel: { fontSize: 14, fontWeight: '500' },
  healthProgressPct: { fontSize: 14, fontWeight: '500' },
  progressBar: { width: '100%', height: 12, borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 6 },
  healthProgressText: { fontSize: 12, textAlign: 'left' },
  healthGrid: { flexDirection: 'row', gap: 12 },
  healthGridItem: { flex: 1, borderRadius: 8, borderWidth: 1, padding: 12, gap: 4 },
  healthGridLabel: { fontSize: 12 },
  healthGridValue: { fontSize: 18, fontWeight: '700' },
  alertsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertsTitle: { fontSize: 20, fontWeight: '700' },
  alertsCount: { fontSize: 12 },
  alertCard: { borderRadius: 12, borderWidth: 1, padding: 16 },
  alertCardInner: { flexDirection: 'row', gap: 16 },
  alertIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  alertInfo: { flex: 1, gap: 4 },
  alertInfoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertName: { fontSize: 16, fontWeight: '600' },
  alertLevel: { fontSize: 12, fontWeight: '500' },
  alertProgress: { marginTop: 8, gap: 6 },
  alertProgressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  alertProgressText: { fontSize: 12 },
  fab: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 24 },
  fabBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 56, borderRadius: 12,
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  fabBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderTopWidth: 1, gap: 8 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalLabel: { fontSize: 12, marginBottom: 4 },
  modalInput: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  modalSaveBtn: { backgroundColor: '#20df6c', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  modalSaveBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
});
