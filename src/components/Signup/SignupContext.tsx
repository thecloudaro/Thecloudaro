'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SignupContextType {
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  return (
    <SignupContext.Provider value={{ isSignupOpen, openSignup, closeSignup }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};

