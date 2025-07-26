import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

type UserData = {
  mobile?: string;
  moneyAvailable?: number;
  investments?: {
    stocks?: number;
    crypto?: number;
    gold?: number;
    mutualFunds?: number;
    realEstate?: number;
    fixedDeposits?: number;
    other?: number;
  };
};

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: UserData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          } else {
            const initialUserData: UserData = {
              moneyAvailable: 0,
              investments: {
                stocks: 0,
                crypto: 0,
                gold: 0,
                mutualFunds: 0,
                realEstate: 0,
                fixedDeposits: 0,
                other: 0
              }
            };
            await setDoc(doc(db, "users", currentUser.uid), initialUserData);
            setUserData(initialUserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error",
            description: "Failed to load user data",
            variant: "destructive"
          });
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in",
        variant: "destructive"
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const initialUserData: UserData = {
        moneyAvailable: 0,
        investments: {
          stocks: 0,
          crypto: 0,
          gold: 0,
          mutualFunds: 0,
          realEstate: 0,
          fixedDeposits: 0,
          other: 0
        }
      };
      await setDoc(doc(db, "users", result.user.uid), initialUserData);
      setUserData(initialUserData);
      
      toast({
        title: "Account created!",
        description: "Welcome to FinWise!",
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        const initialUserData: UserData = {
          moneyAvailable: 0,
          investments: {
            stocks: 0,
            crypto: 0,
            gold: 0,
            mutualFunds: 0,
            realEstate: 0,
            fixedDeposits: 0,
            other: 0
          }
        };
        await setDoc(doc(db, "users", user.uid), initialUserData);
        setUserData(initialUserData);
      }
      
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast({
        title: "Google Login Failed",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to log out",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateUserData = async (data: UserData) => {
    try {
      if (!user) throw new Error("No user logged in");
      
      await setDoc(doc(db, "users", user.uid), data, { merge: true });
      setUserData(prev => ({ ...prev, ...data }));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Update user data error:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData,
      loading, 
      signIn, 
      signUp, 
      signInWithGoogle, 
      logout, 
      updateUserData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
