import React from 'react';
import { Heart, Shield, Brain, Activity, ChevronRight, Users, Award, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAssessment }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UK NutriHealth AI</h1>
                <p className="text-sm text-gray-600">Clinical-grade nutritional assessment</p>
              </div>
            </div>
            <button
              onClick={onStartAssessment}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Start Free Assessment
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Discover Your Nutritional Health Risks in 
              <span className="text-blue-200"> 5 Minutes</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Professional-grade AI assessment using NHS clinical guidelines to identify 
              vitamin and mineral deficiency risks before they become serious health issues.
            </p>
            
            {/* UK Health Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-200 mb-2">50%</div>
                <p className="text-blue-100">of UK adults are Vitamin D deficient</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-200 mb-2">25%</div>
                <p className="text-blue-100">of UK women have iron deficiency</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-200 mb-2">6%</div>
                <p className="text-blue-100">of adults are B12 deficient</p>
              </div>
            </div>

            <button
              onClick={onStartAssessment}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold text-lg inline-flex items-center space-x-2 shadow-lg"
            >
              <span>Start Your Free Assessment</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <p className="text-blue-200 text-sm mt-4">
              No registration required • Results in minutes • NHS-approved methodology
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Clinical-Grade Nutritional Assessment
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform uses NHS clinical guidelines and UK population data 
              to provide personalized health risk assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-900" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">AI Assessment</h4>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithms analyze your lifestyle, symptoms, and demographics to 
                calculate precise deficiency risk scores.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Personalized Plans</h4>
              <p className="text-gray-600 leading-relaxed">
                Receive tailored recommendations for diet, lifestyle, and supplements 
                based on your unique risk profile.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-900" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">NHS Integration</h4>
              <p className="text-gray-600 leading-relaxed">
                Direct links to book GP appointments and NHS-recommended blood tests 
                for professional follow-up care.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-700" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based</h4>
              <p className="text-gray-600 leading-relaxed">
                All recommendations backed by clinical research and UK national 
                health guidelines for maximum accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-900" />
                <span className="text-lg font-semibold text-gray-900">10,000+ Assessments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-900" />
                <span className="text-lg font-semibold text-gray-900">NHS Guidelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-900" />
                <span className="text-lg font-semibold text-gray-900">GDPR Compliant</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Early Detection Saves Lives and Money
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Identifying nutritional deficiencies early can prevent serious health conditions 
              and save the NHS thousands of pounds in treatment costs.
            </p>
            <div className="text-3xl font-bold text-blue-900 mb-2">£300-800</div>
            <p className="text-gray-600">Average NHS treatment cost per deficiency case</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">UK NutriHealth AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Professional nutritional health assessment platform using NHS clinical guidelines. 
              Not a substitute for professional medical advice.
            </p>
            <div className="text-sm text-gray-500 space-y-2">
              <p>This tool is for educational purposes only and does not replace professional medical consultation.</p>
              <p>Always consult with your GP or healthcare provider for medical advice.</p>
              <p className="font-medium">GDPR Compliant • Privacy Protected • NHS Guidelines</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};