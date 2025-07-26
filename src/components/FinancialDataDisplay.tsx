
import { useState } from 'react';
import { 
  useCryptoData, 
  useStockData, 
  useMutualFunds, 
  useFixedDeposits, 
  useFinancialNews 
} from '@/services/financeAPI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import MarketTrend from './MarketTrend';

interface FinancialDataDisplayProps {
  riskLevel?: 'Low' | 'Medium' | 'High';
}

const FinancialDataDisplay = ({ riskLevel }: FinancialDataDisplayProps) => {
  const [activeTab, setActiveTab] = useState("stocks");
  
  // Fetch data for popular assets
  const appleStock = useStockData('AAPL');
  const microsoftStock = useStockData('MSFT');
  const amazonStock = useStockData('AMZN');
  
  const bitcoin = useCryptoData('bitcoin');
  const ethereum = useCryptoData('ethereum');
  const solana = useCryptoData('solana');
  
  const mutualFunds = useMutualFunds(riskLevel);
  const fixedDeposits = useFixedDeposits();
  const financialNews = useFinancialNews(5);
  
  const isLoading = 
    appleStock.isLoading || 
    microsoftStock.isLoading || 
    amazonStock.isLoading ||
    bitcoin.isLoading || 
    ethereum.isLoading || 
    solana.isLoading ||
    mutualFunds.isLoading ||
    fixedDeposits.isLoading ||
    financialNews.isLoading;
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-fintech-blue dark:text-fintech-blue-light mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading financial data...</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="mutualfunds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="fixeddeposits">Fixed Deposits</TabsTrigger>
          <TabsTrigger value="news">Financial News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stocks" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appleStock.data && (
              <MarketTrend
                title={`${appleStock.data.name} (${appleStock.data.symbol})`}
                currentValue={appleStock.data.price}
                change={appleStock.data.change}
                changePercentage={appleStock.data.changePercent}
                timeRange="Today"
              />
            )}
            
            {microsoftStock.data && (
              <MarketTrend
                title={`${microsoftStock.data.name} (${microsoftStock.data.symbol})`}
                currentValue={microsoftStock.data.price}
                change={microsoftStock.data.change}
                changePercentage={microsoftStock.data.changePercent}
                timeRange="Today"
              />
            )}
            
            {amazonStock.data && (
              <MarketTrend
                title={`${amazonStock.data.name} (${amazonStock.data.symbol})`}
                currentValue={amazonStock.data.price}
                change={amazonStock.data.change}
                changePercentage={amazonStock.data.changePercent}
                timeRange="Today"
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="crypto" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bitcoin.data && (
              <MarketTrend
                title={`${bitcoin.data.name} (${bitcoin.data.symbol})`}
                currentValue={bitcoin.data.price}
                change={bitcoin.data.change}
                changePercentage={bitcoin.data.changePercent}
                timeRange="24h"
              />
            )}
            
            {ethereum.data && (
              <MarketTrend
                title={`${ethereum.data.name} (${ethereum.data.symbol})`}
                currentValue={ethereum.data.price}
                change={ethereum.data.change}
                changePercentage={ethereum.data.changePercent}
                timeRange="24h"
              />
            )}
            
            {solana.data && (
              <MarketTrend
                title={`${solana.data.name} (${solana.data.symbol})`}
                currentValue={solana.data.price}
                change={solana.data.change}
                changePercentage={solana.data.changePercent}
                timeRange="24h"
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="mutualfunds" className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fund Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NAV</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">1Y Return</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">3Y Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mutualFunds.data?.map((fund) => (
                  <tr key={fund.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{fund.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">₹{fund.nav.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fund.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        fund.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {fund.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fund.returnOneYear.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fund.returnThreeYears.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="fixeddeposits" className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">1 Year Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">3 Year Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">5 Year Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Min Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {fixedDeposits.data?.map((fd, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{fd.bank}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fd.rateOneYear.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fd.rateThreeYears.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{fd.rateFiveYears.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">₹{fd.minAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="news" className="w-full">
          <div className="space-y-4">
            {financialNews.data?.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.source} • {item.publishedDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.summary}</p>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-fintech-blue dark:text-fintech-blue-light hover:underline"
                  >
                    Read more →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDataDisplay;
