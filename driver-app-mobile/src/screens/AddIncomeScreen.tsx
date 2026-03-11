import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useIncomes, useCompanies } from '../hooks/useData';
import { COMPANY_COLORS } from '../constants/theme';
import { parseLocalizedNumber } from '../utils/numbers';
import DateTimePicker from '@react-native-community/datetimepicker';

const MONTH_NAMES = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AddIncomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { addIncome } = useIncomes();
  const { companies } = useCompanies();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [amount, setAmount] = useState('0');
  const [dateText, setDateText] = useState(formatDate(new Date()));
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const parsedDate = new Date(dateText);
  const isValidDate = !isNaN(parsedDate.getTime());
  const pickerDate = isValidDate ? parsedDate : new Date();

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      setAmount(prev => prev.length <= 1 ? '0' : prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? key : prev + key);
    }
  };

  const handleSave = async () => {
    const numAmount = parseLocalizedNumber(amount);
    if (numAmount <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح');
      return;
    }
    if (!selectedPlatform) {
      Alert.alert('خطأ', 'يرجى تحديد المنصة');
      return;
    }
    setSaving(true);
    try {
      await addIncome({
        company: selectedPlatform,
        amount: numAmount,
        date: dateText,
        notes: '',
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setAmount('0');
        navigation.goBack();
      }, 1200);
    } catch (e: any) {
      Alert.alert('خطأ', e.message || 'حدث خطأ');
    }
    setSaving(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>إضافة دخل يومي</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Date Selector */}
        <View style={[styles.dateCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.dateIconBox, { backgroundColor: colors.accent, borderColor: colors.border }]}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.dateLabel, { color: colors.muted }]}>التاريخ (YYYY-MM-DD)</Text>
            <TextInput
              style={[styles.dateInput, { color: colors.foreground }]}
              value={dateText}
              onChangeText={setDateText}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.muted}
              textAlign="right"
            />
          </View>
        </View>

        {showPicker && (
          <DateTimePicker
            value={pickerDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(Platform.OS === 'ios');
              if (selectedDate) setDateText(formatDate(selectedDate));
            }}
          />
        )}

        {/* Platform Selection */}
        <Text style={[styles.sectionLabel, { color: colors.foreground }]}>اختر المنصة</Text>
        <View style={styles.platformGrid}>
          {companies.map(p => {
            const isActive = selectedPlatform === p.name;
            const bg = p.color || COMPANY_COLORS[p.name]?.bg || '#16a34a';
            const text = COMPANY_COLORS[p.name]?.text || '#FFFFFF';
            const borderActive = p.color || COMPANY_COLORS[p.name]?.bg || '#16a34a';

            return (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.platformCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isActive && { borderColor: borderActive, backgroundColor: colors.accent },
                ]}
                onPress={() => setSelectedPlatform(p.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.platformLogo, { backgroundColor: bg }]}>
                  <Text style={[styles.platformLogoText, { color: text, fontSize: p.name === 'InDrive' ? 9 : 14 }]}>
                    {p.nameAr || p.name}
                  </Text>
                </View>
                <Text style={[styles.platformName, { color: colors.muted }]}>{p.nameAr || p.name}</Text>
                {isActive && (
                  <View style={[styles.checkBadge, { backgroundColor: borderActive }]}>
                    <Ionicons name="checkmark" size={14} color={text} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Amount Display */}
        <View style={styles.amountSection}>
          <Text style={[styles.amountLabel, { color: colors.muted }]}>أدخل المبلغ</Text>
          <View style={styles.amountDisplay}>
            <Text style={[styles.currencySymbol, { color: colors.muted }]}>ج.م</Text>
            <Text style={[styles.amountText, { color: colors.foreground }]}>{amount}</Text>
            <View style={[styles.cursor, { backgroundColor: colors.primary }]} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom: Save + Numpad */}
      <View style={[styles.bottomSection, { backgroundColor: colors.background }]}>
        {/* Save Button */}
        <View style={styles.saveBtnContainer}>
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: colors.primary }, (saving || saved) && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving || saved}
            activeOpacity={0.8}
          >
            {saved ? (
              <View style={styles.savedRow}>
                <Ionicons name="checkmark-circle" size={24} color={colors.background} />
                <Text style={[styles.saveBtnText, { color: colors.background }]}>تم الحفظ!</Text>
              </View>
            ) : (
              <View style={styles.savedRow}>
                <Ionicons name="save-outline" size={22} color={colors.background} />
                <Text style={[styles.saveBtnText, { color: colors.background }]}>حفظ الدخل</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Numpad */}
        <View style={styles.numpad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['.', '0', 'back'],
          ].map((row, ri) => (
            <View key={ri} style={styles.numpadRow}>
              {row.map(key => (
                <TouchableOpacity
                  key={key}
                  style={[styles.numpadKey, { backgroundColor: colors.card }]}
                  onPress={() => handleKeyPress(key)}
                  activeOpacity={0.6}
                >
                  {key === 'back' ? (
                    <Ionicons name="backspace-outline" size={26} color={colors.foreground} />
                  ) : (
                    <Text style={[styles.numpadKeyText, { color: colors.foreground }]}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },
  dateCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderRadius: 16,
    borderWidth: 1,
  },
  dateLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dateIconBox: {
    width: 48, height: 48, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1,
  },
  dateLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  dateValue: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  changeDateBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1,
  },
  changeDateText: { fontSize: 13, fontWeight: '700' },
  dateInput: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  sectionLabel: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
    marginTop: 28, marginBottom: 14, paddingHorizontal: 4,
  },
  platformGrid: { flexDirection: 'row', gap: 14 },
  platformCard: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 16, borderRadius: 16,
    borderWidth: 2, gap: 10,
  },
  platformLogo: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
  platformLogoText: { fontWeight: '700' },
  platformName: { fontSize: 13, fontWeight: '700' },
  checkBadge: {
    position: 'absolute', top: 8, right: 8,
    width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
  amountSection: { alignItems: 'center', paddingVertical: 32 },
  amountLabel: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  amountDisplay: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' },
  currencySymbol: { fontSize: 28, fontWeight: '700', marginRight: 6 },
  amountText: { fontSize: 56, fontWeight: '700', letterSpacing: -1 },
  cursor: {
    width: 3, height: 48,
    borderRadius: 2, marginLeft: 4, opacity: 0.6,
  },
  bottomSection: { paddingBottom: 24 },
  saveBtnContainer: { paddingHorizontal: 20, marginBottom: 20 },
  saveBtn: {
    borderRadius: 16, height: 60,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 5,
  },
  saveBtnDisabled: { opacity: 0.6 },
  savedRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  saveBtnText: { fontSize: 18, fontWeight: '700' },
  numpad: { paddingHorizontal: 20, gap: 10 },
  numpadRow: { flexDirection: 'row', gap: 10 },
  numpadKey: {
    flex: 1, height: 56, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  numpadKeyText: { fontSize: 24, fontWeight: '700' },
});
