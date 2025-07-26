
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import RiskAssessment from "./pages/RiskAssessment";
import Investments from "./pages/Investments";
import Market from "./pages/Market";
import ChatAssistant from "./pages/ChatAssistant";
import NotFound from "./pages/NotFound";
import ChatBubble from "./components/ChatBubble";
import StockMarket from "./pages/investments/StockMarket";
import GoldETFs from "./pages/investments/GoldETFs";
import FixedDeposits from "./pages/investments/FixedDeposits";
import RealEstate from "./pages/investments/RealEstate";
import Cryptocurrency from "./pages/investments/Cryptocurrency";
import MutualFunds from "./pages/investments/MutualFunds";
import OtherInvestments from "./pages/investments/OtherInvestments";
import StockDetails from "./pages/StockDetails";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-fintech-blue-light/30 border-t-fintech-blue-light rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  useEffect(() => {
    // Set the body background color
    document.body.className = "bg-white dark:bg-gray-900";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Redirect dashboard to risk assessment */}
        <Route path="/dashboard" element={<Navigate to="/risk-assessment" replace />} />
        {/* Redirect sign-in and sign-up routes to home */}
        <Route path="/sign-in" element={<Navigate to="/" replace />} />
        <Route path="/sign-up" element={<Navigate to="/" replace />} />
        
        {/* Protected Routes */}
        <Route path="/risk-assessment" element={
          <ProtectedRoute>
            <RiskAssessment />
          </ProtectedRoute>
        } />
        <Route path="/investments" element={
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        } />
        <Route path="/market" element={
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        } />
        <Route path="/stock-details/:symbol" element={
          <ProtectedRoute>
            <StockDetails />
          </ProtectedRoute>
        } />
        
        {/* Investment Routes */}
        <Route path="/stock-market" element={
          <ProtectedRoute>
            <StockMarket />
          </ProtectedRoute>
        } />
        <Route path="/gold-etfs" element={
          <ProtectedRoute>
            <GoldETFs />
          </ProtectedRoute>
        } />
        <Route path="/fixed-deposits" element={
          <ProtectedRoute>
            <FixedDeposits />
          </ProtectedRoute>
        } />
        <Route path="/real-estate" element={
          <ProtectedRoute>
            <RealEstate />
          </ProtectedRoute>
        } />
        <Route path="/cryptocurrency" element={
          <ProtectedRoute>
            <Cryptocurrency />
          </ProtectedRoute>
        } />
        <Route path="/mutual-funds" element={
          <ProtectedRoute>
            <MutualFunds />
          </ProtectedRoute>
        } />
        <Route path="/other-investments" element={
          <ProtectedRoute>
            <OtherInvestments />
          </ProtectedRoute>
        } />
        
        <Route path="/assistant" element={<ChatAssistant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Floating Chat Bubble - visible on all pages */}
      <ChatBubble />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
