// UK Dietary Recommendations Component
import React, { useState, useEffect } from 'react';

const DietaryRecommendations = ({ userProfile, currentDiet }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [ukCompliance, setUkCompliance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [userProfile, currentDiet]);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/nutrition/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userProfile, currentDiet })
      });

      const data = await response.json();
      setRecommendations(data.recommendations || []);
      setUkCompliance(data.ukCompliance || {});
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Generating UK nutrition recommendations...</div>;
  }

  return (
    <div className="uk-diet-recommendations">
      <h3>Personalized UK Nutrition Recommendations</h3>
      
      <div className="uk-compliance-section">
        <h4>UK Dietary Guidelines Compliance</h4>
        <div className="traffic-lights">
          {ukCompliance.trafficLights && Object.entries(ukCompliance.trafficLights).map(([nutrient, status]) => (
            <div key={nutrient} className={`traffic-light ${status}`}>
              <span className="nutrient">{nutrient}</span>
              <span className={`light ${status}`}></span>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-list">
        {recommendations.map((rec, index) => (
          <div key={index} className={`recommendation ${rec.priority}`}>
            <div className="rec-icon">{rec.type === 'increase' ? '⬆️' : '⬇️'}</div>
            <div className="rec-content">
              <h5>{rec.title}</h5>
              <p>{rec.description}</p>
              {rec.ukSpecific && <span className="uk-badge">UK Guideline</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="eatwell-guide">
        <h4>Eatwell Guide Balance</h4>
        <div className="eatwell-plate">
          <div className="segment fruits-veg" style={{flex: 0.4}}>
            Fruits & Vegetables (40%)
          </div>
          <div className="segment starchy-carbs" style={{flex: 0.38}}>
            Starchy Carbs (38%)
          </div>
          <div className="segment protein" style={{flex: 0.12}}>
            Protein (12%)
          </div>
          <div className="segment dairy" style={{flex: 0.08}}>
            Dairy (8%)
          </div>
          <div className="segment fats-oils" style={{flex: 0.02}}>
            Fats & Oils (2%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietaryRecommendations;
