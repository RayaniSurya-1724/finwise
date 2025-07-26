
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chart from '@/components/Chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const RealEstate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  
  // Mock data for property trends chart
  const mockTrendData = [
    { year: '2013', residential: 100, commercial: 100, industrial: 100 },
    { year: '2014', residential: 108, commercial: 105, industrial: 103 },
    { year: '2015', residential: 115, commercial: 112, industrial: 105 },
    { year: '2016', residential: 122, commercial: 118, industrial: 110 },
    { year: '2017', residential: 130, commercial: 125, industrial: 116 },
    { year: '2018', residential: 138, commercial: 130, industrial: 120 },
    { year: '2019', residential: 144, commercial: 136, industrial: 124 },
    { year: '2020', residential: 148, commercial: 132, industrial: 126 },
    { year: '2021', residential: 158, commercial: 138, industrial: 130 },
    { year: '2022', residential: 172, commercial: 148, industrial: 136 },
    { year: '2023', residential: 186, commercial: 160, industrial: 144 },
  ];
  
  // Mock data for top cities
  const topCities = [
    { 
      city: 'Mumbai', 
      avgPrice: 18500, 
      priceChange: 8.2, 
      rentalYield: 3.1, 
      popularAreas: ['Bandra', 'Worli', 'Andheri'],
      description: 'India\'s financial capital with premium real estate options and strong commercial presence.'
    },
    { 
      city: 'Bangalore', 
      avgPrice: 7800, 
      priceChange: 12.5, 
      rentalYield: 3.5,
      popularAreas: ['Whitefield', 'Electronic City', 'Indiranagar'],
      description: 'Tech hub with consistent demand for residential properties near IT corridors.'
    },
    { 
      city: 'Pune', 
      avgPrice: 6500, 
      priceChange: 9.8, 
      rentalYield: 3.8,
      popularAreas: ['Hinjewadi', 'Kharadi', 'Viman Nagar'],
      description: 'Growing tech city with more affordable options compared to Mumbai and Bangalore.'
    },
    { 
      city: 'Delhi NCR', 
      avgPrice: 7900, 
      priceChange: 5.3, 
      rentalYield: 2.8,
      popularAreas: ['Gurgaon', 'Noida', 'South Delhi'],
      description: 'Capital region with diverse offerings from luxury to affordable housing options.'
    },
    { 
      city: 'Hyderabad', 
      avgPrice: 5800, 
      priceChange: 15.2, 
      rentalYield: 3.7,
      popularAreas: ['Gachibowli', 'HITEC City', 'Banjara Hills'],
      description: 'Rapidly growing market with significant infrastructure development and IT sector growth.'
    },
    { 
      city: 'Chennai', 
      avgPrice: 5200, 
      priceChange: 7.4, 
      rentalYield: 3.2,
      popularAreas: ['OMR', 'Anna Nagar', 'Velachery'],
      description: 'Stable market with steady growth and good opportunities in peripheral areas.'
    },
  ];
  
  // Mock REITs data
  const reitsData = [
    { 
      name: 'Embassy Office Parks REIT', 
      symbol: 'EMBASSY', 
      price: 345.75, 
      yield: 6.7, 
      portfolioSize: '42.4 million sq ft',
      locations: 'Bangalore, Mumbai, Pune, NCR',
    },
    { 
      name: 'Mindspace Business Parks REIT', 
      symbol: 'MINDSPACE', 
      price: 285.50, 
      yield: 7.2, 
      portfolioSize: '29.5 million sq ft',
      locations: 'Mumbai, Hyderabad, Pune, Chennai',
    },
    { 
      name: 'Brookfield India Real Estate Trust', 
      symbol: 'BIRET', 
      price: 310.25, 
      yield: 6.9, 
      portfolioSize: '18.7 million sq ft',
      locations: 'Mumbai, NCR, Kolkata',
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateMonthlyPayment = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    // Total number of payments
    const numberOfPayments = loanTerm * 12;
    // Monthly payment formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment.toFixed(2);
  };

  const calculateTotalPayment = () => {
    const monthlyPayment = parseFloat(calculateMonthlyPayment());
    const totalPayment = monthlyPayment * loanTerm * 12;
    return totalPayment.toFixed(2);
  };

  const calculateTotalInterest = () => {
    const totalPayment = parseFloat(calculateTotalPayment());
    const totalInterest = totalPayment - loanAmount;
    return totalInterest.toFixed(2);
  };

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Build. Own. </span>
              <span className="text-fintech-blue dark:text-fintech-blue-light">Prosper</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore real estate investment opportunities and leverage property as a long-term wealth creation asset.
            </p>
          </div>
          
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Property Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Real Estate Market Trends</CardTitle>
                <CardDescription>
                  10-year property price index trends across different segments (Base Year 2013 = 100)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Chart
                    type="line"
                    data={mockTrendData}
                    height={300}
                    colors={['#3B82F6', '#10B981', '#8B5CF6']}
                    dataKeys={['residential', 'commercial', 'industrial']}
                    xAxisDataKey="year"
                    showGrid={true}
                    showLegend={true}
                  />
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Residential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Commercial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Industrial</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                  Mortgage Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your monthly payments, total interest, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loan Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        min="100000"
                        step="100000"
                      />
                      <input
                        type="range"
                        min="100000"
                        max="10000000"
                        step="100000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        min="5"
                        max="15"
                        step="0.1"
                      />
                      <input
                        type="range"
                        min="5"
                        max="15"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loan Term (Years)
                      </label>
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        min="5"
                        max="30"
                      />
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Payment</h3>
                      <p className="text-3xl font-bold text-fintech-blue dark:text-fintech-blue-light">
                        ₹{parseInt(calculateMonthlyPayment()).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Loan Amount</span>
                          <span className="font-medium">₹{loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Total Interest</span>
                          <span className="font-medium text-amber-600 dark:text-amber-400">
                            ₹{parseInt(calculateTotalInterest()).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Total Payment</span>
                          <span className="font-medium">
                            ₹{parseInt(calculateTotalPayment()).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <h4 className="font-medium text-sm mb-2">Break-even Point</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          If property prices increase by 5% annually, your investment would break even in approximately {Math.ceil(100 / 5)} years.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Investment Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                  Top Investment Locations
                </CardTitle>
                <CardDescription>
                  Cities with high growth potential and attractive rental yields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topCities.map((city) => (
                    <div key={city.city} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <h3 className="font-bold text-lg">{city.city}</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {city.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Price (₹/sqft)</span>
                            <span className="font-medium">₹{city.avgPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Annual Appreciation</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{city.priceChange}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Rental Yield</span>
                            <span className="font-medium">{city.rentalYield}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Areas</h4>
                          <div className="flex flex-wrap gap-2">
                            {city.popularAreas.map((area) => (
                              <span key={area} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Real Estate Investment Trusts (REITs) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                  Real Estate Investment Trusts (REITs)
                </CardTitle>
                <CardDescription>
                  Invest in real estate without directly buying property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    REITs allow you to invest in real estate without the hassle of property management. They trade on stock exchanges and typically offer higher dividend yields compared to other equity investments.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="text-left py-3 px-4">REIT Name</th>
                        <th className="text-center py-3 px-4">Symbol</th>
                        <th className="text-center py-3 px-4">Price (₹)</th>
                        <th className="text-center py-3 px-4">Dividend Yield</th>
                        <th className="text-left py-3 px-4">Portfolio Size</th>
                        <th className="text-left py-3 px-4">Locations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reitsData.map((reit) => (
                        <tr key={reit.symbol} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{reit.name}</td>
                          <td className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">{reit.symbol}</td>
                          <td className="text-center py-3 px-4">{reit.price.toFixed(2)}</td>
                          <td className="text-center py-3 px-4 text-green-600 dark:text-green-400">{reit.yield}%</td>
                          <td className="py-3 px-4">{reit.portfolioSize}</td>
                          <td className="py-3 px-4">{reit.locations}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 bg-fintech-blue/10 dark:bg-fintech-blue-light/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Benefits of REITs</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Regular income through dividends</li>
                    <li>Lower investment threshold compared to direct property purchase</li>
                    <li>High liquidity as they're traded on stock exchanges</li>
                    <li>Professional property management</li>
                    <li>Diversification across multiple properties and locations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Real Estate News</CardTitle>
                <CardDescription>
                  Stay updated with the latest trends and developments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Housing Sales in Top 7 Cities Rise 20% in Q2 2023", date: "3 days ago", source: "Economic Times" },
                    { title: "Government Announces New Tax Benefits for Affordable Housing", date: "1 week ago", source: "LiveMint" },
                    { title: "Commercial Real Estate Seeing Strong Post-Pandemic Recovery", date: "2 weeks ago", source: "Business Standard" },
                    { title: "Interest Rates on Home Loans Expected to Stabilize in Coming Months", date: "3 weeks ago", source: "Financial Express" },
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
        </div>
      </div>
    </>
  );
};

export default RealEstate;
