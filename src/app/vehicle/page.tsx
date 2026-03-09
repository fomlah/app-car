'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Car, Droplets, Circle, Wind, Settings, History, PlusCircle, Plus, X, Loader2 } from 'lucide-react';
import { LABELS } from '@/constants/labels';

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

const STATUS_LABELS: Record<string, string> = {
  good: LABELS.common.statusGood,
  warning: LABELS.common.statusWarning,
  urgent: LABELS.common.statusUrgent,
};

export default function VehiclePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddMaint, setShowAddMaint] = useState(false);
  const [saving, setSaving] = useState(false);

  // Add vehicle form
  const [vName, setVName] = useState('');
  const [vModel, setVModel] = useState('');
  const [vYear, setVYear] = useState(new Date().getFullYear().toString());
  const [vPlate, setVPlate] = useState('');
  const [vOdometer, setVOdometer] = useState('');
  const [vConsumption, setVConsumption] = useState('');

  // Add maintenance form
  const [mName, setMName] = useState('');
  const [mNameAr, setMNameAr] = useState('');
  const [mRemainingPct, setMRemainingPct] = useState('100');

  const loadVehicles = useCallback(async () => {
    try {
      const res = await fetch('/api/vehicles');
      if (res.ok) setVehicles(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadVehicles(); }, [loadVehicles]);

  const activeVehicle = vehicles.find((v) => v.isActive) || vehicles[0];

  const handleAddVehicle = async () => {
    if (!vName || !vModel || !vYear) return;
    setSaving(true);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: vName, model: vModel, year: vYear, licensePlate: vPlate, odometer: vOdometer, avgConsumption: vConsumption }),
      });
      if (res.ok) {
        await loadVehicles();
        setShowAddVehicle(false);
        setVName(''); setVModel(''); setVYear(new Date().getFullYear().toString()); setVPlate(''); setVOdometer(''); setVConsumption('');
      }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleAddMaintenance = async () => {
    if (!mName || !mNameAr || !activeVehicle) return;
    setSaving(true);
    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: mName, nameAr: mNameAr, vehicleId: activeVehicle.id, remainingPct: mRemainingPct, status: parseInt(mRemainingPct) < 30 ? 'warning' : 'good' }),
      });
      if (res.ok) {
        await loadVehicles();
        setShowAddMaint(false);
        setMName(''); setMNameAr(''); setMRemainingPct('100');
      }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const toggleMaintenance = async (id: number, enabled: boolean) => {
    await fetch('/api/maintenance', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, enabled: !enabled }),
    });
    await loadVehicles();
  };

  const getBarColor = (status: string) => {
    if (status === 'warning') return 'bg-orange-400';
    if (status === 'urgent') return 'bg-danger';
    return 'bg-primary';
  };

  const getStatusBadgeColor = (status: string) => {
    if (status === 'warning') return 'text-orange-400 bg-orange-400/10';
    if (status === 'urgent') return 'text-danger bg-danger/10';
    return 'text-primary bg-primary/10';
  };

  const getIconColor = (status: string) => {
    if (status === 'warning') return 'text-orange-400 bg-orange-400/10';
    if (status === 'urgent') return 'text-danger bg-danger/10';
    return 'text-primary bg-primary/10';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-foreground">
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center pl-2">{LABELS.common.vehicleProfile}</h1>
        <button onClick={() => setShowAddVehicle(true)} className="text-primary text-sm font-bold hover:text-primary/80 transition-colors">
          {vehicles.length === 0 ? LABELS.common.add : LABELS.vehicles.editVehicle}
        </button>
      </header>

      {/* No vehicles state */}
      {vehicles.length === 0 && !showAddVehicle ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <Car size={48} className="text-muted/30 mb-4" />
          <h2 className="text-lg font-bold text-foreground mb-2">{LABELS.common.noVehicleYet}</h2>
          <p className="text-sm text-muted mb-6">{LABELS.common.addVehicleDesc}</p>
          <button onClick={() => setShowAddVehicle(true)} className="bg-primary text-[#112117] font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
            <Plus size={18} /> {LABELS.vehicles.addVehicle}
          </button>
        </div>
      ) : activeVehicle && (
        <>
          {/* Vehicle Profile Card */}
          <section className="p-4">
            <div className="bg-card rounded-2xl p-4 shadow-lg border border-border">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-accent">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <Car size={64} className="text-primary/40" />
                  </div>
                  <div className="absolute bottom-3 right-4 z-20">
                    <h2 className="text-2xl font-bold text-white leading-tight">{activeVehicle.name} {activeVehicle.model}</h2>
                    <p className="text-gray-300 text-sm">{activeVehicle.year}{activeVehicle.licensePlate ? ` • ${activeVehicle.licensePlate}` : ''}</p>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-3 mt-1">
                  <div className="bg-accent rounded-xl p-3 flex flex-col gap-1 border border-border">
                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">{LABELS.common.odometer}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-foreground">{activeVehicle.odometer.toLocaleString()}</span>
                      <span className="text-xs text-muted">{LABELS.common.distanceUnit}</span>
                    </div>
                  </div>
                  <div className="bg-accent rounded-xl p-3 flex flex-col gap-1 border border-border">
                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">{LABELS.common.avgConsumption}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-primary">{activeVehicle.avgConsumption || '—'}</span>
                      <span className="text-xs text-muted">{LABELS.common.consumptionUnit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance Header */}
          <div className="px-5 pb-2 flex items-center justify-between mt-2">
            <h2 className="text-xl font-bold text-foreground">{LABELS.common.maintenanceSchedule}</h2>
            <span className="text-xs text-muted">{activeVehicle.maintenanceItems.length} {LABELS.common.item}</span>
          </div>

          {/* Maintenance List */}
          <div className="flex flex-col gap-4 px-4 pb-4">
            {activeVehicle.maintenanceItems.length === 0 ? (
              <div className="text-center py-8 bg-card rounded-2xl border border-border">
                <Settings size={28} className="text-muted/30 mx-auto mb-2" />
                <p className="text-sm text-muted">{LABELS.common.noMaintenanceItemsYet}</p>
              </div>
            ) : (
              activeVehicle.maintenanceItems.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-card rounded-2xl p-4 border border-border shadow-md hover:border-primary/30 transition-all ${
                    item.status === 'warning' ? 'hover:border-orange-500/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIconColor(item.status)}`}>
                        <Settings size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">{item.nameAr}</h3>
                        <p className="text-xs text-muted">{item.lastChangedAt ? `${LABELS.common.lastChange}: ${item.lastChangedAt}` : LABELS.common.notRecorded}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={item.enabled} onChange={() => toggleMaintenance(item.id, item.enabled)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-accent rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className={`text-sm font-medium ${item.status === 'warning' ? 'text-orange-400' : 'text-foreground'}`}>
                        {item.remainingPct}% <span className="text-muted font-normal">{LABELS.common.remaining}</span>
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${getStatusBadgeColor(item.status)}`}>
                        {STATUS_LABELS[item.status] || item.status}
                      </span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                      <div className={`${getBarColor(item.status)} h-2 rounded-full`} style={{ width: `${item.remainingPct}%` }} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-card w-full max-w-[480px] rounded-t-3xl p-6 space-y-4 border-t border-border animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{LABELS.vehicles.addVehicle}</h3>
              <button onClick={() => setShowAddVehicle(false)} className="text-muted hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.common.brand}</label>
                <input type="text" placeholder={LABELS.vehicles.brandPlaceholder} value={vName} onChange={(e) => setVName(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.common.model}</label>
                <input type="text" placeholder={LABELS.vehicles.modelPlaceholder} value={vModel} onChange={(e) => setVModel(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.common.year}</label>
                <input type="number" value={vYear} onChange={(e) => setVYear(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.common.plateNumber}</label>
                <input type="text" placeholder={LABELS.common.optional} value={vPlate} onChange={(e) => setVPlate(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.vehicles.odometerKm}</label>
                <input type="number" placeholder="0" value={vOdometer} onChange={(e) => setVOdometer(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">{LABELS.vehicles.consumptionPer100Km}</label>
                <input type="number" step="0.1" placeholder="0" value={vConsumption} onChange={(e) => setVConsumption(e.target.value)}
                  className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
              </div>
            </div>
            <button onClick={handleAddVehicle} disabled={saving || !vName || !vModel}
              className={`w-full py-3.5 rounded-xl font-bold transition-all ${!saving && vName && vModel ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
              {saving ? <Loader2 className="animate-spin mx-auto" size={20} /> : LABELS.vehicles.saveVehicle}
            </button>
          </div>
        </div>
      )}

      {/* Add Maintenance Modal */}
      {showAddMaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-card w-full max-w-[480px] rounded-t-3xl p-6 space-y-4 border-t border-border animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{LABELS.common.addMaintenanceItem}</h3>
              <button onClick={() => setShowAddMaint(false)} className="text-muted hover:text-foreground"><X size={20} /></button>
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.vehicles.nameEn}</label>
              <input type="text" placeholder="Engine Oil" value={mName} onChange={(e) => setMName(e.target.value)}
                className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.vehicles.nameAr}</label>
              <input type="text" placeholder={LABELS.vehicles.maintenanceNameArPlaceholder} value={mNameAr} onChange={(e) => setMNameAr(e.target.value)}
                className="w-full bg-accent border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{LABELS.common.remainingPct}</label>
              <input type="range" min="0" max="100" value={mRemainingPct} onChange={(e) => setMRemainingPct(e.target.value)}
                className="w-full accent-primary" />
              <div className="text-center text-sm font-bold text-primary">{mRemainingPct}%</div>
            </div>
            <button onClick={handleAddMaintenance} disabled={saving || !mName || !mNameAr}
              className={`w-full py-3.5 rounded-xl font-bold transition-all ${!saving && mName && mNameAr ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted cursor-not-allowed'}`}>
              {saving ? <Loader2 className="animate-spin mx-auto" size={20} /> : LABELS.common.add}
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action */}
      {activeVehicle && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-12 z-20">
          <button onClick={() => setShowAddMaint(true)} className="w-full max-w-[480px] mx-auto bg-primary text-[#112117] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(32,223,108,0.3)] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
            <PlusCircle size={20} />
            {LABELS.common.addMaintenanceItem}
          </button>
        </div>
      )}
    </div>
  );
}
