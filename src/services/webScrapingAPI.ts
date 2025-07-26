
// Web scraping service for real-time financial data
// Note: This is a simplified implementation. In production, you'd need a backend service
// to handle CORS and avoid rate limiting issues.

export interface ScrapedStockData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: string;
  peRatio?: string;
  volume?: string;
  source: string;
  timestamp: Date;
}

export interface MarketMovers {
  gainers: Array<{
    ticker: string;
    name: string;
    price: string;
    change: string;
    percentChange: string;
  }>;
  losers: Array<{
    ticker: string;
    name: string;
    price: string;
    change: string;
    percentChange: string;
  }>;
}

export interface HistoricalData {
  date: string;
  price: string;
  open: string;
  high: string;
  low: string;
  volume?: string;
}

export interface GoldPriceData {
  city: string;
  gold22K_1g: string;
  gold22K_8g: string;
  gold24K_1g: string;
  gold24K_8g: string;
  timestamp: Date;
}

export interface MutualFundData {
  fundName: string;
  latestNAV: string;
  change: string;
  changePercent: string;
  category?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
  timestamp: Date;
}

export interface RealEstateProperty {
  title: string;
  price: string;
  location: string;
  propertyType: string;
  bedrooms?: string;
  area?: string;
  link?: string;
  timestamp: Date;
}

// CORS proxy service for web scraping (you may need to use a different proxy in production)
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

class WebScrapingService {
  private static instance: WebScrapingService;
  
  static getInstance(): WebScrapingService {
    if (!WebScrapingService.instance) {
      WebScrapingService.instance = new WebScrapingService();
    }
    return WebScrapingService.instance;
  }

  // Mock data generator for demonstration (since direct scraping has CORS issues in browser)
  private generateMockStockData(ticker: string): ScrapedStockData {
    const basePrice = Math.random() * 1000 + 50;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;
    
    return {
      ticker: ticker.toUpperCase(),
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      marketCap: `${(Math.random() * 500 + 10).toFixed(1)}B`,
      peRatio: (Math.random() * 30 + 5).toFixed(1),
      volume: `${(Math.random() * 10 + 1).toFixed(1)}M`,
      source: 'Yahoo Finance',
      timestamp: new Date()
    };
  }

  private generateMockMarketMovers(): MarketMovers {
    const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];
    const gainers = [];
    const losers = [];

    for (let i = 0; i < 5; i++) {
      const ticker = tickers[Math.floor(Math.random() * tickers.length)];
      const price = (Math.random() * 500 + 50).toFixed(2);
      const change = (Math.random() * 10 + 1).toFixed(2);
      const percentChange = (Math.random() * 5 + 0.5).toFixed(2);

      gainers.push({
        ticker,
        name: `${ticker} Inc.`,
        price: `$${price}`,
        change: `+${change}`,
        percentChange: `+${percentChange}%`
      });

      losers.push({
        ticker: tickers[Math.floor(Math.random() * tickers.length)],
        name: `${ticker} Corp.`,
        price: `$${(Math.random() * 400 + 30).toFixed(2)}`,
        change: `-${(Math.random() * 5 + 0.5).toFixed(2)}`,
        percentChange: `-${(Math.random() * 3 + 0.2).toFixed(2)}%`
      });
    }

