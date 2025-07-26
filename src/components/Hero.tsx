
import { ArrowRight, ChevronDown, BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20 min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md mb-4 border border-gray-100 dark:border-gray-700 animate-pulse">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">AI-Powered Financial Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gradient">Invest Smarter</span>
              <br /> with AI-Powered
              <br /> Financial Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Personalized investment recommendations based on your salary, savings, and risk tolerance. 
              Powered by advanced AI and real-time market data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/risk-assessment" 
                className="inline-flex items-center justify-center px-6 py-3 bg-fintech-blue text-white font-medium rounded-lg shadow-lg hover:bg-fintech-blue/90 transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                to="/dashboard" 
                className="inline-flex items-center justify-center px-6 py-3 border border-fintech-blue text-fintech-blue dark:text-fintech-blue-light font-medium rounded-lg hover:bg-fintech-blue/10 transition-transform hover:-translate-y-1"
              >
                View Demo
              </Link>
            </div>
            
            <div className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"></div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-fintech-blue dark:text-fintech-blue-light">2,500+</span> investors trust our platform
                </div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-fintech-blue/30 to-fintech-blue-light/30 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-fintech-gold/70 rounded-full blur-xl"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Your Portfolio</h2>
                <select className="text-sm bg-transparent border-none text-gray-500 dark:text-gray-400 focus:ring-0">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last Year</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold">$24,582.25</div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-fintech-green">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +18.2%
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">vs last period</span>
                </div>
              </div>
              
              <div className="mt-8 h-40 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-fintech-blue-light/20 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fintech-blue-light/50 to-transparent"></div>
                
                {/* Simplified Chart */}
                <div className="relative h-full flex items-end justify-between px-4">
                  {[40, 65, 45, 70, 55, 80, 60, 90, 75, 85, 95, 70].map((height, index) => (
                    <div key={index} className="h-full flex flex-col justify-end items-center">
                      <div 
                        className="w-2 bg-gradient-to-t from-fintech-blue to-fintech-blue-light rounded-t-full transition-all duration-1000"
                        style={{ 
                          height: `${isVisible ? height : 0}%`,
                          transitionDelay: `${index * 50}ms`
                        }}
                      ></div>
                      <div className="text-[0.6rem] text-gray-400 mt-1">
                        {index % 3 === 0 ? ['Jan', 'Apr', 'Jul', 'Oct'][index / 3] : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: 'Stocks', value: '60%', icon: <BarChart2 className="h-4 w-4" />, color: 'bg-fintech-blue' },
                  { label: 'Crypto', value: '25%', icon: <DollarSign className="h-4 w-4" />, color: 'bg-fintech-gold' },
                  { label: 'Bonds', value: '15%', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-fintech-green' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                    <div className={`${item.color} text-white p-2 rounded-full mb-2`}>
                      {item.icon}
                    </div>
                    <div className="text-lg font-bold">{item.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-fintech-blue dark:text-fintech-blue-light" />
      </div>
    </div>
  );
};

export default Hero;
