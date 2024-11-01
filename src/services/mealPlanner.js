// UK-Specific Meal Planning Service
class MealPlanner {
  constructor() {
    this.ukSeasonalProduce = require('../data/seasonalProduce');
    this.ukCuisinePreferences = require('../data/cuisinePreferences');
  }

  generateWeeklyPlan(userProfile, dietaryRestrictions = []) {
    const weekPlan = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach(day => {
      weekPlan[day] = this.generateDayPlan(userProfile, dietaryRestrictions, day);
    });

    return {
      weekPlan,
      shoppingList: this.generateShoppingList(weekPlan),
      nutritionSummary: this.calculateWeeklyNutrition(weekPlan),
      ukCompliance: this.checkUKGuidelinesCompliance(weekPlan)
    };
  }

  generateDayPlan(userProfile, restrictions, dayOfWeek) {
    const calorieTarget = this.calculateCalorieTarget(userProfile);
    
    return {
      breakfast: this.selectMeal('breakfast', calorieTarget * 0.25, restrictions),
      lunch: this.selectMeal('lunch', calorieTarget * 0.35, restrictions),
      dinner: this.selectMeal('dinner', calorieTarget * 0.35, restrictions),
      snacks: this.selectSnacks(calorieTarget * 0.05, restrictions)
    };
  }

  selectMeal(mealType, calorieTarget, restrictions) {
    // UK-specific meal selection based on local ingredients and preferences
    const ukMealDatabase = {
      breakfast: [
        { name: 'Porridge with berries', calories: 300, ukIngredients: ['oats', 'british_berries'] },
        { name: 'Full English (healthy)', calories: 450, ukIngredients: ['eggs', 'beans', 'mushrooms'] },
        { name: 'Weetabix with milk', calories: 200, ukIngredients: ['weetabix', 'milk'] }
      ],
      lunch: [
        { name: 'Jacket potato with beans', calories: 350, ukIngredients: ['potato', 'baked_beans'] },
        { name: 'Ploughman\'s lunch', calories: 400, ukIngredients: ['cheese', 'bread', 'pickle'] },
        { name: 'Fish and chips (baked)', calories: 500, ukIngredients: ['cod', 'potatoes'] }
      ],
      dinner: [
        { name: 'Roast dinner', calories: 600, ukIngredients: ['chicken', 'vegetables', 'potatoes'] },
        { name: 'Shepherd\'s pie', calories: 550, ukIngredients: ['lamb', 'potatoes', 'vegetables'] },
        { name: 'Bangers and mash', calories: 500, ukIngredients: ['sausages', 'potatoes', 'peas'] }
      ]
    };

    const mealOptions = ukMealDatabase[mealType] || [];
    const suitableMeals = mealOptions.filter(meal => 
      Math.abs(meal.calories - calorieTarget) < 100 &&
      this.checkRestrictions(meal, restrictions)
    );

    return suitableMeals[Math.floor(Math.random() * suitableMeals.length)] || mealOptions[0];
  }

  calculateCalorieTarget(userProfile) {
    const { age, gender, weight, height, activityLevel } = userProfile;
    
    // Harris-Benedict equation for UK population
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    };

    return Math.round(bmr * (activityMultipliers[activityLevel] || 1.375));
  }

  checkRestrictions(meal, restrictions) {
    // Check meal against dietary restrictions
    return !restrictions.some(restriction => 
      meal.ukIngredients.some(ingredient => 
        this.isRestrictedIngredient(ingredient, restriction)
      )
    );
  }

  isRestrictedIngredient(ingredient, restriction) {
    const restrictionMappings = {
      vegetarian: ['chicken', 'beef', 'lamb', 'cod', 'sausages'],
      vegan: ['chicken', 'beef', 'lamb', 'cod', 'sausages', 'milk', 'cheese', 'eggs'],
      gluten_free: ['bread', 'weetabix'],
      dairy_free: ['milk', 'cheese']
    };

    return restrictionMappings[restriction]?.includes(ingredient) || false;
  }
}

module.exports = MealPlanner;
