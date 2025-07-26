
import { ArrowRight, ChevronDown, ChevronUp, Info, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface InvestmentSuggestionProps {
  title: string;
  type: string;
  allocation: number;
  risk: 'Low' | 'Medium' | 'High';
  returnRange: string;
  description: string;
  examples: Array<{
    name: string;
    ticker?: string;
    change?: number;
    price?: number;
  }>;
}

const InvestmentSuggestion = ({
  title,
  type,
  allocation,
  risk,
  returnRange,
  description,
  examples
}: InvestmentSuggestionProps) => {
  const [expanded, setExpanded] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-blue-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'High':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-fintech-green' : 'text-fintech-red';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover-lift">
      <div className="px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fintech-blue/10 text-fintech-blue dark:bg-fintech-blue-light/10 dark:text-fintech-blue-light mb-2">
              {type}
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{allocation}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Allocation</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <div className={`text-xs font-medium px-2 py-1 rounded ${getRiskColor(risk)}`}>
              {risk} Risk
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Return Range</div>
            <div className="font-semibold">{returnRange}</div>
          </div>
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center w-full px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  More
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center">
              <Info className="h-4 w-4 mr-1 text-fintech-blue dark:text-fintech-blue-light" />
              Examples
            </h4>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    {examples[0]?.ticker && (
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ticker
                      </th>
                    )}
                    {examples[0]?.price !== undefined && (
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                    )}
                    {examples[0]?.change !== undefined && (
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Change
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {examples.map((example, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                        {example.name}
                      </td>
                      {example.ticker && (
                        <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                          {example.ticker}
                        </td>
                      )}
                      {example.price !== undefined && (
                        <td className="px-4 py-2 text-sm text-right text-gray-900 dark:text-white">
                          ${example.price.toFixed(2)}
                        </td>
                      )}
                      {example.change !== undefined && (
                        <td className={`px-4 py-2 text-sm text-right font-medium ${getChangeColor(example.change)}`}>
                          <div className="flex items-center justify-end">
                            {example.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ChevronDown className="h-3 w-3 mr-1" />
                            )}
                            {example.change.toFixed(2)}%
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="inline-flex items-center text-sm text-fintech-blue dark:text-fintech-blue-light hover:underline">
                View All Options
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentSuggestion;
