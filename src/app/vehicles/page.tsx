'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Car, CheckCircle2, Loader2, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  createdAt: string;
}

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vehicles');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setVehicles(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const activeVehicle = useMemo(() => vehicles.find((v) => v.isActive) || null, [vehicles]);

  const setActive = async (id: number) => {
    setBusyId(id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: true }),
      });
      if (res.ok) await load();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: number) => {
    if (!confirm(LABELS.vehiclesPage.deleteConfirm)) return;
    setBusyId(id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) await load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-foreground"
        >
          <ArrowRight size={22} />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center pl-2">{LABELS.vehiclesPage.title}</h1>
        <Link href="/vehicle" className="text-primary text-sm font-bold hover:text-primary/80 transition-colors">
          {LABELS.vehiclesPage.manage}
        </Link>
      </header>

      <main className="max-w-[480px] mx-auto p-4 space-y-4">
        {activeVehicle && (
          <div className="bg-[#1c2e24] border border-white/5 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">{LABELS.vehiclesPage.activeVehicle}</p>
                <p className="text-white font-extrabold text-lg mt-0.5">
                  {activeVehicle.name} {activeVehicle.model}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {activeVehicle.year}{activeVehicle.licensePlate ? ` • ${activeVehicle.licensePlate}` : ''}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Car className="text-primary" size={22} />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href="/vehicle"
                className="flex-1 h-11 rounded-xl bg-primary text-black font-bold flex items-center justify-center"
              >
                {LABELS.vehiclesPage.vehicleAndMaintenanceProfile}
              </Link>
            </div>
          </div>
        )}

        {vehicles.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <Car size={42} className="text-muted/30 mx-auto mb-3" />
            <p className="text-foreground font-bold">{LABELS.vehiclesPage.noVehicles}</p>
            <p className="text-sm text-muted mt-1">{LABELS.vehiclesPage.noVehiclesDesc}</p>
            <Link href="/vehicle" className="inline-flex mt-4 bg-primary text-black font-bold px-5 py-2.5 rounded-xl">
              {LABELS.vehiclesPage.addOrManageVehicles}
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((v) => {
              const isBusy = busyId === v.id;
              return (
                <div key={v.id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-extrabold text-foreground truncate">
                          {v.name} {v.model}
                        </p>
                        {v.isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                            <Star size={11} /> {LABELS.vehiclesPage.activeBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {v.year}{v.licensePlate ? ` • ${v.licensePlate}` : ''}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-accent border border-border rounded-xl p-2">
                          <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{LABELS.vehiclesPage.meterShort}</p>
                          <p className="text-sm font-extrabold text-foreground" dir="ltr">{Number(v.odometer || 0).toLocaleString()} {LABELS.common.distanceUnit}</p>
                        </div>
                        <div className="bg-accent border border-border rounded-xl p-2">
                          <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{LABELS.vehiclesPage.consumptionShort}</p>
                          <p className="text-sm font-extrabold text-primary" dir="ltr">{v.avgConsumption ? v.avgConsumption : '—'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => setActive(v.id)}
                        disabled={isBusy || v.isActive}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors ${
                          v.isActive
                            ? 'bg-primary/10 border-primary/20 text-primary cursor-default'
                            : 'bg-accent border-border text-foreground hover:bg-accent/70'
                        } ${isBusy ? 'opacity-60' : ''}`}
                      >
                        {isBusy ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                      </button>
                      <button
                        onClick={() => remove(v.id)}
                        disabled={isBusy}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center bg-danger/10 border border-danger/20 text-danger hover:bg-danger/15 transition-colors ${isBusy ? 'opacity-60' : ''}`}
                      >
                        {isBusy ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
