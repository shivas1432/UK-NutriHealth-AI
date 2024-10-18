import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, User, Stethoscope, AlertTriangle } from 'lucide-react';
import { UserProfile, AssessmentStep } from '../types';
import { symptoms, medications, medicalConditions } from '../data/healthData';

interface AssessmentProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    symptoms: [],
    medications: [],
    medicalConditions: []
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as AssessmentStep);
    } else {
      // Complete assessment
      const completeProfile: UserProfile = {
        id: Date.now().toString(),
        createdAt: new Date(),
        age: profile.age!,
        gender: profile.gender!,
        region: profile.region!,
        ethnicity: profile.ethnicity!,
        workEnvironment: profile.workEnvironment!,
        dietType: profile.dietType!,
        exerciseFrequency: profile.exerciseFrequency!,
        sunlightExposure: profile.sunlightExposure!,
        symptoms: profile.symptoms || [],
        menstrualFlow: profile.menstrualFlow,
        pregnancyPlanning: profile.pregnancyPlanning,
        smokingStatus: profile.smokingStatus!,
        alcoholConsumption: profile.alcoholConsumption!,
        medications: profile.medications || [],
        medicalConditions: profile.medicalConditions || []
      };
      onComplete(completeProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as AssessmentStep);
    } else {
      onBack();
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return profile.age && profile.gender && profile.region && profile.ethnicity;
      case 2:
        return profile.workEnvironment && profile.dietType && profile.exerciseFrequency && profile.sunlightExposure;
      case 3:
        return true; // Symptoms are optional
      case 4:
        return profile.smokingStatus && profile.alcoholConsumption;
      default:
        return false;
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-900">Step {currentStep} of 4</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-12 h-12 text-blue-900 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">This helps us understand your baseline health risks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            min="18"
            max="100"
            value={profile.age || ''}
            onChange={(e) => updateProfile({ age: parseInt(e.target.value) || 0 })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={profile.gender || ''}
            onChange={(e) => updateProfile({ gender: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UK Region</label>
          <select
            value={profile.region || ''}
            onChange={(e) => updateProfile({ region: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select region</option>
            <option value="england">England</option>
            <option value="scotland">Scotland</option>
            <option value="wales">Wales</option>
            <option value="northern-ireland">Northern Ireland</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
          <select
            value={profile.ethnicity || ''}
            onChange={(e) => updateProfile({ ethnicity: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select ethnicity</option>
            <option value="white">White</option>
            <option value="asian">Asian</option>
            <option value="black">Black</option>
            <option value="mixed">Mixed</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-12 h-12 text-blue-900 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifestyle Factors</h2>
        <p className="text-gray-600">Your daily habits significantly impact nutritional needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Work Environment</label>
          <select
            value={profile.workEnvironment || ''}
            onChange={(e) => updateProfile({ workEnvironment: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select work environment</option>
            <option value="indoor">Primarily indoor</option>
            <option value="outdoor">Primarily outdoor</option>
            <option value="mixed">Mixed indoor/outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
          <select
            value={profile.dietType || ''}
            onChange={(e) => updateProfile({ dietType: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select diet type</option>
            <option value="omnivore">Omnivore (eat everything)</option>
            <option value="pescatarian">Pescatarian (fish but no meat)</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Frequency</label>
          <select
            value={profile.exerciseFrequency || ''}
            onChange={(e) => updateProfile({ exerciseFrequency: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select exercise frequency</option>
            <option value="none">No regular exercise</option>
            <option value="light">Light exercise (1-2 times/week)</option>
            <option value="moderate">Moderate exercise (3-4 times/week)</option>
            <option value="intense">Intense exercise (5+ times/week)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily Sunlight Exposure</label>
          <select
            value={profile.sunlightExposure || ''}
            onChange={(e) => updateProfile({ sunlightExposure: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select sunlight exposure</option>
            <option value="<30min">Less than 30 minutes</option>
            <option value="30-60min">30-60 minutes</option>
            <option value="60-120min">1-2 hours</option>
            <option value=">120min">More than 2 hours</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Stethoscope className="w-12 h-12 text-blue-900 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Symptom Checker</h2>
        <p className="text-gray-600">Select any symptoms you've experienced in the past 3 months</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 font-medium">
          Selected symptoms help us identify potential deficiency patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {symptoms.map((symptom) => (
          <label key={symptom.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.symptoms?.includes(symptom.id) || false}
              onChange={(e) => {
                const updatedSymptoms = e.target.checked 
                  ? [...(profile.symptoms || []), symptom.id]
                  : (profile.symptoms || []).filter(s => s !== symptom.id);
                updateProfile({ symptoms: updatedSymptoms });
              }}
              className="mt-1 h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div>
              <span className="text-gray-900 font-medium">{symptom.label}</span>
              <div className="text-sm text-gray-500 mt-1">
                May indicate: {symptom.conditions.join(', ')} deficiency
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <AlertTriangle className="w-12 h-12 text-blue-900 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Risk Factors</h2>
        <p className="text-gray-600">These factors help us personalize your assessment</p>
      </div>

      {/* Gender-specific questions */}
      {profile.gender === 'female' && (
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Women's Health Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menstrual Flow</label>
              <select
                value={profile.menstrualFlow || ''}
                onChange={(e) => updateProfile({ menstrualFlow: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select if applicable</option>
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={profile.pregnancyPlanning || false}
                  onChange={(e) => updateProfile({ pregnancyPlanning: e.target.checked })}
                  className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-900">Planning pregnancy</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
          <select
            value={profile.smokingStatus || ''}
            onChange={(e) => updateProfile({ smokingStatus: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select smoking status</option>
            <option value="never">Never smoked</option>
            <option value="former">Former smoker</option>
            <option value="current">Current smoker</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol Consumption</label>
          <select
            value={profile.alcoholConsumption || ''}
            onChange={(e) => updateProfile({ alcoholConsumption: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select alcohol consumption</option>
            <option value="none">None</option>
            <option value="light">Light (1-7 units/week)</option>
            <option value="moderate">Moderate (8-14 units/week)</option>
            <option value="heavy">Heavy (15+ units/week)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Current Medications</label>
        <div className="space-y-2">
          {medications.map((medication) => (
            <label key={medication} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.medications?.includes(medication) || false}
                onChange={(e) => {
                  const updatedMedications = e.target.checked 
                    ? [...(profile.medications || []), medication]
                    : (profile.medications || []).filter(m => m !== medication);
                  updateProfile({ medications: updatedMedications });
                }}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">{medication}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Medical Conditions</label>
        <div className="space-y-2">
          {medicalConditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.medicalConditions?.includes(condition) || false}
                onChange={(e) => {
                  const updatedConditions = e.target.checked 
                    ? [...(profile.medicalConditions || []), condition]
                    : (profile.medicalConditions || []).filter(c => c !== condition);
                  updateProfile({ medicalConditions: updatedConditions });
                }}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">{condition}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderProgressBar()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <span>{currentStep === 4 ? 'Complete Assessment' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};