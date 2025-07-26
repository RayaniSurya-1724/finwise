import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ChevronRight, DollarSign } from 'lucide-react';

type RiskLevel = 'low' | 'medium' | 'high' | null;

interface FormData {
  salary: string;
  savings: string;
  age: string;
  dependents: string;
  investmentGoal: string;
  riskTolerance: string;
}

const RiskAssessmentForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    salary: '',
    savings: '',
    age: '',
    dependents: '',
    investmentGoal: '',
    riskTolerance: '',
  });
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const calculateRiskLevel = () => {
    setIsSubmitting(true);
    
    // Simple mock algorithm for risk assessment
    const salary = parseInt(formData.salary) || 0;
    const savings = parseInt(formData.savings) || 0;
    const age = parseInt(formData.age) || 30;
    const dependents = parseInt(formData.dependents) || 0;
    const riskTolerance = formData.riskTolerance;
    
    let score = 0;
    
    // Calculate score based on salary (adjusted for Indian market)
    if (salary > 2000000) score += 3; // 20 lakhs+
    else if (salary > 800000) score += 2; // 8 lakhs+
    else score += 1;
    
    // Calculate score based on savings (adjusted for Indian market)
    if (savings > 1000000) score += 3; // 10 lakhs+
    else if (savings > 200000) score += 2; // 2 lakhs+
    else score += 1;
    
    // Calculate score based on age
    if (age < 35) score += 3;
    else if (age < 55) score += 2;
    else score += 1;
    
    // Calculate score based on dependents
    if (dependents === 0) score += 3;
    else if (dependents <= 2) score += 2;
    else score += 1;
    
    // Adjust based on stated risk tolerance
    if (riskTolerance === 'high') score += 2;
    else if (riskTolerance === 'medium') score += 1;
    else score -= 1;
    
    // Determine risk level
    let calculatedRiskLevel: RiskLevel;
    if (score >= 10) calculatedRiskLevel = 'high';
    else if (score >= 7) calculatedRiskLevel = 'medium';
    else calculatedRiskLevel = 'low';
    
    // Simulate API call
    setTimeout(() => {
      setRiskLevel(calculatedRiskLevel);
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRiskLevel();
  };
  
  const goToInvestments = () => {
    // Store risk assessment data for investment suggestions
    localStorage.setItem('riskAssessmentData', JSON.stringify({
      riskLevel,
      formData,
      timestamp: new Date().toISOString()
    }));
    navigate('/investments');
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                currentStep === step
                  ? 'bg-fintech-blue text-white'
                  : currentStep > step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-1 ${
                  currentStep > step
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Annual Salary (₹)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-lg">₹</span>
            </div>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="block w-full pl-8 pr-12 py-3 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-fintech-blue focus:border-fintech-blue dark:bg-gray-800 dark:text-white"
              placeholder="0"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">INR</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="savings" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Savings (₹)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-lg">₹</span>
            </div>
            <input
              type="number"
              name="savings"
              id="savings"
              value={formData.savings}
              onChange={handleInputChange}
              className="block w-full pl-8 pr-12 py-3 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-fintech-blue focus:border-fintech-blue dark:bg-gray-800 dark:text-white"
              placeholder="0"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">INR</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Including cash, bank deposits, and other liquid assets
          </p>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-fintech-blue focus:border-fintech-blue dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Dependents
          </label>
          <input
            type="number"
            name="dependents"
            id="dependents"
            value={formData.dependents}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-fintech-blue focus:border-fintech-blue dark:bg-gray-800 dark:text-white"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Include children, elderly parents or others who depend on your income
          </p>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <label htmlFor="investmentGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Investment Goal
          </label>
          <select
            name="investmentGoal"
            id="investmentGoal"
            value={formData.investmentGoal}
            onChange={handleInputChange}
            className="block w-full py-3 px-4 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-fintech-blue focus:border-fintech-blue dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="" disabled>Select your primary goal</option>
            <option value="retirement">Retirement Planning</option>
            <option value="education">Education Funding</option>
            <option value="house">House Purchase</option>
            <option value="wealth">Wealth Building</option>
            <option value="income">Additional Income</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Risk Tolerance
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div 
              className={`relative rounded-lg border ${
                formData.riskTolerance === 'low' 
                  ? 'border-fintech-blue bg-fintech-blue/5 dark:border-fintech-blue-light dark:bg-fintech-blue-light/10' 
                  : 'border-gray-200 dark:border-gray-700'
              } p-4 cursor-pointer hover:border-fintech-blue dark:hover:border-fintech-blue-light transition-colors`}
              onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'low' }))}
            >
              <div className="flex justify-between">
                <div>
                  <span className="block text-sm font-medium">Conservative</span>
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Low Risk</span>
                </div>
                {formData.riskTolerance === 'low' && (
                  <CheckCircle className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                )}
              </div>
            </div>
            
            <div 
              className={`relative rounded-lg border ${
                formData.riskTolerance === 'medium' 
                  ? 'border-fintech-blue bg-fintech-blue/5 dark:border-fintech-blue-light dark:bg-fintech-blue-light/10' 
                  : 'border-gray-200 dark:border-gray-700'
              } p-4 cursor-pointer hover:border-fintech-blue dark:hover:border-fintech-blue-light transition-colors`}
              onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'medium' }))}
            >
              <div className="flex justify-between">
                <div>
                  <span className="block text-sm font-medium">Balanced</span>
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Medium Risk</span>
                </div>
                {formData.riskTolerance === 'medium' && (
                  <CheckCircle className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                )}
              </div>
            </div>
            
            <div 
              className={`relative rounded-lg border ${
                formData.riskTolerance === 'high' 
                  ? 'border-fintech-blue bg-fintech-blue/5 dark:border-fintech-blue-light dark:bg-fintech-blue-light/10' 
                  : 'border-gray-200 dark:border-gray-700'
              } p-4 cursor-pointer hover:border-fintech-blue dark:hover:border-fintech-blue-light transition-colors`}
              onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'high' }))}
            >
              <div className="flex justify-between">
                <div>
                  <span className="block text-sm font-medium">Aggressive</span>
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">High Risk</span>
                </div>
                {formData.riskTolerance === 'high' && (
                  <CheckCircle className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    let riskColor = '';
    let riskIcon = null;
    let riskTitle = '';
    let riskDescription = '';
    
    switch (riskLevel) {
      case 'low':
        riskColor = 'bg-blue-500';
        riskIcon = <AlertTriangle className="h-8 w-8 text-blue-500" />;
        riskTitle = 'Conservative Investor';
        riskDescription = 'You prefer stability and security over high returns. We recommend a portfolio focused on bonds, fixed deposits, and blue-chip Indian stocks.';
        break;
      case 'medium':
        riskColor = 'bg-yellow-500';
        riskIcon = <AlertTriangle className="h-8 w-8 text-yellow-500" />;
        riskTitle = 'Balanced Investor';
        riskDescription = 'You seek a balance between growth and security. We recommend a diversified portfolio with a mix of Indian stocks, bonds, and some alternative investments.';
        break;
      case 'high':
        riskColor = 'bg-red-500';
        riskIcon = <AlertTriangle className="h-8 w-8 text-red-500" />;
        riskTitle = 'Aggressive Investor';
        riskDescription = 'You prioritize growth and are willing to accept volatility. We recommend a portfolio with a high allocation to growth Indian stocks and potentially some cryptocurrency exposure.';
        break;
    }

    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className={`${riskColor} p-5 rounded-full`}>
            {riskIcon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold">{riskTitle}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          {riskDescription}
        </p>
        
        <div className="pt-6">
          <button
            onClick={goToInvestments}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fintech-blue hover:bg-fintech-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fintech-blue-light shadow-lg"
          >
            View Investment Recommendations
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (riskLevel) return renderResult();
    
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (riskLevel) return null;
    
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-fintech-blue hover:bg-fintech-blue-light"
            disabled={
              (currentStep === 1 && (!formData.salary || !formData.savings)) ||
              (currentStep === 2 && (!formData.age || !formData.dependents))
            }
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-fintech-blue hover:bg-fintech-blue-light ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting || !formData.investmentGoal || !formData.riskTolerance}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit'
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        {renderButtons()}
      </form>
    </div>
  );
};

export default RiskAssessmentForm;
