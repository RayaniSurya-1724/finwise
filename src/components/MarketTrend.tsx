
import { ExternalLink, TrendingDown, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MarketTrendProps {
  title: string;
  currentValue: number;
  change: number;
  changePercentage: number;
  timeRange: string;
  currency?: string;
  showChart?: boolean;
}

const MarketTrend = ({
  title,
  currentValue,
  change,
  changePercentage,
  timeRange,
  currency = '$',
  showChart = true
}: MarketTrendProps) => {
  const [sparkline, setSparkline] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Generate random sparkline data
    const generateSparkline = () => {
      const base = currentValue - (change * 1.5);
      const points = 12;
      const data = [];
      
      for (let i = 0; i < points; i++) {
        // Create somewhat realistic looking data with a trend towards the final value
        const progress = i / (points - 1);
        const randomVariation = (Math.random() - 0.5) * (currentValue * 0.03); // 3% random variation
        const trendValue = base + (change * 2.5 * progress);
        data.push(Math.max(0, trendValue + randomVariation));
      }
      
      return data;
    };
    
    setSparkline(generateSparkline());
    
    // Trigger animation after a small delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentValue, change]);
  
  const isPositive = changePercentage >= 0;
  const changeColor = isPositive ? 'text-fintech-green' : 'text-fintech-red';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  // Calculate sparkline viewBox dimensions
  const minValue = Math.min(...sparkline) * 0.95;
  const maxValue = Math.max(...sparkline) * 1.05;
  const range = maxValue - minValue;
  
  // Create SVG path for sparkline
  const createSparklinePath = () => {
    if (sparkline.length === 0) return '';
    
    const width = 100;
    const height = 40;
    const xRatio = width / (sparkline.length - 1);
    
    return sparkline.map((value, index) => {
      const x = index * xRatio;
      // Transform the value to fit in our SVG height
      const normalizedValue = ((value - minValue) / range) * height;
      const y = height - normalizedValue;
      
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover-lift duration-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeRange}</p>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{currency}{currentValue.toLocaleString()}</div>
          <div className={`flex items-center justify-end text-sm font-medium ${changeColor}`}>
            <TrendIcon className="h-3.5 w-3.5 mr-1" />
            {isPositive ? '+' : ''}{change.toLocaleString()} ({isPositive ? '+' : ''}{changePercentage.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      {showChart && (
        <div className="mt-4 h-10 relative">
          <svg 
            className="w-full h-full" 
            viewBox={`0 0 100 40`}
            preserveAspectRatio="none"
          >
            {/* Gradient for the area under the line */}
            <defs>
              <linearGradient id={`sparkline-gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop 
                  offset="0%" 
                  stopColor={isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'} 
                  stopOpacity="0.2"
                />
                <stop 
                  offset="100%" 
                  stopColor={isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'} 
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            
            {/* Line */}
            <path
              d={createSparklinePath()}
              fill="none"
              stroke={isPositive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: animate ? '0' : '200',
                strokeDashoffset: animate ? '0' : '200',
                transition: 'stroke-dashoffset 1.5s ease'
              }}
            />
            
            {/* Area under the line */}
            <path
              d={`${createSparklinePath()} L100,40 L0,40 Z`}
              fill={`url(#sparkline-gradient-${title.replace(/\s+/g, '-')})`}
              style={{
                opacity: animate ? '1' : '0',
                transition: 'opacity 1s ease'
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MarketTrend;
