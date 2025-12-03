'use client';

import { useSignup } from './SignupContext';
import SignupModal from './SignupModal';

const SignupModalWrapper = () => {
  const { isSignupOpen, closeSignup } = useSignup();

  return <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />;
};

export default SignupModalWrapper;

