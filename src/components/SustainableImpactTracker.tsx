import React from 'react';
import confetti from 'canvas-confetti';
import { 
  Leaf, 
  Flame, 
  Car, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  TrendingUp, 
  CheckCircle2, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { SustainableAction, Language } from '../types';

interface SustainableImpactTrackerProps {
  language: Language;
}

export const SustainableImpactTracker: React.FC<SustainableImpactTrackerProps> = ({ language }) => {
  const [actions, setActions] = React.useState<SustainableAction[]>([
    {
      id: 'heating-1',
      title: 'Zero-Emission Winter Heating',
      category: 'Heating',
      currentHabit: 'Burning charcoal, wood logs, or biomass angithi for outdoor/room warmth.',
      sustainableChoice: 'Electric ceramic/oil radiator, thick layered thermal quilts, and hot-water bags.',
      pm25AvoidedGramsPerDay: 160,
      co2SavedKgPerDay: 4.5,
      annualCostSavingsInr: 1800,
      active: true
    },
    {
      id: 'commute-1',
      title: 'Micro-Carpool & Metro Transit',
      category: 'Commute',
      currentHabit: 'Individual solo car or two-wheeler travel during morning & evening rush hours.',
      sustainableChoice: 'Joining 3-parent school carpool pod or taking the rapid electric metro line.',
      pm25AvoidedGramsPerDay: 55,
      co2SavedKgPerDay: 6.8,
      annualCostSavingsInr: 6500,
      active: true
    },
    {
      id: 'cleaning-1',
      title: 'Micro-Fiber Damp Floor Mopping',
      category: 'Cleaning',
      currentHabit: 'Dry sweeping with broom (jhadu) kicking settled particulate dust back into breathing air.',
      sustainableChoice: 'Damp micro-fiber mopping with warm salt water twice daily.',
      pm25AvoidedGramsPerDay: 30,
      co2SavedKgPerDay: 0.2,
      annualCostSavingsInr: 400,
      active: true
    },
    {
      id: 'waste-1',
      title: 'No-Burn Leaf & Waste Composting',
      category: 'Waste',
      currentHabit: 'Piling and burning dried garden leaves, paper, or plastic trash in alleyways.',
      sustainableChoice: 'Bagging dry leaves for community compost pit or mulch beds.',
      pm25AvoidedGramsPerDay: 210,
      co2SavedKgPerDay: 9.0,
      annualCostSavingsInr: 1200,
      active: false
    },
    {
      id: 'air-1',
      title: 'Smokeless Home Rituals & Mosquito Defense',
      category: 'Cooking',
      currentHabit: 'Burning 2 smoldering mosquito coils and multiple dhoop sticks daily in closed rooms.',
      sustainableChoice: 'Magnetic window net screens + plug-in electrical vaporizers and pure ghee oil lamps.',
      pm25AvoidedGramsPerDay: 40,
      co2SavedKgPerDay: 0.5,
      annualCostSavingsInr: 900,
      active: true
    }
  ]);

  const toggleAction = (id: string) => {
    setActions(prev => {
      const next = prev.map(a => a.id === id ? { ...a, active: !a.active } : a);
      const clicked = next.find(a => a.id === id);
      if (clicked?.active) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      return next;
    });
  };

  // Cumulative metrics calculation
  const activeActions = actions.filter(a => a.active);
  const totalPm25GramsPerDay = activeActions.reduce((sum, a) => sum + a.pm25AvoidedGramsPerDay, 0);
  const totalCo2KgPerDay = activeActions.reduce((sum, a) => sum + a.co2SavedKgPerDay, 0);
  const totalAnnualSavingsInr = activeActions.reduce((sum, a) => sum + a.annualCostSavingsInr, 0);

  // Health equivalent: 1 gram of PM2.5 is equivalent to ~65,000 deep inhaled toxic micrograms
  const cleanLitersCleanAirGained = Math.round(totalPm25GramsPerDay * 320);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-white">
            Direct Impact & Emission Savings Engine
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Every small household choice directly alters the local microclimate and your family’s lung exposure. Toggle sustainable actions below to quantify how much toxic PM2.5 and greenhouse gases your choices prevent.
        </p>
      </div>

      {/* Real-Time Impact Metric Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="text-xs uppercase font-semibold text-emerald-400 flex items-center justify-between">
            <span>PM2.5 Prevented</span>
            <span className="p-1 rounded bg-emerald-500/20">Daily</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-300 mt-2">
            {totalPm25GramsPerDay} <span className="text-sm font-normal text-slate-400">grams/day</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Equivalent to removing {Math.round(totalPm25GramsPerDay / 35)} diesel bikes off the street today!
          </div>
        </div>

        <div className="bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="text-xs uppercase font-semibold text-cyan-400 flex items-center justify-between">
            <span>CO₂ Emissions Saved</span>
            <span className="p-1 rounded bg-cyan-500/20">Daily</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-300 mt-2">
            {totalCo2KgPerDay.toFixed(1)} <span className="text-sm font-normal text-slate-400">kg/day</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Cuts {(totalCo2KgPerDay * 30).toFixed(0)} kg CO₂ monthly from urban thermal heating.
          </div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="text-xs uppercase font-semibold text-amber-400 flex items-center justify-between">
            <span>Clean Breath Volume</span>
            <span className="p-1 rounded bg-amber-500/20">Household</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-300 mt-2">
            {cleanLitersCleanAirGained.toLocaleString()} <span className="text-sm font-normal text-slate-400">Liters</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Purified air delivered to household breathing zones.
          </div>
        </div>

        <div className="bg-slate-900/80 border border-indigo-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="text-xs uppercase font-semibold text-indigo-400 flex items-center justify-between">
            <span>Annual Financial Perks</span>
            <span className="p-1 rounded bg-indigo-500/20">Estimated</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-indigo-300 mt-2">
            ₹{totalAnnualSavingsInr.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Saved on fuel, doctor visits, and commercial filters.
          </div>
        </div>
      </div>

      {/* Sustainable Alternatives Action List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Household Climate & Clean Air Pledges
        </h3>

        <div className="space-y-3 text-xs">
          {actions.map((act) => (
            <div
              key={act.id}
              className={`p-5 rounded-2xl border transition-all ${
                act.active
                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-md'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-white">{act.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {act.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-slate-300">
                    <div>
                      <span className="font-semibold text-rose-400 block text-[11px]">Conventional Practice:</span>
                      <span>{act.currentHabit}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-400 block text-[11px]">Sustainable Alternative:</span>
                      <span className="text-emerald-100 font-medium">{act.sustainableChoice}</span>
                    </div>
                  </div>
                </div>

                {/* Right side stats & toggle */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400 text-sm block">
                      +{act.pm25AvoidedGramsPerDay}g PM2.5 / day
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Cuts {act.co2SavedKgPerDay}kg CO₂/day
                    </span>
                  </div>

                  <button
                    onClick={() => toggleAction(act.id)}
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
                      act.active
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {act.active ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Pledged & Active
                      </>
                    ) : (
                      'Adopt This Action'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
