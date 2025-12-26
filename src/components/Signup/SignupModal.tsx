'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLogin } from '@/components/Login/LoginContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const { openLogin } = useLogin();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, username }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      alert('Account created successfully!');
      onClose();
      openLogin(); // Open login modal after successful signup
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    openLogin();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-signup-modal-backdrop backdrop-blur-sm z-[10000]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[10001] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md bg-signup-modal rounded-lg shadow-2xl border border-signup-modal p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 text-signup-modal-close-icon hover-text-signup-modal-close-icon transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <h2 className="text-xl font-bold text-signup-modal-title mb-6">
                Create an account
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                  <p className="mt-1.5 text-xs text-signup-modal-helper">
                    Please use a valid email and proceed with email verification promptly to avoid account issues.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    pattern="[a-zA-Z0-9]+"
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                  <p className="mt-1.5 text-xs text-signup-modal-helper">
                    Your username must contain only letters (a-z) and numbers (0-9).
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 text-sm bg-gradient-signup-modal-button hover-bg-gradient-signup-modal-button text-signup-modal-button font-medium rounded-lg transition-all duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Next'}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-5 text-center text-xs text-signup-modal-helper">
                Already have an account?{' '}
                <button
                  onClick={handleLoginClick}
                  className="text-signup-modal-link hover-text-signup-modal-link transition-colors font-medium"
                >
                  Log in
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;

