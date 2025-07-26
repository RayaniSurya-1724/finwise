
import React from 'react';
import { ChatMessage as ChatMessageType } from '@/hooks/useChatbot';
import { Bot, User, Globe } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';
  
  // Enhanced message formatting for financial data
  const formatFinancialContent = (content: string) => {
    // Format stock prices with colors
    const priceRegex = /([A-Z]{2,5}(?:\.NS)?): ([$₹])(\d+\.?\d*) \(([+-]?\d+\.?\d*), ([+-]?\d+\.?\d*%)\)/g;
    let formattedContent = content.replace(priceRegex, (match, ticker, currency, price, change, percent) => {
      const isPositive = change.startsWith('+') || (!change.startsWith('-') && parseFloat(change) >= 0);
      const colorClass = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
      const icon = isPositive ? '📈' : '📉';
      
      return `**${ticker}**: ${currency}${price} <span class="${colorClass}">(${change}, ${percent}) ${icon}</span>`;
    });
    
    // Format market cap, P/E ratio, volume
    formattedContent = formattedContent.replace(
      /Market Cap: ([^,]+), P\/E: ([^,]+), Volume: ([^\n]+)/g,
      '💼 Market Cap: **$1** | 📊 P/E: **$2** | 📈 Volume: **$3**'
    );
    
    // Format news headlines
    formattedContent = formattedContent.replace(/(\d+\. .+)/g, '📰 $1');
    
    // Format disclaimers
    formattedContent = formattedContent.replace(
      /(Data scraped in real-time\. Verify before trading\.)/g,
      '⚠️ *$1*'
    );
    
    return formattedContent;
  };

  const renderContent = () => {
    if (isUser) {
      return <p className="text-gray-900 dark:text-white">{message.content}</p>;
    }

    const formattedContent = formatFinancialContent(message.content);
    
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: formattedContent
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br>')
          }} 
        />
      </div>
    );
  };

  const getModelIcon = () => {
    if (message.model === 'system') return <Bot className="h-4 w-4" />;
    if (message.model?.includes('gemini')) return <Globe className="h-4 w-4" />;
    return <Bot className="h-4 w-4" />;
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-fintech-blue text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : getModelIcon()}
      </div>
      
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-lg ${
          isUser 
            ? 'bg-fintech-blue text-white' 
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        }`}>
          {renderContent()}
          
          {!isUser && message.model && message.model !== 'system' && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                {getModelIcon()}
                Model: {message.model}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
