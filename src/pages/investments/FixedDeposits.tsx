
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { useFixedDeposits } from '@/services/financeAPI';

const FixedDeposits = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [principal, setPrincipal] = useState(10000);
  const [years, setYears] = useState(1);
  const [selectedBank, setSelectedBank] = useState('SBI');
  const { data: fixedDeposits, isLoading } = useFixedDeposits();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateMaturityAmount = () => {
    if (!fixedDeposits) return 0;
    
    const selectedBankData = fixedDeposits.find(fd => fd.bank === selectedBank);
    if (!selectedBankData) return 0;
    
    let rateToUse = selectedBankData.rateOneYear;
    if (years >= 5) {
      rateToUse = selectedBankData.rateFiveYears;
    } else if (years >= 3) {
      rateToUse = selectedBankData.rateThreeYears;
    }
    
    // Formula: P(1 + r/100)^t
    const maturityAmount = principal * Math.pow(1 + rateToUse / 100, years);
    return maturityAmount.toFixed(2);
  };

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Secure. Grow. </span>
              <span className="text-fintech-blue dark:text-fintech-blue-light">Save</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore fixed deposit options from top banks and secure your financial future with guaranteed returns.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading fixed deposit data...</p>
            </div>
          ) : (
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* FD Calculator */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                    Fixed Deposit Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate returns on your fixed deposit based on current interest rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Principal Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={principal}
                          onChange={(e) => setPrincipal(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          min="1000"
                        />
                        <input
                          type="range"
                          min="1000"
                          max="1000000"
                          step="1000"
                          value={principal}
                          onChange={(e) => setPrincipal(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Time Period (Years)
                        </label>
                        <input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          min="1"
                          max="10"
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Select Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        >
                          {fixedDeposits?.map((fd) => (
                            <option key={fd.bank} value={fd.bank}>{fd.bank}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Maturity Amount</h3>
                        <p className="text-3xl font-bold text-fintech-blue dark:text-fintech-blue-light">
                          ₹{calculateMaturityAmount()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          In {years} {years === 1 ? 'year' : 'years'}
                        </p>
                      </div>
                      
                      <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Principal</span>
                          <span className="font-medium">₹{principal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</span>
                          <span className="font-medium">
                            {years >= 5 ? fixedDeposits?.find(fd => fd.bank === selectedBank)?.rateFiveYears : 
                             years >= 3 ? fixedDeposits?.find(fd => fd.bank === selectedBank)?.rateThreeYears :
                             fixedDeposits?.find(fd => fd.bank === selectedBank)?.rateOneYear}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Interest Earned</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            ₹{(Number(calculateMaturityAmount()) - principal).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Interest Rate Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                    Interest Rate Comparison
                  </CardTitle>
                  <CardDescription>
                    Compare FD rates across top banks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="text-left py-2 px-3">Bank</th>
                          <th className="text-center py-2 px-3">1 Year</th>
                          <th className="text-center py-2 px-3">3 Years</th>
                          <th className="text-center py-2 px-3">5 Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixedDeposits?.map((fd) => (
                          <tr key={fd.bank} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-3 font-medium">{fd.bank}</td>
                            <td className="text-center py-3 px-3">{fd.rateOneYear}%</td>
                            <td className="text-center py-3 px-3">{fd.rateThreeYears}%</td>
                            <td className="text-center py-3 px-3">{fd.rateFiveYears}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Latest Banking News */}
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light" />
                    Latest Banking News
                  </CardTitle>
                  <CardDescription>
                    Stay updated with the latest banking and fixed deposit news
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "RBI Keeps Repo Rate Unchanged at 6.5%", date: "2 days ago", source: "Economic Times" },
                      { title: "SBI Increases FD Rates for Senior Citizens", date: "1 week ago", source: "Business Standard" },
                      { title: "HDFC Bank Launches Special FD Scheme with Higher Interest Rates", date: "2 weeks ago", source: "LiveMint" },
                      { title: "FD vs Mutual Funds: What's Better in Current Market?", date: "3 weeks ago", source: "Financial Express" },
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

export default FixedDeposits;
