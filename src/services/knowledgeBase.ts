/**
 * Verified Environmental & Health Knowledge Base
 * Sources: CPCB, WHO Air Quality Guidelines (2021), Lancet Planetary Health,
 * EPA Indoor Environments Division, and UC Davis Corsi-Rosenthal standards.
 */

export const AQI_THRESHOLDS = [
  { min: 0, max: 50, category: 'Good', color: 'emerald', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', advice: 'Air quality is satisfactory. Ideal for all outdoor activities.' },
  { min: 51, max: 100, category: 'Satisfactory', color: 'green', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40', advice: 'Minor breathing discomfort to sensitive individuals.' },
  { min: 101, max: 200, category: 'Moderate', color: 'yellow', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40', advice: 'Breathing discomfort to people with lungs, asthma, and heart diseases.' },
  { min: 201, max: 300, category: 'Poor', color: 'orange', bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40', advice: 'Breathing discomfort to most people on prolonged exposure.' },
  { min: 301, max: 400, category: 'Very Poor', color: 'red', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40', advice: 'Respiratory illness on prolonged exposure. Avoid morning exertion.' },
  { min: 401, max: 450, category: 'Severe', color: 'purple', bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/40', advice: 'Affects healthy people and seriously impacts those with existing diseases.' },
  { min: 451, max: 999, category: 'Severe+ / Hazardous', color: 'rose', bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/40', advice: 'Emergency health warning. Total restriction on vulnerable outdoor exposure.' }
];

export const GRAP_STAGES = {
  STAGE_I: {
    name: 'Stage I (Poor: AQI 201-300)',
    measures: ['Mechanized sweeping and water sprinkling', 'Strict ban on open burning of biomass/waste', 'Anti-dust measures at construction sites']
  },
  STAGE_II: {
    name: 'Stage II (Very Poor: AQI 301-400)',
    measures: ['Daily vacuum sweeping of roads', 'Strict curb on diesel generator sets', 'Enhance parking fees to discourage private vehicles', 'Synchronized traffic signals to reduce idling']
  },
  STAGE_III: {
    name: 'Stage III (Severe: AQI 401-450)',
    measures: ['Ban on non-essential construction and demolition', 'Strict restrictions on BS-III petrol & BS-IV diesel vehicles', 'Discontinue offline classes up to Primary grades (Class V)']
  },
  STAGE_IV: {
    name: 'Stage IV (Severe+: AQI > 450)',
    measures: ['Ban on entry of non-electric/non-CNG trucks', 'Closure of offline classes up to Grade IX & XI', '50% work-from-home advisory for public & private offices', 'Emergency odd-even vehicle rationing triggers']
  }
};

export const IAQ_BIO_HACKS = [
  {
    id: 'wet_mopping',
    title: 'Micro-Particulate Damp Mopping',
    category: 'Cleaning',
    impact: 'Reduces resuspended indoor PM2.5 & PM10 by up to 45%',
    description: 'Dry brooms (jhadu) violently suspend settled microscopic particulates into the breathing zone for 2-3 hours. Use micro-fiber mops lightly dampened with warm water + a dash of salt or natural vinegar.',
    tip: 'Mop twice daily: once at 10 AM after morning traffic dust settles, and once at 7 PM.'
  },
  {
    id: 'cooking_exhaust',
    title: 'Low-Emission Tadka & Kitchen Air Shield',
    category: 'Cooking',
    impact: 'Prevents kitchen PM2.5 spikes of 600-1,200 µg/m³',
    description: 'Deep frying and direct mustard oil tadkas produce lethal polycyclic aromatic hydrocarbons. Keep exhaust fan on 5 minutes BEFORE cooking begins and 15 minutes after. Cover pans with lids.',
    tip: 'Avoid dry roasting chilies or spices during severe smog emergencies.'
  },
  {
    id: 'seal_windows',
    title: 'Thermal & Smog Door Draft Snakes',
    category: 'Insulation',
    impact: 'Cuts infiltration of toxic ambient smog by 30-50%',
    description: 'Place rolled damp towels or fabric door-draft snakes at the base of exterior doors and leaky balcony sliders during morning/evening inversion hours (6 AM - 10 AM & 6 PM - 11 PM).',
    tip: 'Only open windows for 20 minutes between 12:30 PM - 2:30 PM when surface inversion breaks.'
  },
  {
    id: 'incense_replacement',
    title: 'Zero-Smoke Dhoop & Mosquito Alternatives',
    category: 'Air Quality',
    impact: 'Eliminates equivalent of 40-100 cigarettes per mosquito coil/dhoop stick',
    description: 'Burning one traditional mosquito coil releases as much PM2.5 as 75-137 cigarettes, plus formaldehyde. Switch to magnetic window mesh screens, ultrasonic repellents, or plug-in liquid vaporizers.',
    tip: 'For prayer rituals, use electric aromatic diffusers or brass oil lamps with pure ghee rather than smoldering incense.'
  },
  {
    id: 'air_purifying_plants',
    title: 'Phytoremediation Green Corner',
    category: 'Natural Bio-Filter',
    impact: 'Absorbs indoor VOCs, formaldehyde, and CO2 overnight',
    description: 'Sansevieria (Snake Plant), Chlorophytum (Spider Plant), and Areca Palm. While plants cannot filter heavy PM2.5 mass at mechanical rates, they maintain oxygen ratios in sealed rooms.',
    tip: 'Keep 3-4 adult Snake Plants per 100 sq ft in bedrooms; wipe leaf surfaces weekly with damp cloth.'
  }
];

export const CORSI_ROSENTHAL_GUIDELINES = {
  concept: 'Corsi-Rosenthal Box / DIY Air Purifier',
  inventors: 'Dr. Richard Corsi & Jim Rosenthal',
  principles: [
    'Uses a high-CFM box fan paired with 1 to 4 MERV-13 pleated HVAC filters.',
    'Massive surface area reduces face velocity, allowing whisper-quiet operation and 90%+ PM2.5 capture.',
    'Delivers Clean Air Delivery Rate (CADR) of 180-260 CFM for under ₹2,500 - ₹3,500 ($30-$45), outperforming ₹15,000+ commercial units.'
  ],
  standardRoomACH: 4.5,
  formula: 'CADR required (CFM) = (Room Area sq ft × Ceiling Height ft × Target ACH) / 60'
};
