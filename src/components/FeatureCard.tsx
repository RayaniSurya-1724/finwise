
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  link?: string;
}

const FeatureCard = ({ title, description, icon, delay = 0, link = "#" }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover-lift hover:shadow-xl transition-all duration-300 glass-card backdrop-blur-sm cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(link)}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-fintech-blue/5 rounded-full -mr-10 -mt-10"></div>
      
      <div className="flex flex-col h-full">
        <div className="bg-fintech-blue/10 dark:bg-fintech-blue/20 text-fintech-blue dark:text-fintech-blue-light p-3 rounded-lg w-fit mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
          {description}
        </p>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            className="text-fintech-blue dark:text-fintech-blue-light text-sm font-medium flex items-center hover:underline"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click propagation
              navigate(link);
            }}
          >
            Learn more
            <svg 
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
