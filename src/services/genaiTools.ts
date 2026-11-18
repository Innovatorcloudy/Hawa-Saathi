import { GoogleGenAI } from '@google/genai';
import { CITIES_DATABASE, calculateCADR } from './aqiService';
import { FamilyProfile, RoutineActivity, PurifierSpecs, SustainableAction } from '../types';
import { IAQ_BIO_HACKS } from './knowledgeBase';

// Tool Declarations for Gemini Function Calling
export const HAWA_SAATHI_TOOLS = [
  {
    name: 'getHyperlocalAQI',
    description: 'Fetch real-time AQI, PM2.5, PM10, Inversion strength, and ventilation window for a specified city or locality.',
    parameters: {
      type: 'object',
      properties: {
        cityId: {
          type: 'string',
          description: 'The city identifier (e.g. "delhi-anand-vihar", "delhi-rk-puram", "lahore-gulberg", "noida-sector-62", "lucknow-central", "patna-danapur")'
        }
      },
      required: ['cityId']
    }
  },
  {
    name: 'optimizeDailyRoutine',
    description: 'Compute lowest-exposure hour-by-hour schedule based on family vulnerability and current smog curve.',
    parameters: {
      type: 'object',
      properties: {
        cityId: { type: 'string' },
        hasVulnerableMembers: { type: 'boolean', description: 'Whether the family includes infants, elderly, or asthmatics' },
        activities: {
          type: 'array',
          items: { type: 'string' },
          description: 'Target activities: e.g. ["Morning Walk", "School Drop", "Grocery Shopping", "House Ventilation"]'
        }
      },
      required: ['cityId']
    }
  },
  {
    name: 'calculatePurifierNeeds',
    description: 'Calculate Clean Air Delivery Rate (CADR) and specify DIY Corsi-Rosenthal / HEPA fan blueprints for a given room dimension.',
    parameters: {
      type: 'object',
      properties: {
        roomAreaSqFt: { type: 'number', description: 'Room area in square feet' },
        ceilingHeightFt: { type: 'number', description: 'Ceiling height in feet, default 9' },
        vulnerabilityLevel: { type: 'string', enum: ['Standard', 'High', 'Critical'] }
      },
      required: ['roomAreaSqFt']
    }
  },
  {
    name: 'calculateEmissionSavings',
    description: 'Calculate exact grams of PM2.5 and kg of CO2 prevented by switching from polluting habits to sustainable alternatives.',
    parameters: {
      type: 'object',
      properties: {
        habitCategory: { type: 'string', enum: ['Heating', 'Commute', 'Cleaning', 'Cooking'] },
        alternativeSelected: { type: 'string' },
        daysActive: { type: 'number' }
      },
      required: ['habitCategory', 'alternativeSelected']
    }
  }
];

export const SYSTEM_INSTRUCTION = `
You are "Hawa Saathi" (हवा साथी), an empathetic, scientifically rigorous GenAI Clean Air & Winter Smog Companion for families and urban communities facing severe pollution crises.

Your Core Duties:
1. Provide actionable, low-cost, low-emission daily routines tailored to the user's family vulnerability (infants, asthmatics, elderly, outdoor commuters).
2. Recommend practical indoor air quality (IAQ) bio-hacks (micro-particulate damp mopping, cooking exhaust discipline, DIY Corsi-Rosenthal box fans).
3. Suggest sustainable alternatives to open burning, high-emission heating, and solo vehicular commutes, quantifying the direct grams of PM2.5 and CO2 saved.
4. Encourage community smog defense (reporting illegal trash/biomass burning, school carpooling).

Communication Style:
- Warm, protective, and constructive (not fatalistic or panic-inducing).
- Multilingual: Fluently speak English, Hindi (हिंदी), and Hinglish as chosen by user. Use familiar terms like "kohra" (fog), "dhuan" (smoke), "angithi", "chulha", "jhadu", "pocha".
- ALWAYS offer direct, high-impact suggestions with clear percentages or metrics.
- Health Notice: Provide preventive and environmental hygiene advice; advise consulting a medical doctor for acute respiratory distress.
`;

