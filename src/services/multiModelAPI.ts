
import { GeminiAPI } from './geminiAPI';
import { getFinancialAdvice } from './groqAPI';
import { webScrapingService, ScrapedStockData, MarketMovers, GoldPriceData, MutualFundData, RealEstateProperty } from './webScrapingAPI';
import { ragService } from './ragService';

export type ModelType = 'gemini-pro' | 'gemini-flash' | 'llama-3-70b' | 'rag-mode' | 'general-mode' | 'auto';

export interface ModelResponse {
  success: boolean;
  content: string;
  model: string;
  timestamp: Date;
  error?: string;
}

export interface StockPrice {
  ticker: string;
  price: number;
  timestamp: Date;
}

export interface MarketNews {
  headlines: string[];
  timestamp: Date;
}

export class MultiModelFinancialAPI {
  private static instance: MultiModelFinancialAPI;
  
  static getInstance(): MultiModelFinancialAPI {
    if (!MultiModelFinancialAPI.instance) {
      MultiModelFinancialAPI.instance = new MultiModelFinancialAPI();
    }
    return MultiModelFinancialAPI.instance;
  }

  constructor() {
    this.initializeRAG();
  }

  private async initializeRAG() {
    try {
      await ragService.initializeFinanceData();
    } catch (error) {
      console.error('Failed to initialize RAG service:', error);
    }
  }

  // Enhanced with web scraping data
  async getStockPrice(ticker: string): Promise<StockPrice> {
    try {
      const scrapedData = await webScrapingService.scrapeYahooFinance(ticker);
      return {
        ticker: scrapedData.ticker,
        price: scrapedData.price,
        timestamp: scrapedData.timestamp
      };
    } catch (error) {
      console.error('Error fetching stock price:', error);
      // Fallback to mock data
      return {
        ticker: ticker.toUpperCase(),
        price: Math.random() * 1000 + 100,
        timestamp: new Date()
      };
    }
  }

  async getMarketNews(): Promise<MarketNews> {
    // Simulate real-time market news
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const headlines = [
      "Fed signals potential rate cuts amid economic uncertainty",
      "Tech stocks rally on strong quarterly earnings reports",
      "Oil prices surge following geopolitical tensions",
      "Cryptocurrency market shows signs of stabilization",
      "Banking sector outperforms amid rising interest rates"
    ];
    
    return {
      headlines: headlines.slice(0, Math.floor(Math.random() * 3) + 2),
      timestamp: new Date()
    };
  }

  async getMarketMovers(): Promise<MarketMovers> {
    try {
      return await webScrapingService.scrapeMarketMovers();
    } catch (error) {
      console.error('Error fetching market movers:', error);
      return { gainers: [], losers: [] };
    }
  }

