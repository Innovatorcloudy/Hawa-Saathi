import React from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Wrench, 
  Volume2, 
  X, 
  Minimize2, 
  Maximize2,
  Trash2
} from 'lucide-react';
import { ChatMessage, Language, CitySmogData, FamilyProfile } from '../types';
import { callGeminiAssistant, generateLocalAssistantResponse } from '../services/genaiTools';

interface HawaSaathiChatProps {
  currentCity: CitySmogData;
  familyProfile: FamilyProfile;
  language: Language;
  apiKey: string;
}

export const HawaSaathiChat: React.FC<HawaSaathiChatProps> = ({
  currentCity,
  familyProfile,
  language,
  apiKey
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: language === 'hi' 
        ? `नमस्ते! मैं आपका **हवा साथी** (AI Clean Air Companion) हूँ। वर्तमान में **${currentCity.name}** में AQI **${currentCity.aqi}** (${currentCity.category}) दर्ज है। अपने परिवार के बचाव, DIY एयर प्यूरीफायर या सुरक्षित दिनचर्या के बारे में कुछ भी पूछें!`
        : `Hello! I am your **Hawa Saathi** (AI Clean Air Companion). Current AQI in **${currentCity.name}** is **${currentCity.aqi}** (${currentCity.category}). Ask me anything about safeguarding your family, building a ₹2,500 DIY air purifier, or planning lowest-exposure routines today!`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let response: { text: string; toolCalled?: { name: string; args: any; resultSummary: string } };

      if (apiKey.trim()) {
        // Prepare history for Gemini
        const history = messages.slice(-6).map(m => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          parts: [{ text: m.text }]
        }));
        response = await callGeminiAssistant(apiKey, textToSend, history, currentCity.cityId, familyProfile, language);
      } else {
        // Fallback intelligent deterministic engine
        await new Promise(r => setTimeout(r, 600)); // realistic thinking delay
        response = generateLocalAssistantResponse(textToSend, currentCity.cityId, familyProfile, language);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        toolCall: response.toolCalled
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered a temporary connection issue. Please check your internet connection or ask again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and hash symbols for clean speech
      const clean = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      if (language === 'hi') {
        utterance.lang = 'hi-IN';
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const presetQuestions = language === 'hi' ? [
    'सर्दियों में घर में वेंटिलेशन कब खोलें?',
    'क्या बच्चों को कल सुबह स्कूल भेजना सुरक्षित है?',
    'कम खर्च में DIY एयर प्यूरीफायर कैसे बनाएं?',
    'झाड़ू लगाने और पोछा लगाने में क्या फर्क है?'
  ] : [
    'Should my children go to morning school tomorrow?',
    'How do I build a ₹2,500 DIY Corsi-Rosenthal air purifier?',
    'What is the safest hour to open windows for ventilation?',
    'Why is dry sweeping (jhadu) dangerous during severe smog?'
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center gap-2.5 transition-all transform hover:scale-105"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold text-sm hidden sm:inline">Ask Hawa Saathi AI</span>
          <span className="bg-white/20 text-white text-[11px] font-mono px-1.5 py-0.5 rounded-full">
            Online
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[580px] max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  Hawa Saathi AI
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {apiKey.trim() ? 'Gemini 2.5 Flash' : 'Built-in Intelligent Engine'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {/* Tool Call Ribbon */}
                  {m.toolCall && (
                    <div className="bg-slate-900/90 text-cyan-300 font-mono text-[10px] px-2 py-1 rounded-md border border-cyan-500/30 flex items-center gap-1.5 mb-1.5">
                      <Wrench className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>Tool: {m.toolCall.name}</span>
                      {m.toolCall.resultSummary && (
                        <span className="text-slate-400">({m.toolCall.resultSummary})</span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-line leading-relaxed">
                    {m.text}
                  </div>

                  {m.sender === 'assistant' && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => speakText(m.text)}
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                        title="Read out loud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40 w-fit">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Hawa Saathi is analyzing smog data & computing guidance...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset chips */}
          <div className="px-3 py-1.5 border-t border-slate-800 bg-slate-900/60 overflow-x-auto flex gap-1.5 text-[11px] no-scrollbar">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
            <input
              type="text"
              placeholder={language === 'hi' ? 'स्मॉग से बचाव या प्यूरीफायर के बारे में पूछें...' : 'Ask about smog defense, routine, or DIY purifier...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white p-2 rounded-xl transition-all shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