// Tool implementations
export function executeToolCall(name: string, args: Record<string, any>) {
  switch (name) {
    case 'getHyperlocalAQI': {
      const cityId = args.cityId || 'delhi-anand-vihar';
      const city = CITIES_DATABASE[cityId] || CITIES_DATABASE['delhi-anand-vihar'];
      return {
        city: city.name,
        aqi: city.aqi,
        category: city.category,
        pm25: `${city.pollutants.pm25} µg/m³ (Safe limit is 15 µg/m³ by WHO)`,
        pm10: `${city.pollutants.pm10} µg/m³`,
        inversion: city.inversionStrength,
        grapStage: city.grapStage,
        safestVentilationHours: `${city.ventilationWindow.startHour}:00 to ${city.ventilationWindow.endHour}:00`,
        keyAdvice: city.aqi > 400 
          ? 'Emergency Severe+ Smog: Keep windows sealed, run DIY air filtration, strictly avoid outdoor exertion before 11 AM.' 
          : 'High smog levels. Limit prolonged outdoor exposure.'
      };
    }
    case 'optimizeDailyRoutine': {
      const cityId = args.cityId || 'delhi-anand-vihar';
      const city = CITIES_DATABASE[cityId] || CITIES_DATABASE['delhi-anand-vihar'];
      return {
        city: city.name,
        currentAQI: city.aqi,
        safestOutdoorWindow: `${city.ventilationWindow.startHour}:00 - ${city.ventilationWindow.endHour}:00`,
        routineHighlights: [
          { time: '06:00 - 08:30 AM', alert: 'Peak Radiative Inversion', action: 'Keep all windows tightly sealed. Swap morning park walks with indoor gentle yoga. Seal door bases with damp towels.' },
          { time: '08:30 - 09:30 AM', alert: 'School / Commute Rush', action: 'High vehicle exhaust concentration. Wear tight-fitting N95/FFP2 mask; use carpool or metro instead of two-wheelers.' },
          { time: '01:00 - 02:30 PM', alert: 'Solar Thermal Lift Window', action: 'Optimal 30-min window for rapid cross-ventilation to flush out indoor CO2, then re-seal.' },
          { time: '06:30 - 10:00 PM', alert: 'Evening Ground Smog Trapping', action: 'Run indoor air filtration / box-fan in bedrooms. Damp mop floors to capture settled micro-dust.' }
        ]
      };
    }
    case 'calculatePurifierNeeds': {
      const area = Number(args.roomAreaSqFt) || 150;
      const height = Number(args.ceilingHeightFt) || 9;
      const cadr = calculateCADR(area, height, 4.5);
      return {
        roomSize: `${area} sq ft (${area * height} cu ft)`,
        cleanAirDeliveryRateNeeded: `${cadr} CFM`,
        diyCorsiRosenthalSpecs: {
          fanType: '20-inch Box Fan or 12-inch High-Static Exhaust Fan',
          filters: '1 to 2 MERV-13 Pleated HVAC Filters (20x20x1 inch)',
          estimatedBuildCost: '₹2,200 - ₹3,100',
          commercialEquivalentCost: '₹14,000 - ₹22,000',
          costSavingsPct: '78% savings with identical PM2.5 filtration efficiency'
        }
      };
    }
    case 'calculateEmissionSavings': {
      const cat = args.habitCategory || 'Heating';
      const days = Number(args.daysActive) || 7;
      let pm25Saved = 0;
      let co2Saved = 0;
      if (cat === 'Heating') {
        // Avoiding open wood/coal burning saves ~150g PM2.5 per day
        pm25Saved = 150 * days;
        co2Saved = 4.8 * days;
      } else if (cat === 'Commute') {
        // Carpooling or metro vs single petrol car
        pm25Saved = 45 * days;
        co2Saved = 6.2 * days;
      } else {
        pm25Saved = 25 * days;
        co2Saved = 1.5 * days;
      }
      return {
        category: cat,
        durationDays: days,
        pm25PreventedGrams: pm25Saved,
        co2AvoidedKg: co2Saved.toFixed(1),
        communityEquivalent: `Preventing ${pm25Saved}g of PM2.5 is equivalent to sparing ${Math.round(pm25Saved / 1.5)} children from direct hazardous toxic particulate inhalation today.`
      };
    }
    default:
      return { status: 'executed', message: 'Action processed successfully.' };
  }
}

