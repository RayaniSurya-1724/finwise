import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { AlertTriangle, TrendingUp, TrendingDown, IndianRupee, RefreshCw, Filter } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { 
  fetchTopGainers, 
  fetchTopLosers, 
  fetchGoldETFs, 
  fetchIndexData,
  getMockIndianStocks,
  getMockGoldETFs,
  getMockIndices,
  INDIAN_INDICES,
  StockData,
  IndexData
} from '@/services/yahooFinanceAPI';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Market = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Market data states
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [topGainers, setTopGainers] = useState<StockData[]>([]);
  const [topLosers, setTopLosers] = useState<StockData[]>([]);
  const [goldETFs, setGoldETFs] = useState<StockData[]>([]);

  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // Fetch indices data
      const indicesPromises = INDIAN_INDICES.map(symbol => fetchIndexData(symbol));
      const indicesResults = await Promise.all(indicesPromises);
      const validIndices = indicesResults.filter(data => data !== null) as IndexData[];
      
      // If API fails, use mock data
      if (validIndices.length === 0) {
        setIndices(getMockIndices());
        setTopGainers(getMockIndianStocks().filter(stock => stock.changePercent > 0));
        setTopLosers(getMockIndianStocks().filter(stock => stock.changePercent < 0));
        setGoldETFs(getMockGoldETFs());
      } else {
        setIndices(validIndices);
        
        // Fetch other market data
        const [gainersData, losersData, goldData] = await Promise.all([
          fetchTopGainers(),
          fetchTopLosers(),
          fetchGoldETFs()
        ]);
        
        setTopGainers(gainersData.length > 0 ? gainersData : getMockIndianStocks().filter(stock => stock.changePercent > 0));
        setTopLosers(losersData.length > 0 ? losersData : getMockIndianStocks().filter(stock => stock.changePercent < 0));
        setGoldETFs(goldData.length > 0 ? goldData : getMockGoldETFs());
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Use mock data as fallback
      setIndices(getMockIndices());
      setTopGainers(getMockIndianStocks().filter(stock => stock.changePercent > 0));
      setTopLosers(getMockIndianStocks().filter(stock => stock.changePercent < 0));
      setGoldETFs(getMockGoldETFs());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchMarketData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `₹${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `₹${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e7) return `₹${(marketCap / 1e7).toFixed(2)}Cr`;
    return `₹${(marketCap / 1e5).toFixed(2)}L`;
  };

  const getFilteredData = () => {
    switch (selectedFilter) {
      case 'gainers':
        return topGainers;
      case 'losers':
        return topLosers;
      case 'gold':
        return goldETFs;
      default:
        return [...topGainers.slice(0, 5), ...topLosers.slice(0, 5), ...goldETFs];
    }
  };

  const getStockLogo = (symbol: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600'
    ];
    const colorIndex = symbol.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  const handleStockClick = (stock: StockData) => {
    navigate(`/stock-details/${stock.symbol}`, { state: { stock } });
  };

  const StockCard = ({ stock }: { stock: StockData }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover-lift">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{stock.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{stock.symbol}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900 dark:text-white">{formatPrice(stock.price)}</p>
          <div className={`flex items-center text-xs ${stock.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {stock.changePercent >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>
      {stock.marketCap && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Market Cap: {formatMarketCap(stock.marketCap)}
        </p>
      )}
    </div>
  );

  const IndexCard = ({ index }: { index: IndexData }) => (
    <div className="bg-gradient-to-r from-fintech-blue to-fintech-blue-light rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{index.name}</h3>
          <p className="text-2xl font-bold mt-2">{index.price.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right">
          <div className={`flex items-center ${index.changePercent >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {index.changePercent >= 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
            <span className="font-semibold">{index.changePercent.toFixed(2)}%</span>
          </div>
          <p className="text-sm mt-1">₹{index.change.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div 
            className={`max-w-7xl mx-auto mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Indian Market Trends
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Real-time financial data from Indian stock markets and investment opportunities.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
                </div>
                <button
                  onClick={fetchMarketData}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-fintech-blue text-white rounded-lg hover:bg-fintech-blue-light transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {isSignedIn ? (
              <div 
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-8">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 dark:text-orange-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">Live Market Data</h3>
                      <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                        This page displays real-time Indian financial market data. Data is refreshed automatically every 5 minutes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Indian Market Indices */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Indices</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {indices.map((index) => (
                      <IndexCard key={index.symbol} index={index} />
                    ))}
                  </div>
                </div>

                {/* Market Data Filters */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                    </div>
                    {[
                      { key: 'all', label: 'All Markets' },
                      { key: 'gainers', label: 'Top Gainers' },
                      { key: 'losers', label: 'Top Losers' },
                      { key: 'gold', label: 'Gold ETFs' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setSelectedFilter(filter.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedFilter === filter.key
                            ? 'bg-fintech-blue text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Market Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    getFilteredData().map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))
                  )}
                </div>

                {/* Market Summary */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">Top Gainers</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">{topGainers.length}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">Top Losers</p>
                        <p className="text-2xl font-bold text-red-900 dark:text-red-100">{topLosers.length}</p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Gold ETFs</p>
                        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{goldETFs.length}</p>
                      </div>
                      <IndianRupee className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 shadow-md">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Sign in to view market data
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please sign in or create an account to access real-time Indian market data and financial insights.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="/sign-in" 
                      className="px-4 py-2 border border-fintech-blue dark:border-fintech-blue-light text-fintech-blue dark:text-fintech-blue-light rounded-lg text-sm font-medium transition hover:bg-fintech-blue hover:text-white dark:hover:bg-fintech-blue-light dark:hover:text-fintech-dark hover-lift"
                    >
                      Sign In
                    </a>
                    <a 
                      href="/sign-up" 
                      className="px-4 py-2 bg-fintech-blue dark:bg-fintech-blue-light text-white dark:text-fintech-dark rounded-lg text-sm font-medium transition hover:bg-fintech-blue/90 dark:hover:bg-fintech-blue-light/90 hover-lift"
                    >
                      Create Account
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
