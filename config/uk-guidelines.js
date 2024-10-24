// UK Government Dietary Guidelines Configuration
export const UK_DIETARY_GUIDELINES = {
  dailyValues: {
    calories: { adult_male: 2500, adult_female: 2000 },
    protein: { min: 50, max: 200 }, // grams
    carbohydrates: { min: 260, percentage: 50 },
    fat: { max: 70, percentage: 35 },
    saturatedFat: { max: 20 },
    fiber: { min: 30 },
    salt: { max: 6 },
    sugar: { max: 90 }
  },
  
  trafficLightSystem: {
    fat: { low: 3, high: 17.5 },
    saturatedFat: { low: 1.5, high: 5 },
    sugar: { low: 5, high: 22.5 },
    salt: { low: 0.3, high: 1.5 }
  },
  
  eatwellGuide: {
    fruitsVegetables: 0.4, // 40% of plate
    starchyCarbs: 0.38,    // 38% of plate
    protein: 0.12,         // 12% of plate
    dairy: 0.08,          // 8% of plate
    fatsOils: 0.02        // 2% of plate
  }
};
