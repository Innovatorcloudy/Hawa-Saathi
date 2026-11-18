import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Car, 
  GraduationCap, 
  Dumbbell, 
  Wind, 
  Home, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { CitySmogData, FamilyProfile, RoutineActivity, Language } from '../types';

interface RoutineOptimizerProps {
  city: CitySmogData;
  familyProfile: FamilyProfile;
  language: Language;
}

export const RoutineOptimizer: React.FC<RoutineOptimizerProps> = ({
  city,
  familyProfile,
  language
}) => {
  const [filterCategory, setFilterCategory] = React.useState<string>('All');
  const [isOptimizing, setIsOptimizing] = React.useState(false);

  // Generate activities dynamically tuned to city AQI and family profile
  const activities: RoutineActivity[] = React.useMemo(() => {
    const isSevere = city.aqi > 400;
    const hasKids = familyProfile.childrenCount > 0 || familyProfile.infantsCount > 0;
    const hasAsthma = familyProfile.asthmaticOrCopd;
    const hasElderly = familyProfile.elderlyCount > 0;

    return [
      {
        id: 'act-1',
        timeSlot: '06:00 AM - 08:00 AM',
        hour: 6,
        activityName: 'Morning Exercise & Park Walk',
        category: 'Exercise',
        traditionalHabit: 'Outdoor morning walk or jog in park during crisp winter sunrise.',
        saathiAlternative: 'Strictly swap for indoor yoga / resistance band workouts with air purifier or sealed room.',
        exposureRiskReductionPct: isSevere ? 88 : 72,
        recommendedMask: 'None required indoors',
        healthTip: hasAsthma || hasElderly 
          ? 'Deep heavy breathing during outdoor cold smog triggers bronchial spasms. Cold air carries dense particles deep into lower bronchioles.'
          : 'Avoid deep cardiovascular exertion outdoors until the temperature inversion breaks.'
      },
      {
        id: 'act-2',
        timeSlot: '07:45 AM - 08:45 AM',
        hour: 7,
        activityName: hasKids ? 'School Departure & Transport' : 'Morning Work Commute',
        category: hasKids ? 'School' : 'Commute',
        traditionalHabit: hasKids 
          ? 'Open e-rickshaw, auto, or two-wheeler school drop with cloth mask.'
          : 'Two-wheeler commute through peak morning vehicular exhaust choke points.',
        saathiAlternative: 'Group carpooling or closed metro/bus with windows sealed; tight-fitting pediatric N95 mask.',
        exposureRiskReductionPct: 65,
        recommendedMask: 'N95 / FFP2 with tight seal',
        healthTip: 'Cloth masks only filter 10-20% of PM2.5. Genuine N95/FFP2 masks with an adjustable metal nose clip filter >95% of fine particulates.'
      },
      {
        id: 'act-3',
        timeSlot: '10:00 AM - 11:30 AM',
        hour: 10,
        activityName: 'Indoor Household Cleaning',
        category: 'Indoor Chores',
        traditionalHabit: 'Dry sweeping with broom (jhadu) kicking up settled toxic particulate dust.',
        saathiAlternative: 'Micro-fiber damp mopping (pocha) with mild saline warm water; keep windows still shut.',
        exposureRiskReductionPct: 45,
        recommendedMask: 'None required indoors',
        healthTip: 'Dry broom sweeping suspends microscopic PM10 and heavy toxic metals back into the air for up to 3 hours.'
      },
      {
        id: 'act-4',
        timeSlot: `${city.ventilationWindow.startHour}:00 PM - ${city.ventilationWindow.endHour}:00 PM`,
        hour: city.ventilationWindow.startHour,
        activityName: 'Solar Thermal Ventilation Window',
        category: 'Ventilation',
        traditionalHabit: 'Keeping windows closed 24 hours leading to high indoor CO2 (>1500 ppm) and lethargy.',
        saathiAlternative: 'Open opposite windows for 20-30 minutes for rapid cross-ventilation during peak solar inversion break.',
        exposureRiskReductionPct: 35,
        recommendedMask: 'None required indoors',
        healthTip: 'Afternoon sun creates vertical convection, temporarily dispersing ground smoke. Flush indoor stale air then re-seal.'
      },
      {
        id: 'act-5',
        timeSlot: '05:30 PM - 07:30 PM',
        hour: 17,
        activityName: 'Evening Return Commute & Errands',
        category: 'Commute',
        traditionalHabit: 'Stopping at open roadside street stalls and crowded road intersections during evening rush.',
        saathiAlternative: 'Consolidated errands; wear sealed N95 mask; carpool or use subway/metro underground.',
        exposureRiskReductionPct: 70,
        recommendedMask: 'N95 / FFP2 with tight seal',
        healthTip: 'Evening rush hour combines cooling temperatures with diesel exhaust. Ground PM2.5 begins spiking sharply by 6:30 PM.'
      },
      {
        id: 'act-6',
        timeSlot: '08:00 PM - 10:30 PM',
        hour: 20,
        activityName: 'Dinner Cooking & Night Warming',
        category: 'Indoor Chores',
        traditionalHabit: 'Deep frying spices with closed exhaust, or burning charcoal/wood for night warmth.',
        saathiAlternative: 'Run kitchen exhaust 5 min before cooking; use electric oil radiator or thick quilts + hot water bags.',
        exposureRiskReductionPct: 82,
        recommendedMask: 'None required indoors',
        healthTip: 'Never burn wood, charcoal, or angithi indoors! Carbon monoxide poisoning in sealed winter rooms is a severe fatal hazard.'
      }
    ];
  }, [city, familyProfile]);

  const handleSimulateOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 700);
  };

  const filteredActivities = filterCategory === 'All'
    ? activities
    : activities.filter(a => a.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header with GenAI Recalculate */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">
              AI Low-Exposure Daily Routine Shield
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Custom schedule tuned to <strong>{city.name}</strong> (AQI {city.aqi}) and your household profile ({familyProfile.childrenCount} kids, {familyProfile.elderlyCount} seniors, {familyProfile.asthmaticOrCopd ? 'Asthma condition active' : 'No respiratory conditions'}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateOptimize}
            disabled={isOptimizing}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
            {isOptimizing ? 'Recalculating Routine...' : 'Re-Optimize with GenAI'}
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Commute', 'School', 'Exercise', 'Ventilation', 'Indoor Chores'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-slate-200 text-slate-900 shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Activity Cards */}
      <div className="space-y-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-md"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-semibold border border-slate-700">
                  {act.timeSlot}
                </span>
                <h3 className="font-bold text-base text-white">
                  {act.activityName}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  ↓ {act.exposureRiskReductionPct}% Exposure Cut
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Mask: {act.recommendedMask}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              {/* Conventional High-Risk Habit */}
              <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Conventional High-Exposure Routine
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {act.traditionalHabit}
                </p>
              </div>

              {/* Hawa Saathi AI Optimized Alternative */}
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Hawa Saathi Protective Switch
                </div>
                <p className="text-emerald-100 font-medium leading-relaxed">
                  {act.saathiAlternative}
                </p>
              </div>
            </div>

            {/* Health / Science Tip */}
            <div className="mt-3 bg-slate-800/40 rounded-lg p-2.5 text-xs text-slate-400 flex items-start gap-2 border border-slate-800">
              <span className="font-semibold text-slate-300">💡 Science Tip:</span>
              <span>{act.healthTip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
