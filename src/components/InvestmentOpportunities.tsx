
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvestmentOpportunity from './InvestmentOpportunity';

const InvestmentOpportunities = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center space-x-1 bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span className="block w-2 h-2 rounded-full bg-fintech-blue dark:bg-fintech-blue-light"></span>
            <span>Diverse Opportunities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Investment Opportunities</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore a wide range of investment options tailored to your financial goals and risk tolerance.
            Our AI-powered platform provides personalized recommendations for each asset class.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InvestmentOpportunity 
            title="Stock Market" 
            description="Invest in top performing companies and track market trends to maximize your returns over the long-term."
            imageUrl="/placeholder.svg"
            link="/stock-market"
            bgColor="from-blue-500/20 to-indigo-500/20"
          />
          
          <InvestmentOpportunity 
            title="Gold ETFs" 
            description="Add stability to your portfolio with gold-backed exchange-traded funds, a modern way to invest in precious metals."
            imageUrl="/placeholder.svg"
            link="/gold-etfs"
            bgColor="from-amber-500/20 to-yellow-500/20"
          />
          
          <InvestmentOpportunity 
            title="Fixed Deposits" 
            description="Secure guaranteed returns with fixed deposits from top banks. Compare rates and calculate your interest."
            imageUrl="/placeholder.svg"
            link="/fixed-deposits"
            bgColor="from-emerald-500/20 to-teal-500/20"
          />
          
          <InvestmentOpportunity 
            title="Real Estate" 
            description="Explore property investments, REITs, and mortgage options for long-term wealth generation and passive income."
            imageUrl="/placeholder.svg"
            link="/real-estate"
            bgColor="from-orange-500/20 to-red-500/20"
          />
          
          <InvestmentOpportunity 
            title="Cryptocurrency" 
            description="Dive into digital assets with real-time market data, risk assessments, and personalized investment strategies."
            imageUrl="/placeholder.svg"
            link="/cryptocurrency"
            bgColor="from-purple-500/20 to-pink-500/20"
          />
          
          <InvestmentOpportunity 
            title="Mutual Funds" 
            description="Build diversified portfolios with professionally managed funds across various categories and risk levels."
            imageUrl="/placeholder.svg"
            link="/mutual-funds"
            bgColor="from-cyan-500/20 to-sky-500/20"
          />
          
          <InvestmentOpportunity 
            title="Other Investments" 
            description="Explore alternative investments including commodities, startups, NFTs, and emerging market opportunities."
            imageUrl="/placeholder.svg"
            link="/other-investments"
            bgColor="from-slate-500/20 to-gray-500/20"
          />
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;
