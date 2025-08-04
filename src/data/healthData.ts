import { HealthCondition } from '../types';

export const ukHealthStats = {
  vitaminD: {
    prevalence: "50% of UK adults are Vitamin D deficient",
    winterIncrease: "70% in winter months",
    costPerCase: "£150-400 NHS treatment costs"
  },
  iron: {
    prevalence: "25% of UK women have iron deficiency",
    anemiaRate: "15% develop iron deficiency anemia",
    costPerCase: "£200-500 NHS treatment costs"
  },
  vitaminB12: {
    prevalence: "6% of UK adults are B12 deficient",
    veganRisk: "Up to 80% of vegans at risk",
    costPerCase: "£100-300 NHS treatment costs"
  }
};

export const healthConditions: HealthCondition[] = [
  {
    id: 'iron-deficiency',
    name: 'Iron Deficiency Anemia',
    prevalence: '25% of UK women affected',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Cold hands/feet', 'Brittle nails'],
    nhsCost: '£200-500 per case',
    description: 'Most common nutritional deficiency in UK women of childbearing age'
  },
  {
    id: 'vitamin-d-deficiency',
    name: 'Vitamin D Deficiency',
    prevalence: '50% of UK adults affected',
    symptoms: ['Bone pain', 'Muscle weakness', 'Fatigue', 'Depression', 'Hair loss'],
    nhsCost: '£150-400 per case',
    description: 'Particularly common in northern regions due to limited sunlight'
  },
  {
    id: 'vitamin-b12-deficiency',
    name: 'Vitamin B12 Deficiency',
    prevalence: '6% of UK adults affected',
    symptoms: ['Memory problems', 'Fatigue', 'Nerve damage', 'Mood changes', 'Weakness'],
    nhsCost: '£100-300 per case',
    description: 'Common in vegans, elderly, and those with absorption issues'
  },
  {
    id: 'calcium-deficiency',
    name: 'Calcium Deficiency',
    prevalence: '20% of UK adults at risk',
    symptoms: ['Muscle cramps', 'Brittle bones', 'Dental problems', 'Numbness'],
    nhsCost: '£300-800 per case',
    description: 'Long-term deficiency leads to osteoporosis and fractures'
  }
];

export const symptoms = [
  { id: 'fatigue', label: 'Persistent fatigue or tiredness', conditions: ['iron', 'vitaminD', 'vitaminB12'] },
  { id: 'weakness', label: 'Muscle weakness', conditions: ['iron', 'vitaminD', 'calcium'] },
  { id: 'bone-pain', label: 'Bone or joint pain', conditions: ['vitaminD', 'calcium'] },
  { id: 'memory', label: 'Memory problems or brain fog', conditions: ['vitaminB12', 'iron'] },
  { id: 'pale-skin', label: 'Pale skin or brittle nails', conditions: ['iron'] },
  { id: 'depression', label: 'Low mood or depression', conditions: ['vitaminD', 'vitaminB12'] },
  { id: 'hair-loss', label: 'Hair loss or thinning', conditions: ['iron', 'vitaminD'] },
  { id: 'cold', label: 'Always feeling cold', conditions: ['iron'] },
  { id: 'cramps', label: 'Muscle cramps or spasms', conditions: ['calcium', 'vitaminD'] },
  { id: 'numbness', label: 'Numbness or tingling', conditions: ['vitaminB12', 'calcium'] }
];

export const medications = [
  'Antacids (reduce B12 absorption)',
  'Metformin (reduces B12)',
  'Proton pump inhibitors',
  'Blood thinners',
  'Steroids',
  'Diuretics',
  'None of the above'
];

export const medicalConditions = [
  'Celiac disease',
  'Crohn\'s disease',
  'Diabetes',
  'Kidney disease',
  'Thyroid disorders',
  'Gastric bypass surgery',
  'None of the above'
];