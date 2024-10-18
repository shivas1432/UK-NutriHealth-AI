import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Download, 
  Calendar,
  ExternalLink,
  Shield,
  Heart,
  Target
} from 'lucide-react';
import { UserProfile, RiskAssessment, Recommendation } from '../types';
import { calculateRiskAssessment, getRiskLevel, getRiskColor } from '../utils/riskCalculator';
import { healthConditions, ukHealthStats } from '../data/healthData';

interface ResultsProps {
  profile: UserProfile;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ profile, onRestart }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [completedRecommendations, setCompletedRecommendations] = useState<Set<string>>(new Set());
  
  const riskAssessment = calculateRiskAssessment(profile);

  const toggleRecommendation = (id: string) => {
    const newCompleted = new Set(completedRecommendations);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedRecommendations(newCompleted);
  };

  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Vitamin D recommendations
    if (riskAssessment.vitaminD > 40) {
      recommendations.push({
        id: 'vitd-sunlight',
        title: 'Increase Sunlight Exposure',
        description: 'Aim for 15-30 minutes of midday sun exposure on face, arms, and legs',
        priority: 'immediate',
        category: 'lifestyle'
      });

      if (riskAssessment.vitaminD > 70) {
        recommendations.push({
          id: 'vitd-supplement',
          title: 'Consider Vitamin D3 Supplement',
          description: 'NHS recommends 10μg (400 IU) daily, especially October-March',
          priority: 'short-term',
          category: 'supplements'
        });
      }

      recommendations.push({
        id: 'vitd-foods',
        title: 'Include Vitamin D Rich Foods',
        description: 'Fatty fish (salmon, sardines), egg yolks, fortified cereals',
        priority: 'short-term',
        category: 'diet'
      });
    }

    // Iron recommendations
    if (riskAssessment.iron > 40) {
      recommendations.push({
        id: 'iron-foods',
        title: 'Increase Iron-Rich Foods',
        description: 'Red meat, dark leafy greens, lentils, fortified cereals',
        priority: 'immediate',
        category: 'diet'
      });

      recommendations.push({
        id: 'iron-absorption',
        title: 'Enhance Iron Absorption',
        description: 'Combine iron-rich foods with vitamin C (citrus, tomatoes, peppers)',
        priority: 'immediate',
        category: 'diet'
      });

      if (riskAssessment.iron > 70) {
        recommendations.push({
          id: 'iron-testing',
          title: 'Request Blood Test',
          description: 'Book GP appointment for full blood count and iron studies',
          priority: 'short-term',
          category: 'medical'
        });
      }
    }

    // B12 recommendations
    if (riskAssessment.vitaminB12 > 40) {
      recommendations.push({
        id: 'b12-foods',
        title: 'Include B12 Sources',
        description: profile.dietType === 'vegan' ? 'Fortified nutritional yeast, plant milks, B12 supplements' : 'Meat, fish, dairy products, eggs',
        priority: 'immediate',
        category: 'diet'
      });

      if (profile.dietType === 'vegan' || riskAssessment.vitaminB12 > 70) {
        recommendations.push({
          id: 'b12-supplement',
          title: 'B12 Supplementation Essential',
          description: 'Vegans need 10μg daily or 2000μg weekly B12 supplement',
          priority: 'immediate',
          category: 'supplements'
        });
      }
    }

    // Calcium recommendations
    if (riskAssessment.calcium > 40) {
      recommendations.push({
        id: 'calcium-foods',
        title: 'Increase Calcium Intake',
        description: 'Dairy products, leafy greens, sardines, almonds, fortified plant milks',
        priority: 'short-term',
        category: 'diet'
      });

      recommendations.push({
        id: 'calcium-exercise',
        title: 'Weight-Bearing Exercise',
        description: 'Regular walking, dancing, or resistance training strengthens bones',
        priority: 'long-term',
        category: 'lifestyle'
      });
    }

    // General recommendations
    if (riskAssessment.overallScore < 70) {
      recommendations.push({
        id: 'gp-consultation',
        title: 'GP Consultation Recommended',
        description: 'Discuss your nutritional health and consider comprehensive blood testing',
        priority: 'short-term',
        category: 'medical'
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getRiskText = (risk: number) => {
    const level = getRiskLevel(risk);
    switch (level) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Moderate Risk';
      case 'high': return 'High Risk';
    }
  };

  const getRiskIcon = (risk: number) => {
    const level = getRiskLevel(risk);
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const generatePDFReport = () => {
    const reportContent = `
UK NutriHealth AI - Personal Health Assessment Report
Generated: ${new Date().toLocaleDateString('en-GB')}

PERSONAL INFORMATION
Age: ${profile.age}
Gender: ${profile.gender}
Region: ${profile.region}
Diet Type: ${profile.dietType}

RISK ASSESSMENT RESULTS
Overall Health Score: ${riskAssessment.overallScore}/100

Vitamin D Deficiency Risk: ${riskAssessment.vitaminD}% (${getRiskText(riskAssessment.vitaminD)})
Iron Deficiency Risk: ${riskAssessment.iron}% (${getRiskText(riskAssessment.iron)})
Vitamin B12 Deficiency Risk: ${riskAssessment.vitaminB12}% (${getRiskText(riskAssessment.vitaminB12)})
Calcium Deficiency Risk: ${riskAssessment.calcium}% (${getRiskText(riskAssessment.calcium)})

TOP RECOMMENDATIONS
${recommendations.slice(0, 5).map(r => `• ${r.title}: ${r.description}`).join('\n')}

MEDICAL DISCLAIMER
This assessment is for educational purposes only and does not replace professional medical advice. 
Always consult with your GP or healthcare provider for medical concerns.
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NutriHealth-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Assessment Results</h1>
              <p className="text-gray-600">Generated on {new Date().toLocaleDateString('en-GB')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={generatePDFReport}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button
                onClick={onRestart}
                className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                New Assessment
              </button>
            </div>
          </div>

          {/* Overall Health Score */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Overall Health Score</h2>
                <p className="text-gray-600">Based on your lifestyle and risk factors</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-900 mb-1">{riskAssessment.overallScore}</div>
                <div className="text-lg text-gray-600">/100</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-900 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${riskAssessment.overallScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'detailed', label: 'Detailed Analysis', icon: Target },
              { id: 'recommendations', label: 'Action Plan', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Risk Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Vitamin D', risk: riskAssessment.vitaminD, stat: ukHealthStats.vitaminD.prevalence },
                { name: 'Iron', risk: riskAssessment.iron, stat: ukHealthStats.iron.prevalence },
                { name: 'Vitamin B12', risk: riskAssessment.vitaminB12, stat: ukHealthStats.vitaminB12.prevalence },
                { name: 'Calcium', risk: riskAssessment.calcium, stat: '20% of UK adults at risk' }
              ].map((item) => (
                <div key={item.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {getRiskIcon(item.risk)}
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${getRiskColor(item.risk)}`}>
                    {getRiskText(item.risk)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{item.risk}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        getRiskLevel(item.risk) === 'low' ? 'bg-green-500' :
                        getRiskLevel(item.risk) === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(item.risk, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{item.stat}</p>
                </div>
              ))}
            </div>

            {/* Comparison Tool */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-blue-900" />
                <h2 className="text-xl font-bold text-gray-900">How You Compare</h2>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'Vitamin D Deficiency', yourRisk: riskAssessment.vitaminD, avgRisk: 50 },
                  { name: 'Iron Deficiency', yourRisk: riskAssessment.iron, avgRisk: profile.gender === 'female' ? 25 : 10 },
                  { name: 'B12 Deficiency', yourRisk: riskAssessment.vitaminB12, avgRisk: profile.dietType === 'vegan' ? 80 : 6 }
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        You: {item.yourRisk}% vs Average: {item.avgRisk}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-200 h-3 rounded-full"
                          style={{ width: `${item.avgRisk}%` }}
                        />
                      </div>
                      <div 
                        className="absolute top-0 h-3 bg-blue-900 rounded-full"
                        style={{ width: `${Math.min(item.yourRisk, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-8">
            {healthConditions.map((condition) => (
              <div key={condition.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{condition.name}</h3>
                    <p className="text-gray-600 mb-4">{condition.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-900" />
                        <span>{condition.prevalence}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>{condition.nhsCost}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Your Risk</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {condition.id === 'iron-deficiency' ? riskAssessment.iron :
                       condition.id === 'vitamin-d-deficiency' ? riskAssessment.vitaminD :
                       condition.id === 'vitamin-b12-deficiency' ? riskAssessment.vitaminB12 :
                       riskAssessment.calcium}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Common Symptoms</h4>
                    <ul className="space-y-2">
                      {condition.symptoms.map((symptom) => (
                        <li key={symptom} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-900 rounded-full" />
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">NHS Actions</h4>
                    <div className="space-y-3">
                      <button className="flex items-center space-x-2 w-full p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                        <Calendar className="w-4 h-4 text-blue-900" />
                        <span className="text-blue-900 font-medium">Book GP Appointment</span>
                        <ExternalLink className="w-4 h-4 text-blue-900 ml-auto" />
                      </button>
                      <button className="flex items-center space-x-2 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Shield className="w-4 h-4 text-gray-700" />
                        <span className="text-gray-700">Request Blood Test</span>
                        <ExternalLink className="w-4 h-4 text-gray-700 ml-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* Immediate Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Immediate Actions (This Week)</h2>
              <div className="space-y-4">
                {recommendations
                  .filter(r => r.priority === 'immediate')
                  .map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={completedRecommendations.has(rec.id)}
                        onChange={() => toggleRecommendation(rec.id)}
                        className="mt-1 h-5 w-5 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium mb-2 ${completedRecommendations.has(rec.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {rec.title}
                        </h3>
                        <p className={`text-sm ${completedRecommendations.has(rec.id) ? 'text-gray-400' : 'text-gray-600'}`}>
                          {rec.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        rec.category === 'diet' ? 'bg-green-100 text-green-800' :
                        rec.category === 'lifestyle' ? 'bg-blue-100 text-blue-800' :
                        rec.category === 'supplements' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.category}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Short-term Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Short-term Actions (This Month)</h2>
              <div className="space-y-4">
                {recommendations
                  .filter(r => r.priority === 'short-term')
                  .map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={completedRecommendations.has(rec.id)}
                        onChange={() => toggleRecommendation(rec.id)}
                        className="mt-1 h-5 w-5 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium mb-2 ${completedRecommendations.has(rec.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {rec.title}
                        </h3>
                        <p className={`text-sm ${completedRecommendations.has(rec.id) ? 'text-gray-400' : 'text-gray-600'}`}>
                          {rec.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        rec.category === 'diet' ? 'bg-green-100 text-green-800' :
                        rec.category === 'lifestyle' ? 'bg-blue-100 text-blue-800' :
                        rec.category === 'supplements' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.category}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Long-term Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Long-term Actions (Next 3 Months)</h2>
              <div className="space-y-4">
                {recommendations
                  .filter(r => r.priority === 'long-term')
                  .map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={completedRecommendations.has(rec.id)}
                        onChange={() => toggleRecommendation(rec.id)}
                        className="mt-1 h-5 w-5 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium mb-2 ${completedRecommendations.has(rec.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {rec.title}
                        </h3>
                        <p className={`text-sm ${completedRecommendations.has(rec.id) ? 'text-gray-400' : 'text-gray-600'}`}>
                          {rec.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        rec.category === 'diet' ? 'bg-green-100 text-green-800' :
                        rec.category === 'lifestyle' ? 'bg-blue-100 text-blue-800' :
                        rec.category === 'supplements' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.category}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Cost Calculator */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Potential NHS Cost Savings</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">£300-800</div>
                <p className="text-gray-700 mb-4">
                  Average prevention savings per person through early intervention
                </p>
                <p className="text-sm text-gray-600">
                  Following these recommendations may help prevent costly treatments and improve your quality of life
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Medical Disclaimer</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                This assessment is for educational purposes only and does not replace professional medical advice, 
                diagnosis, or treatment. Always consult with your GP or qualified healthcare provider regarding 
                any health concerns or before making significant changes to your diet or lifestyle. 
                This tool uses NHS guidelines but is not affiliated with the NHS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};