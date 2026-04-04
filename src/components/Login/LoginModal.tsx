'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Eye, EyeOff, Key } from 'lucide-react';
import Link from 'next/link';
import { useSignup } from '@/components/Signup/SignupContext';
import { commitPortalHandoffThenRedirect } from '@/lib/upmind/commitPortalHandoffClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { openSignup } = useSignup();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔹 Store token
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        if (data.client_id) {
          localStorage.setItem('client_id', data.client_id);
        }
        if (data.actor_id) {
          localStorage.setItem('actor_id', data.actor_id);
        }

        onClose();

        try {
          await commitPortalHandoffThenRedirect({
            access_token: data.access_token,
            client_id: data.client_id,
            actor_id: data.actor_id,
          });
        } catch {
          setError('Signed in but could not open client area. Try again.');
          setLoading(false);
        }
      } else {
        setError(data.message || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    openSignup();
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
            className="fixed inset-0 backdrop-blur-sm z-[10000]"
            style={{ backgroundColor: 'rgba(var(--login-modal-backdrop))' }}
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
            <div className="relative w-full max-w-sm bg-[rgb(var(--login-modal-bg))] rounded-lg shadow-2xl border border-[rgb(var(--login-modal-border))] p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 text-[rgb(var(--login-modal-icon-muted))] hover:text-[rgb(var(--login-modal-icon-hover-text))] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <h2 className="text-xl font-bold text-[rgb(var(--login-modal-text-primary))] mb-6">
                Log into The Cloud Aro
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-[rgb(var(--login-modal-text-secondary))] mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-3 py-2.5 text-sm bg-[rgb(var(--login-modal-input-bg))] border border-[rgb(var(--login-modal-input-border))] rounded-lg text-[rgb(var(--login-modal-text-primary))] placeholder:text-[rgb(var(--login-modal-text-placeholder))] focus:outline-none focus:border-[rgb(var(--login-modal-input-border-focus))] transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-[rgb(var(--login-modal-text-secondary))] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2.5 text-sm bg-[rgb(var(--login-modal-input-bg))] border border-[rgb(var(--login-modal-input-border))] rounded-lg text-[rgb(var(--login-modal-text-primary))] placeholder:text-[rgb(var(--login-modal-text-placeholder))] focus:outline-none focus:border-[rgb(var(--login-modal-input-border-focus))] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[rgb(var(--login-modal-icon-muted))] hover:text-[rgb(var(--login-modal-icon-hover-text))] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-[rgb(var(--login-modal-error))] text-sm text-center">{error}</p>}

                {/* Log in with password button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 text-sm bg-[rgb(var(--login-modal-primary-bg))] text-[rgb(var(--login-modal-primary-text))] font-medium rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[rgb(var(--login-modal-primary-hover))]'}`}
                >
                  {loading ? 'Logging in...' : 'Log in with password'}
                </button>

                {/* OR separator */}
                <div className="flex items-center justify-center my-3">
                  <div className="flex-1 border-t border-[rgb(var(--login-modal-divider))]" />
                  <span className="px-3 text-xs text-[rgb(var(--login-modal-text-muted))]">OR</span>
                  <div className="flex-1 border-t border-[rgb(var(--login-modal-divider))]" />
                </div>

                {/* Log in with passkey button */}
                <button
                  type="button"
                  className="w-full py-2.5 text-sm bg-[rgb(var(--login-modal-input-bg))] border border-[rgb(var(--login-modal-input-border))] hover:border-[rgb(var(--login-modal-secondary-border-hover))] text-[rgb(var(--login-modal-text-primary))] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Key className="w-3.5 h-3.5" />
                  Log in with passkey
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
                <div className="text-[rgb(var(--login-modal-text-muted))]">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={handleSignUpClick}
                    className="text-[rgb(var(--login-modal-link))] hover:text-[rgb(var(--login-modal-link-hover))] transition-colors font-medium"
                  >
                    Sign up
                  </button>
                </div>
                <Link
                  href="#"
                  className="text-[rgb(var(--login-modal-link))] hover:text-[rgb(var(--login-modal-link-hover))] transition-colors"
                >
                  Trouble with log in?
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

