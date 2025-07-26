
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import VoiceControls from './VoiceControls';

interface MessageInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isProcessing: boolean;
  compact?: boolean;
  // Voice props
  isListening?: boolean;
  isSpeaking?: boolean;
  handleVoiceInput?: () => void;
  stopListening?: () => void;
  stopSpeaking?: () => void;
  isVoiceSupported?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  userInput,
  setUserInput,
  handleSubmit,
  isProcessing,
  compact = false,
  isListening = false,
  isSpeaking = false,
  handleVoiceInput,
  stopListening,
  stopSpeaking,
  isVoiceSupported = false
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="relative">
        <Textarea
          ref={inputRef}
          placeholder="Ask about investment advice or use voice input..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`${compact ? 'pr-20' : 'pr-28'} resize-none ${compact ? 'min-h-[40px] max-h-[80px]' : 'min-h-[60px] max-h-[120px]'}`}
          disabled={isProcessing || isListening}
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          {isVoiceSupported && handleVoiceInput && stopListening && stopSpeaking && (
            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              onStartListening={handleVoiceInput}
              onStopListening={stopListening}
              onStopSpeaking={stopSpeaking}
              isSupported={isVoiceSupported}
              disabled={isProcessing}
              compact={compact}
            />
          )}
          
          <Button 
            type="submit" 
            size="icon" 
            className={`${compact ? 'h-8 w-8' : 'h-8 w-8'}`}
            disabled={!userInput.trim() || isProcessing || isListening}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isListening && (
        <div className="mt-2 text-sm text-blue-600 animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Listening... Speak now
        </div>
      )}
    </form>
  );
};

export default MessageInput;
