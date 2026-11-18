import React from 'react';
import { 
  AlertTriangle, 
  Wind, 
  Sun, 
  Droplets, 
  Activity, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Zap,
  Info
} from 'lucide-react';
import { CitySmogData, Language, FamilyProfile } from '../types';
import { getAQIColorConfig } from '../services/aqiService';
import { TRANSLATIONS } from '../data/translations';

interface SmogDashboardProps {
  city: CitySmogData;
  language: Language;
  familyProfile: FamilyProfile;
  onNavigateToRoutine: () => void;
  onNavigateToPurifier: () => void;
}

export const SmogDashboard: React.FC<SmogDashboardProps> = ({
  city,
  language,
  familyProfile,
  onNavigateToRoutine,
  onNavigateToPurifier
}) => {
  const t = TRANSLATIONS[language];
  const aqiConfig = getAQIColorConfig(city.aqi);

  // Calculate WHO PM2.5 multiple (WHO 24h guideline is 15 µg/m³)
  const whoMultiple = (city.pollutants.pm25 / 15).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main AQI Gauge Card */}
        <div className={`lg:col-span-7 rounded-2xl border ${aqiConfig.border} bg-slate-900/80 p-6 shadow-xl relative overflow-hidden backdrop-blur-sm`}>
          {/* Subtle ambient background glow */}
          <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full ${aqiConfig.bg} blur-3xl opacity-40 pointer-events-none`} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                {city.stateOrCountry}
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
                {city.name}
              </h2>
            </div>
            <div className={`px-3 py-1.5 rounded-full border ${aqiConfig.border} ${aqiConfig.bg} ${aqiConfig.text} text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5`}>
              <AlertTriangle className="w-4 h-4" />
              {city.category}
            </div>
          </div>

          {/* Big AQI Number & Context */}
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            <div className="flex items-baseline gap-4">
              <span className={`text-6xl sm:text-7xl font-extrabold font-mono tracking-tight ${aqiConfig.text}`}>
                {city.aqi}
              </span>
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">India AQI</span>
                <span className="text-xs text-rose-400 font-medium">
                  {whoMultiple}× WHO 24h Limit
                </span>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium text-slate-400">Inversion Strength:</span>
                <span className="font-semibold text-amber-400">{city.inversionStrength}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium text-slate-400">Ventilation Hours:</span>
                <span className="font-semibold text-emerald-400">
                  {city.ventilationWindow.startHour}:00 - {city.ventilationWindow.endHour}:00
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium text-slate-400">Temp / Humidity:</span>
                <span className="font-mono text-slate-200">{city.temperatureC}°C / {city.humidityPct}%</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Advisory */}
          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
            {aqiConfig.advice}
          </p>

          {/* Direct CTA shortcuts */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={onNavigateToRoutine}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              View Today's Smog Shield Routine
            </button>
            <button
              onClick={onNavigateToPurifier}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Build ₹2,500 DIY Air Purifier
            </button>
          </div>
        </div>

        {/* Pollutants Breakdown & Inversion Science Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Key Pollutant Tiles */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              Critical Particulate Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 font-medium">PM2.5 (Fine)</span>
                  <span className="text-[10px] text-rose-400 font-semibold px-1 rounded bg-rose-500/10">Hazardous</span>
                </div>
                <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
                  {city.pollutants.pm25}
                  <span className="text-xs text-slate-400 font-normal ml-1">µg/m³</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Deep lung alveolar deposit</div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 font-medium">PM10 (Dust)</span>
                  <span className="text-[10px] text-amber-400 font-semibold px-1 rounded bg-amber-500/10">Severe</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                  {city.pollutants.pm10}
                  <span className="text-xs text-slate-400 font-normal ml-1">µg/m³</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Road dust & construction</div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3">
                <div className="text-xs text-slate-400 font-medium">Nitrogen Dioxide (NO₂)</div>
                <div className="text-xl font-bold font-mono text-slate-200 mt-1">
                  {city.pollutants.no2}
                  <span className="text-xs text-slate-400 font-normal ml-1">µg/m³</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Vehicular combustion</div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3">
                <div className="text-xs text-slate-400 font-medium">Carbon Monoxide (CO)</div>
                <div className="text-xl font-bold font-mono text-slate-200 mt-1">
                  {city.pollutants.co}
                  <span className="text-xs text-slate-400 font-normal ml-1">mg/m³</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Smoldering fires & exhaust</div>
              </div>
            </div>
          </div>

          {/* Winter Inversion Physics Explainer */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-4 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              Why is Winter Smog So Toxic? (Inversion Layer Science)
            </div>
            <p className="leading-relaxed text-slate-300">
              During cold winter nights, rapid radiant ground cooling creates a blanket of warm air above cold stagnant air. This acts like an airtight lid, trapping vehicular exhaust, biomass smoke, and dust within 50–100m of breathing level until the afternoon sun lifts it.
            </p>
          </div>
        </div>
      </div>

      {/* 24-Hour Diurnal Smog Forecast Curve & Safe Windows */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              {t.hourlyTrend}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.safestWindowNotice}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Optimal Window
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Smog Hazard
            </span>
          </div>
        </div>

        {/* Timeline Bar Graph / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {city.hourlyForecast.map((item, idx) => {
            const isOptimal = item.status === 'Optimal Window';
            const isModerate = item.status === 'Moderate';
            const barBg = isOptimal 
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
              : isModerate
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-300';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${barBg} transition-transform hover:-translate-y-0.5 flex flex-col justify-between`}
              >
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300 font-mono">{item.hour}</span>
                  <span className="text-[10px] px-1 rounded bg-black/30 font-medium">
                    {item.status === 'Optimal Window' ? 'Ventilate' : 'Seal'}
                  </span>
                </div>
                <div className="my-2 text-center">
                  <div className="text-xl font-bold font-mono">{item.aqi}</div>
                  <div className="text-[10px] text-slate-400">PM2.5: {item.pm25} µg/m³</div>
                </div>
                <div className="text-[10px] text-center font-medium opacity-90">
                  {isOptimal ? '🌿 Safest Air' : '⛔ High Toxic Cap'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
