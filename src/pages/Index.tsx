import { useEffect, useState } from 'react';
import { ArrowRight, BarChart2, BrainCog, LineChart, Shield, UserCheck } from 'lucide-react';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: 'AI-Powered Risk Assessment',
      description: 'Advanced algorithms analyze your financial situation to determine your ideal risk profile and investment strategy.',
      icon: <BrainCog className="h-5 w-5" />,
    },
    {
      title: 'Personalized Portfolio',
      description: 'Get tailored investment recommendations based on your financial goals, time horizon, and risk tolerance.',
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      title: 'Real-Time Market Data',
      description: 'Access live stock prices, cryptocurrency rates, and financial market updates to make informed decisions.',
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: 'Advanced Analytics',
      description: 'Visualize your investment performance with interactive charts and comprehensive financial analysis tools.',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: 'Secure Platform',
      description: 'Bank-level security protocols ensure your financial data and investments are protected at all times.',
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <Navbar 
        onSignInClick={() => {
          setShowSignIn(true);
          setShowSignUp(false);
        }}
        onSignUpClick={() => {
          setShowSignUp(true);
          setShowSignIn(false);
        }}
      />
      
      <main className="overflow-hidden">
        {/* Authentication Modal Overlay */}
        {(showSignIn || showSignUp) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative">
              <button
                onClick={() => {
                  setShowSignIn(false);
                  setShowSignUp(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
              
              {showSignIn && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Sign in to your FinWise account
                    </p>
                  </div>
                  <SignIn 
                    afterSignInUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-fintech-blue hover:bg-fintech-blue-light text-white transition-colors",
                        card: "shadow-none bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50 transition-colors",
                        footerActionLink: "text-fintech-blue hover:text-fintech-blue-light"
                      },
                    }}
                  />
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setShowSignIn(false);
                        setShowSignUp(true);
                      }}
                      className="text-fintech-blue hover:text-fintech-blue-light text-sm"
                    >
                      Don't have an account? Sign up
                    </button>
                  </div>
                </div>
              )}
              
              {showSignUp && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Join FinWise
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create your account to get started
                    </p>
                  </div>
                  <SignUp 
                    afterSignUpUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-fintech-blue hover:bg-fintech-blue-light text-white transition-colors",
                        card: "shadow-none bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50 transition-colors",
                        footerActionLink: "text-fintech-blue hover:text-fintech-blue-light"
                      },
                    }}
                  />
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setShowSignUp(false);
                        setShowSignIn(true);
                      }}
                      className="text-fintech-blue hover:text-fintech-blue-light text-sm"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <SignedOut>
          <Hero />
        </SignedOut>

        <SignedIn>
          {/* Welcome back section for signed-in users */}
          <section className="pt-20 pb-12 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                  Welcome Back to FinWise
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Ready to continue your investment journey? Access your dashboard or explore new opportunities.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 bg-fintech-blue text-white font-medium rounded-lg shadow-lg hover:bg-fintech-blue/90 transition-transform hover:-translate-y-1"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/investments"
                    className="inline-flex items-center justify-center px-6 py-3 border border-fintech-blue text-fintech-blue dark:text-fintech-blue-light font-medium rounded-lg hover:bg-fintech-blue/10 transition-transform hover:-translate-y-1"
                  >
                    Explore Investments
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </SignedIn>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center space-x-1 bg-fintech-blue/10 dark:bg-fintech-blue-light/10 text-fintech-blue dark:text-fintech-blue-light px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="block w-2 h-2 rounded-full bg-fintech-blue dark:bg-fintech-blue-light"></span>
                <span>Smart Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Powered by Advanced AI</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform combines artificial intelligence with financial expertise to deliver 
                a personalized investment experience tailored to your unique financial situation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center space-x-1 bg-fintech-gold/10 text-fintech-gold px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="block w-2 h-2 rounded-full bg-fintech-gold"></span>
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gold-gradient mb-4">How It Works</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Getting started with our AI-powered investment platform is easy. 
                Follow these simple steps to begin your journey to financial growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Complete Risk Assessment',
                  description: 'Answer a few questions about your income, savings, and investment preferences',
                  delay: 0
                },
                {
                  step: '02',
                  title: 'Review AI Recommendations',
                  description: 'Get personalized investment suggestions based on your risk profile and financial goals',
                  delay: 200
                },
                {
                  step: '03',
                  title: 'Track Your Investments',
                  description: 'Monitor performance, receive insights, and adjust your strategy as needed',
                  delay: 400
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${item.delay}ms` }}
                >
                  <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-fintech-gold/80 flex items-center justify-center text-white font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  {index === 0 && (
                    <Link
                      to="/risk-assessment"
                      className="inline-flex items-center text-fintech-blue dark:text-fintech-blue-light text-sm font-medium hover:underline"
                    >
                      Start Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <SignedOut>
          <section className="py-20 bg-gradient-to-r from-fintech-blue to-fintech-blue-light text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Investing Smarter?</h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of investors who are using AI to optimize their financial future.
                Get started today and see the difference intelligent investing can make.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/risk-assessment"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-fintech-blue font-medium rounded-lg shadow-lg hover:bg-opacity-90 transition-transform hover:-translate-y-1"
                >
                  Start Risk Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-transform hover:-translate-y-1"
                >
                  View Demo Dashboard
                </Link>
              </div>
            </div>
          </section>
        </SignedOut>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative w-8 h-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-fintech-blue to-fintech-blue-light rounded-md"></div>
                    <div className="absolute inset-0.5 bg-gray-900 rounded-md flex items-center justify-center">
                      <span className="text-fintech-blue-light font-bold text-lg">F</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-white">FinWise</span>
                </div>
                <p className="text-gray-400 text-sm">
                  AI-powered financial investment assistant helping you make smarter investment decisions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
                  <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">Dashboard</Link></li>
                  <li><Link to="/risk-assessment" className="text-gray-400 hover:text-white text-sm">Risk Assessment</Link></li>
                  <li><Link to="/investments" className="text-gray-400 hover:text-white text-sm">Investments</Link></li>
                  <li><Link to="/market" className="text-gray-400 hover:text-white text-sm">Market Trends</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Disclaimers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400 text-sm">Email: support@finwise.com</li>
                  <li className="text-gray-400 text-sm">Phone: +1 (555) 123-4567</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} FinWise. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
