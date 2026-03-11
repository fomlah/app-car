import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { workSessionsAPI } from '../services/api';
import { COMPANY_COLORS } from '../constants/theme';
import { useCompanies } from '../hooks/useData';
import { parseLocalizedNumber } from '../utils/numbers';

interface WorkSession {
  id: number;
  date: string;
  startTime: string;
  endTime: string | null;
  company: string;
  notes: string | null;
  createdAt: string;
}

function calcDuration(start: string, end: string): number {
  if (!start || !end) return 0;

  const parseTime = (timeStr: string) => {
    // Check if format is properly given as HH:MM or similar by safely parsing localized numbers.
    const parts = timeStr.split(':');
    if (parts.length < 2) return { h: 0, m: 0 };
    return {
      h: Math.max(0, parseLocalizedNumber(parts[0])),
      m: Math.max(0, parseLocalizedNumber(parts[1]))
    };
  };

  const { h: sh, m: sm } = parseTime(start);
  const { h: eh, m: em } = parseTime(end);

  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return isNaN(mins) ? 0 : mins;
}

function formatDuration(mins: number): string {
  if (isNaN(mins)) return '0 ساعة';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} ساعة${m > 0 ? ` و ${m} دقيقة` : ''}`;
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export default function WorkSessionsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { companies } = useCompanies();
  const [sessions, setSessions] = useState<WorkSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(formatDate(new Date()));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadSessions = async () => {
    try {
      const data = await workSessionsAPI.getAll();
      setSessions(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadSessions(); }, []);

  const activeSession = sessions.find(s => !s.endTime);

  const handleStart = async () => {
    if (!company) return;
    setSaving(true);
    try {
      const now = getCurrentTime();
      await workSessionsAPI.create({ date, startTime: startTime || now, company, notes: notes || undefined });
      await loadSessions();
      setStartTime(''); setNotes('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleStop = async (id: number) => {
    const now = getCurrentTime();
    try {
      await workSessionsAPI.update(id, { endTime: endTime || now });
      await loadSessions();
      setEndTime('');
    } catch (err) { console.error(err); }
  };

  const handleAddManual = async () => {
    if (!company || !startTime || !endTime) return;
    setSaving(true);
    try {
      await workSessionsAPI.create({ date, startTime, endTime, company, notes: notes || undefined });
      await loadSessions();
      setStartTime(''); setEndTime(''); setNotes('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = (id: number) => {
    Alert.alert('حذف', 'حذف هذه الجلسة؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف', style: 'destructive', onPress: async () => {
          try { await workSessionsAPI.delete(id); await loadSessions(); } catch { }
        }
      },
    ]);
  };

  const todaySessions = sessions.filter(s => s.date === date);
  const todayTotal = todaySessions.filter(s => s.endTime).reduce((sum, s) => sum + calcDuration(s.startTime, s.endTime!), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>ساعات العمل</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: 60 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {success && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={18} color="#20df6c" />
              <Text style={styles.successText}>تم الحفظ!</Text>
            </View>
          )}

          {/* Active Session */}
          {activeSession && (
            <View style={styles.activeCard}>
              <View style={styles.activeHeader}>
                <View style={styles.activeHeaderLeft}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.activeLabel}>جلسة نشطة الآن</Text>
                </View>
                <View style={[styles.companyBadge, { backgroundColor: companies.find((c) => c.name === activeSession.company)?.color || COMPANY_COLORS[activeSession.company]?.bg || '#16a34a' }]}>
                  <Text style={[styles.companyBadgeText, { color: '#fff' }]}>
                    {companies.find((c) => c.name === activeSession.company)?.nameAr || activeSession.company}
                  </Text>
                </View>
              </View>
              <Text style={styles.activeStartTime}>بدأت: {activeSession.startTime}</Text>
              <View style={styles.activeRow}>
                <TextInput
                  style={[styles.timeInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="وقت النهاية"
                  placeholderTextColor={colors.muted}
                  value={endTime}
                  onChangeText={setEndTime}
                  textAlign="center"
                />
                <TouchableOpacity style={styles.stopBtn} onPress={() => handleStop(activeSession.id)} activeOpacity={0.8}>
                  <Ionicons name="stop" size={14} color="#fff" />
                  <Text style={styles.stopBtnText}>إنهاء</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Add Session Form */}
          <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.formTitle, { color: colors.foreground }]}>
              {activeSession ? 'إضافة جلسة يدوية' : 'بدء جلسة جديدة'}
            </Text>

            <TextInput
              style={[styles.dateInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.muted}
              textAlign="center"
            />

            {/* Company Selection */}
            <View style={styles.companyRow}>
              {companies.map(c => {
                const isActive = company === c.name;
                return (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setCompany(c.name)}
                    style={[
                      styles.companyBtn,
                      { borderColor: isActive ? 'transparent' : colors.border },
                      isActive && { backgroundColor: c.color || COMPANY_COLORS[c.name]?.bg || '#16a34a' },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.companyBtnText,
                      { color: isActive ? '#fff' : colors.foreground },
                    ]}>{c.nameAr || c.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Time Inputs */}
            <View style={styles.timeRow}>
              <View style={styles.timeField}>
                <Text style={[styles.timeLabel, { color: colors.muted }]}>وقت البداية</Text>
                <TextInput
                  style={[styles.timeInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="HH:MM"
                  placeholderTextColor={colors.muted}
                  value={startTime}
                  onChangeText={setStartTime}
                  textAlign="center"
                />
              </View>
              <View style={styles.timeField}>
                <Text style={[styles.timeLabel, { color: colors.muted }]}>وقت النهاية</Text>
                <TextInput
                  style={[styles.timeInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="HH:MM"
                  placeholderTextColor={colors.muted}
                  value={endTime}
                  onChangeText={setEndTime}
                  textAlign="center"
                />
              </View>
            </View>

            <TextInput
              style={[styles.notesInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="ملاحظات (اختياري)"
              placeholderTextColor={colors.muted}
              value={notes}
              onChangeText={setNotes}
              textAlign="right"
            />

            <View style={styles.actionRow}>
              {!activeSession && (
                <TouchableOpacity
                  style={[styles.startBtn, (!company || saving) && { backgroundColor: colors.accent }]}
                  onPress={handleStart}
                  disabled={!company || saving}
                  activeOpacity={0.8}
                >
                  <Ionicons name="play" size={16} color={company && !saving ? '#fff' : colors.muted} />
                  <Text style={[styles.startBtnText, { color: company && !saving ? '#fff' : colors.muted }]}>بدء الآن</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.manualBtn, { backgroundColor: company && startTime && endTime && !saving ? colors.primary : colors.accent }]}
                onPress={handleAddManual}
                disabled={!company || !startTime || !endTime || saving}
                activeOpacity={0.8}
              >
                <Text style={[styles.manualBtnText, { color: company && startTime && endTime ? '#000' : colors.muted }]}>
                  إضافة يدوي
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Today Summary */}
          {todaySessions.length > 0 && (
            <View style={[styles.summaryCard, { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' }]}>
              <Text style={[styles.summaryLabel, { color: colors.muted }]}>إجمالي ساعات اليوم</Text>
              <Text style={styles.summaryValue}>{formatDuration(todayTotal)}</Text>
            </View>
          )}

          {/* Sessions List */}
          <View style={styles.listSection}>
            <Text style={[styles.listTitle, { color: colors.foreground }]}>الجلسات ({todaySessions.length})</Text>
            {todaySessions.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="time-outline" size={28} color={colors.muted} style={{ opacity: 0.3 }} />
                <Text style={[styles.emptyText, { color: colors.muted }]}>لا توجد جلسات لهذا اليوم</Text>
              </View>
            ) : (
              todaySessions.map(s => {
                const dur = s.endTime ? calcDuration(s.startTime, s.endTime) : null;
                const cc = COMPANY_COLORS[s.company];
                return (
                  <View key={s.id} style={[styles.sessionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.sessionLeft}>
                      <View style={[styles.sessionIcon, { backgroundColor: companies.find((c) => c.name === s.company)?.color || cc?.bg || '#16a34a' }]}>
                        <Text style={[styles.sessionIconText, { color: '#fff' }]}>{companies.find((c) => c.name === s.company)?.nameAr?.[0] || s.company[0]}</Text>
                      </View>
                      <View>
                        <View style={styles.sessionNameRow}>
                          <Text style={[styles.sessionCompany, { color: colors.foreground }]}>{companies.find((c) => c.name === s.company)?.nameAr || s.company}</Text>
                          {!s.endTime && <View style={styles.liveDot} />}
                        </View>
                        <Text style={[styles.sessionTime, { color: colors.muted }]}>
                          {s.startTime} → {s.endTime || '...'}
                          {dur !== null && <Text style={{ color: '#3b82f6', fontWeight: '700' }}> ({formatDuration(dur)})</Text>}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(s.id)}>
                      <Ionicons name="trash-outline" size={14} color={colors.muted} />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      )}
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
  content: { padding: 16, gap: 16 },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
    borderRadius: 12, padding: 12,
  },
  successText: { color: '#20df6c', fontSize: 14, fontWeight: '500' },
  activeCard: {
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 1, borderColor: 'rgba(32,223,108,0.3)',
    borderRadius: 16, padding: 16, gap: 8,
  },
  activeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  activeHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pulseDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#20df6c' },
  activeLabel: { fontSize: 14, fontWeight: '700', color: '#20df6c' },
  companyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  companyBadgeText: { fontSize: 10, fontWeight: '700' },
  activeStartTime: { fontSize: 12, color: '#9ca3af' },
  activeRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  stopBtn: {
    backgroundColor: '#ef4444', paddingHorizontal: 16, borderRadius: 8,
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  stopBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  formCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  formTitle: { fontSize: 14, fontWeight: '700' },
  dateInput: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14 },
  companyRow: { flexDirection: 'row', gap: 8 },
  companyBtn: {
    flex: 1, borderWidth: 2, borderRadius: 8, padding: 10, alignItems: 'center',
  },
  companyBtnText: { fontSize: 12, fontWeight: '700' },
  timeRow: { flexDirection: 'row', gap: 8 },
  timeField: { flex: 1, gap: 4 },
  timeLabel: { fontSize: 10 },
  timeInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, flex: 1 },
  notesInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  actionRow: { flexDirection: 'row', gap: 8 },
  startBtn: {
    flex: 1, backgroundColor: '#3b82f6', height: 48, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  startBtnText: { fontSize: 14, fontWeight: '700' },
  manualBtn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  manualBtnText: { fontSize: 14, fontWeight: '700' },
  summaryCard: { borderRadius: 16, borderWidth: 1, padding: 12, alignItems: 'center' },
  summaryLabel: { fontSize: 10 },
  summaryValue: { fontSize: 20, fontWeight: '800', color: '#3b82f6' },
  listSection: { gap: 8 },
  listTitle: { fontSize: 14, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  emptyText: { fontSize: 12 },
  sessionCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 12, borderWidth: 1, padding: 12,
  },
  sessionLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sessionIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sessionIconText: { fontSize: 10, fontWeight: '700' },
  sessionNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sessionCompany: { fontSize: 12, fontWeight: '700' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#3b82f6' },
  sessionTime: { fontSize: 10, marginTop: 2 },
});
