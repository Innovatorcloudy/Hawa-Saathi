import React from 'react';
import { 
  Wind, 
  Clock, 
  Home, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Info,
  HeartPulse
} from 'lucide-react';
import { Header } from './components/Header';
import { SmogDashboard } from './components/SmogDashboard';
import { RoutineOptimizer } from './components/RoutineOptimizer';
import { IndoorAirStudio } from './components/IndoorAirStudio';
import { SustainableImpactTracker } from './components/SustainableImpactTracker';
import { CommunityShield } from './components/CommunityShield';
import { FamilyProfileModal } from './components/FamilyProfileModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { HawaSaathiChat } from './components/HawaSaathiChat';
import { CITIES_DATABASE } from './services/aqiService';
import { TRANSLATIONS } from './data/translations';
import { Language, FamilyProfile } from './types';

export function App() {
  const [currentCityId, setCurrentCityId] = React.useState<string>('delhi-anand-vihar');
  const [language, setLanguage] = React.useState<Language>('en');
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'routine' | 'indoorStudio' | 'impact' | 'community'>('dashboard');

  // Household Profile
  const [familyProfile, setFamilyProfile] = React.useState<FamilyProfile>({
    infantsCount: 1,
    childrenCount: 1,
    elderlyCount: 1,
    asthmaticOrCopd: true,
    outdoorWorkersCount: 1,
    petsCount: 0,
    housingType: 'Apartment',
    cookingFuel: 'LPG/Induction',
    heatingMethod: 'Room Heater/AC'
  });

  // API Key State
  const [apiKey, setApiKey] = React.useState<string>(() => {
    return localStorage.getItem('hawa_saathi_gemini_key') || '';
  });

  // Modals
  const [isFamilyModalOpen, setIsFamilyModalOpen] = React.useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = React.useState(false);

  const currentCity = CITIES_DATABASE[currentCityId] || CITIES_DATABASE['delhi-anand-vihar'];
  const t = TRANSLATIONS[language];

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('hawa_saathi_gemini_key', key);
  };

  const navTabs = [
    { id: 'dashboard', label: t.tabs.dashboard, icon: Wind },
    { id: 'routine', label: t.tabs.routine, icon: Clock, badge: 'AI Shield' },
    { id: 'indoorStudio', label: t.tabs.indoorStudio, icon: Home },
    { id: 'impact', label: t.tabs.impact, icon: TrendingUp },
    { id: 'community', label: t.tabs.community, icon: Users }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Sticky Header */}
      <Header
        currentCity={currentCity}
        onCityChange={setCurrentCityId}
        language={language}
        onLanguageChange={setLanguage}
        familyProfile={familyProfile}
        onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomApiKey={!!apiKey.trim()}
      />

      {/* Navigation Sub-bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 sticky top-[93px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {'badge' in tab && tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {activeTab === 'dashboard' && (
          <SmogDashboard
            city={currentCity}
            language={language}
            familyProfile={familyProfile}
            onNavigateToRoutine={() => setActiveTab('routine')}
            onNavigateToPurifier={() => setActiveTab('indoorStudio')}
          />
        )}

        {activeTab === 'routine' && (
          <RoutineOptimizer
            city={currentCity}
            familyProfile={familyProfile}
            language={language}
          />
        )}

        {activeTab === 'indoorStudio' && (
          <IndoorAirStudio language={language} />
        )}

        {activeTab === 'impact' && (
          <SustainableImpactTracker language={language} />
        )}

        {activeTab === 'community' && (
          <CommunityShield language={language} />
        )}
      </main>

      {/* Disclaimer & Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-8 px-4 sm:px-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-semibold">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Hawa Saathi Clean Air Initiative</span>
            </div>
            <p className="max-w-2xl text-[11px] text-slate-400">
              {t.disclaimer}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Powered by Google Gemini 2.5</span>
            <span>•</span>
            <span className="text-slate-400">CPCB & WHO Standards</span>
            <span>•</span>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="text-emerald-400 hover:underline"
            >
              Engine Config
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Floating Components */}
      <FamilyProfileModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        profile={familyProfile}
        onSave={setFamilyProfile}
        language={language}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Persistent GenAI Companion Chat */}
      <HawaSaathiChat
        currentCity={currentCity}
        familyProfile={familyProfile}
        language={language}
        apiKey={apiKey}
      />
    </div>
  );
}

export default App;
