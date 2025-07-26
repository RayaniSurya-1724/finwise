
import React from 'react';
import { Bot } from 'lucide-react';

interface ChatbotHeaderProps {
  compact?: boolean;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ compact = false }) => {
  if (compact) return null;
  
  return (
    <div className="bg-fintech-blue/10 dark:bg-fintech-blue/20 p-4 flex items-center gap-3 border-b">
      <Bot className="w-6 h-6 text-fintech-blue dark:text-fintech-blue-light" />
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white">FinWise AI Advisor</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your personal financial assistant
        </p>
      </div>
    </div>
  );
};

export default ChatbotHeader;
