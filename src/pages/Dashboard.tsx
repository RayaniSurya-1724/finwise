
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chart from '@/components/Chart';
import { ArrowRight, Bell, Wallet, ChevronRight, ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const portfolioData = [
    { name: 'Jan', value: 30000 },
    { name: 'Feb', value: 28000 },
    { name: 'Mar', value: 32000 },
    { name: 'Apr', value: 34500 },
    { name: 'May', value: 33000 },
    { name: 'Jun', value: 36000 },
    { name: 'Jul', value: 40000 },
    { name: 'Aug', value: 39000 },
    { name: 'Sep', value: 42000 },
    { name: 'Oct', value: 45000 },
    { name: 'Nov', value: 48000 },
    { name: 'Dec', value: 50000 },
  ];
  
  const allocationData = [
    { name: 'Stocks', value: 60 },
    { name: 'Bonds', value: 15 },
    { name: 'Crypto', value: 10 },
    { name: 'ETFs', value: 10 },
    { name: 'Cash', value: 5 },
  ];
  
  const investmentsByRisk = [
    { name: 'Low Risk', value: 25 },
    { name: 'Medium Risk', value: 50 },
    { name: 'High Risk', value: 25 },
  ];
  
  const recentTransactions = [
    { id: 1, type: 'buy', name: 'Apple Inc.', ticker: 'AAPL', amount: 1200, date: '2023-12-01', status: 'completed' },
    { id: 2, type: 'sell', name: 'Tesla Inc.', ticker: 'TSLA', amount: 3800, date: '2023-11-28', status: 'completed' },
    { id: 3, type: 'buy', name: 'Bitcoin', ticker: 'BTC', amount: 5000, date: '2023-11-25', status: 'completed' },
    { id: 4, type: 'buy', name: 'Ethereum', ticker: 'ETH', amount: 3000, date: '2023-11-20', status: 'completed' },
  ];
  
  const upcomingActivities = [
    { id: 1, title: 'Portfolio Review', date: '2023-12-15', type: 'review' },
    { id: 2, title: 'Dividend Payment', date: '2023-12-10', type: 'dividend' },
    { id: 3, title: 'Rebalance Due', date: '2023-12-20', type: 'rebalance' },
  ];
  
  const notifications = [
    { id: 1, title: 'Apple Inc. (AAPL) up 3.2%', message: 'One of your watchlist stocks has increased significantly.', time: '2 hours ago', read: false },
    { id: 2, title: 'Tesla (TSLA) Earnings Report', message: 'Tesla will release its earnings report tomorrow.', time: '5 hours ago', read: false },
    { id: 3, title: 'Portfolio Digest', message: 'Your weekly portfolio performance summary is available.', time: '1 day ago', read: true },
  ];
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const Tab = ({ label, index }: { label: string; index: number }) => (
    <button
      className={`py-2 px-4 font-medium text-sm transition-colors relative ${
        tabIndex === index
          ? 'text-fintech-blue dark:text-fintech-blue-light'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      }`}
      onClick={() => setTabIndex(index)}
    >
      {label}
      {tabIndex === index && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-fintech-blue dark:bg-fintech-blue-light"></div>
      )}
    </button>
  );
  
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <div className="w-16 h-16 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
    </div>
  );
  
  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's an overview of your investments.</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button className="relative p-2 text-gray-500 hover:text-fintech-blue dark:text-gray-400 dark:hover:text-fintech-blue-light rounded-full bg-white dark:bg-gray-800 shadow">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-fintech-red rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="w-8 h-8 bg-fintech-blue dark:bg-fintech-blue-light rounded-full flex items-center justify-center text-white">
                  <span className="text-xs font-bold">JD</span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">John Doe</span>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            renderLoading()
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$50,245.32</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                      <ArrowUp className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 dark:text-green-400 text-sm font-medium flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.5%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Profit/Loss</p>
                      <h3 className="text-2xl font-bold text-green-500 dark:text-green-400">+$8,342.15</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                      <Wallet className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 dark:text-green-400 text-sm font-medium flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      19.8%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">all time</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                      <h3 className="text-2xl font-bold text-blue-500 dark:text-blue-400">Balanced</h3>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      <svg 
                        className="h-5 w-5" 
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <Link to="/risk-assessment" className="text-fintech-blue dark:text-fintech-blue-light text-sm font-medium flex items-center hover:underline">
                    Update Risk Profile
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              {/* Portfolio Performance Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Portfolio Performance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track your investment growth over time</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    <Tab label="1M" index={0} />
                    <Tab label="3M" index={1} />
                    <Tab label="6M" index={2} />
                    <Tab label="1Y" index={3} />
                    <Tab label="All" index={4} />
                  </div>
                </div>
                
                <div className="h-72">
                  <Chart
                    type="area"
                    data={portfolioData}
                    height={300}
                    colors={['#3B82F6']}
                    dataKeys={['value']}
                    xAxisDataKey="name"
                    showGrid={true}
                    showLegend={false}
                  />
                </div>
              </div>
              
              {/* Asset Allocation and Risk Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Asset Allocation</h2>
                  <div className="h-64">
                    <Chart
                      type="pie"
                      data={allocationData}
                      height={250}
                      colors={['#3B82F6', '#FBBF24', '#10B981', '#8B5CF6', '#6B7280']}
                      dataKeys={['value']}
                      xAxisDataKey="name"
                      showLegend={true}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Risk Distribution</h2>
                  <div className="h-64">
                    <Chart
                      type="bar"
                      data={investmentsByRisk}
                      height={250}
                      colors={['#3B82F6', '#FBBF24', '#EF4444']}
                      dataKeys={['value']}
                      xAxisDataKey="name"
                      showLegend={false}
                    />
                  </div>
                </div>
              </div>
              
              {/* Recent Transactions and Upcoming Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                    <Link to="#" className="text-fintech-blue dark:text-fintech-blue-light text-sm hover:underline">View All</Link>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.type === 'buy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                                {transaction.type === 'buy' ? (
                                  <>
                                    <ArrowDown className="h-3 w-3 mr-1" />
                                    Buy
                                  </>
                                ) : (
                                  <>
                                    <ArrowUp className="h-3 w-3 mr-1" />
                                    Sell
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.ticker}</div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">${transaction.amount.toLocaleString()}</div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                {transaction.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
                    <button className="text-fintech-blue dark:text-fintech-blue-light text-sm hover:underline">Mark All Read</button>
                  </div>
                  
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border ${
                          notification.read ? 'border-gray-100 dark:border-gray-700' : 'border-fintech-blue/20 dark:border-fintech-blue-light/20 bg-fintech-blue/5 dark:bg-fintech-blue-light/5'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className={`text-sm font-semibold ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-fintech-blue dark:bg-fintech-blue-light"></div>}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</span>
                          <button className="text-xs text-fintech-blue dark:text-fintech-blue-light hover:underline">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Activities</h2>
                    <div className="space-y-3">
                      {upcomingActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="p-2 rounded-lg bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light">
                            <svg 
                              className="h-5 w-5" 
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Investment Recommendations */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Investment Recommendations</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Personalized suggestions based on your risk profile</p>
                  </div>
                  <Link to="/investments" className="text-fintech-blue dark:text-fintech-blue-light text-sm font-medium flex items-center hover:underline">
                    View All Recommendations
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      type: 'Stock',
                      name: 'Apple Inc.',
                      ticker: 'AAPL',
                      price: 198.35,
                      change: 2.67,
                      recommendation: 'Buy',
                      reason: 'Strong fundamentals, new product cycle',
                    },
                    {
                      type: 'ETF',
                      name: 'Vanguard S&P 500',
                      ticker: 'VOO',
                      price: 425.12,
                      change: 1.45,
                      recommendation: 'Buy',
                      reason: 'Market exposure, low expense ratio',
                    },
                    {
                      type: 'Crypto',
                      name: 'Bitcoin',
                      ticker: 'BTC',
                      price: 43560.78,
                      change: 3.89,
                      recommendation: 'Hold',
                      reason: 'Volatility hedge, institutional adoption',
                    }
                  ].map((asset, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover-lift">
                      <div className="flex justify-between items-start mb-3">
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light">
                          {asset.type}
                        </div>
                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          asset.recommendation === 'Buy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {asset.recommendation}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{asset.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{asset.ticker}</p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">${asset.price.toLocaleString()}</div>
                          <div className={`text-xs font-medium flex items-center ${asset.change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {asset.change >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                            {asset.change}%
                          </div>
                        </div>
                        
                        <button className="text-xs text-fintech-blue dark:text-fintech-blue-light hover:underline">View Details</button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Why:</span> {asset.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
