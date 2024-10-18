import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { UserProfile } from './types';

type AppState = 'landing' | 'assessment' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStartAssessment = () => {
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentState('results');
    
    // Save to localStorage for progress tracking
    try {
      const existingProfiles = JSON.parse(localStorage.getItem('nutrihealth-profiles') || '[]');
      existingProfiles.push(profile);
      localStorage.setItem('nutrihealth-profiles', JSON.stringify(existingProfiles));
    } catch (error) {
      console.warn('Could not save profile to localStorage:', error);
    }
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setUserProfile(null);
  };

  const handleRestart = () => {
    setCurrentState('landing');
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen">
      {currentState === 'landing' && (
        <LandingPage onStartAssessment={handleStartAssessment} />
      )}
      
      {currentState === 'assessment' && (
        <Assessment 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === 'results' && userProfile && (
        <Results 
          profile={userProfile}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;