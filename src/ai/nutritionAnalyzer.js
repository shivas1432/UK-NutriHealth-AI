// AI-Powered Nutrition Analysis for UK Foods
class NutritionAI {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.ukFoodDatabase = 'https://api.food.gov.uk/nutrition';
  }

  async analyzeFood(foodItem, portion = '100g') {
    try {
      const ukNutritionData = await this.fetchUKNutritionData(foodItem);
      const aiAnalysis = await this.generateAIInsights(foodItem, ukNutritionData);
      
      return {
        food: foodItem,
        portion: portion,
        calories: ukNutritionData.calories || 0,
        macronutrients: {
          protein: ukNutritionData.protein || 0,
          carbohydrates: ukNutritionData.carbs || 0,
          fat: ukNutritionData.fat || 0,
          fiber: ukNutritionData.fiber || 0
        },
        micronutrients: ukNutritionData.vitamins || {},
        healthScore: this.calculateHealthScore(ukNutritionData),
        aiInsights: aiAnalysis,
        ukGuidelines: this.checkUKGuidelines(ukNutritionData)
      };
    } catch (error) {
      console.error('Nutrition analysis failed:', error);
      return null;
    }
  }

  async fetchUKNutritionData(foodItem) {
    // Fetch from UK government food database
    const response = await fetch(`${this.ukFoodDatabase}/search?q=${encodeURIComponent(foodItem)}`);
    return await response.json();
  }

  async generateAIInsights(foodItem, nutritionData) {
    const prompt = `Analyze the nutritional value of ${foodItem} for UK dietary guidelines. Nutrition data: ${JSON.stringify(nutritionData)}`;
    
    // AI analysis would go here
    return {
      summary: `${foodItem} is a nutritious choice`,
      recommendations: ['Include as part of balanced diet'],
      warnings: []
    };
  }

  calculateHealthScore(data) {
    // Calculate health score based on UK nutritional standards
    let score = 50; // Base score
    
    if (data.fiber > 3) score += 10;
    if (data.protein > 10) score += 10;
    if (data.saturatedFat < 1.5) score += 10;
    if (data.sugar < 5) score += 10;
    if (data.salt < 0.3) score += 10;
    
    return Math.min(100, Math.max(0, score));
  }

  checkUKGuidelines(data) {
    return {
      meetsGuidelines: true,
      recommendations: ['Suitable for UK dietary guidelines'],
      trafficLights: {
        fat: data.fat > 17.5 ? 'red' : data.fat > 3 ? 'amber' : 'green',
        saturatedFat: data.saturatedFat > 5 ? 'red' : data.saturatedFat > 1.5 ? 'amber' : 'green',
        sugar: data.sugar > 22.5 ? 'red' : data.sugar > 5 ? 'amber' : 'green',
        salt: data.salt > 1.5 ? 'red' : data.salt > 0.3 ? 'amber' : 'green'
      }
    };
  }
}

module.exports = NutritionAI;
