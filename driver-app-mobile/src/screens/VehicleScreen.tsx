import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator, Switch,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { vehiclesAPI, maintenanceAPI } from '../services/api';

interface MaintItem {
  id: number;
  name: string;
  nameAr: string;
  lastChangedAt: string | null;
  nextDueKm: number | null;
  currentKm: number | null;
  remainingPct: number;
  status: string;
  enabled: boolean;
}

interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  licensePlate: string | null;
  odometer: number;
  avgConsumption: number;
  isActive: boolean;
  maintenanceItems: MaintItem[];
}

const STATUS_LABELS: Record<string, string> = { good: 'حالة جيدة', warning: 'يستحق قريباً', urgent: 'عاجل' };

function getBarColor(status: string) {
  if (status === 'warning') return '#fb923c';
  if (status === 'urgent') return '#ef4444';
  return '#20df6c';
}

function getStatusColor(status: string) {
  if (status === 'warning') return { text: '#fb923c', bg: 'rgba(251,146,60,0.1)' };
  if (status === 'urgent') return { text: '#ef4444', bg: 'rgba(239,68,68,0.1)' };
  return { text: '#20df6c', bg: 'rgba(32,223,108,0.1)' };
}

export default function VehicleScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddMaint, setShowAddMaint] = useState(false);
  const [saving, setSaving] = useState(false);

  const [vName, setVName] = useState('');
  const [vModel, setVModel] = useState('');
  const [vYear, setVYear] = useState(new Date().getFullYear().toString());
  const [vPlate, setVPlate] = useState('');
  const [vOdometer, setVOdometer] = useState('');
  const [vConsumption, setVConsumption] = useState('');

  const [mName, setMName] = useState('');
  const [mNameAr, setMNameAr] = useState('');
  const [mRemainingPct, setMRemainingPct] = useState('100');

  const loadVehicles = useCallback(async () => {
    try {
      const data = await vehiclesAPI.getAll();
      setVehicles(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadVehicles(); }, [loadVehicles]);

  const activeVehicle = vehicles.find(v => v.isActive) || vehicles[0];

  const handleAddVehicle = async () => {
    if (!vName || !vModel || !vYear) return;
    setSaving(true);
    try {
      await vehiclesAPI.create({
        name: vName, model: vModel, year: parseInt(vYear),
        licensePlate: vPlate || null, odometer: parseInt(vOdometer) || 0,
        avgConsumption: parseFloat(vConsumption) || 0,
      });
      await loadVehicles();
      setShowAddVehicle(false);
      setVName(''); setVModel(''); setVYear(new Date().getFullYear().toString());
      setVPlate(''); setVOdometer(''); setVConsumption('');
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleAddMaintenance = async () => {
    if (!mName || !mNameAr || !activeVehicle) return;
    setSaving(true);
    try {
      await maintenanceAPI.update(0, {
        name: mName, nameAr: mNameAr, vehicleId: activeVehicle.id,
        remainingPct: parseInt(mRemainingPct),
        status: parseInt(mRemainingPct) < 30 ? 'warning' : 'good',
      });
      await loadVehicles();
      setShowAddMaint(false);
      setMName(''); setMNameAr(''); setMRemainingPct('100');
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const toggleMaintenance = async (id: number, enabled: boolean) => {
    try {
      await maintenanceAPI.update(id, { enabled: !enabled });
      await loadVehicles();
    } catch {}
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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>ملف السيارة</Text>
        <TouchableOpacity onPress={() => setShowAddVehicle(true)}>
          <Text style={[styles.headerAction, { color: colors.primary }]}>
            {vehicles.length === 0 ? 'إضافة' : 'تعديل'}
          </Text>
        </TouchableOpacity>
      </View>

      {vehicles.length === 0 && !showAddVehicle ? (
        <View style={styles.emptyState}>
          <Ionicons name="car-outline" size={48} color={colors.muted} style={{ opacity: 0.3 }} />
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>لم تضف سيارة بعد</Text>
          <Text style={[styles.emptySub, { color: colors.muted }]}>أضف سيارتك لتتبع الصيانة والمصروفات</Text>
          <TouchableOpacity style={[styles.addCarBtn, { backgroundColor: colors.primary }]} onPress={() => setShowAddVehicle(true)}>
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.addCarBtnText}>إضافة سيارة</Text>
          </TouchableOpacity>
        </View>
      ) : activeVehicle ? (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Vehicle Profile Card */}
          <View style={[styles.vehicleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.vehicleImageBox}>
              <Ionicons name="car-sport" size={64} color={colors.primary} style={{ opacity: 0.4 }} />
              <View style={styles.vehicleOverlay}>
                <Text style={styles.vehicleName}>{activeVehicle.name} {activeVehicle.model}</Text>
                <Text style={styles.vehicleYear}>
                  {activeVehicle.year}{activeVehicle.licensePlate ? ` • ${activeVehicle.licensePlate}` : ''}
                </Text>
              </View>
            </View>
            <View style={styles.vehicleStats}>
              <View style={[styles.vehicleStat, { backgroundColor: colors.accent, borderColor: colors.border }]}>
                <Text style={[styles.vehicleStatLabel, { color: colors.muted }]}>عداد المسافة</Text>
                <Text style={[styles.vehicleStatValue, { color: colors.foreground }]}>{activeVehicle.odometer.toLocaleString()}</Text>
                <Text style={[styles.vehicleStatUnit, { color: colors.muted }]}>كم</Text>
              </View>
              <View style={[styles.vehicleStat, { backgroundColor: colors.accent, borderColor: colors.border }]}>
                <Text style={[styles.vehicleStatLabel, { color: colors.muted }]}>متوسط الاستهلاك</Text>
                <Text style={[styles.vehicleStatValue, { color: colors.primary }]}>{activeVehicle.avgConsumption || '—'}</Text>
                <Text style={[styles.vehicleStatUnit, { color: colors.muted }]}>لتر/100كم</Text>
              </View>
            </View>
          </View>

          {/* Maintenance Header */}
          <View style={styles.maintHeader}>
            <Text style={[styles.maintTitle, { color: colors.foreground }]}>جدول الصيانة</Text>
            <Text style={[styles.maintCount, { color: colors.muted }]}>{activeVehicle.maintenanceItems.length} عنصر</Text>
          </View>

          {/* Maintenance List */}
          {activeVehicle.maintenanceItems.length === 0 ? (
            <View style={[styles.emptyMaint, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="settings-outline" size={28} color={colors.muted} style={{ opacity: 0.3 }} />
              <Text style={[styles.emptyMaintText, { color: colors.muted }]}>لا توجد عناصر صيانة بعد</Text>
            </View>
          ) : (
            activeVehicle.maintenanceItems.map(item => {
              const sc = getStatusColor(item.status);
              return (
                <View key={item.id} style={[styles.maintCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.maintCardHeader}>
                    <View style={styles.maintCardLeft}>
                      <View style={[styles.maintIcon, { backgroundColor: sc.bg }]}>
                        <Ionicons name="settings" size={20} color={sc.text} />
                      </View>
                      <View>
                        <Text style={[styles.maintName, { color: colors.foreground }]}>{item.nameAr}</Text>
                        <Text style={[styles.maintDate, { color: colors.muted }]}>
                          {item.lastChangedAt ? `آخر تغيير: ${item.lastChangedAt}` : 'لم يتم التسجيل بعد'}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={item.enabled}
                      onValueChange={() => toggleMaintenance(item.id, item.enabled)}
                      trackColor={{ false: colors.accent, true: colors.primary }}
                      thumbColor="#fff"
                    />
                  </View>
                  <View style={styles.maintProgress}>
                    <View style={styles.maintProgressHeader}>
                      <Text style={[styles.maintPct, { color: item.status === 'warning' ? '#fb923c' : colors.foreground }]}>
                        {item.remainingPct}% <Text style={{ color: colors.muted, fontWeight: '400' }}>متبقي</Text>
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                        <Text style={[styles.statusBadgeText, { color: sc.text }]}>
                          {STATUS_LABELS[item.status] || item.status}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: colors.accent }]}>
                      <View style={[styles.progressFill, { width: `${item.remainingPct}%`, backgroundColor: getBarColor(item.status) }]} />
                    </View>
                  </View>
                </View>
              );
            })
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      ) : null}

      {/* Add Maintenance FAB */}
      {activeVehicle && (
        <View style={[styles.fab, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={[styles.fabBtn, { backgroundColor: colors.primary }]} onPress={() => setShowAddMaint(true)} activeOpacity={0.8}>
            <Ionicons name="add-circle" size={20} color="#000" />
            <Text style={styles.fabBtnText}>إضافة عنصر صيانة</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Vehicle Modal */}
      <Modal visible={showAddVehicle} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>إضافة سيارة</Text>
              <TouchableOpacity onPress={() => setShowAddVehicle(false)}>
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalRow}>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>الماركة</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="تويوتا" placeholderTextColor={colors.muted} value={vName} onChangeText={setVName} textAlign="right" />
              </View>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>الموديل</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="كامري" placeholderTextColor={colors.muted} value={vModel} onChangeText={setVModel} textAlign="right" />
              </View>
            </View>
            <View style={styles.modalRow}>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>سنة الصنع</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  value={vYear} onChangeText={setVYear} keyboardType="numeric" textAlign="center" />
              </View>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>رقم اللوحة</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="اختياري" placeholderTextColor={colors.muted} value={vPlate} onChangeText={setVPlate} textAlign="center" />
              </View>
            </View>
            <View style={styles.modalRow}>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>عداد المسافة (كم)</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="0" placeholderTextColor={colors.muted} value={vOdometer} onChangeText={setVOdometer} keyboardType="numeric" textAlign="center" />
              </View>
              <View style={styles.modalField}>
                <Text style={[styles.modalLabel, { color: colors.muted }]}>استهلاك (لتر/100كم)</Text>
                <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
                  placeholder="0" placeholderTextColor={colors.muted} value={vConsumption} onChangeText={setVConsumption} keyboardType="numeric" textAlign="center" />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.modalSaveBtn, (!vName || !vModel || saving) && { backgroundColor: 'rgba(128,128,128,0.3)' }]}
              onPress={handleAddVehicle} disabled={saving || !vName || !vModel}
            >
              {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.modalSaveBtnText}>حفظ السيارة</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Maintenance Modal */}
      <Modal visible={showAddMaint} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>إضافة عنصر صيانة</Text>
              <TouchableOpacity onPress={() => setShowAddMaint(false)}>
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.modalLabel, { color: colors.muted }]}>الاسم (إنجليزي)</Text>
            <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="Engine Oil" placeholderTextColor={colors.muted} value={mName} onChangeText={setMName} textAlign="left" />
            <Text style={[styles.modalLabel, { color: colors.muted, marginTop: 8 }]}>الاسم (عربي)</Text>
            <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              placeholder="زيت المحرك" placeholderTextColor={colors.muted} value={mNameAr} onChangeText={setMNameAr} textAlign="right" />
            <Text style={[styles.modalLabel, { color: colors.muted, marginTop: 8 }]}>النسبة المتبقية %</Text>
            <TextInput style={[styles.modalInput, { backgroundColor: colors.accent, borderColor: colors.border, color: colors.foreground }]}
              value={mRemainingPct} onChangeText={setMRemainingPct} keyboardType="numeric" textAlign="center" />
            <Text style={[styles.pctDisplay, { color: colors.primary }]}>{mRemainingPct}%</Text>
            <TouchableOpacity
              style={[styles.modalSaveBtn, (!mName || !mNameAr || saving) && { backgroundColor: 'rgba(128,128,128,0.3)' }]}
              onPress={handleAddMaintenance} disabled={saving || !mName || !mNameAr}
            >
              {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.modalSaveBtnText}>إضافة</Text>}
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
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerAction: { fontSize: 14, fontWeight: '700' },
  content: { padding: 16, gap: 16 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 80, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptySub: { fontSize: 14, marginBottom: 16 },
  addCarBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 12,
  },
  addCarBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
  vehicleCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  vehicleImageBox: {
    height: 160, backgroundColor: 'rgba(32,223,108,0.05)',
    justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  vehicleOverlay: { position: 'absolute', bottom: 12, right: 16 },
  vehicleName: { fontSize: 22, fontWeight: '700', color: '#fff' },
  vehicleYear: { fontSize: 14, color: '#d1d5db' },
  vehicleStats: { flexDirection: 'row', gap: 12, padding: 16 },
  vehicleStat: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 12, gap: 4 },
  vehicleStatLabel: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  vehicleStatValue: { fontSize: 20, fontWeight: '700' },
  vehicleStatUnit: { fontSize: 10 },
  maintHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  maintTitle: { fontSize: 20, fontWeight: '700' },
  maintCount: { fontSize: 12 },
  emptyMaint: { borderRadius: 16, borderWidth: 1, padding: 32, alignItems: 'center', gap: 8 },
  emptyMaintText: { fontSize: 14 },
  maintCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  maintCardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  maintCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  maintIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  maintName: { fontSize: 16, fontWeight: '700' },
  maintDate: { fontSize: 12, marginTop: 2 },
  maintProgress: { gap: 8 },
  maintProgressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  maintPct: { fontSize: 14, fontWeight: '500' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusBadgeText: { fontSize: 12, fontWeight: '500' },
  progressBar: { width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
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
  modalRow: { flexDirection: 'row', gap: 12 },
  modalField: { flex: 1 },
  modalLabel: { fontSize: 12, marginBottom: 4 },
  modalInput: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  pctDisplay: { textAlign: 'center', fontSize: 14, fontWeight: '700', marginTop: 4 },
  modalSaveBtn: { backgroundColor: '#20df6c', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  modalSaveBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
});
