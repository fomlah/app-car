import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Switch, ActivityIndicator,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { BASE_URL, getToken } from '../services/api';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

interface NotifSettingDB {
  id: number;
  settingType: string;
  enabled: boolean;
  timeValue: string | null;
}

const SETTING_META: Record<string, { nameAr: string; descriptionAr: string; icon: string; iconColor: string; iconBg: string; label: string }> = {
  morning: { nameAr: 'تحفيز الصباح', descriptionAr: 'تذكير بالهدف اليومي عند بدء العمل', icon: 'sunny', iconColor: '#fb923c', iconBg: 'rgba(251,146,60,0.1)', label: 'وقت التنبيه' },
  progress: { nameAr: 'تحديث التقدم', descriptionAr: 'تنبيه عند الوصول لنسبة من الهدف', icon: 'trending-up', iconColor: '#20df6c', iconBg: 'rgba(32,223,108,0.1)', label: 'نسبة الإنجاز' },
  inactivity: { nameAr: 'تنبيه الخمول', descriptionAr: 'تذكير إذا لم يتم تسجيل دخل لفترة', icon: 'timer-outline', iconColor: '#ef4444', iconBg: 'rgba(239,68,68,0.1)', label: 'مدة الخمول (ساعات)' },
  evening: { nameAr: 'ملخص المساء', descriptionAr: 'تقرير الأرباح النهائي لليوم', icon: 'moon', iconColor: '#3b82f6', iconBg: 'rgba(59,130,246,0.1)', label: 'وقت التنبيه' },
};

export default function NotificationSettingsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { settings: site } = useSiteSettings();
  const [settings, setSettings] = useState<NotifSettingDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [testSent, setTestSent] = useState(false);

  const authedFetch = useCallback(async (path: string, init?: RequestInit) => {
    const token = await getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init?.headers as any),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(`${BASE_URL}${path}`, { ...init, headers });
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const res = await authedFetch('/api/notification-settings');
      if (res.ok) setSettings(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [authedFetch]);

  useEffect(() => { loadSettings(); }, [loadSettings]);

  const toggleSetting = async (settingType: string, currentEnabled: boolean) => {
    setSettings(prev => prev.map(s => s.settingType === settingType ? { ...s, enabled: !currentEnabled } : s));
    try {
      await authedFetch('/api/notification-settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settingType, enabled: !currentEnabled }),
      });
    } catch {}
  };

  const updateTimeValue = async (settingType: string, timeValue: string) => {
    setSettings(prev => prev.map(s => s.settingType === settingType ? { ...s, timeValue } : s));
    try {
      await authedFetch('/api/notification-settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settingType, timeValue }),
      });
    } catch {}
  };

  const handleTestAlert = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>إشعارات الأهداف الذكية</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Lock Screen Preview */}
        <View style={styles.previewCard}>
          <View style={styles.previewInner}>
            <View style={styles.previewNotif}>
              <View style={styles.previewNotifHeader}>
                <View style={styles.previewAppIcon}>
                  <Text style={{ fontSize: 10 }}>🚗</Text>
                </View>
                <Text style={styles.previewAppName}>{(site.name || 'DRIVE PROFIT').toUpperCase()}</Text>
                <Text style={styles.previewTime}>الآن</Text>
              </View>
              <Text style={styles.previewTitle}>تحديث الهدف اليومي 🚀</Text>
              <Text style={styles.previewBody}>باقي 200 جنيه على هدفك اليوم! استمر 🚗</Text>
            </View>
            <View style={styles.previewIcons}>
              <View style={styles.previewIconCircle}>
                <Ionicons name="sunny" size={16} color="#fff" />
              </View>
              <View style={styles.previewIconCircle}>
                <Ionicons name="moon" size={16} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        {/* Test Alert Success */}
        {testSent && (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={18} color="#20df6c" />
            <Text style={styles.successText}>تم إرسال تنبيه تجريبي!</Text>
          </View>
        )}

        {/* Settings List */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>إعدادات التنبيهات الذكية</Text>

        {settings.map(setting => {
          const meta = SETTING_META[setting.settingType];
          if (!meta) return null;
          return (
            <View key={setting.id} style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.settingHeader}>
                <View style={styles.settingHeaderLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: meta.iconBg }]}>
                    <Ionicons name={meta.icon as any} size={22} color={meta.iconColor} />
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={[styles.settingName, { color: colors.foreground }]}>{meta.nameAr}</Text>
                    <Text style={[styles.settingDesc, { color: colors.muted }]}>{meta.descriptionAr}</Text>
                  </View>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(setting.settingType, setting.enabled)}
                  trackColor={{ false: colors.accent, true: colors.primary }}
                  thumbColor="#fff"
                />
              </View>

              {setting.timeValue && (
                <View style={[styles.settingValue, { borderTopColor: colors.border }]}>
                  <Text style={[styles.settingValueLabel, { color: colors.foreground }]}>{meta.label}</Text>
                  <TextInput
                    style={[styles.settingValueInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                    value={setting.timeValue.replace('%', '')}
                    onChangeText={v => updateTimeValue(setting.settingType, v)}
                    textAlign="center"
                    keyboardType={(setting.settingType === 'morning' || setting.settingType === 'evening') ? 'default' : 'numeric'}
                  />
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.fab, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={[styles.fabBtn, { backgroundColor: colors.primary }]} onPress={handleTestAlert} activeOpacity={0.8}>
          <Ionicons name="send" size={20} color="#000" />
          <Text style={styles.fabBtnText}>إرسال تنبيه تجريبي</Text>
        </TouchableOpacity>
      </View>
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
  previewCard: {
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#1c2e24', padding: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  previewInner: { gap: 24 },
  previewNotif: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', gap: 6,
  },
  previewNotifHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewAppIcon: {
    width: 24, height: 24, borderRadius: 6, backgroundColor: '#20df6c',
    justifyContent: 'center', alignItems: 'center',
  },
  previewAppName: { flex: 1, fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: 2 },
  previewTime: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  previewTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  previewBody: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  previewIcons: { flexDirection: 'row', justifyContent: 'center', gap: 48 },
  previewIconCircle: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
    borderRadius: 12, padding: 12,
  },
  successText: { color: '#20df6c', fontSize: 14, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  settingCard: { borderRadius: 12, borderWidth: 1, padding: 16, gap: 16 },
  settingHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  settingIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  settingInfo: { flex: 1 },
  settingName: { fontSize: 16, fontWeight: '700' },
  settingDesc: { fontSize: 12, marginTop: 2 },
  settingValue: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 12 },
  settingValueLabel: { fontSize: 14, fontWeight: '500' },
  settingValueInput: {
    borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6,
    fontSize: 14, fontWeight: '700', width: 80,
  },
  fab: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 24 },
  fabBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 56, borderRadius: 12,
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  fabBtnText: { color: '#000', fontSize: 18, fontWeight: '700' },
});
