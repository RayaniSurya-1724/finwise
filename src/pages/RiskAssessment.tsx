
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import RiskAssessmentForm from '@/components/RiskAssessmentForm';

const RiskAssessment = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div 
            className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-1 bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="block w-2 h-2 rounded-full bg-fintech-blue dark:bg-fintech-blue-light"></span>
              <span>Step 1 of 3</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Risk Assessment
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Answer a few questions about your financial situation and investment preferences.
              Our AI will analyze your inputs to determine your optimal risk profile.
            </p>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <RiskAssessmentForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskAssessment;
