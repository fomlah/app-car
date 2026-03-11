import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useExpenses } from '../hooks/useData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { parseLocalizedNumber } from '../utils/numbers';

const CATEGORIES = [
  { id: 'fuel', label: 'وقود', icon: 'flame', color: '#20df6c' },
  { id: 'maintenance', label: 'صيانة', icon: 'build', color: '#94a3b8' },
  { id: 'mobile', label: 'باقة موبايل', icon: 'cellular', color: '#94a3b8' },
  { id: 'cleaning', label: 'غسيل', icon: 'water', color: '#94a3b8' },
  { id: 'other', label: 'أخرى', icon: 'ellipsis-horizontal', color: '#94a3b8' },
];

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AddExpenseScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { addExpense } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState('fuel');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [dateText, setDateText] = useState(formatDate(new Date()));
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const parsedDate = new Date(dateText);
  const isValidDate = !isNaN(parsedDate.getTime());
  const pickerDate = isValidDate ? parsedDate : new Date();

  const handleSave = async () => {
    const numAmount = parseLocalizedNumber(amount);
    if (!numAmount || numAmount <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح');
      return;
    }
    setSaving(true);
    try {
      await addExpense({
        category: selectedCategory,
        customCategory: selectedCategory === 'other' ? customCategory.trim() : undefined,
        amount: numAmount,
        date: dateText,
        notes,
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>إضافة مصروف</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={[styles.amountLabel, { color: colors.muted }]}>المبلغ</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.currencySign, { color: '#20df6c' }]}>ج.م</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.foreground }]}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              autoFocus
            />
          </View>
        </View>

        {/* Category Grid */}
        <View style={styles.categorySection}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>التصنيف</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryCard,
                    { backgroundColor: colors.card, borderColor: 'transparent' },
                    isActive && styles.categoryCardActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.categoryIcon,
                    isActive
                      ? { backgroundColor: '#20df6c' }
                      : { backgroundColor: colors.accent },
                  ]}>
                    <Ionicons
                      name={cat.icon as any}
                      size={22}
                      color={isActive ? colors.background : colors.muted}
                    />
                  </View>
                  <Text style={[
                    styles.categoryLabel,
                    { color: isActive ? '#20df6c' : colors.muted },
                    isActive && { fontWeight: '700' },
                  ]}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom Category Input */}
          {selectedCategory === 'other' && (
            <View style={[styles.customCategoryBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TextInput
                style={[styles.customCategoryInput, { color: colors.foreground }]}
                value={customCategory}
                onChangeText={setCustomCategory}
                placeholder="اكتب اسم التصنيف..."
                placeholderTextColor={colors.muted}
              />
            </View>
          )}
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>التفاصيل</Text>

          {/* Date */}
          <View style={[styles.detailRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.detailIconBox, { backgroundColor: colors.accent, padding: 8, borderRadius: 8 }]}
              onPress={() => setShowPicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>التاريخ (YYYY-MM-DD)</Text>
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

          {/* Notes */}
          <View style={[styles.detailRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.detailIconBox, { backgroundColor: colors.accent }]}>
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailInfo}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>ملاحظات</Text>
              <TextInput
                style={[styles.detailValue, { color: colors.foreground }]}
                value={notes}
                onChangeText={setNotes}
                placeholder="أضف ملاحظة (اختياري)..."
                placeholderTextColor={colors.muted}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.saveBtn, (saving || saved) && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={saving || saved}
          activeOpacity={0.8}
        >
          {saved ? (
            <View style={styles.saveBtnRow}>
              <Ionicons name="checkmark-circle" size={22} color={colors.background} />
              <Text style={[styles.saveBtnText, { color: colors.background }]}>تم الحفظ!</Text>
            </View>
          ) : (
            <View style={styles.saveBtnRow}>
              <Ionicons name="checkmark" size={22} color={colors.background} />
              <Text style={[styles.saveBtnText, { color: colors.background }]}>حفظ المصروف</Text>
            </View>
          )}
        </TouchableOpacity>
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
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', flex: 1 },
  scrollContent: { paddingBottom: 100 },
  amountSection: { alignItems: 'center', paddingTop: 32, paddingBottom: 24, paddingHorizontal: 16 },
  amountLabel: { fontSize: 13, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  amountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  currencySign: { fontSize: 36, fontWeight: '700', marginRight: 4 },
  amountInput: { fontSize: 42, fontWeight: '700', minWidth: 120, textAlign: 'left' },
  categorySection: { paddingHorizontal: 20, paddingTop: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 14 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: {
    width: '30%', aspectRatio: 1.3, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', borderWidth: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  categoryCardActive: {
    backgroundColor: 'rgba(32,223,108,0.1)', borderColor: '#20df6c',
  },
  categoryIcon: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  categoryLabel: { fontSize: 12, fontWeight: '500' },
  detailsSection: { paddingHorizontal: 20, paddingTop: 28, gap: 10 },
  detailRow: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 12, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 2, elevation: 1,
  },
  detailIconBox: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  detailInfo: { flex: 1 },
  detailLabel: { fontSize: 11, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: '600' },
  dateInput: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, borderTopWidth: 1,
  },
  saveBtn: {
    backgroundColor: '#20df6c', borderRadius: 12, height: 56,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  saveBtnRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  saveBtnText: { fontSize: 17, fontWeight: '700' },
  customCategoryBox: {
    marginTop: 12, borderRadius: 12, borderWidth: 1, padding: 14,
  },
  customCategoryInput: { fontSize: 14, fontWeight: '600' },
});
