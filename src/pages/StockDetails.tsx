
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, TrendingUp, TrendingDown, Star, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StockData } from '@/services/yahooFinanceAPI';

const StockDetails = () => {
  const { symbol } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockData | null>(location.state?.stock || null);
  const [isLoading, setIsLoading] = useState(!stock);

  useEffect(() => {
    if (!stock && symbol) {
      // In a real app, fetch stock details by symbol
      // For now, we'll use mock data
      setIsLoading(false);
    }
  }, [symbol, stock]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fintech-blue"></div>
        </div>
      </>
    );
  }

  if (!stock) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stock not found</h1>
            <Button onClick={() => navigate('/market')}>Back to Market</Button>
          </div>
        </div>
      </>
    );
  }

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

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/market')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Market
              </Button>
            </div>

            {/* Stock Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8 shadow-lg">
              <div className="flex items-center space-x-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getStockLogo(stock.symbol)} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-2xl">
                    {stock.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stock.name}
                  </h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{stock.symbol}</p>
                  
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(stock.price)}
                      </p>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full ${stock.changePercent >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      <span className="font-semibold">
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="bg-fintech-blue hover:bg-fintech-blue-light">
                  <Star className="h-4 w-4 mr-2" />
                  Add to Watchlist
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Market Cap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stock.marketCap ? formatMarketCap(stock.marketCap) : 'N/A'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Day's Change
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{stock.change.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    52W High
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(stock.price * 1.2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    52W Low
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(stock.price * 0.8)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Investment Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Investment Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Buy Stock
                  </Button>
                  <Button variant="outline">
                    Add to Portfolio
                  </Button>
                  <Button variant="outline">
                    Set Price Alert
                  </Button>
                  <Button variant="outline">
                    View Research Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {stock.name} is a leading company in the Indian market. This stock has shown {stock.changePercent >= 0 ? 'positive' : 'negative'} 
                  performance recently with a {Math.abs(stock.changePercent).toFixed(2)}% change.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Large-cap Indian stock</li>
                      <li>• Regular dividend payments</li>
                      <li>• Strong financial fundamentals</li>
                      <li>• Listed on NSE & BSE</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Investment Highlights</h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Market leadership position</li>
                      <li>• Consistent growth track record</li>
                      <li>• Strong management team</li>
                      <li>• ESG compliance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockDetails;
