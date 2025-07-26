
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/hooks/useChatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Settings,
  Zap,
  Brain,
  Languages
} from 'lucide-react';
import { convertTextToSpeech } from '@/services/groqAPI';
import { toast } from 'sonner';
import { ModelType } from '@/services/multiModelAPI';
import MessageList from './MessageList';
import ChatbotHeader from './ChatbotHeader';
import InsightsPanel from './InsightsPanel';

interface ChatInterfaceProps {
  compact?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ compact = false }) => {
  const { 
    messages, 
    userInput, 
    setUserInput, 
    isProcessing, 
    insights,
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
  } = useChatbot(compact);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextToSpeech = async (text: string) => {
    try {
      toast.info('Converting text to speech...');
      await convertTextToSpeech(text);
      toast.success('Text converted to speech');
    } catch (error) {
      console.error('Error converting text to speech:', error);
      toast.error('Failed to convert text to speech');
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value as ModelType);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const getLanguageName = (code: string) => {
    const languages = {
      'en': 'English',
      'hi': 'हिंदी (Hindi)',
      'te': 'తెలుగు (Telugu)'
    };
    return languages[code as keyof typeof languages] || 'English';
  };

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'gemini-pro':
      case 'gemini-flash':
      case 'general-mode':
        return <Brain className="h-4 w-4" />;
      case 'rag-mode':
        return <TrendingUp className="h-4 w-4" />;
      case 'llama-3-70b':
        return <Zap className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getModelName = (model: string) => {
    switch (model) {
      case 'gemini-pro':
        return 'Gemini Pro';
      case 'gemini-flash':
        return 'Gemini Flash';
      case 'llama-3-70b':
        return 'Llama 3 70B';
      case 'rag-mode':
        return 'RAG Financial Advisor';
      case 'general-mode':
        return 'General AI Assistant';
      case 'auto':
        return 'Auto Select';
      default:
        return 'AI Model';
    }
  };

  return (
    <div className={`flex flex-col ${compact ? 'h-[500px]' : 'h-full'} bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      <ChatbotHeader compact={compact} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 flex flex-col overflow-hidden ${!compact && 'md:border-r border-gray-200 dark:border-gray-700'}`}>
          <MessageList 
            messages={messages} 
            isProcessing={isProcessing} 
          />
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {/* Model and Language Selection */}
            {!compact && (
              <div className="mb-3 space-y-2">
                {/* Language Selection */}
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-48 h-8">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          <span className="text-sm">{getLanguageName(selectedLanguage)}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <span>🇺🇸</span>
                          <span>English</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hi">
                        <div className="flex items-center gap-2">
                          <span>🇮🇳</span>
                          <span>हिंदी (Hindi)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="te">
                        <div className="flex items-center gap-2">
                          <span>🇮🇳</span>
                          <span>తెలుగు (Telugu)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Model Selection */}
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Select value={selectedModel} onValueChange={handleModelChange}>
                    <SelectTrigger className="w-48 h-8">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {getModelIcon(selectedModel)}
                          <span className="text-sm">{getModelName(selectedModel)}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          <span>Auto Select</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rag-mode">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span>RAG Financial Advisor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="general-mode">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span>General AI Assistant</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gemini-pro">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          <span>Gemini Pro</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gemini-flash">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          <span>Gemini Flash</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="llama-3-70b">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          <span>Llama 3 70B</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Real-time data enabled
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex space-x-2">
              {!compact && isVoiceSupported && (
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  onClick={isListening ? stopListening : handleVoiceInput}
                  className="shrink-0"
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              )}
              
              {isSpeaking && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={stopSpeaking}
                  className="shrink-0 text-blue-600 animate-pulse"
                  title="Stop speaking"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
              
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about stocks, market news, or use voice input..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isProcessing || isListening}
                  className="pr-10"
                />
                {isProcessing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-fintech-blue border-t-transparent rounded-full" />
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                size="icon" 
                disabled={isProcessing || userInput.trim() === '' || isListening}
                className="bg-fintech-blue hover:bg-fintech-blue-dark text-white shrink-0"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            
            {isListening && (
              <div className="mt-2 text-sm text-blue-600 animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Listening... Speak now
              </div>
            )}
          </div>
        </div>
        
        {!compact && (
          <div className="hidden md:flex md:flex-col w-72 bg-gray-50 dark:bg-gray-800/30">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <Lightbulb className="h-5 w-5 text-fintech-blue dark:text-fintech-blue-light mr-2" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI Insights</h3>
            </div>
            
            <InsightsPanel insights={insights} />
            
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Multi-Model AI System
              </p>
              <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                <Brain className="h-3 w-3" />
                <span>Gemini Pro/Flash</span>
                <span>•</span>
                <Zap className="h-3 w-3" />
                <span>Llama 3 70B</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
