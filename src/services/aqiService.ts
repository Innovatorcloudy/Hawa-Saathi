import { CitySmogData, AQICategory, PollutantLevels } from '../types';
import { AQI_THRESHOLDS } from './knowledgeBase';

export const CITIES_DATABASE: Record<string, CitySmogData> = {
  'delhi-anand-vihar': {
    cityId: 'delhi-anand-vihar',
    name: 'Delhi (Anand Vihar Hub)',
    stateOrCountry: 'Delhi NCR, India',
    aqi: 468,
    category: 'Severe+ / Hazardous',
    pollutants: {
      pm25: 395,
      pm10: 512,
      no2: 88,
      so2: 24,
      co: 3.4,
      ozone: 42
    },
    temperatureC: 14,
    humidityPct: 86,
    windSpeedKmh: 3.5,
    inversionStrength: 'Extreme',
    grapStage: 'Stage IV',
    ventilationWindow: {
      startHour: 13,
      endHour: 15,
      reason: 'Boundary layer expands slightly with peak solar radiation, temporarily lowering ground-level particulate accumulation.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 485, pm25: 420, status: 'High Risk' },
      { hour: '08:00', aqi: 495, pm25: 440, status: 'High Risk' },
      { hour: '10:00', aqi: 460, pm25: 380, status: 'High Risk' },
      { hour: '12:00', aqi: 390, pm25: 310, status: 'Moderate' },
      { hour: '13:30', aqi: 340, pm25: 260, status: 'Optimal Window' },
      { hour: '15:00', aqi: 360, pm25: 285, status: 'Optimal Window' },
      { hour: '17:00', aqi: 420, pm25: 350, status: 'High Risk' },
      { hour: '19:00', aqi: 475, pm25: 415, status: 'High Risk' },
      { hour: '22:00', aqi: 490, pm25: 435, status: 'High Risk' },
    ]
  },
  'delhi-rk-puram': {
    cityId: 'delhi-rk-puram',
    name: 'Delhi (R.K. Puram / South)',
    stateOrCountry: 'Delhi NCR, India',
    aqi: 412,
    category: 'Severe',
    pollutants: {
      pm25: 310,
      pm10: 420,
      no2: 65,
      so2: 18,
      co: 2.8,
      ozone: 38
    },
    temperatureC: 15,
    humidityPct: 82,
    windSpeedKmh: 4.8,
    inversionStrength: 'Severe',
    grapStage: 'Stage III',
    ventilationWindow: {
      startHour: 12,
      endHour: 15,
      reason: 'Midday thermal convection lifts ground smoke cap.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 430, pm25: 340, status: 'High Risk' },
      { hour: '09:00', aqi: 445, pm25: 360, status: 'High Risk' },
      { hour: '12:00', aqi: 360, pm25: 270, status: 'Moderate' },
      { hour: '14:00', aqi: 310, pm25: 220, status: 'Optimal Window' },
      { hour: '16:00', aqi: 350, pm25: 260, status: 'Moderate' },
      { hour: '19:00', aqi: 420, pm25: 330, status: 'High Risk' },
      { hour: '22:00', aqi: 440, pm25: 350, status: 'High Risk' },
    ]
  },
  'noida-sector-62': {
    cityId: 'noida-sector-62',
    name: 'Noida (Sector 62)',
    stateOrCountry: 'Uttar Pradesh, India',
    aqi: 435,
    category: 'Severe',
    pollutants: {
      pm25: 345,
      pm10: 460,
      no2: 72,
      so2: 21,
      co: 3.1,
      ozone: 36
    },
    temperatureC: 14,
    humidityPct: 84,
    windSpeedKmh: 4.0,
    inversionStrength: 'Severe',
    grapStage: 'Stage III',
    ventilationWindow: {
      startHour: 13,
      endHour: 15,
      reason: 'Sunlight breaks shallow fog blanket.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 450, pm25: 370, status: 'High Risk' },
      { hour: '09:00', aqi: 460, pm25: 385, status: 'High Risk' },
      { hour: '13:00', aqi: 340, pm25: 250, status: 'Optimal Window' },
      { hour: '15:00', aqi: 355, pm25: 270, status: 'Optimal Window' },
      { hour: '18:00', aqi: 430, pm25: 340, status: 'High Risk' },
      { hour: '21:00', aqi: 455, pm25: 380, status: 'High Risk' },
    ]
  },
  'lahore-gulberg': {
    cityId: 'lahore-gulberg',
    name: 'Lahore (Gulberg / Mall Road)',
    stateOrCountry: 'Punjab, Pakistan',
    aqi: 510,
    category: 'Severe+ / Hazardous',
    pollutants: {
      pm25: 450,
      pm10: 590,
      no2: 95,
      so2: 32,
      co: 4.2,
      ozone: 40
    },
    temperatureC: 13,
    humidityPct: 90,
    windSpeedKmh: 2.5,
    inversionStrength: 'Extreme',
    grapStage: 'Stage IV',
    ventilationWindow: {
      startHour: 13,
      endHour: 14,
      reason: 'Extremely narrow thermal lift; keep windows sealed outside this 1-hour span.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 530, pm25: 480, status: 'High Risk' },
      { hour: '09:00', aqi: 540, pm25: 495, status: 'High Risk' },
      { hour: '13:00', aqi: 410, pm25: 320, status: 'Moderate' },
      { hour: '14:00', aqi: 395, pm25: 300, status: 'Optimal Window' },
      { hour: '17:00', aqi: 480, pm25: 410, status: 'High Risk' },
      { hour: '20:00', aqi: 525, pm25: 470, status: 'High Risk' },
    ]
  },
  'lucknow-central': {
    cityId: 'lucknow-central',
    name: 'Lucknow (Hazratganj)',
    stateOrCountry: 'Uttar Pradesh, India',
    aqi: 342,
    category: 'Very Poor',
    pollutants: {
      pm25: 220,
      pm10: 310,
      no2: 52,
      so2: 15,
      co: 2.1,
      ozone: 30
    },
    temperatureC: 16,
    humidityPct: 78,
    windSpeedKmh: 5.5,
    inversionStrength: 'Moderate',
    grapStage: 'Stage II',
    ventilationWindow: {
      startHour: 11,
      endHour: 15,
      reason: 'Favorable solar heating clears fog by 11 AM.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 360, pm25: 250, status: 'High Risk' },
      { hour: '11:00', aqi: 280, pm25: 170, status: 'Optimal Window' },
      { hour: '14:00', aqi: 250, pm25: 140, status: 'Optimal Window' },
      { hour: '18:00', aqi: 330, pm25: 210, status: 'Moderate' },
      { hour: '21:00', aqi: 370, pm25: 260, status: 'High Risk' },
    ]
  },
  'patna-danapur': {
    cityId: 'patna-danapur',
    name: 'Patna (Danapur)',
    stateOrCountry: 'Bihar, India',
    aqi: 388,
    category: 'Very Poor',
    pollutants: {
      pm25: 275,
      pm10: 380,
      no2: 58,
      so2: 17,
      co: 2.5,
      ozone: 33
    },
    temperatureC: 15,
    humidityPct: 83,
    windSpeedKmh: 4.1,
    inversionStrength: 'Severe',
    grapStage: 'Stage II',
    ventilationWindow: {
      startHour: 12,
      endHour: 15,
      reason: 'Riverine morning fog lifts by midday.'
    },
    hourlyForecast: [
      { hour: '06:00', aqi: 410, pm25: 310, status: 'High Risk' },
      { hour: '12:00', aqi: 310, pm25: 200, status: 'Optimal Window' },
      { hour: '14:00', aqi: 290, pm25: 180, status: 'Optimal Window' },
      { hour: '18:00', aqi: 370, pm25: 250, status: 'Moderate' },
      { hour: '21:00', aqi: 405, pm25: 300, status: 'High Risk' },
    ]
  }
};

export function getAQIColorConfig(aqi: number) {
  for (const t of AQI_THRESHOLDS) {
    if (aqi <= t.max) return t;
  }
  return AQI_THRESHOLDS[AQI_THRESHOLDS.length - 1];
}

export function calculateCADR(areaSqFt: number, heightFt: number = 9, targetACH: number = 4.5): number {
  const roomVolumeCuFt = areaSqFt * heightFt;
  return Math.round((roomVolumeCuFt * targetACH) / 60);
}
