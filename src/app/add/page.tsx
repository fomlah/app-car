'use client';

import Link from 'next/link';
import { LABELS } from '@/constants/labels';
import { Plus, Minus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-24">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-foreground">{LABELS.common.add} {LABELS.common.new}</h1>
        <p className="text-sm text-muted mt-2">{LABELS.common.chooseType}</p>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <Link href="/income" className="relative group overflow-hidden rounded-2xl bg-primary hover:brightness-110 transition-all p-6 h-40 flex flex-col justify-center items-center shadow-lg shadow-primary/20">
          <div className="bg-black/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-black" strokeWidth={3} />
          </div>
          <span className="text-black font-bold text-lg">{LABELS.activity.actions.INCOME_ADD}</span>
          <p className="text-black/60 text-xs mt-1">Uber, Didi, InDrive</p>
        </Link>

        <Link href="/expense" className="relative group overflow-hidden rounded-2xl bg-[#2a1818] border border-danger/30 hover:border-danger hover:bg-[#381a1a] transition-all p-6 h-40 flex flex-col justify-center items-center">
          <div className="bg-danger/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
            <Minus size={32} className="text-danger" strokeWidth={3} />
          </div>
          <span className="text-danger font-bold text-lg">{LABELS.activity.actions.EXPENSE_ADD}</span>
          <p className="text-danger/60 text-xs mt-1">{LABELS.common.fuel}، {LABELS.common.maintenance}، {LABELS.common.andMore}</p>
        </Link>
      </div>

      <button onClick={() => router.back()} className="mt-8 flex items-center gap-2 text-muted hover:text-foreground transition-colors">
        <X size={18} />
        <span className="text-sm font-medium">{LABELS.common.cancel}</span>
      </button>
    </div>
  );
}
