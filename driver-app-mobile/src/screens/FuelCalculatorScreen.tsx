import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { parseLocalizedNumber } from '../utils/numbers';

const FUEL_PRICES = [
  { label: 'بنزين 80', price: '11.00' },
  { label: 'بنزين 92', price: '12.25' },
  { label: 'بنزين 95', price: '13.75' },
];

export default function FuelCalculatorScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('8');
  const [fuelPrice, setFuelPrice] = useState('12.25');
  const [result, setResult] = useState<{ liters: number; cost: number; costPerKm: number } | null>(null);

  const calculate = () => {
    const d = parseLocalizedNumber(distance);
    const c = parseLocalizedNumber(consumption);
    const p = parseLocalizedNumber(fuelPrice);
    if (!d || !c || !p || d <= 0 || c <= 0 || p <= 0) return;
    const liters = (d * c) / 100;
    const cost = liters * p;
    const costPerKm = cost / d;
    setResult({ liters, cost, costPerKm });
  };

  const reset = () => {
    setDistance('');
    setConsumption('8');
    setFuelPrice('12.25');
    setResult(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>حاسبة الوقود</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Calculator Form */}
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Distance */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>المسافة (كم)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="مثال: 150"
              placeholderTextColor={colors.muted}
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              textAlign="center"
            />
          </View>

          {/* Consumption */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>معدل الاستهلاك (لتر/100كم)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="8"
              placeholderTextColor={colors.muted}
              value={consumption}
              onChangeText={setConsumption}
              keyboardType="numeric"
              textAlign="center"
            />
            <Text style={[styles.hint, { color: colors.muted }]}>المتوسط: 7-10 لتر/100كم للسيارات العادية</Text>
          </View>

          {/* Fuel Price */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.foreground }]}>سعر اللتر (ج.م)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="12.25"
              placeholderTextColor={colors.muted}
              value={fuelPrice}
              onChangeText={setFuelPrice}
              keyboardType="numeric"
              textAlign="center"
            />
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.calcBtn, { backgroundColor: distance ? '#f59e0b' : colors.accent }]}
              onPress={calculate}
              disabled={!distance}
              activeOpacity={0.8}
            >
              <Ionicons name="calculator" size={18} color={distance ? '#fff' : colors.muted} />
              <Text style={[styles.calcBtnText, { color: distance ? '#fff' : colors.muted }]}>احسب</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.accent }]} onPress={reset}>
              <Ionicons name="refresh" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Result */}
        {result && (
          <View style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.resultHeader}>
              <Text style={[styles.resultLabel, { color: colors.muted }]}>التكلفة الإجمالية</Text>
              <Text style={styles.resultAmount}>
                {result.cost.toFixed(1)} <Text style={styles.resultCurrency}>ج.م</Text>
              </Text>
            </View>
            <View style={styles.resultGrid}>
              <View style={styles.resultItem}>
                <Text style={[styles.resultItemLabel, { color: colors.muted }]}>كمية البنزين</Text>
                <Text style={[styles.resultItemValue, { color: colors.foreground }]}>{result.liters.toFixed(1)}</Text>
                <Text style={[styles.resultItemUnit, { color: colors.muted }]}>لتر</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={[styles.resultItemLabel, { color: colors.muted }]}>تكلفة الكيلومتر</Text>
                <Text style={[styles.resultItemValue, { color: colors.foreground }]}>{result.costPerKm.toFixed(2)}</Text>
                <Text style={[styles.resultItemUnit, { color: colors.muted }]}>ج.م/كم</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Reference */}
        <View style={[styles.refCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.refTitle, { color: colors.foreground }]}>مرجع سريع</Text>
          {FUEL_PRICES.map(f => (
            <TouchableOpacity
              key={f.label}
              onPress={() => setFuelPrice(f.price)}
              style={[
                styles.refItem,
                { backgroundColor: fuelPrice === f.price ? 'rgba(245,158,11,0.1)' : colors.accent },
                fuelPrice === f.price && { borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)' },
              ]}
              activeOpacity={0.7}
            >
              <Text style={[styles.refItemLabel, { color: colors.foreground }]}>{f.label}</Text>
              <Text style={styles.refItemPrice}>{f.price} ج.م</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  formCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 16 },
  field: { gap: 6 },
  fieldLabel: { fontSize: 14, fontWeight: '600' },
  input: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 16, fontWeight: '700',
  },
  hint: { fontSize: 10, marginTop: 2 },
  btnRow: { flexDirection: 'row', gap: 8 },
  calcBtn: {
    flex: 1, height: 48, borderRadius: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  calcBtnText: { fontSize: 16, fontWeight: '700' },
  resetBtn: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  resultCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  resultHeader: { backgroundColor: 'rgba(245,158,11,0.1)', padding: 16, alignItems: 'center' },
  resultLabel: { fontSize: 12, marginBottom: 4 },
  resultAmount: { fontSize: 32, fontWeight: '800', color: '#f59e0b' },
  resultCurrency: { fontSize: 14, color: '#9ca3af' },
  resultGrid: { flexDirection: 'row', padding: 16 },
  resultItem: { flex: 1, alignItems: 'center' },
  resultItemLabel: { fontSize: 10, marginBottom: 4 },
  resultItemValue: { fontSize: 20, fontWeight: '800' },
  resultItemUnit: { fontSize: 10, marginTop: 2 },
  refCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 8 },
  refTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  refItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 12, borderRadius: 8,
  },
  refItemLabel: { fontSize: 12, fontWeight: '500' },
  refItemPrice: { fontSize: 12, fontWeight: '700', color: '#f59e0b' },
});
