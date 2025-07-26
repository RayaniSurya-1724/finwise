
import axios from 'axios';

const YAHOO_FINANCE_API_KEY = import.meta.env.VITE_YAHOO_FINANCE_API_KEY;
const BASE_URL = 'https://yahoo-finance15.p.rapidapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': YAHOO_FINANCE_API_KEY,
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
  }
});

// Indian stock tickers
export const INDIAN_STOCKS = {
  large_cap: ['RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'HINDUNILVR.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'KOTAKBANK.NS'],
  mid_cap: ['ADANIPORTS.NS', 'AXISBANK.NS', 'BAJFINANCE.NS', 'BAJAJFINSV.NS', 'HCLTECH.NS', 'WIPRO.NS', 'ULTRACEMCO.NS', 'TITAN.NS', 'POWERGRID.NS', 'NESTLEIND.NS'],
  small_cap: ['BANDHANBNK.NS', 'FEDERALBNK.NS', 'INDUSINDBK.NS', 'YESBANK.NS', 'IDEA.NS']
};

export const INDIAN_GOLD_ETFS = ['GOLDBEES.NS', 'GOLDIETF.NS', 'LIQUIDBEES.NS', 'SBIGETS.NS'];

export const INDIAN_INDICES = ['^NSEI', '^BSESN', '^NSEBANK'];

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  currency: string;
  logo?: string;
}

export interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    const response = await api.get('/api/v1/markets/stock/modules', {
      params: {
        ticker: symbol,
        module: 'price,summaryDetail'
      }
    });

    const data = response.data.body;
    const price = data.price;
    const summaryDetail = data.summaryDetail;

    return {
      symbol: price.symbol,
      name: price.longName || price.shortName,
      price: price.regularMarketPrice,
      change: price.regularMarketChange,
      changePercent: price.regularMarketChangePercent,
      marketCap: summaryDetail?.marketCap,
      currency: price.currency || 'INR'
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
};

export const fetchMultipleStocks = async (symbols: string[]): Promise<StockData[]> => {
  try {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    const results = await Promise.all(promises);
    return results.filter(data => data !== null) as StockData[];
  } catch (error) {
    console.error('Error fetching multiple stocks:', error);
    return [];
  }
};

export const fetchIndexData = async (symbol: string): Promise<IndexData | null> => {
  try {
    const response = await api.get('/api/v1/markets/stock/modules', {
      params: {
        ticker: symbol,
        module: 'price'
      }
    });

    const price = response.data.body.price;

    return {
      symbol: price.symbol,
      name: price.longName || price.shortName,
      price: price.regularMarketPrice,
      change: price.regularMarketChange,
      changePercent: price.regularMarketChangePercent
    };
  } catch (error) {
    console.error(`Error fetching index data for ${symbol}:`, error);
    return null;
  }
};

export const fetchTopGainers = async (): Promise<StockData[]> => {
  try {
    // Since API doesn't have direct gainers endpoint, we'll fetch popular stocks and sort by change
    const stocks = await fetchMultipleStocks([...INDIAN_STOCKS.large_cap, ...INDIAN_STOCKS.mid_cap].slice(0, 20));
    return stocks.filter(stock => stock.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 10);
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    return [];
  }
};

export const fetchTopLosers = async (): Promise<StockData[]> => {
  try {
    const stocks = await fetchMultipleStocks([...INDIAN_STOCKS.large_cap, ...INDIAN_STOCKS.mid_cap].slice(0, 20));
    return stocks.filter(stock => stock.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent).slice(0, 10);
  } catch (error) {
    console.error('Error fetching top losers:', error);
    return [];
  }
};

export const fetchGoldETFs = async (): Promise<StockData[]> => {
  try {
    return await fetchMultipleStocks(INDIAN_GOLD_ETFS);
  } catch (error) {
    console.error('Error fetching Gold ETFs:', error);
    return [];
  }
};

// Mock data fallback for when API is unavailable
export const getMockIndianStocks = (): StockData[] => [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd', price: 2456.75, change: 23.45, changePercent: 0.96, marketCap: 16000000000000, currency: 'INR' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Ltd', price: 3567.80, change: -12.30, changePercent: -0.34, marketCap: 13000000000000, currency: 'INR' },
  { symbol: 'INFY.NS', name: 'Infosys Ltd', price: 1456.90, change: 18.75, changePercent: 1.30, marketCap: 6000000000000, currency: 'INR' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', price: 1678.45, change: 8.90, changePercent: 0.53, marketCap: 9000000000000, currency: 'INR' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', price: 934.25, change: -5.60, changePercent: -0.60, marketCap: 6500000000000, currency: 'INR' }
];

export const getMockGoldETFs = (): StockData[] => [
  { symbol: 'GOLDBEES.NS', name: 'Nippon India ETF Gold BeES', price: 4567.80, change: 12.45, changePercent: 0.27, currency: 'INR' },
  { symbol: 'GOLDIETF.NS', name: 'Goldman Sachs Gold ETF', price: 4534.20, change: -8.90, changePercent: -0.20, currency: 'INR' },
  { symbol: 'SBIGETS.NS', name: 'SBI Gold ETF', price: 4578.90, change: 15.67, changePercent: 0.34, currency: 'INR' }
];

export const getMockIndices = (): IndexData[] => [
  { symbol: '^NSEI', name: 'NIFTY 50', price: 19456.75, change: 123.45, changePercent: 0.64 },
  { symbol: '^BSESN', name: 'S&P BSE SENSEX', price: 65234.80, change: -234.56, changePercent: -0.36 },
  { symbol: '^NSEBANK', name: 'NIFTY BANK', price: 43567.90, change: 278.34, changePercent: 0.64 }
];
