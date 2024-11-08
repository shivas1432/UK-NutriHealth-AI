// UK Seasonal Produce Data
export const UK_SEASONAL_PRODUCE = {
  spring: {
    fruits: ['rhubarb', 'strawberries', 'gooseberries'],
    vegetables: ['asparagus', 'new_potatoes', 'peas', 'broad_beans', 'spinach', 'lettuce'],
    peak_months: [3, 4, 5]
  },
  
  summer: {
    fruits: ['strawberries', 'raspberries', 'blackcurrants', 'cherries', 'plums'],
    vegetables: ['tomatoes', 'courgettes', 'runner_beans', 'sweetcorn', 'cucumber'],
    peak_months: [6, 7, 8]
  },
  
  autumn: {
    fruits: ['apples', 'pears', 'blackberries', 'elderberries'],
    vegetables: ['pumpkins', 'squash', 'brussels_sprouts', 'cauliflower', 'leeks'],
    peak_months: [9, 10, 11]
  },
  
  winter: {
    fruits: ['stored_apples', 'stored_pears'],
    vegetables: ['parsnips', 'turnips', 'swede', 'winter_cabbage', 'kale'],
    peak_months: [12, 1, 2]
  }
};

export const getCurrentSeasonProduce = () => {
  const currentMonth = new Date().getMonth() + 1;
  
  for (const [season, data] of Object.entries(UK_SEASONAL_PRODUCE)) {
    if (data.peak_months.includes(currentMonth)) {
      return {
        season,
        fruits: data.fruits,
        vegetables: data.vegetables
      };
    }
  }
  
  return UK_SEASONAL_PRODUCE.spring; // fallback
};
