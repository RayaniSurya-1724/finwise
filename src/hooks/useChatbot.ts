import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { multiModelAPI, ModelType } from '@/services/multiModelAPI';
import { useVoiceAssistant } from './useVoiceAssistant';
import { detectLanguage, isLanguageSupportedForVoice } from '@/services/languageDetection';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  role: 'user' | 'assistant' | 'system';
  model?: string;
}

export interface Insight {
  title: string;
  description: string;
  actionable: boolean;
  action?: string;
}

export const useChatbot = (compact = false) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [lastBotMessage, setLastBotMessage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('auto');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const { user } = useUser();
  
  // Voice assistant integration
  const {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSupported: isVoiceSupported
  } = useVoiceAssistant(selectedLanguage);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = compact
        ? "Hello! I'm your AI financial assistant with real-time web-scraped market data. How can I help you today?"
        : "Welcome to FinWise's enhanced AI financial assistant! I now have access to real-time market data through web scraping and multiple AI models to provide you with the most accurate and up-to-date financial advice. Ask me about stock prices, market movers, or financial news!";
      
      const initialMessage: ChatMessage = {
        id: 'welcome',
        type: 'assistant',
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        model: 'system'
      };
      
      setMessages([initialMessage]);
      setLastBotMessage(welcomeMessage);

      // Set initial insights
      if (!compact) {
        setInsights([
          {
            title: 'Real-Time Web Scraping',
            description: 'Get live stock prices and market data scraped from Yahoo Finance and other sources.',
            actionable: true,
            action: 'Ask for Live Stock Price'
          },
          {
            title: 'Market Movers',
            description: 'Access real-time data on top gainers and losers from market sources.',
            actionable: true,
            action: 'Show Market Movers'
          },
          {
            title: 'Multi-Model Analysis',
            description: 'Advanced AI models provide comprehensive financial analysis with live data.',
            actionable: true,
            action: 'Get Market Analysis'
          }
        ]);
      }
    }
  }, [compact, messages.length]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (userInput.trim() === '' || isProcessing) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      role: 'user',
      content: userInput,
      timestamp: new Date(),
      model: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsProcessing(true);
    
    try {
      // Show scraping status for relevant queries
      const needsRealTimeData = userMessage.content.toLowerCase().includes('price') || 
                               userMessage.content.toLowerCase().includes('current') ||
                               userMessage.content.toLowerCase().includes('movers');
      
      if (needsRealTimeData) {
        const statusMessage: ChatMessage = {
          id: `status-${Date.now()}`,
          type: 'assistant',
          role: 'assistant',
          content: '🔍 Scraping real-time financial data... Please wait.',
          timestamp: new Date(),
          model: 'system'
        };
        setMessages(prev => [...prev, statusMessage]);
      }
      
      // Extract current user investments if available
      const userInvestments = user?.publicMetadata?.investments as Record<string, number> | undefined;
      
      const response = await multiModelAPI.generateResponse(
        userMessage.content,
        selectedModel,
        userInvestments,
        selectedLanguage
      );
      
      // Remove status message if it was added
      if (needsRealTimeData) {
        setMessages(prev => prev.filter(msg => !msg.id.startsWith('status-')));
      }
      
      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        role: 'assistant',
        content: response.content,
        timestamp: response.timestamp,
        model: response.model
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLastBotMessage(response.content);
      
      // Auto-speak the response if voice is supported
      if (isVoiceSupported && response.content) {
        setTimeout(() => {
          speak(response.content);
        }, 500);
      }
      
      // Generate relevant insights based on the conversation
      if (!compact) {
        generateInsights(userMessage.content, response.content);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request and scraping real-time data. Please try again later.",
        timestamp: new Date(),
        model: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setLastBotMessage(errorMessage.content);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateInsights = (userQuery: string, aiResponse: string) => {
    const newInsights: Insight[] = [];
    
    // Web scraping insights
    if (userQuery.toLowerCase().includes('price') || aiResponse.includes('$') || aiResponse.includes('₹')) {
      newInsights.push({
        title: 'Live Data Scraped',
        description: 'Real-time prices scraped from financial websites. Data refreshed automatically.',
        actionable: true,
        action: 'Refresh Data'
      });
    }
    
    // Market movers insights
    if (userQuery.toLowerCase().includes('gainers') || userQuery.toLowerCase().includes('losers')) {
      newInsights.push({
        title: 'Market Movers Analysis',
        description: 'Top gainers and losers identified from live market data scraping.',
        actionable: true,
        action: 'Detailed Analysis'
      });
    }
    
    // Model-specific insights
    if (aiResponse.includes('scraped in real-time')) {
      newInsights.push({
        title: 'Real-Time Verification',
        description: 'Data is scraped live but should be verified before making trading decisions.',
        actionable: true,
        action: 'Risk Assessment'
      });
    }
    
    // Update insights
    if (newInsights.length > 0) {
      setInsights(prev => {
        const combinedInsights = [...prev, ...newInsights];
        return combinedInsights.slice(-5);
      });
    }
  };

  // Voice input handler with automatic language detection
  const handleVoiceInput = async () => {
    try {
      const transcript = await startListening();
      if (transcript.trim()) {
        // Detect language from user's speech
        const detectedLang = detectLanguage(transcript);
        console.log(`Detected language: ${detectedLang.name} (${detectedLang.code}) with confidence: ${detectedLang.confidence}`);
        
        // Auto-switch to detected language if confidence is high enough
        if (detectedLang.confidence > 0.6 && isLanguageSupportedForVoice(detectedLang.code)) {
          setSelectedLanguage(detectedLang.code);
        }
        
        setUserInput(transcript);
        // Auto-submit after a short delay
        setTimeout(() => {
          handleSubmit();
        }, 500);
      }
    } catch (error) {
      console.error('Voice input error:', error);
    }
  };

  return {
    messages,
    userInput,
    setUserInput,
    isProcessing,
    insights,
    lastBotMessage,
    selectedModel,
    setSelectedModel,
    selectedLanguage,
    setSelectedLanguage,
    handleSubmit,
    // Voice capabilities
    isListening,
    isSpeaking,
    handleVoiceInput,
    stopListening,
    stopSpeaking,
    isVoiceSupported
  };
};
