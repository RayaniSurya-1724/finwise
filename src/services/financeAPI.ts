
import { useQuery } from '@tanstack/react-query';

// Types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface MutualFundData {
  id: string;
  name: string;
  nav: number;
  change: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  category: string;
  returnOneYear: number;
  returnThreeYears: number;
}

export interface FixedDepositData {
  bank: string;
  rateOneYear: number;
  rateThreeYears: number;
  rateFiveYears: number;
  minAmount: number;
}

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedDate: string;
  summary: string;
}

// Finance API service
const fetchStockData = async (symbol: string): Promise<StockData> => {
  // In a real app, you would fetch from Yahoo Finance API
  // This is a mock implementation
  const response = await fetch(`https://api.example.com/stocks/${symbol}`);
  if (!response.ok) {
    // For demo purposes, return mock data if API fails
    return getMockStockData(symbol);
  }
  return await response.json();
};

const fetchCryptoData = async (id: string): Promise<CryptoData> => {
  // In a real app, you would fetch from CoinGecko API
  // This is a mock implementation
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`);
    if (!response.ok) {
      // For demo purposes, return mock data if API fails
      return getMockCryptoData(id);
    }
    const data = await response.json();
    return {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      symbol: id.substring(0, 3).toUpperCase(),
      price: data[id].usd,
      change: data[id].usd_24h_change,
      changePercent: data[id].usd_24h_change,
    };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return getMockCryptoData(id);
  }
};

const fetchMutualFunds = async (riskLevel?: 'Low' | 'Medium' | 'High'): Promise<MutualFundData[]> => {
  // In a real app, you would fetch from a mutual fund API
  // This is a mock implementation
  try {
    const response = await fetch(`https://api.example.com/mutualfunds${riskLevel ? `?risk=${riskLevel}` : ''}`);
    if (!response.ok) {
      // For demo purposes, return mock data if API fails
      return getMockMutualFunds(riskLevel);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mutual fund data:", error);
    return getMockMutualFunds(riskLevel);
  }
};

const fetchFixedDeposits = async (): Promise<FixedDepositData[]> => {
  // Fixed deposits are typically hardcoded or fetched from a specific API
  // This is a mock implementation
  return getMockFixedDeposits();
};

