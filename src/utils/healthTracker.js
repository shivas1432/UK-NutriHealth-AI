// UK Health Tracking Utilities
export const trackNutrition = (dailyIntake, userProfile) => {
  const ukGuidelines = require('../config/uk-guidelines').UK_DIETARY_GUIDELINES;
  
  return {
    intake: {
      calories: dailyIntake.calories || 0,
      protein: dailyIntake.protein || 0,
      carbohydrates: dailyIntake.carbohydrates || 0,
      fat: dailyIntake.fat || 0,
      saturatedFat: dailyIntake.saturatedFat || 0,
      fiber: dailyIntake.fiber || 0,
      salt: dailyIntake.salt || 0,
      sugar: dailyIntake.sugar || 0
    },
    targets: calculatePersonalTargets(userProfile, ukGuidelines),
    compliance: calculateUKCompliance(dailyIntake, userProfile),
    recommendations: generateDailyRecommendations(dailyIntake, userProfile),
    trends: calculateNutritionTrends(dailyIntake),
    ukScore: calculateUKNutritionScore(dailyIntake, userProfile)
  };
};

const calculatePersonalTargets = (userProfile, guidelines) => {
  const gender = userProfile.gender;
  const activityLevel = userProfile.activityLevel || 'moderately_active';
  
  return {
    calories: guidelines.dailyValues.calories[`adult_${gender}`] || 2000,
    protein: guidelines.dailyValues.protein.min,
    carbohydrates: guidelines.dailyValues.carbohydrates.min,
    fat: guidelines.dailyValues.fat.max,
    saturatedFat: guidelines.dailyValues.saturatedFat.max,
    fiber: guidelines.dailyValues.fiber.min,
    salt: guidelines.dailyValues.salt.max,
    sugar: guidelines.dailyValues.sugar.max
  };
};

const calculateUKCompliance = (intake, userProfile) => {
  const guidelines = require('../config/uk-guidelines').UK_DIETARY_GUIDELINES;
  const targets = calculatePersonalTargets(userProfile, guidelines);
  
  return {
    overall: calculateOverallCompliance(intake, targets),
    individual: {
      calories: (intake.calories / targets.calories * 100).toFixed(1),
      protein: Math.min(100, (intake.protein / targets.protein * 100)).toFixed(1),
      fiber: Math.min(100, (intake.fiber / targets.fiber * 100)).toFixed(1),
      salt: intake.salt <= targets.salt ? 100 : ((targets.salt / intake.salt) * 100).toFixed(1),
      sugar: intake.sugar <= targets.sugar ? 100 : ((targets.sugar / intake.sugar) * 100).toFixed(1)
    },
    trafficLights: {
      fat: getTrafficLightStatus(intake.fat, guidelines.trafficLightSystem.fat),
      saturatedFat: getTrafficLightStatus(intake.saturatedFat, guidelines.trafficLightSystem.saturatedFat),
      sugar: getTrafficLightStatus(intake.sugar, guidelines.trafficLightSystem.sugar),
      salt: getTrafficLightStatus(intake.salt, guidelines.trafficLightSystem.salt)
    }
  };
};

const getTrafficLightStatus = (value, thresholds) => {
  if (value <= thresholds.low) return 'green';
  if (value <= thresholds.high) return 'amber';
  return 'red';
};

const calculateOverallCompliance = (intake, targets) => {
  const scores = [
    Math.min(100, (intake.protein / targets.protein) * 100),
    Math.min(100, (intake.fiber / targets.fiber) * 100),
    intake.salt <= targets.salt ? 100 : (targets.salt / intake.salt) * 100,
    intake.sugar <= targets.sugar ? 100 : (targets.sugar / intake.sugar) * 100,
    Math.abs(100 - (intake.calories / targets.calories * 100)) <= 10 ? 100 : 50
  ];
  
  return (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
};

const generateDailyRecommendations = (intake, userProfile) => {
  const recommendations = [];
  const targets = calculatePersonalTargets(userProfile, require('../config/uk-guidelines').UK_DIETARY_GUIDELINES);
  
  if (intake.fiber < targets.fiber) {
    recommendations.push({
      type: 'increase',
      nutrient: 'fiber',
      message: 'Add more fruits, vegetables, and wholegrain foods',
      ukSpecific: true
    });
  }
  
  if (intake.salt > targets.salt) {
    recommendations.push({
      type: 'decrease',
      nutrient: 'salt',
      message: 'Reduce processed foods and added salt',
      ukSpecific: true
    });
  }
  
  if (intake.saturatedFat > targets.saturatedFat) {
    recommendations.push({
      type: 'decrease',
      nutrient: 'saturated_fat',
      message: 'Choose lean meats and low-fat dairy products',
      ukSpecific: true
    });
  }
  
  return recommendations;
};

const calculateNutritionTrends = (dailyIntake) => {
  // This would typically analyze historical data
  return {
    improving: ['fiber', 'protein'],
    declining: [],
    stable: ['calories', 'fat']
  };
};

const calculateUKNutritionScore = (intake, userProfile) => {
  const compliance = calculateUKCompliance(intake, userProfile);
  return Math.round(compliance.overall);
};

export { trackNutrition, calculateUKCompliance, generateDailyRecommendations };
