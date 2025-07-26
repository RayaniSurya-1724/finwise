
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chart from '@/components/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, BarChart2, DollarSign, LineChart, TrendingUp, Newspaper } from 'lucide-react';
import { useStockData } from '@/services/financeAPI';
import { toast } from 'sonner';

// Mock data for stock market
const mockStocks = [
  { id: 1, name: 'Apple Inc.', ticker: 'AAPL', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=70&auto=format', price: 178.72, change: 2.35 },
  { id: 2, name: 'Microsoft Corp.', ticker: 'MSFT', logo: 'https://images.unsplash.com/photo-1629905679172-9190a1a762a9?q=80&w=70&auto=format', price: 417.88, change: 1.23 },
  { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=70&auto=format', price: 182.41, change: -0.52 },
  { id: 4, name: 'Alphabet Inc.', ticker: 'GOOGL', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=70&auto=format', price: 174.13, change: 0.89 },
  { id: 5, name: 'Tesla Inc.', ticker: 'TSLA', logo: 'https://images.unsplash.com/photo-1620891549027-942faa56aabc?q=80&w=70&auto=format', price: 175.22, change: -1.76 },
  { id: 6, name: 'Meta Platforms', ticker: 'META', logo: 'https://images.unsplash.com/photo-1535868463750-c78d9223de5b?q=80&w=70&auto=format', price: 485.58, change: 3.42 },
  { id: 7, name: 'NVIDIA Corp.', ticker: 'NVDA', logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=70&auto=format', price: 103.25, change: 5.78 },
  { id: 8, name: 'Berkshire Hathaway', ticker: 'BRK.A', logo: 'https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=70&auto=format', price: 621437.50, change: 0.45 },
];

// Mock news data
const mockNews = [
  { 
    id: 1, 
    title: 'Fed Rate Decision Impact on Markets', 
    source: 'Financial Times', 
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=100&auto=format'
  },
  { 
    id: 2, 
    title: 'Tech Stocks Rally on Strong Earnings Reports', 
    source: 'Bloomberg', 
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=100&auto=format'
  },
  { 
    id: 3, 
    title: 'Inflation Data Shows Signs of Cooling', 
    source: 'CNBC', 
    time: '7 hours ago',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=100&auto=format'
  },
  { 
    id: 4, 
    title: 'AI Sector Sees Major Investment Boost', 
    source: 'Wall Street Journal', 
    time: '1 day ago',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=100&auto=format'
  },
  { 
    id: 5, 
    title: 'Oil Prices Drop Amid Global Supply Concerns', 
    source: 'Reuters', 
    time: '1 day ago',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=100&auto=format'
  },
];

// Mock chart data
const mockChartData = [
  { date: '2023-01', value: 4000 },
  { date: '2023-02', value: 4200 },
  { date: '2023-03', value: 4500 },
  { date: '2023-04', value: 4300 },
  { date: '2023-05', value: 4800 },
  { date: '2023-06', value: 5100 },
  { date: '2023-07', value: 5400 },
  { date: '2023-08', value: 5200 },
  { date: '2023-09', value: 5600 },
  { date: '2023-10', value: 5900 },
  { date: '2023-11', value: 6200 },
  { date: '2023-12', value: 6500 },
];

const StockMarket = () => {
  const [selectedStock, setSelectedStock] = useState('S&P 500');
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1M');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Set animation complete after a delay
    const animTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    // Check if Alpha Vantage API key is available
    const apiKey = 'FSYQ82MBDC9RP3XT';
    if (apiKey) {
      toast.info('Using Alpha Vantage API for stock data');
    }
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
    };
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 py-8">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-gray-900 dark:text-white">Track. Analyze. </span>
              <span className="text-fintech-blue dark:text-fintech-blue-light">Invest</span>
            </h1>
            <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl transition-all duration-1000 delay-300 ${
              animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Stay up-to-date with real-time stock market data and make informed investment decisions.
              Our platform provides comprehensive analysis and insights for traders of all levels.
            </p>
          </div>
          
          <hr className="border-t border-gray-200 dark:border-gray-700 max-w-4xl mx-auto mb-10" />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading market data...</p>
            </div>
          ) : (
            <>
              {/* Market Overview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Overview</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedStock} Performance
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      {['1D', '1W', '1M', '3M', '1Y', 'All'].map((period) => (
                        <button
                          key={period}
                          className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                            timeframe === period
                              ? 'bg-fintech-blue text-white dark:bg-fintech-blue-light dark:text-gray-900 shadow-md'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          onClick={() => setTimeframe(period)}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-72">
                    <Chart
                      type="area"
                      data={mockChartData}
                      height={300}
                      colors={['#3B82F6']}
                      dataKeys={['value']}
                      xAxisDataKey="date"
                      showGrid={true}
                      showLegend={false}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Market Indices</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'S&P 500', value: '5,248.48', change: 1.18, image: 'https://images.unsplash.com/photo-1642543348745-432a520b2a42?q=80&w=50&auto=format' },
                      { name: 'Dow Jones', value: '39,143.29', change: 0.87, image: 'https://images.unsplash.com/photo-1586021280718-53fbcce056c5?q=80&w=50&auto=format' },
                      { name: 'NASDAQ', value: '16,277.46', change: 1.59, image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=50&auto=format' },
                      { name: 'Russell 2000', value: '2,027.84', change: -0.23, image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=50&auto=format' },
                      { name: 'VIX', value: '14.58', change: -3.51, image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=50&auto=format' }
                    ].map((index) => (
                      <div 
                        key={index.name}
                        className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-all duration-200 transform hover:scale-102"
                        onClick={() => setSelectedStock(index.name)}
                      >
                        <div className="flex items-center">
                          <img 
                            src={index.image} 
                            alt={index.name}
                            className="w-8 h-8 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{index.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{index.value}</p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center ${
                          index.change >= 0 
                            ? 'text-green-500 dark:text-green-400' 
                            : 'text-red-500 dark:text-red-400'
                        }`}>
                          {index.change >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">{Math.abs(index.change)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Latest News Section with Marquee */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
                <div className="flex items-center mb-6">
                  <Newspaper className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light mr-2" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Market News 📰</h2>
                </div>
                
                <div className="overflow-hidden mb-6">
                  <div className="flex gap-4 animate-marquee whitespace-nowrap">
                    {[...mockNews, ...mockNews].map((news, index) => (
                      <div 
                        key={`${news.id}-${index}`}
                        className="flex-shrink-0 w-72 p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-sm"
                      >
                        <div className="flex">
                          <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-16 h-16 object-cover rounded-md mr-3"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{news.title}</h3>
                            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="font-medium text-fintech-blue dark:text-fintech-blue-light">{news.source}</span>
                              <span className="mx-2">•</span>
                              <span>{news.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockNews.map((news) => (
                    <div 
                      key={news.id}
                      className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{news.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Source: {news.source}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{news.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Stocks Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Stocks</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockStocks.map((stock) => (
                    <div 
                      key={stock.id}
                      className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={stock.logo} alt={stock.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{stock.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stock.ticker}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <p className="font-bold text-gray-900 dark:text-white">${stock.price.toLocaleString()}</p>
                        
                        <div className={`flex items-center ${
                          stock.change >= 0 
                            ? 'text-green-500 dark:text-green-400' 
                            : 'text-red-500 dark:text-red-400'
                        }`}>
                          {stock.change >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">{Math.abs(stock.change)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* YouTube Videos Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Financial Education</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/Xn7KWR9EOGQ" 
                      title="Introduction to Stock Market" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/gtjX0YNkFYM" 
                      title="Stock Investment Strategies" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
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

export default StockMarket;
