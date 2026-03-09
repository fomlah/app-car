import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Share, Platform,  } from 'react-native';
import Text from '../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useIncomes, useExpenses } from '../hooks/useData';
import { COMPANY_COLORS } from '../constants/theme';

function getMonthStart(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

function formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getMonthEnd(d: Date): string {
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return formatDate(last);
}

const MONTH_NAMES_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function ShareAchievementScreen({ navigation }: any) {
    const { user } = useAuth();
    const { colors } = useTheme();
    const { settings: site } = useSiteSettings();
    const { incomes } = useIncomes();
    const { expenses } = useExpenses();

    const today = new Date();
    const monthStart = getMonthStart(today);
    const monthEnd = getMonthEnd(today);
    const currentMonth = MONTH_NAMES_AR[today.getMonth()];

    const monthIncomeTotal = useMemo(() =>
        incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).reduce((s, i) => s + i.amount, 0),
        [incomes, monthStart, monthEnd]);

    const monthExpenseTotal = useMemo(() =>
        expenses.filter(e => e.date >= monthStart && e.date <= monthEnd).reduce((s, e) => s + e.amount, 0),
        [expenses, monthStart, monthEnd]);

    const monthProfit = monthIncomeTotal - monthExpenseTotal;
    const workDays = useMemo(() =>
        new Set(incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).map(i => i.date)).size,
        [incomes, monthStart, monthEnd]);

    const companyBreakdown = useMemo(() => {
        const map: Record<string, { amount: number }> = {};
        incomes.filter(i => i.date >= monthStart && i.date <= monthEnd).forEach(i => {
            if (!map[i.company]) map[i.company] = { amount: 0 };
            map[i.company].amount += i.amount;
        });
        return Object.entries(map).sort((a, b) => b[1].amount - a[1].amount);
    }, [incomes, monthStart, monthEnd]);

    const handleShare = async () => {
        try {
            const appName = site.name || 'Driver Dashboard';
            const message = `🏆 إنجازي لشهر ${currentMonth}\n\n💰 الأرباح: ${monthProfit.toFixed(0)} ج.م\n📅 أيام العمل: ${workDays}\n📊 إجمالي الدخل: ${monthIncomeTotal.toFixed(0)} ج.م\n\nتطبيق ${appName} - تتبع أرباحك بذكاء!`;
            await Share.share({ message });
        } catch { }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.foreground }]}>مشاركة الإنجاز</Text>
                <View style={{ width: 38 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Achievement Card */}
                <View style={styles.achievementCard}>
                    {/* Trophy Icon */}
                    <View style={styles.trophyContainer}>
                        <View style={styles.trophyGlow} />
                        <View style={styles.trophyCircle}>
                            <Ionicons name="trophy" size={36} color="#f59e0b" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.achievementTitle}>أعلى دخل لهذا الشهر</Text>
                    <View style={styles.monthBadge}>
                        <Ionicons name="calendar-outline" size={12} color="#20df6c" />
                        <Text style={styles.monthBadgeText}>{currentMonth} {today.getFullYear()}</Text>
                    </View>

                    {/* User Badge */}
                    <View style={styles.userBadge}>
                        <View style={styles.userAvatar}>
                            <Text style={styles.userAvatarText}>{user?.name?.charAt(0) || 'س'}</Text>
                        </View>
                        <Text style={styles.userName}>{user?.name || 'السائق'}</Text>
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="checkmark-circle" size={16} color="#20df6c" />
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.achievementDesc}>
                        لقد حققت أداءً مميزاً هذا الشهر! استمر في تحقيق أهدافك المالية.
                    </Text>

                    {/* Stats Cards */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                                <Ionicons name="wallet-outline" size={16} color="#20df6c" />
                            </View>
                            <Text style={styles.statLabel}>الأرباح</Text>
                            <Text style={styles.statValue}>{monthProfit.toFixed(0)}</Text>
                            <Text style={styles.statUnit}>ج.م</Text>
                        </View>
                        <View style={[styles.statDivider]} />
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: 'rgba(59,130,246,0.1)' }]}>
                                <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
                            </View>
                            <Text style={styles.statLabel}>أيام العمل</Text>
                            <Text style={styles.statValue}>{workDays}</Text>
                            <Text style={styles.statUnit}>يوم</Text>
                        </View>
                    </View>

                    {/* Company Breakdown */}
                    {companyBreakdown.length > 0 && (
                        <View style={styles.breakdownSection}>
                            <Text style={styles.breakdownTitle}>توزيع الدخل حسب المنصة</Text>
                            {companyBreakdown.map(([company, data]) => {
                                const cc = COMPANY_COLORS[company];
                                const pct = monthIncomeTotal > 0 ? (data.amount / monthIncomeTotal) * 100 : 0;
                                return (
                                    <View key={company} style={styles.breakdownItem}>
                                        <View style={[styles.breakdownLogo, { backgroundColor: cc?.bg || '#333' }]}>
                                            <Text style={{ color: cc?.text || '#fff', fontSize: 8, fontWeight: '700' }}>
                                                {company === 'InDrive' ? 'inD' : company}
                                            </Text>
                                        </View>
                                        <View style={styles.breakdownBar}>
                                            <View style={[styles.breakdownFill, { width: `${pct}%`, backgroundColor: cc?.bg === '#000000' ? '#555' : cc?.bg || '#20df6c' }]} />
                                        </View>
                                        <Text style={styles.breakdownAmount}>{data.amount.toFixed(0)}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}

                    {/* Watermark */}
                    <View style={styles.watermark}>
                        <Ionicons name="car-sport" size={14} color="rgba(32,223,108,0.5)" />
                        <Text style={styles.watermarkText}>{site.name || 'Driver Dashboard'}</Text>
                    </View>
                </View>

                {/* Share Buttons */}
                <Text style={[styles.shareTitle, { color: colors.foreground }]}>شارك نجاحك مع العالم</Text>

                <TouchableOpacity
                    style={[styles.shareBtn, { backgroundColor: colors.primary }]}
                    onPress={handleShare}
                    activeOpacity={0.8}
                >
                    <Ionicons name="share-social-outline" size={20} color="#000" />
                    <Text style={styles.shareBtnText}>مشاركة الإنجاز</Text>
                </TouchableOpacity>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#25D366' }]} onPress={handleShare}>
                        <Ionicons name="logo-whatsapp" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#1DA1F2' }]} onPress={handleShare}>
                        <Ionicons name="logo-twitter" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#4267B2' }]} onPress={handleShare}>
                        <Ionicons name="logo-facebook" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#E4405F' }]} onPress={handleShare}>
                        <Ionicons name="logo-instagram" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

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
    achievementCard: {
        borderRadius: 20, padding: 24, alignItems: 'center',
        backgroundColor: '#1a2d22',
        borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
        marginBottom: 24,
    },
    trophyContainer: { position: 'relative', marginBottom: 16 },
    trophyGlow: {
        position: 'absolute', top: -8, left: -8, right: -8, bottom: -8,
        borderRadius: 40, backgroundColor: 'rgba(245,158,11,0.08)',
    },
    trophyCircle: {
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: 'rgba(245,158,11,0.15)',
        borderWidth: 2, borderColor: 'rgba(245,158,11,0.3)',
        justifyContent: 'center', alignItems: 'center',
    },
    achievementTitle: {
        fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center',
    },
    monthBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: 'rgba(32,223,108,0.1)', paddingHorizontal: 12, paddingVertical: 6,
        borderRadius: 20, marginBottom: 16,
    },
    monthBadgeText: { color: '#20df6c', fontSize: 12, fontWeight: '600' },
    userBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12,
    },
    userAvatar: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: 'rgba(32,223,108,0.2)', borderWidth: 1.5, borderColor: '#20df6c',
        justifyContent: 'center', alignItems: 'center',
    },
    userAvatarText: { color: '#20df6c', fontSize: 14, fontWeight: '700' },
    userName: { color: '#e0f0e0', fontSize: 15, fontWeight: '700' },
    verifiedBadge: {},
    achievementDesc: {
        color: '#9ca3af', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 16, padding: 16, width: '100%',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    },
    statCard: { flex: 1, alignItems: 'center' },
    statIcon: {
        width: 32, height: 32, borderRadius: 8,
        justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    },
    statLabel: { color: '#9ca3af', fontSize: 11, marginBottom: 4 },
    statValue: { color: '#fff', fontSize: 24, fontWeight: '800' },
    statUnit: { color: '#6b7280', fontSize: 11, marginTop: 2 },
    statDivider: { width: 1, height: 60, backgroundColor: 'rgba(255,255,255,0.08)' },
    breakdownSection: {
        width: '100%', marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12,
        padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    },
    breakdownTitle: { color: '#9ca3af', fontSize: 12, fontWeight: '600', marginBottom: 12 },
    breakdownItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    breakdownLogo: {
        width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center',
    },
    breakdownBar: {
        flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.05)', overflow: 'hidden',
    },
    breakdownFill: { height: '100%', borderRadius: 3 },
    breakdownAmount: { color: '#e0f0e0', fontSize: 12, fontWeight: '700', width: 50, textAlign: 'left' },
    watermark: {
        flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20,
    },
    watermarkText: { color: 'rgba(32,223,108,0.4)', fontSize: 11, fontWeight: '600' },
    shareTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
    shareBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: 14, height: 52, marginBottom: 16,
        shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
    },
    shareBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
    socialRow: {
        flexDirection: 'row', justifyContent: 'center', gap: 14,
    },
    socialBtn: {
        width: 48, height: 48, borderRadius: 24,
        justifyContent: 'center', alignItems: 'center',
    },
});