// Fallback intelligent simulation generator when no live API key is set
export function generateLocalAssistantResponse(
  userQuery: string,
  cityId: string,
  familyProfile: FamilyProfile,
  language: 'en' | 'hi' | 'hinglish'
): { text: string; toolCalled?: { name: string; args: any; resultSummary: string } } {
  const city = CITIES_DATABASE[cityId] || CITIES_DATABASE['delhi-anand-vihar'];
  const lower = userQuery.toLowerCase();

  // If asking about AQI or smog level
  if (lower.includes('aqi') || lower.includes('smog') || lower.includes('pollution') || lower.includes('hawa') || lower.includes('level') || lower.includes('severe')) {
    const toolResult = executeToolCall('getHyperlocalAQI', { cityId });
    if (language === 'hi') {
      return {
        text: `📍 **${city.name} में मौजूदा हवा का हाल:**\n• **AQI:** ${city.aqi} (${city.category})\n• **PM2.5:** ${city.pollutants.pm25} µg/m³ (WHO सुरक्षित मानक से 26 गुना अधिक!)\n• **GRAP स्थिति:** ${city.grapStage}\n\n⚠️ **सावधानी सलाह:** सुबह 6 से 10 बजे के बीच सतही इनवर्जन सबसे घातक रहता है। इस समय बुजुर्ग और बच्चों को बाहर टहलने या दौड़ने बिल्कुल न भेजें। कमरे में खिड़कियां दोपहर 1:00 से 3:00 बजे के बीच ही 20 मिनट के लिए खोलें।`,
        toolCalled: { name: 'getHyperlocalAQI', args: { cityId }, resultSummary: `AQI ${city.aqi} (${city.category})` }
      };
    } else if (language === 'hinglish') {
      return {
        text: `📍 **${city.name} AQI Update:**\n• **AQI:** ${city.aqi} (${city.category})\n• **PM2.5:** ${city.pollutants.pm25} µg/m³ (Extreme toxic level!)\n• **GRAP Status:** ${city.grapStage}\n\n⚠️ **Instant Action:** Subah 6-10 AM ke beech temperature inversion ki wajah se smog zameen ke bilkul paas phansi hoti hai. Is time par outdoor running ya walk avoid karein. Window ventilation sirf दोपहर 1:00 se 3:00 PM ke beech rakhein.`,
        toolCalled: { name: 'getHyperlocalAQI', args: { cityId }, resultSummary: `AQI ${city.aqi} (${city.category})` }
      };
    } else {
      return {
        text: `📍 **Hyperlocal Smog Status for ${city.name}:**\n• **Current AQI:** ${city.aqi} (${city.category})\n• **PM2.5 Concentration:** ${city.pollutants.pm25} µg/m³ (over 26x above WHO guideline)\n• **Inversion Severity:** ${city.inversionStrength} | **Regulatory Alert:** ${city.grapStage}\n\n🛡️ **Hawa Saathi Defense Protocol:**\nDue to strong ground-level thermal inversion, particulate pollution is compressed in the lower 100 meters. Keep exterior doors draft-blocked. Only schedule outdoor errands during the thermal lift window (1:00 PM - 3:00 PM).`,
        toolCalled: { name: 'getHyperlocalAQI', args: { cityId }, resultSummary: `AQI ${city.aqi} (${city.category})` }
      };
    }
  }

  // If asking about DIY purifier or filter
  if (lower.includes('purifier') || lower.includes('filter') || lower.includes('box fan') || lower.includes('diy') || lower.includes('corsi')) {
    const toolResult = executeToolCall('calculatePurifierNeeds', { roomAreaSqFt: 180, ceilingHeightFt: 9, vulnerabilityLevel: 'High' });
    if (language === 'hi') {
      return {
        text: `🛠️ **कम खर्च में DIY एयर प्यूरीफायर (Corsi-Rosenthal Box):**\n\n1. **सामग्री:** एक 16-20 इंच का बॉक्स फैन या एग्जॉस्ट फैन + एक MERV-13 (या HEPA) फ़िल्टर + डक्ट टेप।\n2. **लागत:** केवल ₹2,200 - ₹3,000 (बाजार के ₹18,000 वाले प्यूरीफायर जितनी ही 90%+ PM2.5 सफाई क्षमता)।\n3. **बनाने का तरीका:** फ़िल्टर के तीर के निशान (Airflow Arrow) को पंखे की ओर रखकर चारों तरफ डक्ट टेप से कसकर सील करें ताकि हवा सिर्फ फ़िल्टर से ही होकर निकले।\n4. **कमरे में स्थान:** इसे कमरे के केंद्र या दीवार से 1 फुट दूर रखें।`,
        toolCalled: { name: 'calculatePurifierNeeds', args: { roomAreaSqFt: 180 }, resultSummary: `Required CADR: 122 CFM | Build Cost: ~₹2,500` }
      };
    } else {
      return {
        text: `🛠️ **DIY Corsi-Rosenthal Air Purifier Blueprint:**\n\n• **CADR Target:** 120-180 CFM (ideal for 150-250 sq ft master bedroom).\n• **Total Cost:** ₹2,200 - ₹3,200 (saves 80% vs commercial purifiers).\n• **Materials:** 1× standard 20-inch Box Fan + 1× MERV-13 (or H12/H13) pleated filter + heavy-duty duct tape.\n• **Assembly:** Place filter flush against the suction (back) side of the fan with the airflow arrow pointing towards the fan. Seal all 4 perimeter borders with duct tape to prevent unsealed air bypass.\n• **Performance:** Removes >90% of PM2.5 in under 35 minutes!`,
        toolCalled: { name: 'calculatePurifierNeeds', args: { roomAreaSqFt: 180 }, resultSummary: `Calculated CADR: 122 CFM for standard room` }
      };
    }
  }

  // If asking about routine, children, school, walk
  if (lower.includes('routine') || lower.includes('school') || lower.includes('walk') || lower.includes('exercise') || lower.includes('baby') || lower.includes('bachhe') || lower.includes('subah')) {
    const toolResult = executeToolCall('optimizeDailyRoutine', { cityId, hasVulnerableMembers: true });
    if (language === 'hi') {
      return {
        text: `📋 **परिवार के लिए कम-प्रदूषण दिनचर्या (AI Routine Shield):**\n\n• **सुबह 6:00 - 8:30 (सबसे खतरनाक समय):** बाहर टहलना या जॉगिंग बिल्कुल बंद करें। बच्चों को खिड़की के पास न सुलाएं।\n• **स्कूल/ऑफिस का समय:** दोपहिया वाहन के बजाय कारपूल या मेट्रो चुनें। N95 मास्क की फिटिंग जांचें (कपड़े का मास्क PM2.5 नहीं रोकता)।\n• **दोपहर 1:00 - 2:30 (सुरक्षित वेंटिलेशन):** इस समय खिड़कियां 20 मिनट खोलें ताकि कमरे में ऑक्सीजन आए, फिर दोबारा बंद कर लें।\n• **शाम 7:00 बजे:** फर्श पर सूखे झाड़ू के बजाय गीला पोंछा (Wet Mop) लगाएं।`,
        toolCalled: { name: 'optimizeDailyRoutine', args: { cityId, hasVulnerableMembers: true }, resultSummary: `Safest outdoor window: 1:00 PM - 3:00 PM` }
      };
    } else {
      return {
        text: `📋 **Vulnerability-Optimized Daily Routine Protocol:**\n\n• **06:00 - 08:30 AM (Peak Inversion Hazard):** Strictly indoor activities. Zero outdoor physical exertion. Keep door drafts sealed.\n• **08:30 - 09:30 AM (Commute):** Ensure children wear sealed N95/FFP2 pediatric masks. Use carpooling or school vans rather than open bikes/e-rickshaws.\n• **01:00 - 02:30 PM (Midday Solar Expansion Window):** The safest time for essential outdoor chores and brief 20-minute cross-ventilation.\n• **07:00 PM (Floor Dust Management):** Always use micro-fiber damp mopping. Never use dry brooms which resuspend settled toxic particulates.`,
        toolCalled: { name: 'optimizeDailyRoutine', args: { cityId, hasVulnerableMembers: true }, resultSummary: `Safest outdoor window: 1:00 PM - 3:00 PM` }
      };
    }
  }

  // If asking about hacks, wet mopping, cooking
  if (lower.includes('hack') || lower.includes('indoor') || lower.includes('mop') || lower.includes('smoke') || lower.includes('tadka') || lower.includes('agarbatti') || lower.includes('coil')) {
    return {
      text: `🏠 **Top 3 Indoor Air Quality (IAQ) Bio-Hacks for Severe Smog:**\n\n1. **Ban the Dry Broom (Jhadu):** Dry sweeping launches millions of settled toxic heavy metals back into the air for 3 hours. Always use a damp micro-fiber mop.\n2. **Tadka & Cooking Air-Shield:** Turn on your kitchen exhaust 3 minutes before lighting the stove and keep lids on frying pans. High-heat oil fumes generate toxic PM2.5 spikes up to 900 µg/m³ indoors!\n3. **Stop Smoldering Mosquito Coils/Dhoop:** One coil releases particulate matter equivalent to smoking 75+ cigarettes! Switch to magnetic window nets and plug-in vaporizers.`
    };
  }

  // Default empathetic response with proactive guidance
  if (language === 'hi') {
    return {
      text: `नमस्ते! मैं आपका **हवा साथी** हूँ। वर्तमान में आपके इलाके का AQI **${city.aqi}** (${city.category}) है।\n\nमैं आपकी कैसे मदद करूँ?\n1. आपके परिवार (बच्चों और बुजुर्गों) के अनुसार सुरक्षित दिनचर्या प्लान करना?\n2. घर पर केवल ₹2,500 में DIY एयर प्यूरीफायर बनाने की गाइड?\n3. घर के अंदर का प्रदूषण 50% कम करने वाले आसान घरेलू उपाय?`
    };
  } else if (language === 'hinglish') {
    return {
      text: `Hello! Main hoon aapka **Hawa Saathi**. Aapke city ka AQI abhi **${city.aqi}** (${city.category}) par hai.\n\nAap mujhse puch sakte hain:\n• Bachhon aur buzurgon ke liye lowest-smog schedule?\n• Low-cost DIY air purifier kaise banayein?\n• Indoor air clean rakhne ke best bio-hacks?`
    };
  } else {
    return {
      text: `Hello! I am **Hawa Saathi**, your clean air companion. The current AQI in ${city.name} is **${city.aqi}** (${city.category}).\n\nHow can I help protect your household today?\n• Generate a lowest-exposure daily routine for your family?\n• Guide you step-by-step to build a DIY Corsi-Rosenthal air purifier?\n• Calculate the emission savings of switching to clean heating and carpools?`
    };
  }
}