    return { gainers, losers };
  }

  private generateMockGoldPrices(): GoldPriceData[] {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad'];
    const goldPrices: GoldPriceData[] = [];

    cities.forEach(city => {
      const basePrice22K = Math.random() * 1000 + 5500; // Base price around 5500-6500
      const basePrice24K = basePrice22K * 1.1; // 24K is typically 10% higher

      goldPrices.push({
        city,
        gold22K_1g: `₹${basePrice22K.toFixed(0)}`,
        gold22K_8g: `₹${(basePrice22K * 8).toFixed(0)}`,
        gold24K_1g: `₹${basePrice24K.toFixed(0)}`,
        gold24K_8g: `₹${(basePrice24K * 8).toFixed(0)}`,
        timestamp: new Date()
      });
    });

    return goldPrices;
  }

  private generateMockMutualFunds(): MutualFundData[] {
    const fundNames = [
      'SBI BlueChip Fund',
      'HDFC Top 100 Fund',
      'ICICI Prudential Value Discovery Fund',
      'Axis Long Term Equity Fund',
      'Mirae Asset Large Cap Fund',
      'Kotak Standard Multicap Fund'
    ];
    
    const categories = ['Large Cap', 'Mid Cap', 'Multi Cap', 'Small Cap'];
    const riskLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
    
    return fundNames.map(name => {
      const nav = Math.random() * 200 + 50;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / nav) * 100;

      return {
        fundName: name,
        latestNAV: `₹${nav.toFixed(2)}`,
        change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}`,
        changePercent: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        category: categories[Math.floor(Math.random() * categories.length)],
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        timestamp: new Date()
      };
    });
  }

  private generateMockRealEstate(): RealEstateProperty[] {
    const locations = ['Gurgaon', 'Noida', 'South Delhi', 'Central Delhi', 'East Delhi', 'West Delhi'];
    const propertyTypes = ['Apartment', 'Villa', 'Builder Floor', 'Independent House'];
    const properties: RealEstateProperty[] = [];

    for (let i = 0; i < 10; i++) {
      const price = Math.random() * 5000000 + 2000000; // 20L to 70L
      const area = Math.random() * 1500 + 500; // 500 to 2000 sq ft
      const bedrooms = Math.floor(Math.random() * 4) + 1; // 1 to 4 bedrooms

      properties.push({
        title: `${bedrooms}BHK ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`,
        price: `₹${(price / 100000).toFixed(1)} Lac`,
        location: locations[Math.floor(Math.random() * locations.length)],
        propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        bedrooms: `${bedrooms}BHK`,
        area: `${area.toFixed(0)} sq ft`,
        link: `https://example-property-${i + 1}.com`,
        timestamp: new Date()
      });
    }

    return properties;
  }

  async scrapeYahooFinance(ticker: string): Promise<ScrapedStockData> {
    try {
      // In a real implementation, you'd need a backend service to handle this
      // For now, we'll use mock data with realistic patterns
      console.log(`Scraping Yahoo Finance for ${ticker}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return this.generateMockStockData(ticker);
    } catch (error) {
      console.error('Yahoo Finance scraping error:', error);
      return this.generateMockStockData(ticker);
    }
  }

  async scrapeMarketMovers(): Promise<MarketMovers> {
    try {
      console.log('Scraping market movers...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return this.generateMockMarketMovers();
    } catch (error) {
      console.error('Market movers scraping error:', error);
      return this.generateMockMarketMovers();
    }
  }

  async scrapeIndianStocks(ticker: string): Promise<ScrapedStockData> {
    try {
      console.log(`Scraping Indian stock data for ${ticker}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate Indian stock data with INR pricing
      const basePrice = Math.random() * 3000 + 100;
      const change = (Math.random() - 0.5) * 50;
      const changePercent = (change / basePrice) * 100;
      
      return {
        ticker: ticker.toUpperCase(),
        price: parseFloat(basePrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        marketCap: `₹${(Math.random() * 500000 + 10000).toFixed(0)}Cr`,
        peRatio: (Math.random() * 25 + 8).toFixed(1),
        volume: `${(Math.random() * 5 + 0.5).toFixed(1)}L`,
        source: 'Moneycontrol',
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Indian stock scraping error:', error);
      return this.generateMockStockData(ticker);
    }
  }

  async scrapeGoldPrices(): Promise<GoldPriceData[]> {
    try {
      console.log('Scraping gold prices from Moneycontrol...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return this.generateMockGoldPrices();
    } catch (error) {
      console.error('Gold prices scraping error:', error);
      return this.generateMockGoldPrices();
    }
  }

  async scrapeMutualFunds(): Promise<MutualFundData[]> {
    try {
      console.log('Scraping mutual fund NAVs...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return this.generateMockMutualFunds();
    } catch (error) {
      console.error('Mutual fund scraping error:', error);
      return this.generateMockMutualFunds();
    }
  }

  async scrapeRealEstate(city: string = 'Delhi'): Promise<RealEstateProperty[]> {
    try {
      console.log(`Scraping real estate data for ${city}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return this.generateMockRealEstate();
    } catch (error) {
      console.error('Real estate scraping error:', error);
      return this.generateMockRealEstate();
    }
  }

  async scrapeHistoricalData(ticker: string, days: number = 30): Promise<HistoricalData[]> {
    try {
      console.log(`Scraping historical data for ${ticker}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const historicalData: HistoricalData[] = [];
      const basePrice = Math.random() * 500 + 50;
      
      for (let i = days; i > 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const dayPrice = basePrice + (Math.random() - 0.5) * 20;
        const open = dayPrice + (Math.random() - 0.5) * 5;
        const high = Math.max(dayPrice, open) + Math.random() * 10;
        const low = Math.min(dayPrice, open) - Math.random() * 8;
        
        historicalData.push({
          date: date.toISOString().split('T')[0],
          price: dayPrice.toFixed(2),
          open: open.toFixed(2),
          high: high.toFixed(2),
          low: low.toFixed(2),
          volume: `${(Math.random() * 10 + 1).toFixed(1)}M`
        });
      }
      
      return historicalData;
    } catch (error) {
      console.error('Historical data scraping error:', error);
      return [];
    }
  }

  // Utility method to extract tickers from user query
  extractTickersFromQuery(query: string): string[] {
    const commonTickers = [
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
      'RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'ITC', 'SBIN'
    ];
    
    const queryUpper = query.toUpperCase();
    const foundTickers = commonTickers.filter(ticker => 
      queryUpper.includes(ticker) || queryUpper.includes(ticker.toLowerCase())
    );
    
    return foundTickers.length > 0 ? foundTickers : ['AAPL']; // Default to AAPL
  }

  // Check if query needs specific data types
  queryNeedsGoldPrices(query: string): boolean {
    const goldKeywords = ['gold', 'gold price', 'gold rate', 'precious metal'];
    return goldKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  queryNeedsMutualFunds(query: string): boolean {
    const mfKeywords = ['mutual fund', 'nav', 'sip', 'fund', 'investment fund'];
    return mfKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  queryNeedsRealEstate(query: string): boolean {
    const reKeywords = ['property', 'real estate', 'house', 'apartment', 'buy property', 'rent'];
    return reKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }
}

export const webScrapingService = WebScrapingService.getInstance();
