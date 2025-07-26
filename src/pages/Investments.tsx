
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import InvestmentSuggestion from '@/components/InvestmentSuggestion';
import { 
  generateInvestmentSuggestions, 
  InvestmentSuggestion as InvestmentSuggestionType,
  RiskAssessmentData 
} from '@/services/investmentSuggestions';
import { 
  TrendingUp, 
  DollarSign, 
  Building, 
  Coins, 
  PiggyBank, 
  Home,
  Smartphone,
  BarChart3,
  AlertCircle,
  User,
  Target,
  Calendar,
  Users
} from 'lucide-react';

const Investments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<InvestmentSuggestionType[]>([]);
  const [riskData, setRiskData] = useState<RiskAssessmentData | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Load risk assessment data from localStorage
    const storedRiskData = localStorage.getItem('riskAssessmentData');
    if (storedRiskData) {
      const parsedData = JSON.parse(storedRiskData);
      setRiskData(parsedData);
      
      // Generate investment suggestions based on risk assessment
      generateInvestmentSuggestions(parsedData).then((suggestions) => {
        setSuggestions(suggestions);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const investmentOptions = [
    {
      title: 'Stock Market',
      description: 'Invest in Indian stocks and equities for long-term growth',
      icon: <TrendingUp className="h-8 w-8" />,
      path: '/stock-market',
      color: 'from-blue-500 to-blue-600',
      riskLevel: 'Medium to High'
    },
    {
      title: 'Gold ETFs',
      description: 'Hedge against inflation with gold investments',
      icon: <Coins className="h-8 w-8" />,
      path: '/gold-etfs',
      color: 'from-yellow-500 to-yellow-600',
      riskLevel: 'Low to Medium'
    },
    {
      title: 'Fixed Deposits',
      description: 'Secure your money with guaranteed returns',
      icon: <PiggyBank className="h-8 w-8" />,
      path: '/fixed-deposits',
      color: 'from-green-500 to-green-600',
      riskLevel: 'Low'
    },
    {
      title: 'Real Estate',
      description: 'Property investments and REITs',
      icon: <Home className="h-8 w-8" />,
      path: '/real-estate',
      color: 'from-purple-500 to-purple-600',
      riskLevel: 'Medium'
    },
    {
      title: 'Cryptocurrency',
      description: 'Digital assets for the future',
      icon: <Smartphone className="h-8 w-8" />,
      path: '/cryptocurrency',
      color: 'from-orange-500 to-orange-600',
      riskLevel: 'High'
    },
    {
      title: 'Mutual Funds',
      description: 'Professionally managed investment portfolios',
      icon: <BarChart3 className="h-8 w-8" />,
      path: '/mutual-funds',
      color: 'from-indigo-500 to-indigo-600',
      riskLevel: 'Low to High'
    }
  ];

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Crore`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div 
            className={`max-w-7xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Investment Opportunities
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover personalized investment options based on your risk profile and financial goals.
                Start building your wealth with smart investment strategies.
              </p>
            </div>

            {/* Risk Assessment Summary */}
            {riskData && (
              <div 
                className={`mb-12 transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <User className="h-6 w-6 mr-2 text-fintech-blue dark:text-fintech-blue-light" />
                    Your Investment Profile
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Annual Salary</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(riskData.formData.salary)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <PiggyBank className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Savings</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(riskData.formData.savings)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Investment Goal</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {riskData.formData.investmentGoal.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskLevelColor(riskData.riskLevel)}`}>
                          {riskData.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Personalized Investment Suggestions */}
            {suggestions.length > 0 && (
              <div 
                className={`mb-12 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Personalized Investment Recommendations
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Based on your risk assessment, here are investment options tailored for you
                  </p>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {suggestions.map((suggestion, index) => (
                      <InvestmentSuggestion
                        key={index}
                        title={suggestion.title}
                        type={suggestion.category}
                        allocation={suggestion.allocation}
                        risk={suggestion.riskLevel === 'low' ? 'Low' : suggestion.riskLevel === 'medium' ? 'Medium' : 'High'}
                        returnRange={suggestion.expectedReturn}
                        description={suggestion.description}
                        examples={suggestion.stocks.map(stock => ({
                          name: stock.name,
                          ticker: stock.symbol,
                          change: stock.changePercent,
                          price: stock.price
                        }))}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No Risk Assessment Data */}
            {!riskData && (
              <div 
                className={`mb-12 transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    Complete Your Risk Assessment
                  </h3>
                  <p className="text-orange-700 dark:text-orange-400 mb-4">
                    To get personalized investment recommendations, please complete your risk assessment first.
                  </p>
                  <Link 
                    to="/risk-assessment"
                    className="inline-flex items-center px-6 py-3 bg-fintech-blue text-white rounded-lg hover:bg-fintech-blue-light transition-colors"
                  >
                    Take Risk Assessment
                  </Link>
                </div>
              </div>
            )}

            {/* Investment Categories */}
            <div 
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Explore Investment Categories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {investmentOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.path}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                    
                    <div className="relative p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                          {option.icon}
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                          {option.riskLevel}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                      <p className="text-white/90 text-sm">{option.description}</p>
                      
                      <div className="mt-4 flex items-center text-sm font-medium">
                        Learn More
                        <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Investments;
