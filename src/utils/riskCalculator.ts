import { UserProfile, RiskAssessment } from '../types';

export const calculateRiskAssessment = (profile: UserProfile): RiskAssessment => {
  // Vitamin D Risk Calculation
  let vitaminDRisk = 0;
  
  // Regional factors
  if (profile.region === 'scotland') vitaminDRisk += 30;
  else if (profile.region === 'northern-ireland') vitaminDRisk += 25;
  else if (profile.region === 'wales') vitaminDRisk += 20;
  else vitaminDRisk += 15; // England baseline
  
  // Work environment
  if (profile.workEnvironment === 'indoor') vitaminDRisk += 25;
  else if (profile.workEnvironment === 'mixed') vitaminDRisk += 15;
  
  // Sunlight exposure
  if (profile.sunlightExposure === '<30min') vitaminDRisk += 20;
  else if (profile.sunlightExposure === '30-60min') vitaminDRisk += 10;
  
  // Ethnicity - darker skin needs more sunlight
  if (profile.ethnicity === 'black' || profile.ethnicity === 'asian') vitaminDRisk += 15;
  
  // Age factor
  if (profile.age > 65) vitaminDRisk += 15;
  else if (profile.age > 50) vitaminDRisk += 10;
  
  // Symptoms
  if (profile.symptoms.includes('bone-pain')) vitaminDRisk += 15;
  if (profile.symptoms.includes('depression')) vitaminDRisk += 10;
  if (profile.symptoms.includes('fatigue')) vitaminDRisk += 5;
  
  // Iron Risk Calculation
  let ironRisk = 0;
  
  // Gender and age - highest risk group
  if (profile.gender === 'female' && profile.age >= 18 && profile.age <= 50) {
    ironRisk += 40;
    
    // Menstrual flow
    if (profile.menstrualFlow === 'heavy') ironRisk += 25;
    else if (profile.menstrualFlow === 'normal') ironRisk += 10;
  }
  
  // Diet type
  if (profile.dietType === 'vegan') ironRisk += 25;
  else if (profile.dietType === 'vegetarian') ironRisk += 15;
  
  // Symptoms
  if (profile.symptoms.includes('fatigue')) ironRisk += 20;
  if (profile.symptoms.includes('pale-skin')) ironRisk += 15;
  if (profile.symptoms.includes('cold')) ironRisk += 10;
  if (profile.symptoms.includes('weakness')) ironRisk += 10;
  
  // Exercise - intense exercise increases needs
  if (profile.exerciseFrequency === 'intense') ironRisk += 15;
  
  // Medical conditions
  if (profile.medicalConditions.includes('Celiac disease') || 
      profile.medicalConditions.includes('Crohn\'s disease')) {
    ironRisk += 20;
  }
  
  // Vitamin B12 Risk Calculation
  let vitaminB12Risk = 0;
  
  // Diet type - highest risk factor
  if (profile.dietType === 'vegan') vitaminB12Risk += 50;
  else if (profile.dietType === 'vegetarian') vitaminB12Risk += 25;
  
  // Age - absorption decreases with age
  if (profile.age > 65) vitaminB12Risk += 25;
  else if (profile.age > 50) vitaminB12Risk += 15;
  
  // Symptoms
  if (profile.symptoms.includes('memory')) vitaminB12Risk += 20;
  if (profile.symptoms.includes('numbness')) vitaminB12Risk += 15;
  if (profile.symptoms.includes('fatigue')) vitaminB12Risk += 10;
  
  // Medications that affect B12 absorption
  if (profile.medications.includes('Metformin (reduces B12)') ||
      profile.medications.includes('Antacids (reduce B12 absorption)') ||
      profile.medications.includes('Proton pump inhibitors')) {
    vitaminB12Risk += 20;
  }
  
  // Medical conditions
  if (profile.medicalConditions.includes('Celiac disease') ||
      profile.medicalConditions.includes('Crohn\'s disease') ||
      profile.medicalConditions.includes('Gastric bypass surgery')) {
    vitaminB12Risk += 25;
  }
  
  // Calcium Risk Calculation
  let calciumRisk = 0;
  
  // Age - bone loss accelerates with age
  if (profile.age > 65) calciumRisk += 30;
  else if (profile.age > 50) calciumRisk += 20;
  else if (profile.age > 30) calciumRisk += 10;
  
  // Gender - postmenopausal women at higher risk
  if (profile.gender === 'female' && profile.age > 50) calciumRisk += 20;
  
  // Diet type
  if (profile.dietType === 'vegan') calciumRisk += 20;
  
  // Lifestyle factors
  if (profile.exerciseFrequency === 'none') calciumRisk += 15;
  if (profile.smokingStatus === 'current') calciumRisk += 15;
  if (profile.alcoholConsumption === 'heavy') calciumRisk += 10;
  
  // Symptoms
  if (profile.symptoms.includes('bone-pain')) calciumRisk += 15;
  if (profile.symptoms.includes('cramps')) calciumRisk += 10;
  
  // Cap all risks at 95% maximum
  vitaminDRisk = Math.min(vitaminDRisk, 95);
  ironRisk = Math.min(ironRisk, 95);
  vitaminB12Risk = Math.min(vitaminB12Risk, 95);
  calciumRisk = Math.min(calciumRisk, 95);
  
  // Calculate overall health score (inverted risk average)
  const averageRisk = (vitaminDRisk + ironRisk + vitaminB12Risk + calciumRisk) / 4;
  const overallScore = Math.max(100 - averageRisk, 5);
  
  return {
    vitaminD: vitaminDRisk,
    iron: ironRisk,
    vitaminB12: vitaminB12Risk,
    calcium: calciumRisk,
    overallScore: Math.round(overallScore)
  };
};

export const getRiskLevel = (risk: number): 'low' | 'medium' | 'high' => {
  if (risk < 40) return 'low';
  if (risk < 70) return 'medium';
  return 'high';
};

export const getRiskColor = (risk: number): string => {
  const level = getRiskLevel(risk);
  switch (level) {
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'high': return 'text-red-600 bg-red-50 border-red-200';
  }
};