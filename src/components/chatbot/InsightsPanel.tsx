
import React from 'react';
import { LineChart, TrendingUp, Wallet, PieChart, Bell, ArrowDown } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Insight } from '@/hooks/useChatbot';

interface InsightsPanelProps {
  insights: Insight[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <div className="overflow-auto p-4 space-y-4">
      {insights.map((insight, index) => (
        <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{insight.title}</h4>
            {insight.actionable && <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{insight.description}</p>
          {insight.actionable && insight.action && (
            <button className="mt-2 text-xs font-medium text-fintech-blue dark:text-fintech-blue-light">
              {insight.action}
            </button>
          )}
        </div>
      ))}
      
      <Alert className="bg-fintech-blue/5 dark:bg-fintech-blue/10 border-fintech-blue/20">
        <ArrowDown className="h-4 w-4 text-fintech-blue dark:text-fintech-blue-light" />
        <AlertTitle className="text-sm text-fintech-blue dark:text-fintech-blue-light">Pro Tip</AlertTitle>
        <AlertDescription className="text-xs text-gray-600 dark:text-gray-300">
          Try asking specific questions about stocks, crypto, or mutual funds to get tailored recommendations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default InsightsPanel;
