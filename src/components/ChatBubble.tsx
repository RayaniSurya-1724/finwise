import React, { useState } from 'react';
import { Bot, X, MessageSquare, BookOpen, TrendingUp, Lightbulb, Maximize2, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MessageInput from './chatbot/MessageInput';
import { useChatbot } from '@/hooks/useChatbot';

const QuickReply = ({ title, onClick }: { title: string, onClick: () => void }) => (
  <Button 
    variant="outline" 
    size="sm" 
    className="text-xs py-1 px-2 h-auto flex items-center gap-1 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
    onClick={onClick}
  >
    <span>{title}</span>
    <ChevronRight className="h-3 w-3" />
  </Button>
);

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const navigate = useNavigate();
  
  const { 
    messages, 
    userInput, 
    setUserInput, 
    isProcessing,
    lastBotMessage,
    handleSubmit,
    // Voice capabilities
    isListening,
    isSpeaking,
    handleVoiceInput,
    stopListening,
    stopSpeaking,
    isVoiceSupported
  } = useChatbot(true);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowQuickMenu(false);
  };

  const handleFullScreenChat = () => {
    navigate('/assistant');
  };
  
  const handleQuickReply = (query: string) => {
    setUserInput(query);
    setTimeout(() => {
      handleSubmit();
    }, 100);
  };

  // Sample news data - in a real app, this would come from an API
  const newsItems = [
    "S&P 500 up 0.8% on strong earnings reports",
    "Fed signals potential rate cut next quarter",
    "Tech stocks rally led by AI-focused companies",
    "Bitcoin reaches $63,000 amid institutional adoption",
    "Treasury yields fall on inflation expectations"
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-[350px] h-[500px] flex flex-col overflow-hidden animate-scale-in">
          <div className="bg-fintech-blue dark:bg-fintech-blue-light p-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-medium">FinWise Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-fintech-blue-dark"
                onClick={handleFullScreenChat}
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-fintech-blue-dark"
                onClick={toggleChat}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* News Ticker */}
          <div className="bg-fintech-gold/20 dark:bg-fintech-gold/10 p-1 border-b border-fintech-gold/20 overflow-hidden">
            <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite]">
              {newsItems.map((item, index) => (
                <span key={index} className="inline-block mx-4 text-xs text-gray-800 dark:text-gray-200">
                  <Zap className="inline h-3 w-3 mr-1 text-fintech-gold" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div 
                        className={`inline-block rounded-lg px-3 py-2 text-sm max-w-[85%] ${
                          message.type === 'user' 
                            ? 'bg-fintech-blue text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                        }`}
                      >
                        <div dangerouslySetInnerHTML={{ 
                          __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                        }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Ask me about your investments or financial advice!
                  </p>
                )}
              </div>
              
              {/* Quick Reply Buttons */}
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-1">
                <QuickReply 
                  title="Check Portfolio" 
                  onClick={() => handleQuickReply("Show me my portfolio performance")} 
                />
                <QuickReply 
                  title="Investment Advice" 
                  onClick={() => handleQuickReply("What should I invest in right now?")}
                />
                <QuickReply 
                  title="Market Trends" 
                  onClick={() => handleQuickReply("What are the current market trends?")}
                />
              </div>
              
              {/* Chat Input with Voice */}
              <MessageInput
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
                isProcessing={isProcessing}
                compact={true}
                isListening={isListening}
                isSpeaking={isSpeaking}
                handleVoiceInput={handleVoiceInput}
                stopListening={stopListening}
                stopSpeaking={stopSpeaking}
                isVoiceSupported={isVoiceSupported}
              />
            </div>
          </div>
          
          {/* Quick Access Menu */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => navigate('/risk-assessment')}>
              <TrendingUp className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => navigate('/investments')}>
              <MessageSquare className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => navigate('/market')}>
              <BookOpen className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => navigate('/risk-assessment')}>
              <Lightbulb className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-2">
          {showQuickMenu && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2 mb-2 animate-fade-in">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex justify-start items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-fintech-blue dark:hover:text-fintech-blue-light"
                onClick={() => navigate('/risk-assessment')}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Risk Assessment</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex justify-start items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-fintech-blue dark:hover:text-fintech-blue-light"
                onClick={() => navigate('/investments')}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Investments</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex justify-start items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-fintech-blue dark:hover:text-fintech-blue-light"
                onClick={() => navigate('/market')}
              >
                <BookOpen className="h-4 w-4" />
                <span>Market</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex justify-start items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-fintech-blue dark:hover:text-fintech-blue-light"
                onClick={toggleChat}
              >
                <Bot className="h-4 w-4" />
                <span>Chat Assistant</span>
              </Button>
            </div>
          )}
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-fintech-blue hover:bg-fintech-blue-dark text-white shadow-lg flex items-center justify-center p-0 animate-bounce"
            onMouseEnter={() => setShowQuickMenu(true)}
            onMouseLeave={() => setShowQuickMenu(false)}
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