  async generateResponse(
    query: string, 
    model: ModelType = 'auto',
    userInvestments?: Record<string, number>,
    language: string = 'en'
  ): Promise<ModelResponse> {
    const timestamp = new Date();
    
    try {
      // Determine which model to use
      const selectedModel = model === 'auto' ? this.selectBestModel(query) : model;
      
      // Check if query needs real-time data
      const needsStockData = this.queryNeedsStockData(query);
      const needsNews = this.queryNeedsNews(query);
      const needsMarketMovers = this.queryNeedsMarketMovers(query);
      const needsGoldPrices = webScrapingService.queryNeedsGoldPrices(query);
      const needsMutualFunds = webScrapingService.queryNeedsMutualFunds(query);
      const needsRealEstate = webScrapingService.queryNeedsRealEstate(query);
      
      let enhancedQuery = query;
      let context = '';
      
      // Fetch real-time scraped data if needed
      if (needsStockData) {
        const tickers = this.extractTickers(query);
        if (tickers.length > 0) {
          console.log('Fetching real-time stock data for:', tickers);
          const stockPromises = tickers.map(ticker => 
            webScrapingService.scrapeYahooFinance(ticker)
          );
          const stockData = await Promise.all(stockPromises);
          
          context += '\n\n📊 Real-time Stock Data (Web Scraped):\n';
          stockData.forEach(stock => {
            const currency = stock.ticker.includes('.NS') ? '₹' : '$';
            const changeSymbol = stock.change >= 0 ? '+' : '';
            context += `${stock.ticker}: ${currency}${stock.price} (${changeSymbol}${stock.change}, ${changeSymbol}${stock.changePercent.toFixed(2)}%)\n`;
            context += `  Market Cap: ${stock.marketCap}, P/E: ${stock.peRatio}, Volume: ${stock.volume}\n`;
            context += `  Source: ${stock.source}, Updated: ${stock.timestamp.toLocaleTimeString()}\n\n`;
          });
        }
      }
      
      if (needsMarketMovers) {
        console.log('Fetching market movers...');
        const movers = await this.getMarketMovers();
        context += '\n\n📈 Top Market Gainers:\n';
        movers.gainers.slice(0, 3).forEach(gainer => {
          context += `${gainer.ticker}: ${gainer.price} (${gainer.change}, ${gainer.percentChange})\n`;
        });
        context += '\n📉 Top Market Losers:\n';
        movers.losers.slice(0, 3).forEach(loser => {
          context += `${loser.ticker}: ${loser.price} (${loser.change}, ${loser.percentChange})\n`;
        });
      }

      if (needsGoldPrices) {
        console.log('Fetching gold prices...');
        const goldPrices = await webScrapingService.scrapeGoldPrices();
        context += '\n\n🥇 Current Gold Prices:\n';
        goldPrices.slice(0, 5).forEach(gold => {
          context += `${gold.city}: 22K(1g): ${gold.gold22K_1g}, 24K(1g): ${gold.gold24K_1g}\n`;
        });
        context += `(Updated: ${goldPrices[0]?.timestamp.toLocaleTimeString()})\n`;
      }

      if (needsMutualFunds) {
        console.log('Fetching mutual fund NAVs...');
        const mutualFunds = await webScrapingService.scrapeMutualFunds();
        context += '\n\n📈 Mutual Fund NAVs:\n';
        mutualFunds.slice(0, 5).forEach(fund => {
          context += `${fund.fundName}: ${fund.latestNAV} (${fund.change}, ${fund.changePercent})\n`;
          context += `  Category: ${fund.category}, Risk: ${fund.riskLevel}\n`;
        });
        context += `(Updated: ${mutualFunds[0]?.timestamp.toLocaleTimeString()})\n`;
      }

      if (needsRealEstate) {
        console.log('Fetching real estate data...');
        const properties = await webScrapingService.scrapeRealEstate();
        context += '\n\n🏠 Real Estate Properties:\n';
        properties.slice(0, 5).forEach(property => {
          context += `${property.title}: ${property.price}\n`;
          context += `  Location: ${property.location}, Area: ${property.area}\n`;
        });
        context += `(Updated: ${properties[0]?.timestamp.toLocaleTimeString()})\n`;
      }
      
      if (needsNews) {
        const news = await this.getMarketNews();
        context += '\n\n📰 Latest Market Headlines:\n';
        news.headlines.forEach((headline, index) => {
          context += `${index + 1}. ${headline}\n`;
        });
        context += `(Updated: ${news.timestamp.toLocaleTimeString()})\n`;
      }
      
      // Add investment context if available
      if (userInvestments && Object.keys(userInvestments).length > 0) {
        context += '\n\n💼 User Portfolio:\n';
        Object.entries(userInvestments).forEach(([asset, amount]) => {
          context += `${asset}: ₹${amount.toLocaleString()}\n`;
        });
      }
      
      // Check user's selected mode
      let response: ModelResponse;
      
      if (selectedModel === 'rag-mode') {
        // Force RAG mode
        console.log('Using RAG mode (user selected)');
        const ragResponse = await ragService.generateRAGResponse(query, context);
        response = {
          success: true,
          content: ragResponse,
          model: 'rag-mode',
          timestamp,
        };
      } else if (selectedModel === 'general-mode') {
        // Force Gemini API mode
        console.log('Using General mode (user selected)');
        const geminiResponse = await GeminiAPI.generateResponse(
          enhancedQuery + context,
          "You are FinWise AI, a comprehensive financial assistant. Provide clear, informative responses about financial topics, market data, and general questions.",
          language
        );
        response = {
          success: geminiResponse.success,
          content: geminiResponse.content,
          model: 'general-mode',
          timestamp,
          error: geminiResponse.error
        };
      } else {
        // Auto mode or specific model selection
        const isFinancialAdviceQuery = this.isFinancialAdviceQuery(query);
        
        if (isFinancialAdviceQuery && selectedModel === 'auto') {
          // Use RAG for financial advice queries in auto mode
          console.log('Using RAG for financial advice query (auto mode)');
          const ragResponse = await ragService.generateRAGResponse(query, context);
          response = {
            success: true,
            content: ragResponse,
            model: selectedModel + '-rag',
            timestamp,
          };
        } else {
          // Use regular model for other queries
          switch (selectedModel) {
            case 'gemini-pro':
            case 'gemini-flash':
            case 'auto':
              const geminiResponse = await GeminiAPI.generateResponse(
                enhancedQuery + context,
                "You are FinWise AI, a comprehensive financial advisor with access to live web-scraped data including stocks, gold prices, mutual funds, and real estate. Provide actionable insights using the current data provided. Always mention data sources and add: 'Data scraped in real-time. Verify before trading.'",
                language
              );
              response = {
                success: geminiResponse.success,
                content: geminiResponse.content,
                model: selectedModel,
                timestamp,
                error: geminiResponse.error
              };
              break;
              
            case 'llama-3-70b':
            default:
              const groqResponse = await getFinancialAdvice(enhancedQuery + context, userInvestments);
              response = {
                success: true,
                content: groqResponse + '\n\n*Data scraped in real-time. Verify before trading.*',
                model: 'llama-3-70b',
                timestamp,
              };
              break;
          }
        }
      }
      
      return response;
      
    } catch (error) {
      console.error('Error in MultiModelFinancialAPI:', error);
      return {
        success: false,
        content: "I'm experiencing technical difficulties accessing real-time data. Please try again later.",
        model: model || 'unknown',
        timestamp,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private selectBestModel(query: string): ModelType {
    const lowerQuery = query.toLowerCase();
    
    // Use Gemini Pro for complex analysis, real-time data, and investment advice
    if (lowerQuery.includes('analyze') || 
        lowerQuery.includes('current') || 
        lowerQuery.includes('real-time') ||
        lowerQuery.includes('news') ||
        lowerQuery.includes('market trend') ||
        lowerQuery.includes('scrape') ||
        lowerQuery.includes('gold') ||
        lowerQuery.includes('mutual fund') ||
        lowerQuery.includes('property') ||
        lowerQuery.includes('invest') ||
        lowerQuery.includes('portfolio') ||
        lowerQuery.includes('advice') ||
        lowerQuery.includes('recommend') ||
        lowerQuery.includes('strategy')) {
      return 'gemini-pro';
    }
    
    // Use Gemini Flash for all other responses (quick responses and general questions)
    return 'gemini-flash';
  }

  private queryNeedsStockData(query: string): boolean {
    const stockKeywords = ['price', 'stock', 'share', 'ticker', 'quote', 'current', 'scrape'];
    return stockKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  private queryNeedsNews(query: string): boolean {
    const newsKeywords = ['news', 'headlines', 'market update', 'latest', 'today'];
    return newsKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  private queryNeedsMarketMovers(query: string): boolean {
    const moversKeywords = ['gainers', 'losers', 'movers', 'top performing', 'worst performing', 'market leaders'];
    return moversKeywords.some(keyword => query.toLowerCase().includes(keyword));
  }

  private extractTickers(query: string): string[] {
    // Enhanced ticker extraction
    const tickers = webScrapingService.extractTickersFromQuery(query);
    
    // If specific tickers mentioned, return them
    if (tickers.length > 0) return tickers.slice(0, 3); // Limit to 3 tickers
    
    // Default to popular stocks for general queries
    if (query.toLowerCase().includes('indian') || query.toLowerCase().includes('nse')) {
      return ['RELIANCE.NS', 'TCS.NS', 'INFY.NS'];
    }
    
    return ['AAPL', 'MSFT', 'GOOGL'];
  }

  private isFinancialAdviceQuery(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    
    // General questions should use Gemini API directly
    const generalQuestionWords = [
      'what is', 'what are', 'define', 'explain', 'tell me about',
      'how does', 'why', 'when', 'where', 'current price', 'today',
      'news', 'market update', 'latest', 'happening'
    ];
    
    // If it's a general question, don't use RAG
    if (generalQuestionWords.some(word => lowerQuery.includes(word))) {
      return false;
    }
    
    // Only use RAG for specific advice/recommendation queries
    const adviceKeywords = [
      'should i invest', 'how to invest', 'where should i invest', 
      'suggest', 'recommend', 'advice', 'help me choose',
      'what to do with', 'planning', 'strategy', 'allocate',
      'portfolio recommendation', 'investment plan',
      'best way to invest', 'looking to invest'
    ];
    
    return adviceKeywords.some(keyword => lowerQuery.includes(keyword));
  }
}

export const multiModelAPI = MultiModelFinancialAPI.getInstance();
