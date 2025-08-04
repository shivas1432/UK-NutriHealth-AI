export interface UserProfile {
  id: string;
  createdAt: Date;
  
  // Step 1: Demographics
  age: number;
  gender: 'male' | 'female' | 'other';
  region: 'england' | 'scotland' | 'wales' | 'northern-ireland';
  ethnicity: 'white' | 'asian' | 'black' | 'mixed' | 'other';
  
  // Step 2: Lifestyle
  workEnvironment: 'indoor' | 'outdoor' | 'mixed';
  dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
  exerciseFrequency: 'none' | 'light' | 'moderate' | 'intense';
  sunlightExposure: '<30min' | '30-60min' | '60-120min' | '>120min';
  
  // Step 3: Symptoms
  symptoms: string[];
  
  // Step 4: Risk Factors
  menstrualFlow?: 'light' | 'normal' | 'heavy';
  pregnancyPlanning?: boolean;
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'light' | 'moderate' | 'heavy';
  medications: string[];
  medicalConditions: string[];
}

export interface RiskAssessment {
  vitaminD: number;
  iron: number;
  vitaminB12: number;
  calcium: number;
  overallScore: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'immediate' | 'short-term' | 'long-term';
  category: 'diet' | 'lifestyle' | 'supplements' | 'medical';
  completed?: boolean;
}

export interface HealthCondition {
  id: string;
  name: string;
  prevalence: string;
  symptoms: string[];
  nhsCost: string;
  description: string;
}

export type AssessmentStep = 1 | 2 | 3 | 4;