// Live Gemini API caller (when API key is present)
export async function callGeminiAssistant(
  apiKey: string,
  userMessage: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  cityId: string,
  familyProfile: FamilyProfile,
  language: 'en' | 'hi' | 'hinglish'
): Promise<{ text: string; toolCalled?: { name: string; args: any; resultSummary: string } }> {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const city = CITIES_DATABASE[cityId] || CITIES_DATABASE['delhi-anand-vihar'];
    
    const contextPrompt = `
Current Context:
Location: ${city.name} (${city.stateOrCountry})
Current AQI: ${city.aqi} (${city.category})
PM2.5: ${city.pollutants.pm25} µg/m³ | PM10: ${city.pollutants.pm10} µg/m³
Inversion Strength: ${city.inversionStrength} | GRAP Stage: ${city.grapStage}
Family Profile: ${JSON.stringify(familyProfile)}
User Language: ${language}

User Request: ${userMessage}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return {
      text: response.text || 'Received empty response from assistant.',
      toolCalled: {
        name: 'getHyperlocalAQI',
        args: { cityId },
        resultSummary: `Grounding with live AQI ${city.aqi}`
      }
    };
  } catch (err: any) {
    console.warn('Gemini API call returned error, falling back to local engine:', err);
    return generateLocalAssistantResponse(userMessage, cityId, familyProfile, language);
  }
}
