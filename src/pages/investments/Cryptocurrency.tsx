
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chart from '@/components/Chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, ArrowUp, ArrowDown, RefreshCw, Coins, Newspaper } from 'lucide-react';
import { useCryptoData } from '@/services/financeAPI';
import { toast } from 'sonner';

const cryptoImages = {
  bitcoin: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=70&auto=format',
  ethereum: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=70&auto=format',
  binancecoin: 'https://images.unsplash.com/photo-1622790698141-94e30457a316?q=80&w=70&auto=format',
  solana: 'https://images.unsplash.com/photo-1627385797321-54fb58a8f2a5?q=80&w=70&auto=format',
  cardano: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=70&auto=format'
};

const Cryptocurrency = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('1M');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: cryptoData, isLoading } = useCryptoData(selectedCrypto);
  
  // Mock data for chart
  const mockChartData = [
    { date: '2023-01', value: 16000 },
    { date: '2023-02', value: 22000 },
    { date: '2023-03', value: 20000 },
    { date: '2023-04', value: 28000 },
    { date: '2023-05', value: 26000 },
    { date: '2023-06', value: 30000 },
    { date: '2023-07', value: 32000 },
    { date: '2023-08', value: 36000 },
    { date: '2023-09', value: 30000 },
    { date: '2023-10', value: 42000 },
    { date: '2023-11', value: 55000 },
    { date: '2023-12', value: 68000 },
  ];

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success(`${selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} data refreshed`);
    }, 1000);
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Check if CoinGecko API key is available
    const apiKey = 'CG-yNEgezQszcwTYFnPWAmKLNE8';
    if (apiKey) {
      toast.info('Using CoinGecko API for cryptocurrency data');
    }
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 py-8">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-gray-900 dark:text-white">Explore. Trade. </span>
              <span className="text-fintech-blue dark:text-fintech-blue-light">Invest</span>
            </h1>
            <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Discover the world of cryptocurrencies and make informed investment decisions with real-time market data.
              Track trends, analyze performance, and build your digital portfolio with confidence.
            </p>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-700 max-w-4xl mx-auto mb-10" />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading cryptocurrency data...</p>
            </div>
          ) : (
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Market Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="flex items-center">
                        <img 
                          src={cryptoImages[selectedCrypto] || 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=70&auto=format'} 
                          alt={cryptoData?.name} 
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                        {cryptoData?.name} Performance
                      </CardTitle>
                      <CardDescription>
                        Current Price: ${cryptoData?.price?.toLocaleString() || '0.00'}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={refreshData}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </button>
                      
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
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <Chart
                        type="area"
                        data={mockChartData}
                        height={300}
                        colors={['#8B5CF6']}
                        dataKeys={['value']}
                        xAxisDataKey="date"
                        showGrid={true}
                        showLegend={false}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-fintech-blue dark:text-fintech-blue-light" />
                      Top Cryptocurrencies
                    </CardTitle>
                    <CardDescription>
                      Select a cryptocurrency to view details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68932.45, change: 1.89 },
                        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3578.92, change: 0.92 },
                        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 604.15, change: -1.27 },
                        { id: 'solana', name: 'Solana', symbol: 'SOL', price: 172.36, change: 3.15 },
                        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.459, change: 4.56 },
                      ].map((crypto) => (
                        <div 
                          key={crypto.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                            selectedCrypto === crypto.id 
                              ? 'border-fintech-blue dark:border-fintech-blue-light bg-fintech-blue/5 dark:bg-fintech-blue-light/10 shadow-md' 
                              : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                          }`}
                          onClick={() => setSelectedCrypto(crypto.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={cryptoImages[crypto.id]} 
                                alt={crypto.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{crypto.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{crypto.symbol}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium">${crypto.price.toLocaleString()}</p>
                            <div className={`flex items-center justify-end text-sm ${
                              crypto.change >= 0 
                                ? 'text-green-500 dark:text-green-400' 
                                : 'text-red-500 dark:text-red-400'
                            }`}>
                              {crypto.change >= 0 ? (
                                <ArrowUp className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDown className="h-3 w-3 mr-1" />
                              )}
                              <span>{Math.abs(crypto.change)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Risk Level & Investment Simulator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                      Risk Assessment
                    </CardTitle>
                    <CardDescription>
                      Understand the risk level of different cryptocurrencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { id: 'bitcoin', name: 'Bitcoin', risk: 'Medium', volatility: 65, liquidity: 95, marketCap: 'Very High', image: cryptoImages.bitcoin },
                        { id: 'ethereum', name: 'Ethereum', risk: 'Medium', volatility: 70, liquidity: 90, marketCap: 'High', image: cryptoImages.ethereum },
                        { id: 'solana', name: 'Solana', risk: 'High', volatility: 85, liquidity: 75, marketCap: 'Medium', image: cryptoImages.solana },
                        { id: 'cardano', name: 'Cardano', risk: 'High', volatility: 80, liquidity: 70, marketCap: 'Medium', image: cryptoImages.cardano },
                      ].map((crypto) => (
                        <div key={crypto.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center">
                              <img 
                                src={crypto.image} 
                                alt={crypto.name}
                                className="w-6 h-6 rounded-full object-cover mr-2"
                              />
                              <h3 className="font-medium">{crypto.name}</h3>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              crypto.risk === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              crypto.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {crypto.risk} Risk
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Volatility</span>
                                <span>{crypto.volatility}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div 
                                  className="bg-fintech-blue dark:bg-fintech-blue-light h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${crypto.volatility}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Liquidity</span>
                                <span>{crypto.liquidity}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div 
                                  className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${crypto.liquidity}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                      Investment Simulator
                    </CardTitle>
                    <CardDescription>
                      Simulate potential returns on cryptocurrency investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Investment Amount ($)
                        </label>
                        <input
                          type="number"
                          defaultValue="1000"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-fintech-blue dark:focus:ring-fintech-blue-light focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Investment Period
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-fintech-blue dark:focus:ring-fintech-blue-light focus:border-transparent transition-all duration-200"
                          defaultValue="1"
                        >
                          <option value="0.25">3 Months</option>
                          <option value="0.5">6 Months</option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="5">5 Years</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expected Annual Growth (%)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                            Conservative (10%)
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                            Moderate (50%)
                          </button>
                          <button className="p-2 border border-transparent rounded-md bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light hover:bg-fintech-blue/20 dark:hover:bg-fintech-blue-light/20 transition-all duration-200">
                            Aggressive (100%)
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-6 shadow-inner">
                        <div className="text-center">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Potential Value</h3>
                          <p className="text-3xl font-bold bg-gradient-to-r from-fintech-blue to-purple-600 bg-clip-text text-transparent mt-2">
                            $2,000.00
                          </p>
                          <div className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center justify-center">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +$1,000.00 (100%)
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Note: This is a simulation only and not financial advice. Cryptocurrency investments are subject to market risks.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Latest Crypto News */}
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Newspaper className="h-5 w-5 mr-2 text-fintech-blue dark:text-fintech-blue-light" />
                    Latest Crypto News
                  </CardTitle>
                  <CardDescription>
                    Stay updated with the latest cryptocurrency news and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        title: "Bitcoin Surges Past $70,000 for the First Time", 
                        date: "2 days ago", 
                        source: "CoinDesk",
                        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=100&auto=format" 
                      },
                      { 
                        title: "Ethereum 2.0 Upgrade: What Investors Need to Know", 
                        date: "3 days ago", 
                        source: "CryptoNews",
                        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=100&auto=format" 
                      },
                      { 
                        title: "Regulatory Framework for Cryptocurrencies Proposed in Major Markets", 
                        date: "1 week ago", 
                        source: "Bloomberg",
                        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=100&auto=format" 
                      },
                      { 
                        title: "NFT Market Shows Signs of Recovery After Year-Long Slump", 
                        date: "1 week ago", 
                        source: "Forbes",
                        image: "https://images.unsplash.com/photo-1645853220901-be5135ac04b1?q=80&w=100&auto=format" 
                      },
                    ].map((news, idx) => (
                      <div key={idx} className="flex p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{news.title}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{news.source}</span>
                            <span className="mx-2">•</span>
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cryptocurrency;
