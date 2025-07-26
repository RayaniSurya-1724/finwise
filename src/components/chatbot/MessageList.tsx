
import React, { useRef, useEffect } from 'react';
import { LoaderCircle, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '@/hooks/useChatbot';

interface MessageListProps {
  messages: ChatMessageType[];
  isProcessing: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isProcessing && (
        <div className="flex justify-start gap-2">
          <div className="h-8 w-8 rounded-full bg-fintech-blue/10 dark:bg-fintech-blue/20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none px-4 py-2">
            <LoaderCircle className="h-4 w-4 animate-spin text-fintech-blue dark:text-fintech-blue-light" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
