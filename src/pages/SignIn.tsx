
import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-fintech-blue to-fintech-blue-light flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back to FinWise</h1>
          <p className="text-fintech-blue-light/80">Sign in to your account to continue</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6">
          <SignIn 
            afterSignInUrl="/"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-fintech-blue hover:bg-fintech-blue-light text-white transition-colors",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "border-gray-300 hover:bg-gray-50 transition-colors",
                footerActionLink: "text-fintech-blue hover:text-fintech-blue-light"
              },
            }}
          />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
