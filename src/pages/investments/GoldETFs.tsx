import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, DollarSign, LineChart, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';

const GoldETFs = () => {
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [duration, setDuration] = useState<number>(5);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);

  const calculateFutureValue = () => {
    return investmentAmount * Math.pow((1 + expectedReturn / 100), duration);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(Number(e.target.value));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  const handleReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedReturn(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gold ETFs</h1>
          <Button variant="outline" onClick={() => navigate('/investments')}>
            Back to Investments
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Calculator</span>
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Trends</span>
                </TabsTrigger>
                <TabsTrigger value="invest" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Invest</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Gold ETFs Overview</CardTitle>
                    <CardDescription>
                      Understanding Gold Exchange Traded Funds
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Gold ETFs (Exchange Traded Funds) are investment funds that track the price of gold and are traded on stock exchanges. They offer investors a way to gain exposure to gold prices without physically owning gold.
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Key Benefits</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>No need for physical storage or security concerns</li>
                      <li>High liquidity - can be bought and sold during market hours</li>
                      <li>Lower expense ratios compared to gold mutual funds</li>
                      <li>Transparent pricing that closely tracks gold prices</li>
                      <li>Smaller investment amounts possible (compared to physical gold)</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold mt-4">Popular Gold ETFs in India</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Nippon India ETF Gold BeES</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">India's first and largest gold ETF with high liquidity</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">SBI Gold ETF</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Backed by SBI, one of India's largest banks</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">HDFC Gold ETF</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Known for its low tracking error</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Axis Gold ETF</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Competitive expense ratio and good liquidity</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analysis</CardTitle>
                    <CardDescription>
                      Historical performance of Gold ETFs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <LineChart className="h-16 w-16 text-gray-400" />
                      <p className="ml-4 text-gray-500 dark:text-gray-400">Performance chart will be displayed here</p>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">1 Year Return</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">+12.4%</p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">3 Year Return</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">+28.7%</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">5 Year Return</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+45.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle>Gold ETF Investment Calculator</CardTitle>
                    <CardDescription>
                      Calculate potential returns on your Gold ETF investment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Investment Amount (₹)</label>
                        <input
                          type="number"
                          value={investmentAmount}
                          onChange={handleAmountChange}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Investment Duration (Years)</label>
                        <input
                          type="number"
                          value={duration}
                          onChange={handleDurationChange}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expected Annual Return (%)</label>
                        <input
                          type="number"
                          value={expectedReturn}
                          onChange={handleReturnChange}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Initial Investment</p>
                          <p className="text-2xl font-bold">₹{investmentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Future Value</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ₹{calculateFutureValue().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Growth</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {(calculateFutureValue() - investmentAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })} (
                            {(((calculateFutureValue() - investmentAmount) / investmentAmount) * 100).toFixed(2)}%)
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Annual Return Rate</p>
                          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{expectedReturn}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends">
                <Card>
                  <CardHeader>
                    <CardTitle>Gold Market Trends</CardTitle>
                    <CardDescription>
                      Current trends and factors affecting gold prices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Global Economic Factors</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Inflation concerns driving safe-haven demand</li>
                          <li>Central bank policies and interest rates</li>
                          <li>Currency fluctuations, especially USD strength</li>
                          <li>Geopolitical tensions increasing uncertainty</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Supply and Demand</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Mining production constraints</li>
                          <li>Central bank gold purchases increasing</li>
                          <li>Jewelry demand in India and China</li>
                          <li>Industrial applications in technology</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6">Recent Price Movements</h3>
                    <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <LineChart className="h-12 w-12 text-gray-400" />
                      <p className="ml-4 text-gray-500 dark:text-gray-400">Price trend chart will be displayed here</p>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6">Expert Outlook</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm">
                        "Gold continues to be an important portfolio diversifier and inflation hedge. With ongoing economic uncertainties and geopolitical tensions, gold ETFs provide investors with a convenient way to gain exposure to this precious metal without the complexities of physical ownership."
                      </p>
                      <p className="text-sm font-medium mt-2">- Financial Analyst, Investment Research Firm</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invest">
                <Card>
                  <CardHeader>
                    <CardTitle>Invest in Gold ETFs</CardTitle>
                    <CardDescription>
                      Start investing in Gold ETFs today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold text-amber-800 dark:text-amber-300">Why invest now?</h3>
                        <p className="text-sm mt-2">
                          Gold has historically performed well during periods of economic uncertainty and inflation. Adding gold ETFs to your portfolio can provide diversification and potential protection against market volatility.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-50 dark:bg-gray-800">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">One-time Investment</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm">Invest a lump sum amount in gold ETFs</p>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                placeholder="Enter amount"
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                              />
                              <Button>Invest Now</Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50 dark:bg-gray-800">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Systematic Investment Plan (SIP)</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm">Invest regularly through monthly SIPs</p>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                placeholder="Monthly amount"
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                              />
                              <Button>Start SIP</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">How to invest in Gold ETFs</h3>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          <li>Open a demat and trading account if you don't have one</li>
                          <li>Research and select a Gold ETF based on factors like expense ratio, tracking error, and liquidity</li>
                          <li>Place a buy order during market hours through your trading platform</li>
                          <li>Monitor your investment and rebalance your portfolio as needed</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Connect with a Financial Advisor</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Gold ETF Insights</CardTitle>
                <CardDescription>
                  Key information for investors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Current Gold Price (10g)</span>
                  <span className="font-semibold">₹62,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">1-Day Change</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+0.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">1-Month Change</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">1-Year Change</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+12.4%</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Top Gold ETFs by AUM</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nippon India ETF Gold BeES</span>
                      <span className="text-sm font-medium">₹6,245 Cr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SBI Gold ETF</span>
                      <span className="text-sm font-medium">₹1,890 Cr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HDFC Gold ETF</span>
                      <span className="text-sm font-medium">₹1,650 Cr</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Axis Gold ETF</span>
                      <span className="text-sm font-medium">₹980 Cr</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Expense Ratio Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nippon India ETF Gold BeES</span>
                      <span className="text-sm font-medium">0.79%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SBI Gold ETF</span>
                      <span className="text-sm font-medium">0.82%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">HDFC Gold ETF</span>
                      <span className="text-sm font-medium">0.77%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Axis Gold ETF</span>
                      <span className="text-sm font-medium">0.81%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Gold ETF Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldETFs;
