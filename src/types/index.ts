export type Language = 'en' | 'hi' | 'hinglish';

export type AQICategory = 
  | 'Good' 
  | 'Satisfactory' 
  | 'Moderate' 
  | 'Poor' 
  | 'Very Poor' 
  | 'Severe' 
  | 'Severe+ / Hazardous';

export interface PollutantLevels {
  pm25: number;      // µg/m³
  pm10: number;      // µg/m³
  no2: number;       // µg/m³
  so2: number;       // µg/m³
  co: number;        // mg/m³
  ozone: number;     // µg/m³
}

export interface CitySmogData {
  cityId: string;
  name: string;
  stateOrCountry: string;
  aqi: number;
  category: AQICategory;
  pollutants: PollutantLevels;
  temperatureC: number;
  humidityPct: number;
  windSpeedKmh: number;
  inversionStrength: 'Low' | 'Moderate' | 'Severe' | 'Extreme';
  grapStage: 'None' | 'Stage I' | 'Stage II' | 'Stage III' | 'Stage IV';
  ventilationWindow: {
    startHour: number;
    endHour: number;
    reason: string;
  };
  hourlyForecast: {
    hour: string;
    aqi: number;
    pm25: number;
    status: 'High Risk' | 'Moderate' | 'Optimal Window';
  }[];
}

export interface FamilyProfile {
  infantsCount: number;
  childrenCount: number;
  elderlyCount: number;
  asthmaticOrCopd: boolean;
  outdoorWorkersCount: number;
  petsCount: number;
  housingType: 'Apartment' | 'Independent House' | 'Slum/Chawl' | 'Mixed';
  cookingFuel: 'LPG/Induction' | 'Wood/Biomass' | 'Kerosene';
  heatingMethod: 'Room Heater/AC' | 'Angithi/Charcoal Fire' | 'Electric Blanket' | 'None';
}

export interface RoutineActivity {
  id: string;
  timeSlot: string;
  hour: number;
  activityName: string;
  category: 'Commute' | 'School' | 'Exercise' | 'Ventilation' | 'Indoor Chores';
  traditionalHabit: string;
  saathiAlternative: string;
  exposureRiskReductionPct: number;
  recommendedMask: 'N95 / FFP2 with tight seal' | 'Surgical 3-ply' | 'None required indoors';
  healthTip: string;
}

export interface PurifierSpecs {
  roomAreaSqFt: number;
  ceilingHeightFt: number;
  targetACH: number;       // Air Changes per Hour (typically 4 - 6 for smog)
  requiredCADR: number;     // CFM
  recommendedBuild: {
    fanType: string;
    fanCfm: number;
    filtersNeeded: number;
    filterRating: 'MERV-13' | 'HEPA H13' | 'Carbon + MERV';
    estimatedCostInr: number;
    commercialCostComparisonInr: number;
    savingsPct: number;
  };
  steps: string[];
}

export interface SustainableAction {
  id: string;
  title: string;
  category: 'Heating' | 'Commute' | 'Cleaning' | 'Cooking' | 'Waste';
  currentHabit: string;
  sustainableChoice: string;
  pm25AvoidedGramsPerDay: number;
  co2SavedKgPerDay: number;
  annualCostSavingsInr: number;
  active: boolean;
}

export interface HotspotReport {
  id: string;
  type: 'Garbage Burning' | 'Dry Sweeping / Dust' | 'Biomass Heating' | 'Industrial Smoke' | 'Vehicle Idling';
  location: string;
  reportedAt: string;
  upvotes: number;
  status: 'Verified' | 'Investigating' | 'Resolved';
  actionTaken?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'tool';
  text: string;
  timestamp: string;
  toolCall?: {
    name: string;
    args: Record<string, any>;
    resultSummary?: string;
  };
}
