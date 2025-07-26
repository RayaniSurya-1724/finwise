
import { fetchMultipleStocks, fetchGoldETFs, INDIAN_STOCKS, getMockIndianStocks, getMockGoldETFs, StockData } from './yahooFinanceAPI';

export interface InvestmentSuggestion {
  category: string;
  title: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: string;
  stocks: StockData[];
  allocation: number;
}

export interface RiskAssessmentData {
  riskLevel: 'low' | 'medium' | 'high';
  formData: {
    salary: string;
    savings: string;
    age: string;
    dependents: string;
    investmentGoal: string;
    riskTolerance: string;
  };
}

export const generateInvestmentSuggestions = async (riskData: RiskAssessmentData): Promise<InvestmentSuggestion[]> => {
  const { riskLevel } = riskData;
  const suggestions: InvestmentSuggestion[] = [];

  try {
    let stockSuggestions: StockData[] = [];
    let goldETFs: StockData[] = [];

    // Fetch real data or use mock data
    try {
      goldETFs = await fetchGoldETFs();
      if (goldETFs.length === 0) {
        goldETFs = getMockGoldETFs();
      }
    } catch (error) {
      goldETFs = getMockGoldETFs();
    }

    switch (riskLevel) {
      case 'low':
        // Conservative portfolio - focus on stable large cap stocks and bonds
        try {
          stockSuggestions = await fetchMultipleStocks(INDIAN_STOCKS.large_cap.slice(0, 5));
          if (stockSuggestions.length === 0) {
            stockSuggestions = getMockIndianStocks().slice(0, 5);
          }
        } catch (error) {
          stockSuggestions = getMockIndianStocks().slice(0, 5);
        }

        suggestions.push({
          category: 'Blue Chip Stocks',
          title: 'Large Cap Indian Stocks',
          description: 'Invest in established companies with strong fundamentals and stable dividend history.',
          riskLevel: 'low',
          expectedReturn: '8-12% annually',
          stocks: stockSuggestions,
          allocation: 40
        });

        suggestions.push({
          category: 'Gold ETFs',
          title: 'Gold Exchange Traded Funds',
          description: 'Hedge against inflation with gold investments through ETFs.',
          riskLevel: 'low',
          expectedReturn: '6-10% annually',
          stocks: goldETFs,
          allocation: 30
        });

        suggestions.push({
          category: 'Fixed Deposits',
          title: 'Bank Fixed Deposits',
          description: 'Guaranteed returns with capital protection.',
          riskLevel: 'low',
          expectedReturn: '5-7% annually',
          stocks: [
            { symbol: 'FD', name: 'SBI Fixed Deposit', price: 100000, change: 0, changePercent: 6.5, currency: 'INR' },
            { symbol: 'FD', name: 'HDFC Fixed Deposit', price: 100000, change: 0, changePercent: 6.75, currency: 'INR' }
          ],
          allocation: 30
        });
        break;

      case 'medium':
        // Balanced portfolio - mix of large cap, mid cap, and some alternatives
        try {
          const largeCap = await fetchMultipleStocks(INDIAN_STOCKS.large_cap.slice(0, 3));
          const midCap = await fetchMultipleStocks(INDIAN_STOCKS.mid_cap.slice(0, 3));
          stockSuggestions = [...largeCap, ...midCap];
          
          if (stockSuggestions.length === 0) {
            stockSuggestions = getMockIndianStocks().slice(0, 6);
          }
        } catch (error) {
          stockSuggestions = getMockIndianStocks().slice(0, 6);
        }

        suggestions.push({
          category: 'Diversified Equity',
          title: 'Large & Mid Cap Stocks',
          description: 'Balanced exposure to established and growing companies.',
          riskLevel: 'medium',
          expectedReturn: '10-15% annually',
          stocks: stockSuggestions,
          allocation: 50
        });

        suggestions.push({
          category: 'Gold ETFs',
          title: 'Gold Exchange Traded Funds',
          description: 'Portfolio diversification with precious metal exposure.',
          riskLevel: 'low',
          expectedReturn: '6-10% annually',
          stocks: goldETFs,
          allocation: 20
        });

        suggestions.push({
          category: 'Mutual Funds',
          title: 'Equity Mutual Funds',
          description: 'Professional fund management with diversified portfolio.',
          riskLevel: 'medium',
          expectedReturn: '12-16% annually',
          stocks: [
            { symbol: 'MF', name: 'SBI Bluechip Fund', price: 156.78, change: 2.34, changePercent: 1.52, currency: 'INR' },
            { symbol: 'MF', name: 'HDFC Top 100 Fund', price: 234.56, change: -1.23, changePercent: -0.52, currency: 'INR' }
          ],
          allocation: 30
        });
        break;

      case 'high':
        // Aggressive portfolio - focus on growth stocks, small/mid cap
        try {
          const largeCap = await fetchMultipleStocks(INDIAN_STOCKS.large_cap.slice(0, 2));
          const midCap = await fetchMultipleStocks(INDIAN_STOCKS.mid_cap.slice(0, 3));
          const smallCap = await fetchMultipleStocks(INDIAN_STOCKS.small_cap.slice(0, 2));
          stockSuggestions = [...largeCap, ...midCap, ...smallCap];
          
          if (stockSuggestions.length === 0) {
            stockSuggestions = getMockIndianStocks();
          }
        } catch (error) {
          stockSuggestions = getMockIndianStocks();
        }

        suggestions.push({
          category: 'Growth Stocks',
          title: 'High Growth Potential Stocks',
          description: 'Invest in companies with high growth potential across market caps.',
          riskLevel: 'high',
          expectedReturn: '15-25% annually',
          stocks: stockSuggestions,
          allocation: 60
        });

        suggestions.push({
          category: 'Sectoral ETFs',
          title: 'Technology & Banking ETFs',
          description: 'Sector-focused investments in high-growth industries.',
          riskLevel: 'high',
          expectedReturn: '12-20% annually',
          stocks: [
            { symbol: 'BANKNIFTY', name: 'Bank Nifty ETF', price: 456.78, change: 12.34, changePercent: 2.78, currency: 'INR' },
            { symbol: 'TECHNIFTY', name: 'Tech Nifty ETF', price: 234.56, change: 8.90, changePercent: 3.94, currency: 'INR' }
          ],
          allocation: 25
        });

        suggestions.push({
          category: 'Alternative Investments',
          title: 'REITs & InvITs',
          description: 'Real estate and infrastructure investment trusts for portfolio diversification.',
          riskLevel: 'medium',
          expectedReturn: '8-14% annually',
          stocks: [
            { symbol: 'EMBASSY', name: 'Embassy Office Parks REIT', price: 345.67, change: 4.56, changePercent: 1.34, currency: 'INR' },
            { symbol: 'INDGRID', name: 'India Grid Trust InvIT', price: 123.45, change: 2.34, changePercent: 1.93, currency: 'INR' }
          ],
          allocation: 15
        });
        break;
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating investment suggestions:', error);
    return getDefaultSuggestions(riskLevel);
  }
};

const getDefaultSuggestions = (riskLevel: 'low' | 'medium' | 'high'): InvestmentSuggestion[] => {
  const mockStocks = getMockIndianStocks();
  const mockGoldETFs = getMockGoldETFs();

  switch (riskLevel) {
    case 'low':
      return [
        {
          category: 'Blue Chip Stocks',
          title: 'Large Cap Indian Stocks',
          description: 'Invest in established companies with strong fundamentals.',
          riskLevel: 'low',
          expectedReturn: '8-12% annually',
          stocks: mockStocks.slice(0, 3),
          allocation: 40
        },
        {
          category: 'Gold ETFs',
          title: 'Gold Exchange Traded Funds',
          description: 'Hedge against inflation with gold investments.',
          riskLevel: 'low',
          expectedReturn: '6-10% annually',
          stocks: mockGoldETFs,
          allocation: 60
        }
      ];
    case 'medium':
      return [
        {
          category: 'Diversified Equity',
          title: 'Large & Mid Cap Stocks',
          description: 'Balanced exposure to established and growing companies.',
          riskLevel: 'medium',
          expectedReturn: '10-15% annually',
          stocks: mockStocks.slice(0, 4),
          allocation: 70
        },
        {
          category: 'Gold ETFs',
          title: 'Gold Exchange Traded Funds',
          description: 'Portfolio diversification with precious metal exposure.',
          riskLevel: 'low',
          expectedReturn: '6-10% annually',
          stocks: mockGoldETFs,
          allocation: 30
        }
      ];
    case 'high':
      return [
        {
          category: 'Growth Stocks',
          title: 'High Growth Potential Stocks',
          description: 'Invest in companies with high growth potential.',
          riskLevel: 'high',
          expectedReturn: '15-25% annually',
          stocks: mockStocks,
          allocation: 80
        },
        {
          category: 'Alternative Investments',
          title: 'REITs & Sectoral ETFs',
          description: 'Real estate and sector-focused investments.',
          riskLevel: 'medium',
          expectedReturn: '8-14% annually',
          stocks: [
            { symbol: 'EMBASSY', name: 'Embassy Office Parks REIT', price: 345.67, change: 4.56, changePercent: 1.34, currency: 'INR' }
          ],
          allocation: 20
        }
      ];
  }
};
