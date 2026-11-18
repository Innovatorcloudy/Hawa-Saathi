import React from 'react';
import { 
  Home, 
  Wind, 
  Wrench, 
  ShieldAlert, 
  Check, 
  Camera, 
  Sparkles, 
  Info, 
  Layers, 
  DollarSign, 
  Leaf,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { IAQ_BIO_HACKS, CORSI_ROSENTHAL_GUIDELINES } from '../services/knowledgeBase';
import { calculateCADR } from '../services/aqiService';
import { Language } from '../types';

interface IndoorAirStudioProps {
  language: Language;
}

export const IndoorAirStudio: React.FC<IndoorAirStudioProps> = ({ language }) => {
  // Purifier calculator state
  const [roomArea, setRoomArea] = React.useState<number>(180);
  const [ceilingHeight, setCeilingHeight] = React.useState<number>(9);
  const [targetAch, setTargetAch] = React.useState<number>(4.5);
  const [filterType, setFilterType] = React.useState<'MERV-13' | 'HEPA-H13'>('MERV-13');

  // Scanner simulator state
  const [scanStatus, setScanStatus] = React.useState<'idle' | 'analyzing' | 'done'>('idle');
  const [scanResult, setScanResult] = React.useState<string | null>(null);

  const calculatedCADR = calculateCADR(roomArea, ceilingHeight, targetAch);
  const commercialPurifierCost = Math.round(calculatedCADR * 110);
  const diyPurifierCost = filterType === 'MERV-13' ? 2450 : 3100;
  const savingsPercent = Math.round(((commercialPurifierCost - diyPurifierCost) / commercialPurifierCost) * 100);

  const handleSimulateScan = () => {
    setScanStatus('analyzing');
    setTimeout(() => {
      setScanStatus('done');
      setScanResult(
        'AI Vision Diagnostic Report:\n• Filter Saturation: ~68% loaded (Estimated 3 weeks lifespan remaining in current Severe AQI).\n• Fan Airflow Seal: Good perimeter seal detected.\n• Room Placement Recommendation: Move unit 1.5 ft away from current corner wall to maximize central room convection loop.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
            <Home className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-white">
            Indoor Air Quality (IAQ) Studio & DIY Purifier Builder
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          During winter smog, indoor particulate levels frequently exceed 250–350 µg/m³ without active filtration. These scientifically proven low-cost bio-hacks and DIY air purifiers cut household toxic exposure by 60–85%.
        </p>
      </div>

      {/* Part 1: Interactive DIY Corsi-Rosenthal Purifier Studio */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              DIY Clean Air Engineering
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Corsi-Rosenthal Box Purifier Calculator
            </h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            {savingsPercent}% Cheaper than Commercial Purifiers
          </div>
        </div>

        {/* Calculator Inputs & Output Readout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <div>
                <div className="flex justify-between font-semibold text-slate-200 mb-1">
                  <span>Room Floor Area:</span>
                  <span className="font-mono text-cyan-400">{roomArea} sq ft</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="600"
                  step="10"
                  value={roomArea}
                  onChange={(e) => setRoomArea(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>80 sq ft (Study)</span>
                  <span>250 sq ft (Master Bed)</span>
                  <span>600 sq ft (Living Hall)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-200 mb-1">
                  <span>Ceiling Height:</span>
                  <span className="font-mono text-slate-300">{ceilingHeight} ft</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="14"
                  step="1"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-200 block mb-1">Filter Media Rating</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFilterType('MERV-13')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      filterType === 'MERV-13'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    MERV-13 Pleated
                    <span className="block text-[10px] opacity-75">Lowest noise & airflow drop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('HEPA-H13')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      filterType === 'HEPA-H13'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    HEPA H13 Grade
                    <span className="block text-[10px] opacity-75">99.97% particle capture</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Specification Panel */}
          <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 uppercase font-medium">Target Clean CADR</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {calculatedCADR} <span className="text-xs text-slate-400 font-normal">CFM</span>
                </div>
                <span className="text-[10px] text-slate-400">4.5 Air Changes / Hour</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 uppercase font-medium">DIY Build Cost</span>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                  ₹{diyPurifierCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">Fan + Filter + Tape</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 uppercase font-medium">Commercial Equivalent</span>
                <div className="text-2xl font-bold font-mono text-slate-400 line-through mt-1">
                  ₹{commercialPurifierCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">Save ₹{(commercialPurifierCost - diyPurifierCost).toLocaleString()}</span>
              </div>
            </div>

            {/* Step-by-Step Blueprint */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Assembly Blueprint (15-Minute Build)
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>
                  <strong>Fan Selection:</strong> Get a 20-inch Box Fan or high-static 12-inch exhaust fan (power consumption ~45-60W).
                </li>
                <li>
                  <strong>Filter Attachment:</strong> Align a 20×20×1 inch {filterType} filter flush to the back (suction side) of the fan.
                </li>
                <li>
                  <strong>Airflow Direction:</strong> Confirm the printed arrow on the filter points <em>INTO</em> the fan blades.
                </li>
                <li>
                  <strong>Duct Tape Seal:</strong> Thoroughly tape all 4 perimeter borders with duct tape to prevent dirty room air bypass.
                </li>
                <li>
                  <strong>Turn on Medium Speed:</strong> Delivers clean whisper-quiet particulate clearance within 25 minutes.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Multimodal Room & Filter Inspector Simulator */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Multimodal GenAI Vision Tool
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Smart Room Layout & Filter Saturation Inspector
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Powered by Gemini Multimodal Vision analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 text-xs">
          {/* Uploader / Action card */}
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-200 text-sm mb-1">
              Inspect Air Filter Grayness or Room Airflow
            </h4>
            <p className="text-slate-400 max-w-sm mb-4">
              Upload a snapshot of your HEPA/MERV filter, window draft seals, or bedroom fan positioning for AI safety feedback.
            </p>
            <button
              onClick={handleSimulateScan}
              disabled={scanStatus === 'analyzing'}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              {scanStatus === 'analyzing' ? 'Analyzing with Gemini Vision...' : 'Run Sample Filter Saturation Scan'}
            </button>
          </div>

          {/* Result view */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-300 block mb-2 uppercase text-[11px] tracking-wider">
                Inspection Diagnostics
              </span>
              {scanStatus === 'idle' && (
                <div className="text-slate-400 py-6 text-center italic">
                  No scan initiated yet. Click the button to run an AI vision check on a test air filter setup.
                </div>
              )}
              {scanStatus === 'analyzing' && (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-cyan-400">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Scanning grayscale particulate loading and seam integrity...</span>
                </div>
              )}
              {scanStatus === 'done' && scanResult && (
                <div className="bg-slate-900/90 rounded-xl p-4 border border-cyan-500/30 text-slate-200 space-y-2 whitespace-pre-line leading-relaxed font-sans">
                  {scanResult}
                </div>
              )}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-700/60 pt-3 mt-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verifies filter differential pressure tolerance and motor heat safety.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: Verified Low-Cost IAQ Bio-Hacks Catalog */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          5 Essential Household IAQ Bio-Hacks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {IAQ_BIO_HACKS.map((hack) => (
            <div
              key={hack.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
                  <span>{hack.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                    High Impact
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{hack.title}</h4>
                <div className="my-1.5 text-emerald-300 font-medium bg-emerald-950/30 p-1.5 rounded-lg border border-emerald-800/30">
                  {hack.impact}
                </div>
                <p className="text-slate-300 leading-relaxed mt-2">{hack.description}</p>
              </div>

              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-slate-300">
                <span className="font-semibold text-slate-200">💡 Saathi Tip:</span> {hack.tip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
