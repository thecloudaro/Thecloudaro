'use client';

import { useLogin } from './LoginContext';
import LoginModal from './LoginModal';

const LoginModalWrapper = () => {
  const { isLoginOpen, closeLogin } = useLogin();

  return <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />;
};

export default LoginModalWrapper;

