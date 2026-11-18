import React from 'react';
import { X, Users, Baby, HeartPulse, Bike, Home, Flame, Check } from 'lucide-react';
import { FamilyProfile, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FamilyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FamilyProfile;
  onSave: (updated: FamilyProfile) => void;
  language: Language;
}

export const FamilyProfileModal: React.FC<FamilyProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  language
}) => {
  if (!isOpen) return null;

  const [form, setForm] = React.useState<FamilyProfile>({ ...profile });
  const t = TRANSLATIONS[language];

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t.familyConfigModalTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Tailors GenAI routine recommendations, mask grades, and exposure limits to your household.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form controls */}
        <div className="space-y-4 text-xs">
          {/* Members count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">Infants & Toddlers (0-4 yrs)</span>
                <span className="text-[11px] text-slate-400">Underdeveloped lung airways</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, infantsCount: Math.max(0, f.infantsCount - 1) }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >-</button>
                <span className="w-6 text-center font-bold text-white font-mono">{form.infantsCount}</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, infantsCount: f.infantsCount + 1 }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >+</button>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">School Children (5-16 yrs)</span>
                <span className="text-[11px] text-slate-400">Outdoor morning transit</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, childrenCount: Math.max(0, f.childrenCount - 1) }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >-</button>
                <span className="w-6 text-center font-bold text-white font-mono">{form.childrenCount}</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, childrenCount: f.childrenCount + 1 }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >+</button>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">Seniors (65+ yrs)</span>
                <span className="text-[11px] text-slate-400">Cardiovascular & COPD risk</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, elderlyCount: Math.max(0, f.elderlyCount - 1) }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >-</button>
                <span className="w-6 text-center font-bold text-white font-mono">{form.elderlyCount}</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, elderlyCount: f.elderlyCount + 1 }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >+</button>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">Bike / Walk Commuters</span>
                <span className="text-[11px] text-slate-400">Direct road-level exposure</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, outdoorWorkersCount: Math.max(0, f.outdoorWorkersCount - 1) }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >-</button>
                <span className="w-6 text-center font-bold text-white font-mono">{form.outdoorWorkersCount}</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, outdoorWorkersCount: f.outdoorWorkersCount + 1 }))}
                  className="w-7 h-7 rounded bg-slate-700 text-slate-200 font-bold hover:bg-slate-600"
                >+</button>
              </div>
            </div>
          </div>

          {/* Toggle for Asthma / Respiratory illness */}
          <div className="bg-rose-950/40 border border-rose-800/50 p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <div>
                <span className="font-bold text-rose-200 block">Active Asthma / Bronchitis / Allergy in Family?</span>
                <span className="text-[11px] text-rose-300/80">Forces stricter threshold warnings (strict N95 mask mandates & air filter targets).</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.asthmaticOrCopd}
                onChange={(e) => setForm(f => ({ ...f, asthmaticOrCopd: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          {/* Heating & Housing Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <label className="font-semibold text-slate-200 block mb-1">Winter Heating Method</label>
              <select
                value={form.heatingMethod}
                onChange={(e) => setForm(f => ({ ...f, heatingMethod: e.target.value as any }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="Room Heater/AC">Electric Oil/Ceramic Heater</option>
                <option value="Angithi/Charcoal Fire">Angithi / Wood / Charcoal Fire (High Hazard)</option>
                <option value="Electric Blanket">Electric Blanket / Hot Water Bottles</option>
                <option value="None">No Active Heating</option>
              </select>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <label className="font-semibold text-slate-200 block mb-1">Kitchen Cooking Method</label>
              <select
                value={form.cookingFuel}
                onChange={(e) => setForm(f => ({ ...f, cookingFuel: e.target.value as any }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="LPG/Induction">LPG / Induction Cooktop</option>
                <option value="Wood/Biomass">Chulha / Firewood / Biomass (High Hazard)</option>
                <option value="Kerosene">Kerosene Burner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Check className="w-4 h-4" />
            {t.saveProfile}
          </button>
        </div>
      </div>
    </div>
  );
};
