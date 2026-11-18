import React from 'react';
import { X, Sparkles, Key, CheckCircle2, Shield, Info } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) => {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = React.useState(apiKey);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Gemini GenAI Engine Settings</h3>
              <p className="text-[11px] text-slate-400">Configure AI model connectivity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Current AI Execution Engine:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                apiKey.trim() 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {apiKey.trim() ? 'Gemini 2.5 Flash' : 'Built-in Intelligent Engine'}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {apiKey.trim()
                ? 'Directly connected to Google Gemini API for live multi-turn reasoning and dynamic function calling.'
                : 'Running on high-performance built-in deterministic simulation engine. Works instantly offline without any setup!'}
            </p>
          </div>

          <div>
            <label className="font-semibold text-slate-200 block mb-1">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
              />
              <Key className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              Stored securely in your local browser session.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            Clear Key (Use Built-in)
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
            >
              {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : null}
              {savedSuccess ? 'Saved!' : 'Save & Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
