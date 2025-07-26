
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InvestmentOpportunityProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  bgColor?: string;
}

const InvestmentOpportunity = ({ 
  title, 
  description, 
  imageUrl, 
  link, 
  bgColor = "from-blue-500/20 to-indigo-500/20" 
}: InvestmentOpportunityProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(link)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-80 z-0`}></div>
      
      <div className="absolute inset-0 opacity-30 z-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-700 dark:text-gray-200 text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <button 
          className={`mt-auto self-start flex items-center text-fintech-blue dark:text-fintech-blue-light font-medium text-sm transition-all duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}
        >
          Learn more <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InvestmentOpportunity;
