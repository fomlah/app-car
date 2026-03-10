'use client';

import { useState } from 'react';
import { useIncomes, useCompanies } from '@/lib/useData';
import { LABELS } from '@/constants/labels';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { X, Check, Calendar, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

const COMPANY_BG: Record<string, string> = { Uber: '#000000', Didi: '#ff7d00', InDrive: '#B2F75B' };
const COMPANY_TEXT_CLS: Record<string, string> = { Uber: 'text-white', Didi: 'text-white', InDrive: 'text-black' };
const COMPANY_BORDER_ACTIVE: Record<string, string> = { Uber: 'border-black', Didi: 'border-[#ff7d00]', InDrive: 'border-[#1C4637]' };
const COMPANY_BG_ACTIVE: Record<string, string> = { Uber: 'bg-gray-50', Didi: 'bg-orange-50', InDrive: 'bg-green-50' };

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function IncomePage() {
  const router = useRouter();
  const { addIncomes } = useIncomes();
  const { companies } = useCompanies();
  const [date, setDate] = useState(fmtDate(new Date()));
  const [selectedCompanies, setSelectedCompanies] = useState<Record<string, boolean>>({});
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) => ({ ...prev, [company]: !prev[company] }));
  };

  const handleSave = async () => {
    const entries = Object.entries(selectedCompanies)
      .filter(([, selected]) => selected)
      .map(([company]) => ({ date, company, amount: parseFloat(amounts[company] || '0'), notes: notes[company] || '' }))
      .filter((e) => e.amount > 0);
    if (entries.length === 0) return;
    setSaving(true);
    try {
      await addIncomes(entries);
      setSuccess(true);
      setSelectedCompanies({});
      setAmounts({});
      setNotes({});
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const hasValidEntries = Object.entries(selectedCompanies).some(([company, selected]) => selected && parseFloat(amounts[company] || '0') > 0);

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center px-4 h-16">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <X size={20} className="text-foreground" />
          </button>
          <h2 className="flex-1 text-center text-base font-bold text-foreground mr-10">
            {LABELS.activity.actions.INCOME_ADD}
          </h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {success && (
          <div className="mx-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check size={18} className="text-primary" />
              </div>
              <span className="text-sm text-primary font-bold">{LABELS.common.success}</span>
            </div>
          </div>
        )}

        {/* Date Section */}
        <div className="px-4 pt-6">
          <div className="bg-card border border-border/60 rounded-[2rem] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-primary">
                <Calendar size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{LABELS.common.date}</span>
                <span className="text-sm font-bold text-foreground">
                  {date ? format(parseISO(date), 'EEEE، d MMMM yyyy', { locale: ar }) : ''}
                </span>
              </div>
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Platform Selection */}
        <div className="px-4 pt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-black text-foreground uppercase tracking-tight">{LABELS.common.choosePlatform}</h3>
            <span className="text-[10px] font-bold text-muted bg-accent px-2 py-1 rounded-lg">
              {Object.values(selectedCompanies).filter(Boolean).length} {LABELS.common.selected || 'مختار'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {companies.map((companyObj) => {
              const company = companyObj.name;
              const isSelected = !!selectedCompanies[company];
              const bgColor = companyObj.color || COMPANY_BG[company] || '#6366f1';
              return (
                <button
                  key={companyObj.id}
                  onClick={() => toggleCompany(company)}
                  className="group relative focus:outline-none"
                >
                  <div className={`flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem] border transition-all duration-300 ${isSelected
                    ? `border-transparent shadow-lg scale-105`
                    : 'border-border/20 bg-card/40 hover:bg-accent/40 backdrop-blur-sm'
                    }`} style={isSelected ? { backgroundColor: `${bgColor}20`, boxShadow: `0 8px 30px -4px ${bgColor}40`, borderColor: `${bgColor}50` } : {}}>
                    <div
                      className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-105 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                      style={{ backgroundColor: companyObj.logo ? 'white' : bgColor }}
                    >
                      {companyObj.logo ? (
                        <div className="w-full h-full p-1.5 flex items-center justify-center">
                          <img src={companyObj.logo} alt={companyObj.nameAr || company} className="w-full h-full object-contain drop-shadow-sm" />
                        </div>
                      ) : (
                        <span className={`font-black text-xs tracking-tighter ${COMPANY_TEXT_CLS[company] || 'text-white'}`}>
                          {companyObj.nameAr || company}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-black transition-colors duration-300 ${isSelected ? 'text-foreground' : 'text-muted'}`}>
                      {companyObj.nameAr || company}
                    </span>
                  </div>
                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300 ring-2 ring-background"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Check size={14} className="text-white" strokeWidth={4} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Inputs */}
        <div className="px-4 pt-8 space-y-6 pb-40">
          {companies.filter((c) => selectedCompanies[c.name]).map((companyObj) => {
            const company = companyObj.name;
            const bgColor = companyObj.color || COMPANY_BG[company] || '#6366f1';
            return (
              <div key={companyObj.id} className="animate-in slide-in-from-bottom-6 duration-500">
                <div className="bg-card border border-border/60 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm overflow-hidden" style={{ backgroundColor: bgColor }}>
                      {companyObj.logo ? (
                        <img src={companyObj.logo} alt={companyObj.nameAr || company} className="w-full h-full object-contain bg-white p-0.5" />
                      ) : (
                        <span className={`text-[10px] font-black ${COMPANY_TEXT_CLS[company] || 'text-white'}`}>{companyObj.nameAr?.[0] || company[0]}</span>
                      )}
                    </div>
                    <span className="text-xs font-black text-foreground uppercase tracking-tight">{companyObj.nameAr || company}</span>
                  </div>

                  <div className="flex flex-col items-center py-2">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">{LABELS.common.amount}</span>
                    <div className="flex items-end justify-center w-full">
                      <span className="text-xl font-black text-primary mb-3 mr-2">{LABELS.common.currency}</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={amounts[company] || ''}
                        onChange={(e) => setAmounts((prev) => ({ ...prev, [company]: e.target.value }))}
                        className="text-6xl font-black text-foreground bg-transparent border-none focus:ring-0 text-center w-48 placeholder-muted/10 p-0"
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/40">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center text-muted group-focus-within:text-primary transition-colors">
                        <Save size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder={`${LABELS.common.notes} (${LABELS.common.optional})`}
                        value={notes[company] || ''}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [company]: e.target.value }))}
                        className="w-full bg-accent/40 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-foreground placeholder-muted/40 focus:ring-2 focus:ring-primary/10 focus:bg-accent/60 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Floating Save Button */}
      <div className="fixed bottom-10 left-0 right-0 z-50 px-8 pointer-events-none">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSave}
            disabled={!hasValidEntries || saving}
            className={`pointer-events-auto w-full group relative h-16 rounded-full font-black text-lg transition-all duration-500 active:scale-[0.95] ${hasValidEntries && !saving
              ? 'bg-[#20df6c] text-black shadow-[0_20px_50px_rgba(32,223,108,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(32,223,108,0.5)]'
              : 'bg-muted/20 text-muted cursor-not-allowed opacity-50 shadow-none'
              }`}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              {saving ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${hasValidEntries && !saving ? 'bg-black/10 group-hover:bg-black/20' : 'bg-muted/10'}`}>
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
              <span className="tracking-tight">{saving ? LABELS.common.loading : LABELS.common.save}</span>
            </div>

            {/* Ambient Glow Effect */}
            {hasValidEntries && !saving && (
              <div className="absolute inset-0 rounded-full bg-[#20df6c] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Visual Spacer/Fade at bottom of list */}
      <div className="h-40" />
    </div>
  );
}
