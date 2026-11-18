import React from 'react';
import { Wind, ShieldAlert, Users, Settings2, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, CitySmogData, FamilyProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CITIES_DATABASE } from '../services/aqiService';

interface HeaderProps {
  currentCity: CitySmogData;
  onCityChange: (cityId: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  familyProfile: FamilyProfile;
  onOpenFamilyModal: () => void;
  onOpenApiKeyModal: () => void;
  hasCustomApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onCityChange,
  language,
  onLanguageChange,
  familyProfile,
  onOpenFamilyModal,
  onOpenApiKeyModal,
  hasCustomApiKey
}) => {
  const t = TRANSLATIONS[language];

  // Count total vulnerable members
  const vulnerableCount =
    familyProfile.infantsCount +
    familyProfile.childrenCount +
    familyProfile.elderlyCount +
    (familyProfile.asthmaticOrCopd ? 1 : 0);

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Top Emergency Smog Alert Ticker */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 px-4 py-1.5 text-xs text-rose-200 border-b border-rose-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-semibold text-rose-100 uppercase tracking-wider">
            {currentCity.grapStage} Active
          </span>
          <span className="hidden md:inline text-rose-300/80">•</span>
          <span className="hidden md:inline">
            Severe ground-level thermal inversion detected in {currentCity.name}. Inversion Strength: {currentCity.inversionStrength}.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline bg-rose-800/60 px-2 py-0.5 rounded text-[11px] font-mono border border-rose-700/60">
            PM2.5: {currentCity.pollutants.pm25} µg/m³
          </span>
          <span className="text-amber-300 font-medium">Ventilation window: {currentCity.ventilationWindow.startHour}:00 - {currentCity.ventilationWindow.endHour}:00</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
            <Wind className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                {t.appTitle}
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GenAI 2.5
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Station / City Selector */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs">
            <span className="text-slate-400 mr-2 text-[11px] font-medium hidden md:inline">Station:</span>
            <select
              value={currentCity.cityId}
              onChange={(e) => onCityChange(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
            >
              {Object.values(CITIES_DATABASE).map((c) => (
                <option key={c.cityId} value={c.cityId} className="bg-slate-900 text-slate-200">
                  {c.name} (AQI {c.aqi})
                </option>
              ))}
            </select>
          </div>

          {/* Family Risk Profile Pill */}
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs px-2.5 py-1.5 rounded-lg text-slate-200 transition-all hover:border-slate-600"
            title="Click to customize family members and risk factors"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Family:</span>
            <span className="bg-cyan-500/20 text-cyan-300 font-semibold px-1.5 py-0.2 rounded border border-cyan-500/30 text-[11px]">
              {vulnerableCount > 0 ? `${vulnerableCount} Vulnerable` : 'Standard'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-emerald-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'hi'
                  ? 'bg-emerald-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('hinglish')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'hinglish'
                  ? 'bg-emerald-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Gemini AI Engine Modal Trigger */}
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 text-xs bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-2.5 py-1.5 rounded-lg text-slate-300 transition-colors"
            title="AI Engine Configuration"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">AI Core:</span>
            <span className="flex items-center gap-1 text-[11px] text-amber-300 font-mono">
              {hasCustomApiKey ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Gemini Live
                </>
              ) : (
                'Intelligent Mode'
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
