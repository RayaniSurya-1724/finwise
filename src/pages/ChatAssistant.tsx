
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import FinancialChatbot from '@/components/FinancialChatbot';
import { Bot, BookOpen, Coins, Calculator, LineChart, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatAssistant = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI-Powered Advice",
      description: "Get personalized investment recommendations based on your risk profile and financial goals"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Financial Education",
      description: "Learn about different investment vehicles, strategies, and market terminology"
    },
    {
      icon: <Coins className="w-5 h-5" />,
      title: "Multi-Asset Coverage",
      description: "Information on stocks, cryptocurrencies, mutual funds, fixed deposits, and more"
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: "Risk Assessment",
      description: "Determine your optimal risk profile and get portfolio allocation recommendations"
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: "Market Insights",
      description: "Access to real-time market data, trends, and financial news"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "24/7 Assistance",
      description: "Ask questions anytime about investments, markets, or financial planning"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {user ? (
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="lg:w-9/12 w-full">
                  <FinancialChatbot />
                </div>
                
                <div className="lg:w-3/12 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate('/risk-assessment')}
                      >
                        <LineChart className="w-4 h-4 mr-2" />
                        Risk Assessment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate('/risk-assessment')}
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Risk Assessment
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate('/investments')}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Investments
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate('/market')}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Market Data
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-fintech-blue/10 dark:bg-fintech-blue/20 rounded-xl border border-fintech-blue/20 dark:border-fintech-blue/30 p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Bot className="w-4 h-4 mr-2 text-fintech-blue dark:text-fintech-blue-light" />
                      Try Asking
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        "What stocks should I invest in?"
                      </div>
                      <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        "How is Bitcoin performing today?"
                      </div>
                      <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        "Tell me about low-risk mutual funds"
                      </div>
                      <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        "What's the latest financial news?"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={`lg:hidden bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } transition-all duration-1000`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sign in to access the AI Financial Assistant
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get personalized investment advice, real-time market insights, and portfolio recommendations.
                </p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate('/sign-in')}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/sign-up')}
                    className="w-full"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
              
              <div className={`${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } transition-all duration-1000 delay-300`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet Your AI-Powered Financial Assistant
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="h-10 w-10 rounded-full bg-fintech-blue/10 dark:bg-fintech-blue/20 flex items-center justify-center mb-3 text-fintech-blue dark:text-fintech-blue-light">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-fintech-blue dark:bg-fintech-blue-light text-white dark:text-fintech-dark p-6 rounded-xl shadow-lg mb-12">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">Start Your Financial Journey Today</h3>
                      <p className="opacity-90">
                        Our AI-powered assistant combines financial expertise with advanced machine learning to provide you with the most relevant and actionable investment advice.
                      </p>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <Button 
                        onClick={() => navigate('/sign-up')}
                        className="px-8 py-6 bg-white text-fintech-blue dark:text-fintech-dark-light font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        Create Free Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