const fetchFinancialNews = async (limit: number = 5): Promise<NewsItem[]> => {
  // In a real app, you would fetch from a news API
  // This is a mock implementation
  try {
    const response = await fetch(`https://api.example.com/news?limit=${limit}`);
    if (!response.ok) {
      // For demo purposes, return mock data if API fails
      return getMockFinancialNews();
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
    return getMockFinancialNews();
  }
};

// Mock data generators
const getMockStockData = (symbol: string): StockData => {
  const stocks: Record<string, Partial<StockData>> = {
    'AAPL': { name: 'Apple Inc.', price: 198.35, change: 5.12, changePercent: 2.67 },
    'MSFT': { name: 'Microsoft Corp', price: 425.22, change: 7.45, changePercent: 1.73 },
    'AMZN': { name: 'Amazon.com Inc', price: 183.67, change: -1.23, changePercent: -0.67 },
    'GOOGL': { name: 'Alphabet Inc', price: 175.89, change: 3.56, changePercent: 2.08 },
    'TSLA': { name: 'Tesla Inc', price: 237.89, change: -5.67, changePercent: -2.33 },
    'META': { name: 'Meta Platforms Inc', price: 478.22, change: 12.34, changePercent: 2.65 },
    'NVDA': { name: 'NVIDIA Corp', price: 926.45, change: 24.56, changePercent: 2.74 },
    'BRK.B': { name: 'Berkshire Hathaway', price: 416.78, change: 2.89, changePercent: 0.70 },
    'JNJ': { name: 'Johnson & Johnson', price: 156.32, change: -0.45, changePercent: -0.29 },
    'V': { name: 'Visa Inc', price: 276.54, change: 3.21, changePercent: 1.18 },
  };
  
  const defaultData = { name: `${symbol} Stock`, price: 100 + Math.random() * 900, change: Math.random() * 20 - 10, changePercent: Math.random() * 5 - 2.5 };
  const stockData = stocks[symbol] || defaultData;
  
  return {
    symbol,
    name: stockData.name || defaultData.name,
    price: stockData.price || defaultData.price,
    change: stockData.change || defaultData.change,
    changePercent: stockData.changePercent || defaultData.changePercent,
  };
};

const getMockCryptoData = (id: string): CryptoData => {
  const cryptos: Record<string, Partial<CryptoData>> = {
    'bitcoin': { name: 'Bitcoin', symbol: 'BTC', price: 68932.45, change: 1254.32, changePercent: 1.89 },
    'ethereum': { name: 'Ethereum', symbol: 'ETH', price: 3578.92, change: 32.56, changePercent: 0.92 },
    'binancecoin': { name: 'Binance Coin', symbol: 'BNB', price: 604.15, change: -7.84, changePercent: -1.27 },
    'solana': { name: 'Solana', symbol: 'SOL', price: 172.36, change: 5.23, changePercent: 3.15 },
    'cardano': { name: 'Cardano', symbol: 'ADA', price: 0.459, change: 0.02, changePercent: 4.56 },
    'ripple': { name: 'XRP', symbol: 'XRP', price: 0.573, change: -0.012, changePercent: -2.05 },
    'polkadot': { name: 'Polkadot', symbol: 'DOT', price: 7.85, change: 0.23, changePercent: 3.01 },
    'dogecoin': { name: 'Dogecoin', symbol: 'DOGE', price: 0.1345, change: 0.0067, changePercent: 5.24 },
  };
  
  const defaultData = { name: id.charAt(0).toUpperCase() + id.slice(1), symbol: id.substring(0, 3).toUpperCase(), price: Math.random() * 1000, change: Math.random() * 100 - 50, changePercent: Math.random() * 10 - 5 };
  const cryptoData = cryptos[id] || defaultData;
  
  return {
    id,
    name: cryptoData.name || defaultData.name,
    symbol: cryptoData.symbol || defaultData.symbol,
    price: cryptoData.price || defaultData.price,
    change: cryptoData.change || defaultData.change,
    changePercent: cryptoData.changePercent || defaultData.changePercent,
  };
};

const getMockMutualFunds = (riskLevel?: 'Low' | 'Medium' | 'High'): MutualFundData[] => {
  const allFunds: MutualFundData[] = [
    { id: 'MF001', name: 'Axis Bluechip Fund', nav: 45.67, change: 0.25, riskLevel: 'Low', category: 'Large Cap', returnOneYear: 12.5, returnThreeYears: 15.2 },
    { id: 'MF002', name: 'HDFC Balanced Advantage', nav: 287.45, change: 0.45, riskLevel: 'Medium', category: 'Hybrid', returnOneYear: 16.8, returnThreeYears: 18.7 },
    { id: 'MF003', name: 'SBI Small Cap Fund', nav: 98.76, change: -0.34, riskLevel: 'High', category: 'Small Cap', returnOneYear: 22.3, returnThreeYears: 24.5 },
    { id: 'MF004', name: 'Kotak Corporate Bond', nav: 32.56, change: 0.12, riskLevel: 'Low', category: 'Debt', returnOneYear: 6.8, returnThreeYears: 7.2 },
    { id: 'MF005', name: 'ICICI Pru Technology', nav: 145.67, change: 1.23, riskLevel: 'High', category: 'Sectoral', returnOneYear: 25.6, returnThreeYears: 32.1 },
    { id: 'MF006', name: 'Aditya Birla SL Index', nav: 125.43, change: 0.56, riskLevel: 'Medium', category: 'Index', returnOneYear: 15.3, returnThreeYears: 16.2 },
    { id: 'MF007', name: 'DSP Tax Saver Fund', nav: 67.89, change: 0.34, riskLevel: 'Medium', category: 'ELSS', returnOneYear: 18.9, returnThreeYears: 20.3 },
    { id: 'MF008', name: 'Mirae Asset Emerging', nav: 89.34, change: 0.78, riskLevel: 'High', category: 'Mid Cap', returnOneYear: 21.4, returnThreeYears: 22.8 },
    { id: 'MF009', name: 'Tata Digital India', nav: 35.67, change: 0.98, riskLevel: 'High', category: 'Sectoral', returnOneYear: 28.7, returnThreeYears: 30.5 },
    { id: 'MF010', name: 'IDFC Govt Securities', nav: 28.76, change: 0.08, riskLevel: 'Low', category: 'Debt', returnOneYear: 5.6, returnThreeYears: 6.2 },
  ];
  
  if (riskLevel) {
    return allFunds.filter(fund => fund.riskLevel === riskLevel);
  }
  
  return allFunds;
};

const getMockFixedDeposits = (): FixedDepositData[] => {
  return [
    { bank: 'SBI', rateOneYear: 5.5, rateThreeYears: 5.8, rateFiveYears: 6.2, minAmount: 10000 },
    { bank: 'HDFC', rateOneYear: 5.7, rateThreeYears: 6.0, rateFiveYears: 6.4, minAmount: 5000 },
    { bank: 'ICICI', rateOneYear: 5.6, rateThreeYears: 5.9, rateFiveYears: 6.3, minAmount: 10000 },
    { bank: 'Axis', rateOneYear: 5.75, rateThreeYears: 6.1, rateFiveYears: 6.5, minAmount: 25000 },
    { bank: 'Kotak', rateOneYear: 5.8, rateThreeYears: 6.2, rateFiveYears: 6.6, minAmount: 5000 },
  ];
};

const getMockFinancialNews = (): NewsItem[] => {
  return [
    {
      title: 'US Fed Signals Interest Rate Cut by Year End',
      link: 'https://example.com/news/1',
      source: 'Financial Times',
      publishedDate: '2023-12-01',
      summary: 'Federal Reserve officials indicated they expect to cut interest rates by the end of the year as inflation continues to moderate.'
    },
    {
      title: 'Bitcoin Surges Past $70,000 for the First Time',
      link: 'https://example.com/news/2',
      source: 'Bloomberg',
      publishedDate: '2023-11-28',
      summary: 'The world\'s largest cryptocurrency reached an all-time high, driven by institutional adoption and ETF inflows.'
    },
    {
      title: 'Indian Stock Market Hits Record High Amid Foreign Investments',
      link: 'https://example.com/news/3',
      source: 'Economic Times',
      publishedDate: '2023-11-25',
      summary: 'Sensex and Nifty touched new highs as foreign institutional investors continue to pour money into Indian equities.'
    },
    {
      title: 'AI Stocks Rally After Major Tech Earnings Beat Expectations',
      link: 'https://example.com/news/4',
      source: 'CNBC',
      publishedDate: '2023-11-20',
      summary: 'Technology companies with significant AI investments saw their stocks soar after reporting better-than-expected quarterly results.'
    },
    {
      title: 'Gold Prices Stabilize as Geopolitical Tensions Ease',
      link: 'https://example.com/news/5',
      source: 'Reuters',
      publishedDate: '2023-11-15',
      summary: 'After reaching record highs last month, gold prices have stabilized as global geopolitical tensions show signs of easing.'
    },
  ];
};

// Hooks for component usage
export const useStockData = (symbol: string) => {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => fetchStockData(symbol),
    staleTime: 60000, // 1 minute
  });
};

export const useCryptoData = (id: string) => {
  return useQuery({
    queryKey: ['crypto', id],
    queryFn: () => fetchCryptoData(id),
    staleTime: 60000, // 1 minute
  });
};

export const useMutualFunds = (riskLevel?: 'Low' | 'Medium' | 'High') => {
  return useQuery({
    queryKey: ['mutualFunds', riskLevel],
    queryFn: () => fetchMutualFunds(riskLevel),
    staleTime: 300000, // 5 minutes
  });
};

export const useFixedDeposits = () => {
  return useQuery({
    queryKey: ['fixedDeposits'],
    queryFn: fetchFixedDeposits,
    staleTime: 3600000, // 1 hour
  });
};

export const useFinancialNews = (limit: number = 5) => {
  return useQuery({
    queryKey: ['financialNews', limit],
    queryFn: () => fetchFinancialNews(limit),
    staleTime: 900000, // 15 minutes
  });
};

// Export functions directly
export const FinanceAPI = {
  fetchStockData,
  fetchCryptoData,
  fetchMutualFunds,
  fetchFixedDeposits,
  fetchFinancialNews,
};

export default FinanceAPI;
