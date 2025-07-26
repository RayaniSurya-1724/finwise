
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chart from '@/components/Chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, Calculator } from 'lucide-react';
import { useMutualFunds } from '@/services/financeAPI';

const MutualFunds = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<'Low' | 'Medium' | 'High' | null>(null);
  const { data: mutualFunds, isLoading } = useMutualFunds(selectedRisk || undefined);
  
  // Mock chart data for mutual fund trends
  const mockChartData = [
    { date: '2023-01', equity: 100, debt: 100, hybrid: 100 },
    { date: '2023-02', equity: 105, debt: 102, hybrid: 103 },
    { date: '2023-03', equity: 110, debt: 103, hybrid: 106 },
    { date: '2023-04', equity: 108, debt: 104, hybrid: 105 },
    { date: '2023-05', equity: 115, debt: 105, hybrid: 109 },
    { date: '2023-06', equity: 122, debt: 106, hybrid: 112 },
    { date: '2023-07', equity: 128, debt: 107, hybrid: 115 },
    { date: '2023-08', equity: 125, debt: 108, hybrid: 114 },
    { date: '2023-09', equity: 132, debt: 110, hybrid: 118 },
    { date: '2023-10', equity: 138, debt: 111, hybrid: 121 },
    { date: '2023-11', equity: 145, debt: 112, hybrid: 125 },
    { date: '2023-12', equity: 152, debt: 114, hybrid: 130 },
  ];
  
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [expectedReturns, setExpectedReturns] = useState(12);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateFutureValue = () => {
    // Compound interest formula: P * (1 + r/100)^t
    const futureValue = investmentAmount * Math.pow(1 + expectedReturns / 100, investmentPeriod);
    return futureValue.toFixed(2);
  };

  const filteredFunds = mutualFunds ? 
    (selectedCategory 
      ? mutualFunds.filter(fund => fund.category === selectedCategory)
      : mutualFunds
    ) : [];

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Diversify. Grow. </span>
              <span className="text-fintech-blue dark:text-fintech-blue-light">Compound</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore mutual funds that match your financial goals and risk tolerance with professional management.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading mutual fund data...</p>
            </div>
          ) : (
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Mutual Fund Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Mutual Fund Categories</CardTitle>
                  <CardDescription>
                    Filter funds by category and risk level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Fund Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Equity', 'Debt', 'Hybrid', 'Index', 'ELSS', 'Sectoral'].map((category) => (
                          <button
                            key={category}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedCategory === category
                                ? 'bg-fintech-blue text-white dark:bg-fintech-blue-light dark:text-gray-900'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Risk Level</h3>
                      <div className="flex flex-wrap gap-2">
                        {(['Low', 'Medium', 'High'] as const).map((risk) => (
                          <button
                            key={risk}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedRisk === risk
                                ? 'bg-fintech-blue text-white dark:bg-fintech-blue-light dark:text-gray-900'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setSelectedRisk(selectedRisk === risk ? null : risk)}
                          >
                            {risk}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Mutual Fund Trends</CardTitle>
                  <CardDescription>
                    Compare performance across different fund categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Chart
                      type="line"
                      data={mockChartData}
                      height={300}
                      colors={['#3B82F6', '#10B981', '#8B5CF6']}
                      dataKeys={['equity', 'debt', 'hybrid']}
                      xAxisDataKey="date"
                      showGrid={true}
                      showLegend={true}
                    />
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Equity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Debt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Hybrid</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Performing Funds */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Mutual Funds</CardTitle>
                  <CardDescription>
                    {filteredFunds.length} funds available{selectedCategory ? ` in ${selectedCategory}` : ''}{selectedRisk ? ` with ${selectedRisk} risk` : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="text-left py-3 px-4">Fund Name</th>
                          <th className="text-center py-3 px-4">Category</th>
                          <th className="text-center py-3 px-4">NAV (₹)</th>
                          <th className="text-center py-3 px-4">1Y Return</th>
                          <th className="text-center py-3 px-4">3Y Return</th>
                          <th className="text-center py-3 px-4">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFunds.map((fund) => (
                          <tr key={fund.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{fund.name}</td>
                            <td className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">{fund.category}</td>
                            <td className="text-center py-3 px-4">{fund.nav.toFixed(2)}</td>
                            <td className={`text-center py-3 px-4 ${
                              fund.returnOneYear >= 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              <div className="flex items-center justify-center">
                                {fund.returnOneYear >= 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                <span>{Math.abs(fund.returnOneYear).toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className={`text-center py-3 px-4 ${
                              fund.returnThreeYears >= 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              <div className="flex items-center justify-center">
                                {fund.returnThreeYears >= 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                <span>{Math.abs(fund.returnThreeYears).toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                fund.riskLevel === 'Low' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                  : fund.riskLevel === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {fund.riskLevel}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Mutual Fund Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                    Mutual Fund Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate potential returns on your mutual fund investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Investment Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          min="1000"
                        />
                        <input
                          type="range"
                          min="1000"
                          max="1000000"
                          step="1000"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Investment Period (Years)
                        </label>
                        <input
                          type="number"
                          value={investmentPeriod}
                          onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          min="1"
                          max="30"
                        />
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={investmentPeriod}
                          onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expected Annual Returns (%)
                        </label>
                        <input
                          type="number"
                          value={expectedReturns}
                          onChange={(e) => setExpectedReturns(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          min="1"
                          max="30"
                        />
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="0.5"
                          value={expectedReturns}
                          onChange={(e) => setExpectedReturns(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Expected Future Value</h3>
                        <p className="text-3xl font-bold text-fintech-blue dark:text-fintech-blue-light">
                          ₹{parseInt(calculateFutureValue()).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          After {investmentPeriod} {investmentPeriod === 1 ? 'year' : 'years'}
                        </p>
                      </div>
                      
                      <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Total Investment</span>
                          <span className="font-medium">₹{investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Expected Returns</span>
                          <span className="font-medium">{expectedReturns}% per year</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Wealth Gained</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            ₹{(parseInt(calculateFutureValue()) - investmentAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Latest News */}
              <Card>
                <CardHeader>
                  <CardTitle>Latest Mutual Fund News</CardTitle>
                  <CardDescription>
                    Stay updated with the latest news and trends in mutual funds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "SEBI Introduces New Regulations for Mutual Fund Industry", date: "2 days ago", source: "Economic Times" },
                      { title: "Top Equity Mutual Funds Deliver 18% Returns in the Last Financial Year", date: "4 days ago", source: "Moneycontrol" },
                      { title: "Index Funds vs Active Funds: What's Working in Current Market?", date: "1 week ago", source: "LiveMint" },
                      { title: "Debt Mutual Funds: How New Tax Rules Impact Your Returns", date: "2 weeks ago", source: "Financial Express" },
                    ].map((news, idx) => (
                      <div key={idx} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <h3 className="font-medium text-gray-900 dark:text-white">{news.title}</h3>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <span>{news.date}</span>
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

export default MutualFunds;
