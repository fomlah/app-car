import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Switch, Linking,  } from 'react-native';
import Text from '../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

interface SettingItemProps {
    icon: string;
    iconColor?: string;
    iconBg?: string;
    label: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showChevron?: boolean;
}

function SettingItem({ icon, iconColor, iconBg, label, subtitle, onPress, rightElement, showChevron = true }: SettingItemProps) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[styles.settingItem, { borderBottomColor: colors.border }]}
            onPress={onPress}
            disabled={!onPress && !rightElement}
            activeOpacity={0.7}
        >
            <View style={[styles.settingIconBox, { backgroundColor: iconBg || 'rgba(32,223,108,0.1)' }]}>
                <Ionicons name={icon as any} size={18} color={iconColor || colors.primary} />
            </View>
            <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>{label}</Text>
                {subtitle ? <Text style={[styles.settingSubtitle, { color: colors.muted }]}>{subtitle}</Text> : null}
            </View>
            {rightElement || (showChevron ? (
                <Ionicons name="chevron-back" size={18} color={colors.muted} />
            ) : null)}
        </TouchableOpacity>
    );
}

export default function SettingsScreen({ navigation }: any) {
    const { user, logout } = useAuth();
    const { colors, theme, toggleTheme } = useTheme();
    const { settings: site } = useSiteSettings();
    const [incomeAlerts, setIncomeAlerts] = useState(true);
    const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
    const [cloudBackup, setCloudBackup] = useState(false);
    const [biometrics, setBiometrics] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.foreground }]}>الإعدادات العامة</Text>
                <View style={{ width: 38 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.profileAvatar}>
                        <Text style={[styles.profileAvatarText, { color: colors.primary }]}>
                            {user?.name?.charAt(0) || 'س'}
                        </Text>
                        <View style={[styles.profileBadge, { backgroundColor: colors.primary, borderColor: colors.card }]}>
                            <Ionicons name="checkmark" size={8} color="#000" />
                        </View>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: colors.foreground }]}>{user?.name || 'أحمد محمد'}</Text>
                        <Text style={[styles.profileRole, { color: colors.muted }]} numberOfLines={2}>
                            {site.description || 'سائق محترف • المستوى الذهبي'}
                        </Text>
                    </View>
                    <View style={[styles.profileStar, { backgroundColor: 'rgba(245,158,11,0.1)' }]}>
                        <Ionicons name="star" size={16} color="#f59e0b" />
                    </View>
                </View>

                {/* Account Settings */}
                <Text style={[styles.sectionTitle, { color: colors.muted }]}>إعدادات الحساب</Text>
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingItem
                        icon="person-outline"
                        label="الملف الشخصي"
                        subtitle="تعديل الاسم والبريد الإلكتروني"
                        onPress={() => navigation.navigate('MainTabs', { screen: 'حسابي' })}
                    />
                    <SettingItem
                        icon="lock-closed-outline"
                        iconBg="rgba(99,102,241,0.1)"
                        iconColor="#6366f1"
                        label="تغيير كلمة المرور"
                        subtitle="تحديث كلمة المرور الخاصة بك"
                        onPress={() => { }}
                    />
                </View>

                {/* Preferences */}
                <Text style={[styles.sectionTitle, { color: colors.muted }]}>التفضيلات</Text>
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingItem
                        icon="language-outline"
                        iconBg="rgba(59,130,246,0.1)"
                        iconColor="#3b82f6"
                        label="اللغة"
                        rightElement={
                            <View style={styles.langBadge}>
                                <Text style={[styles.langText, { color: colors.muted }]}>العربية</Text>
                            </View>
                        }
                        showChevron={false}
                    />
                    <SettingItem
                        icon="moon-outline"
                        iconBg="rgba(139,92,246,0.1)"
                        iconColor="#8b5cf6"
                        label="الوضع الليلي"
                        rightElement={
                            <Switch
                                value={theme === 'dark'}
                                onValueChange={toggleTheme}
                                trackColor={{ false: colors.accent, true: 'rgba(32,223,108,0.3)' }}
                                thumbColor={theme === 'dark' ? colors.primary : '#ccc'}
                            />
                        }
                        showChevron={false}
                    />
                </View>

                {/* Notifications */}
                <Text style={[styles.sectionTitle, { color: colors.muted }]}>التنبيهات</Text>
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingItem
                        icon="cash-outline"
                        iconBg="rgba(32,223,108,0.1)"
                        iconColor="#20df6c"
                        label="تنبيهات الدخل والمصاريف"
                        subtitle="تنبيه فوري عند تسجيل أي معاملة"
                        rightElement={
                            <Switch
                                value={incomeAlerts}
                                onValueChange={setIncomeAlerts}
                                trackColor={{ false: colors.accent, true: 'rgba(32,223,108,0.3)' }}
                                thumbColor={incomeAlerts ? colors.primary : '#ccc'}
                            />
                        }
                        showChevron={false}
                    />
                    <SettingItem
                        icon="construct-outline"
                        iconBg="rgba(245,158,11,0.1)"
                        iconColor="#f59e0b"
                        label="تذكيرات الصيانة"
                        subtitle="تنبيهات تغيير الزيت والفحص الدوري"
                        rightElement={
                            <Switch
                                value={maintenanceAlerts}
                                onValueChange={setMaintenanceAlerts}
                                trackColor={{ false: colors.accent, true: 'rgba(32,223,108,0.3)' }}
                                thumbColor={maintenanceAlerts ? colors.primary : '#ccc'}
                            />
                        }
                        showChevron={false}
                    />
                </View>

                {/* Security & Backup */}
                <Text style={[styles.sectionTitle, { color: colors.muted }]}>الأمان والنسخ الاحتياطي</Text>
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingItem
                        icon="cloud-upload-outline"
                        iconBg="rgba(59,130,246,0.1)"
                        iconColor="#3b82f6"
                        label="النسخ الاحتياطي السحابي"
                        rightElement={
                            <Switch
                                value={cloudBackup}
                                onValueChange={setCloudBackup}
                                trackColor={{ false: colors.accent, true: 'rgba(32,223,108,0.3)' }}
                                thumbColor={cloudBackup ? colors.primary : '#ccc'}
                            />
                        }
                        showChevron={false}
                    />
                    <SettingItem
                        icon="finger-print-outline"
                        iconBg="rgba(239,68,68,0.1)"
                        iconColor="#ef4444"
                        label="قفل التطبيق (Biometrics)"
                        rightElement={
                            <Switch
                                value={biometrics}
                                onValueChange={setBiometrics}
                                trackColor={{ false: colors.accent, true: 'rgba(32,223,108,0.3)' }}
                                thumbColor={biometrics ? colors.primary : '#ccc'}
                            />
                        }
                        showChevron={false}
                    />
                </View>

                {/* Help & Support */}
                <Text style={[styles.sectionTitle, { color: colors.muted }]}>الدعم</Text>
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingItem
                        icon="help-circle-outline"
                        iconBg="rgba(14,165,233,0.1)"
                        iconColor="#0ea5e9"
                        label="مركز المساعدة"
                        subtitle="الأسئلة الشائعة والدعم الفني"
                        onPress={() => navigation.navigate('HelpCenter')}
                    />
                    <SettingItem
                        icon="chatbubble-ellipses-outline"
                        iconBg="rgba(168,85,247,0.1)"
                        iconColor="#a855f7"
                        label="تواصل معنا"
                        subtitle="راسلنا عبر البريد الإلكتروني"
                        onPress={() => Linking.openURL('mailto:support@driverapp.com')}
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={[styles.logoutBtn, { borderColor: 'rgba(239,68,68,0.3)' }]}
                    onPress={logout}
                    activeOpacity={0.7}
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={[styles.versionText, { color: colors.muted }]}>
                    {site.name ? `${site.name} • ` : ''}إصدار التطبيق 2.4.0 (بيتا)
                </Text>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16, borderBottomWidth: 1,
    },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 18, fontWeight: '700' },
    content: { padding: 16 },
    profileCard: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        borderRadius: 16, borderWidth: 1, marginBottom: 24,
    },
    profileAvatar: {
        width: 52, height: 52, borderRadius: 26,
        backgroundColor: 'rgba(32,223,108,0.15)', borderWidth: 2, borderColor: '#20df6c',
        justifyContent: 'center', alignItems: 'center',
    },
    profileAvatarText: { fontSize: 20, fontWeight: '800' },
    profileBadge: {
        position: 'absolute', bottom: -2, right: -2, width: 18, height: 18,
        borderRadius: 9, borderWidth: 2, justifyContent: 'center', alignItems: 'center',
    },
    profileInfo: { flex: 1, marginHorizontal: 12 },
    profileName: { fontSize: 16, fontWeight: '700' },
    profileRole: { fontSize: 12, marginTop: 2 },
    profileStar: {
        width: 36, height: 36, borderRadius: 18,
        justifyContent: 'center', alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 13, fontWeight: '700', marginBottom: 10, marginTop: 8,
        textTransform: 'uppercase', letterSpacing: 0.5,
    },
    sectionCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
    settingItem: {
        flexDirection: 'row', alignItems: 'center', padding: 14,
        borderBottomWidth: 0.5,
    },
    settingIconBox: {
        width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    },
    settingInfo: { flex: 1, marginHorizontal: 12 },
    settingLabel: { fontSize: 14, fontWeight: '600' },
    settingSubtitle: { fontSize: 11, marginTop: 2 },
    langBadge: {
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    langText: { fontSize: 12, fontWeight: '600' },
    logoutBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: 14, borderWidth: 1, backgroundColor: 'rgba(239,68,68,0.08)',
        height: 52, marginTop: 24,
    },
    logoutText: { color: '#ef4444', fontSize: 16, fontWeight: '700' },
    versionText: { textAlign: 'center', fontSize: 12, marginTop: 16 },
});
