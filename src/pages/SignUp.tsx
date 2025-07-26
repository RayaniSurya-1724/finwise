
import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-fintech-blue to-fintech-blue-light flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join FinWise</h1>
          <p className="text-fintech-blue-light/80">Create your account to get started</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6">
          <SignUp 
            afterSignUpUrl="/"
            signInUrl="/sign-in"
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

export default SignUpPage;
