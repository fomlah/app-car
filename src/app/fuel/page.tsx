'use client';

import { useState } from 'react';
import { LABELS } from '@/constants/labels';
import { Fuel, Calculator, RotateCcw } from 'lucide-react';

export default function FuelPage() {
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('8');
  const [fuelPrice, setFuelPrice] = useState('12.25');
  const [result, setResult] = useState<{ liters: number; cost: number; costPerKm: number } | null>(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const c = parseFloat(consumption);
    const p = parseFloat(fuelPrice);
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
    <div className="flex flex-col min-h-screen bg-background max-w-[480px] mx-auto pb-24">
      {/* Header - Stitch style */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center p-4 h-16">
          <h1 className="text-lg font-bold tracking-tight text-foreground">{LABELS.nav.fuelNav}</h1>
        </div>
      </header>

      <div className="flex-1 px-4 pt-4 space-y-5">
      {/* Calculator Form */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">{LABELS.common.distance}</label>
          <input
            type="number"
            placeholder={LABELS.common.exampleDistance}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-3 text-lg font-bold text-foreground text-center focus:outline-none focus:ring-2 focus:ring-warning/50 transition-all"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">{LABELS.common.consumption}</label>
          <input
            type="number"
            placeholder="8"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground text-center focus:outline-none focus:ring-2 focus:ring-warning/50 transition-all"
            min="0"
            step="0.1"
          />
          <p className="text-[10px] text-muted mt-1">{LABELS.common.avgConsumption}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">{LABELS.common.fuelPrice}</label>
          <input
            type="number"
            placeholder="12.25"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            className="w-full bg-input-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground text-center focus:outline-none focus:ring-2 focus:ring-warning/50 transition-all"
            min="0"
            step="0.25"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculate}
            disabled={!distance}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
              distance ? 'bg-warning hover:opacity-90 active:scale-[0.98] shadow-lg shadow-warning/25' : 'bg-muted cursor-not-allowed'
            }`}
          >
            <Calculator size={18} />
            <span>{LABELS.common.calculate}</span>
          </button>
          <button
            onClick={reset}
            className="w-12 rounded-xl bg-accent text-muted hover:text-foreground transition-colors flex items-center justify-center"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-warning/10 p-4 text-center">
            <p className="text-xs text-muted mb-1">{LABELS.fuel.totalCost}</p>
            <p className="text-3xl font-extrabold text-warning">
              {result.cost.toFixed(1)} <span className="text-sm font-medium text-muted">{LABELS.common.currency}</span>
            </p>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-[10px] text-muted mb-0.5">{LABELS.fuel.fuelAmount}</p>
              <p className="text-lg font-extrabold text-foreground">{result.liters.toFixed(1)}</p>
              <p className="text-[10px] text-muted">{LABELS.fuel.literUnit}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted mb-0.5">{LABELS.fuel.costPerKm}</p>
              <p className="text-lg font-extrabold text-foreground">{result.costPerKm.toFixed(2)}</p>
              <p className="text-[10px] text-muted">{LABELS.fuel.currencyPerKm}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-bold text-foreground mb-3">{LABELS.fuel.quickReference}</h3>
        <div className="space-y-2">
          {[
            { label: LABELS.fuel.fuel80, price: '11.00' },
            { label: LABELS.fuel.fuel92, price: '12.25' },
            { label: LABELS.fuel.fuel95, price: '13.75' },
          ].map((f) => (
            <button
              key={f.label}
              onClick={() => setFuelPrice(f.price)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all ${
                fuelPrice === f.price ? 'bg-warning/10 border border-warning/30' : 'bg-accent hover:bg-accent/80'
              }`}
            >
              <span className="text-xs font-medium text-foreground">{f.label}</span>
              <span className="text-xs font-bold text-warning">{f.price} {LABELS.common.currency}</span>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
