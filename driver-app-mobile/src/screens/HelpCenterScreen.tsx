import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

const HELP_SECTIONS = [
    {
        id: 'account',
        icon: 'person-circle-outline',
        iconColor: '#3b82f6',
        iconBg: 'rgba(59,130,246,0.1)',
        title: 'الحساب والملف الشخصي',
        description: 'إدارة بيانات حسابك وتعديل ملفك الشخصي',
        articles: 5,
    },
    {
        id: 'reports',
        icon: 'bar-chart-outline',
        iconColor: '#20df6c',
        iconBg: 'rgba(32,223,108,0.1)',
        title: 'تقارير الأرباح',
        description: 'كيفية فهم واستخدام التقارير المالية',
        articles: 8,
    },
    {
        id: 'maintenance',
        icon: 'construct-outline',
        iconColor: '#f59e0b',
        iconBg: 'rgba(245,158,11,0.1)',
        title: 'سجلات الصيانة',
        description: 'تتبع صيانة سيارتك والتنبيهات الذكية',
        articles: 6,
    },
    {
        id: 'security',
        icon: 'shield-checkmark-outline',
        iconColor: '#ef4444',
        iconBg: 'rgba(239,68,68,0.1)',
        title: 'أمان التطبيق',
        description: 'حماية بياناتك وإعدادات الخصوصية',
        articles: 4,
    },
];

const FAQ_ITEMS = [
    {
        id: '1',
        question: 'كيف يتم حساب صافي الربح؟',
        answer: 'نقوم بخصم جميع المصاريف المسجلة (الوقود، الصيانة، رسوم المنصة) من إجمالي دخلك عبر جميع تطبيقات التوصيل المتزامنة لنعطيك نظرة دقيقة لصافي أرباحك.',
    },
    {
        id: '2',
        question: 'هل بياناتي المالية آمنة؟',
        answer: 'نعم، جميع بياناتك مشفرة ومحمية بأحدث تقنيات الأمان. لا نشارك أي بيانات مالية مع أطراف خارجية.',
    },
    {
        id: '3',
        question: 'كيف أضيف مصدر دخل جديد؟',
        answer: 'اضغط على زر "+" في الشريط السفلي، ثم اختر الشركة والمبلغ والتاريخ. يمكنك إضافة عدة مداخيل في نفس الوقت.',
    },
    {
        id: '4',
        question: 'كيف أفعّل تنبيهات الصيانة؟',
        answer: 'اذهب إلى إعدادات السيارة، ثم فعّل عناصر الصيانة المطلوبة مثل تغيير الزيت والفلاتر. سيقوم التطبيق بتنبيهك عند اقتراب موعد الصيانة.',
    },
    {
        id: '5',
        question: 'هل يمكنني إدارة أكثر من سيارة؟',
        answer: 'نعم! يمكنك إضافة عدة سيارات والتبديل بينها بسهولة من شاشة إدارة المركبات.',
    },
];

export default function HelpCenterScreen({ navigation }: any) {
    const { colors } = useTheme();
    const { settings: site } = useSiteSettings();
    const [search, setSearch] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

    const filteredFAQ = FAQ_ITEMS.filter(
        item => item.question.includes(search) || item.answer.includes(search)
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.foreground }]}>مركز المساعدة</Text>
                <View style={{ width: 38 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Ionicons name="search-outline" size={18} color={colors.muted} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.foreground }]}
                        placeholder="ابحث عن مساعدة..."
                        placeholderTextColor={colors.muted}
                        value={search}
                        onChangeText={setSearch}
                        textAlign="right"
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={18} color={colors.muted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Help Sections */}
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>أقسام المساعدة</Text>
                <View style={styles.sectionsGrid}>
                    {HELP_SECTIONS.map(section => (
                        <TouchableOpacity
                            key={section.id}
                            style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.sectionIconBox, { backgroundColor: section.iconBg }]}>
                                <Ionicons name={section.icon as any} size={22} color={section.iconColor} />
                            </View>
                            <Text style={[styles.sectionCardTitle, { color: colors.foreground }]}>{section.title}</Text>
                            <Text style={[styles.sectionCardDesc, { color: colors.muted }]}>{section.description}</Text>
                            <View style={styles.sectionCardFooter}>
                                <Text style={[styles.articlesCount, { color: colors.primary }]}>{section.articles} مقالات</Text>
                                <Ionicons name="chevron-back" size={14} color={colors.primary} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* FAQ */}
                <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24 }]}>الأسئلة الشائعة</Text>
                {filteredFAQ.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.faqItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.faqHeader}>
                            <View style={[styles.faqIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                                <Ionicons name="help-circle" size={16} color={colors.primary} />
                            </View>
                            <Text style={[styles.faqQuestion, { color: colors.foreground }]}>{item.question}</Text>
                            <Ionicons
                                name={expandedFAQ === item.id ? 'chevron-up' : 'chevron-down'}
                                size={18}
                                color={colors.muted}
                            />
                        </View>
                        {expandedFAQ === item.id && (
                            <View style={[styles.faqAnswer, { borderTopColor: colors.border }]}>
                                <Text style={[styles.faqAnswerText, { color: colors.muted }]}>{item.answer}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Contact Support */}
                <View style={[styles.contactCard, { borderColor: colors.primary }]}>
                    <View style={[styles.contactIcon, { backgroundColor: 'rgba(32,223,108,0.1)' }]}>
                        <Ionicons name="headset-outline" size={28} color={colors.primary} />
                    </View>
                    <Text style={[styles.contactTitle, { color: colors.foreground }]}>محتاج مساعدة إضافية؟</Text>
                    <Text style={[styles.contactDesc, { color: colors.muted }]}>
                        {site.name ? `${site.name} — ` : ''}{site.description || 'فريق الدعم الفني متاح على مدار الساعة لمساعدتك'}
                    </Text>
                    <TouchableOpacity style={[styles.contactBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
                        <Ionicons name="chatbubbles-outline" size={18} color="#000" />
                        <Text style={styles.contactBtnText}>تواصل مع الدعم</Text>
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
    searchBar: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, height: 48, marginBottom: 24,
    },
    searchInput: { flex: 1, fontSize: 14, height: 48 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
    sectionsGrid: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 12,
    },
    sectionCard: {
        width: '48%', borderRadius: 16, borderWidth: 1, padding: 16,
        minHeight: 150,
    },
    sectionIconBox: {
        width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        marginBottom: 12,
    },
    sectionCardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
    sectionCardDesc: { fontSize: 11, lineHeight: 16 },
    sectionCardFooter: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 12,
    },
    articlesCount: { fontSize: 12, fontWeight: '600' },
    faqItem: {
        borderRadius: 14, borderWidth: 1, marginBottom: 10, overflow: 'hidden',
    },
    faqHeader: {
        flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10,
    },
    faqIcon: {
        width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
    },
    faqQuestion: { flex: 1, fontSize: 14, fontWeight: '600', lineHeight: 20 },
    faqAnswer: { padding: 14, paddingTop: 0, borderTopWidth: 1, marginTop: 0 },
    faqAnswerText: { fontSize: 13, lineHeight: 22 },
    contactCard: {
        borderRadius: 16, borderWidth: 1, padding: 24, alignItems: 'center',
        marginTop: 24, borderStyle: 'dashed',
    },
    contactIcon: {
        width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center',
        marginBottom: 12,
    },
    contactTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
    contactDesc: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
    contactBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12,
    },
    contactBtnText: { color: '#000', fontSize: 14, fontWeight: '700' },
});
