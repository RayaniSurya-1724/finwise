import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, Home, PieChart, TrendingUp, User } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

interface NavbarProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

const Navbar = ({ onSignInClick, onSignUpClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Risk Assessment', path: '/risk-assessment', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Investments', path: '/investments', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Market Trends', path: '/market', icon: <TrendingUp className="h-5 w-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-fintech-dark/80 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-fintech-blue to-fintech-blue-light rounded-md animate-pulse"></div>
              <div className="absolute inset-0.5 bg-white dark:bg-fintech-dark rounded-md flex items-center justify-center">
                <span className="text-fintech-blue dark:text-fintech-blue-light font-bold text-lg">F</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fintech-blue to-fintech-blue-light">
              FinWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-medium transition hover:text-fintech-blue dark:hover:text-fintech-blue-light hover-lift ${
                  location.pathname === link.path
                    ? 'text-fintech-blue dark:text-fintech-blue-light'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-white dark:bg-gray-800",
                    userButtonPopoverActions: "bg-white dark:bg-gray-800"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={onSignInClick}
                  className="flex items-center justify-center px-4 py-2 border border-fintech-blue dark:border-fintech-blue-light text-fintech-blue dark:text-fintech-blue-light rounded-lg text-sm font-medium transition hover:bg-fintech-blue hover:text-white dark:hover:bg-fintech-blue-light dark:hover:text-fintech-dark hover-lift"
                >
                  Login
                </button>
                <button 
                  onClick={onSignUpClick}
                  className="flex items-center justify-center px-4 py-2 bg-fintech-blue dark:bg-fintech-blue-light text-white dark:text-fintech-dark rounded-lg text-sm font-medium transition hover:bg-fintech-blue/90 dark:hover:bg-fintech-blue-light/90 hover-lift"
                >
                  Register
                </button>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-fintech-blue dark:hover:text-fintech-blue-light"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-5 pb-3 space-y-3 fadeInUp">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-fintech-blue/10 text-fintech-blue dark:bg-fintech-blue-light/10 dark:text-fintech-blue-light'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <SignedIn>
                <Link 
                  to="/investments" 
                  className="flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
              </SignedIn>
              <SignedOut>
                <button 
                  onClick={onSignInClick}
                  className="flex items-center justify-center px-4 py-2 border border-fintech-blue dark:border-fintech-blue-light text-fintech-blue dark:text-fintech-blue-light rounded-lg text-sm font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={onSignUpClick}
                  className="flex items-center justify-center px-4 py-2 bg-fintech-blue dark:bg-fintech-blue-light text-white dark:text-fintech-dark rounded-lg text-sm font-medium"
                >
                  Register
                </button>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
