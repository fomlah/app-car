import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useIncomes, useExpenses } from '../hooks/useData';
import { authAPI } from '../services/api';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, isAdmin, refreshUser } = useAuth();
  const { colors } = useTheme();
  const { settings: site } = useSiteSettings();
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');

  const openEdit = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditPhone(user?.phone || '');
    setCurrentPassword('');
    setNewPassword('');
    setSaveMsg('');
    setSaveError('');
    setShowEdit(true);
  };

  const totalIncome = useMemo(() => incomes.reduce((s, i) => s + i.amount, 0), [incomes]);
  const totalExpense = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const netProfit = totalIncome - totalExpense;
  const totalDays = new Set(incomes.map(i => i.date)).size;
  const totalIncomes = incomes.length;

  const achievements = useMemo(() => {
    const uniqueDays = new Set(incomes.map(i => i.date));
    return [
      { icon: 'trophy', title: 'سائق حديدي', desc: totalDays >= 100 ? '100 يوم عمل مكتمل' : `${totalDays} / 100 يوم`, earned: totalDays >= 100, progress: totalDays / 100, color: '#9ca3af' },
      { icon: 'flame', title: 'بومة الليل', desc: uniqueDays.size >= 50 ? '50 يوم عمل' : `${uniqueDays.size} / 50 يوم`, earned: uniqueDays.size >= 50, progress: uniqueDays.size / 50, color: '#eab308' },
      { icon: 'star', title: 'محقق الأهداف', desc: totalIncomes >= 200 ? 'حققت هدفك 3 مرات' : `${Math.min(Math.floor(totalIncomes / 67), 3)} / 3 أهداف`, earned: totalIncomes >= 200, progress: Math.min(totalIncomes / 200, 1), color: '#a855f7' },
      { icon: 'settings', title: 'ملك الصيانة', desc: expenses.length > 0 ? 'كل مصاريف السيارة مسجلة' : 'سجل مصاريفك', earned: expenses.length > 0, progress: expenses.length > 0 ? 1 : 0, color: '#eab308' },
    ];
  }, [totalDays, totalIncomes, incomes, expenses]);

  const earnedCount = achievements.filter(a => a.earned).length;

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg('');
    setSaveError('');
    try {
      const body: Record<string, string> = { name: editName, email: editEmail, phone: editPhone };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      await authAPI.updateProfile(body);
      setSaveMsg('تم حفظ التغييرات بنجاح');
      await refreshUser();
      setTimeout(() => setShowEdit(false), 1200);
    } catch (err: any) {
      setSaveError(err.message || 'حدث خطأ في الاتصال');
    } finally {
      setSaving(false);
    }
  };

  const links = [
    { icon: 'time-outline', label: 'سجل المعاملات', screen: 'Transactions', iconColor: '#3b82f6', iconBg: 'rgba(59,130,246,0.1)' },
    { icon: 'flash-outline', label: 'حاسبة الوقود', screen: 'Fuel', iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.1)' },
    { icon: 'car-outline', label: 'ساعات العمل', screen: 'WorkSessions', iconColor: '#8b5cf6', iconBg: 'rgba(139,92,246,0.1)' },
    { icon: 'construct-outline', label: 'ملف السيارة والصيانة', screen: 'Vehicle', iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.1)' },
    { icon: 'bar-chart-outline', label: 'توقعات الأرباح', screen: 'Predictions', iconColor: '#20df6c', iconBg: 'rgba(32,223,108,0.1)' },
    { icon: 'warning-outline', label: 'تنبيهات المصروفات', screen: 'Alerts', iconColor: '#ef4444', iconBg: 'rgba(239,68,68,0.1)' },
    { icon: 'notifications-outline', label: 'إشعارات الأهداف الذكية', screen: 'NotificationSettings', iconColor: '#0ea5e9', iconBg: 'rgba(14,165,233,0.1)' },
    { icon: 'trophy-outline', label: 'مشاركة الإنجاز', screen: 'ShareAchievement', iconColor: '#eab308', iconBg: 'rgba(234,179,8,0.1)' },
    { icon: 'settings-outline', label: 'الإعدادات العامة', screen: 'Settings', iconColor: '#6b7280', iconBg: 'rgba(107,114,128,0.1)' },
    { icon: 'help-circle-outline', label: 'مركز المساعدة', screen: 'HelpCenter', iconColor: '#0ea5e9', iconBg: 'rgba(14,165,233,0.1)' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={{ width: 40 }} />
        <Text style={[styles.topBarTitle, { color: colors.foreground }]}>الملف الشخصي</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.topBarBtn}>
          <Ionicons name="settings-outline" size={20} color={colors.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={[styles.avatarLargeText, { color: colors.primary }]}>
              {user?.name?.charAt(0).toUpperCase() || 'س'}
            </Text>
            <View style={[styles.proBadge, { borderColor: colors.background }]}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          </View>
          <Text style={[styles.profileName, { color: colors.foreground }]}>{user?.name || 'سائق'}</Text>
          <View style={styles.profileMeta}>
            <Ionicons name="star" size={14} color="#eab308" />
            <Text style={[styles.profileRole, { color: colors.muted }]}>
              {user?.role === 'ADMIN' ? 'أدمن' : 'سائق'}
            </Text>
            <Text style={[styles.profileDot, { color: colors.border }]}>•</Text>
            <Text style={[styles.profileEmail, { color: colors.muted }]}>{user?.email}</Text>
          </View>
          {user?.phone ? (
            <View style={styles.profileMeta}>
              <Ionicons name="call-outline" size={12} color={colors.muted} />
              <Text style={[styles.profilePhone, { color: colors.muted }]}>{user.phone}</Text>
            </View>
          ) : null}
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.primary }]} onPress={openEdit} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={18} color="#000" />
            <Text style={styles.editBtnText}>تعديل الملف الشخصي</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>أيام العمل</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>{totalDays.toLocaleString()}</Text>
            <View style={styles.statTrend}>
              <Ionicons name="trending-up" size={12} color={colors.primary} />
              <Text style={[styles.statTrendText, { color: colors.primary }]}>عن الشهر الماضي</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>صافي الربح</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>{netProfit.toLocaleString()} ج.م</Text>
            <View style={styles.statTrend}>
              <Ionicons name="wallet-outline" size={12} color={colors.primary} />
              <Text style={[styles.statTrendText, { color: colors.primary }]}>بعد المصروفات</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>الإنجازات والشارات</Text>
          <Text style={[styles.achievementsCount, { color: colors.primary }]}>{earnedCount} / {achievements.length}</Text>
        </View>
        <View style={styles.achievementsGrid}>
          {achievements.map((a, i) => (
            <View key={i} style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border }, !a.earned && styles.achievementDisabled]}>
              <View style={[styles.achievementIconBox, { backgroundColor: colors.accent }]}>
                <Ionicons name={a.icon as any} size={28} color={a.earned ? a.color : colors.muted} />
              </View>
              <Text style={[styles.achievementTitle, { color: colors.foreground }]}>{a.title}</Text>
              <Text style={[styles.achievementDesc, { color: colors.muted }]}>{a.desc}</Text>
              {!a.earned && (
                <>
                  <View style={[styles.miniBar, { backgroundColor: colors.accent }]}>
                    <View style={[styles.miniBarFill, { width: `${Math.min(a.progress * 100, 100)}%`, backgroundColor: colors.primary }]} />
                  </View>
                  <Text style={[styles.miniPct, { color: colors.primary }]}>{Math.round(a.progress * 100)}%</Text>
                </>
              )}
            </View>
          ))}
        </View>

        {/* Utility Links */}
        <View style={styles.linksSection}>
          {links.map((link, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.linkCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate(link.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.linkLeft}>
                <View style={[styles.linkIconBox, { backgroundColor: (link as any).iconBg || 'rgba(32,223,108,0.1)' }]}>
                  <Ionicons name={link.icon as any} size={18} color={(link as any).iconColor || colors.muted} />
                </View>
                <Text style={[styles.linkText, { color: colors.foreground }]}>{link.label}</Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={colors.muted} />
            </TouchableOpacity>
          ))}
          {isAdmin && (
            <TouchableOpacity
              style={[styles.linkCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate('Admin')}
              activeOpacity={0.7}
            >
              <View style={styles.linkLeft}>
                <Ionicons name="shield-outline" size={20} color={colors.muted} />
                <Text style={[styles.linkText, { color: colors.foreground }]}>لوحة التحكم</Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
        <Text style={styles.version}>{site.name ? `${site.name} • ` : ''}إصدار التطبيق 2.4.1 (مستقر)</Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={showEdit} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>تعديل الملف الشخصي</Text>
              <TouchableOpacity onPress={() => setShowEdit(false)}>
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            {saveMsg ? (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={16} color="#20df6c" />
                <Text style={styles.successText}>{saveMsg}</Text>
              </View>
            ) : null}
            {saveError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{saveError}</Text>
              </View>
            ) : null}

            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={[styles.inputLabel, { color: colors.muted }]}>الاسم</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                value={editName} onChangeText={setEditName} textAlign="right"
              />
              <Text style={[styles.inputLabel, { color: colors.muted }]}>البريد الإلكتروني</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                value={editEmail} onChangeText={setEditEmail} keyboardType="email-address" textAlign="left"
              />
              <Text style={[styles.inputLabel, { color: colors.muted }]}>رقم التليفون</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                value={editPhone} onChangeText={setEditPhone} keyboardType="phone-pad" textAlign="left" placeholder="01xxxxxxxxx" placeholderTextColor={colors.muted}
              />
              <Text style={[styles.inputLabel, { color: colors.muted, marginTop: 16 }]}>تغيير كلمة المرور (اختياري)</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry placeholder="كلمة المرور الحالية" placeholderTextColor={colors.muted}
              />
              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                value={newPassword} onChangeText={setNewPassword} secureTextEntry placeholder="كلمة المرور الجديدة" placeholderTextColor={colors.muted}
              />
            </ScrollView>

            <TouchableOpacity
              style={[styles.modalSaveBtn, (!editName || !editEmail || saving) && { backgroundColor: 'rgba(128,128,128,0.3)' }]}
              onPress={handleSaveProfile}
              disabled={saving || !editName || !editEmail}
            >
              {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.modalSaveBtnText}>حفظ التغييرات</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12, borderBottomWidth: 1,
  },
  topBarTitle: { fontSize: 18, fontWeight: '700' },
  topBarBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  content: { paddingHorizontal: 16 },
  profileHeader: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  avatarLarge: {
    width: 128, height: 128, borderRadius: 64,
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 2, borderColor: '#20df6c',
    justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  avatarLargeText: { fontSize: 40, fontWeight: '700' },
  proBadge: {
    position: 'absolute', bottom: 4, right: 4, backgroundColor: '#20df6c',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 2,
  },
  proText: { color: '#000', fontSize: 10, fontWeight: '700' },
  profileName: { fontSize: 24, fontWeight: '800' },
  profileMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  profileRole: { fontSize: 14, fontWeight: '600' },
  profileDot: { fontSize: 14 },
  profileEmail: { fontSize: 14 },
  profilePhone: { fontSize: 14 },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: '100%', height: 48, borderRadius: 12, marginTop: 8,
  },
  editBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16, gap: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  statValue: { fontSize: 22, fontWeight: '800' },
  statTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  statTrendText: { fontSize: 12 },
  achievementsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  achievementsCount: { fontSize: 12, fontWeight: '700' },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  achievementCard: {
    width: '47%', alignItems: 'center', padding: 20, borderRadius: 16, borderWidth: 1, gap: 4,
  },
  achievementDisabled: { opacity: 0.4 },
  achievementIconBox: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  achievementTitle: { fontSize: 14, fontWeight: '700' },
  achievementDesc: { fontSize: 11, textAlign: 'center', lineHeight: 16 },
  miniBar: { width: '100%', height: 4, borderRadius: 2, marginTop: 8, overflow: 'hidden' },
  miniBarFill: { height: '100%', borderRadius: 2 },
  miniPct: { fontSize: 9, fontWeight: '700', marginTop: 2 },
  linksSection: { gap: 8, marginBottom: 24 },
  linkCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderRadius: 12, borderWidth: 1,
  },
  linkLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  linkIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  linkText: { fontSize: 16, fontWeight: '600' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 48, borderRadius: 12, marginBottom: 8,
  },
  logoutText: { color: '#ef4444', fontSize: 16, fontWeight: '700' },
  version: { textAlign: 'center', fontSize: 10, color: '#6b7280', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24,
    borderTopWidth: 1, maxHeight: '85%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(32,223,108,0.1)', borderRadius: 12, padding: 12, marginBottom: 12,
  },
  successText: { color: '#20df6c', fontSize: 14, fontWeight: '500' },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 12, padding: 12, marginBottom: 12,
  },
  errorText: { color: '#ef4444', fontSize: 14, fontWeight: '500' },
  inputLabel: { fontSize: 12, marginBottom: 4, marginTop: 8 },
  modalInput: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 4,
  },
  modalSaveBtn: {
    backgroundColor: '#20df6c', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16,
  },
  modalSaveBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
});
