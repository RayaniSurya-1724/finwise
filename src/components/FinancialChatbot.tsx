
import React from 'react';
import { Card } from '@/components/ui/card';
import ChatInterface from './chatbot/ChatInterface';

const FinancialChatbot = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto flex flex-col h-full rounded-xl shadow-lg overflow-hidden">
        <ChatInterface />
      </Card>
    </div>
  );
};

export default FinancialChatbot;
