'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLogin } from '@/components/Login/LoginContext';
import { commitPortalHandoffThenRedirect } from '@/lib/upmind/commitPortalHandoffClient';
import {
  SIGNUP_PASSWORD_RED_HINT,
  getSignupPasswordValidationError,
} from '@/lib/signupPasswordPolicy';
import SignupPasswordHint from '@/components/Signup/SignupPasswordHint';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const { openLogin } = useLogin();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !cleanPassword ||
      !cleanConfirm
    ) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    if (getSignupPasswordValidationError(cleanPassword)) {
      setError(SIGNUP_PASSWORD_RED_HINT);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: cleanFirstName,
          lastname: cleanLastName,
          email: cleanEmail,
          password: cleanPassword,
          password_confirmation: cleanConfirm,
        }),
      });

      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        setError('Invalid response from server. Please use the signup page or try again.');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Signup failed');
        setLoading(false);
        return;
      }

      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanEmail, password: cleanPassword }),
      });
      const loginData = await loginRes.json();

      if (!loginRes.ok || !loginData?.access_token) {
        onClose();
        openLogin();
        setLoading(false);
        return;
      }

      localStorage.setItem('access_token', loginData.access_token);
      if (loginData.refresh_token) {
        localStorage.setItem('refresh_token', loginData.refresh_token);
      }
      if (loginData.client_id) {
        localStorage.setItem('client_id', loginData.client_id);
      }
      if (loginData.actor_id) {
        localStorage.setItem('actor_id', loginData.actor_id);
      }

      onClose();
      try {
        await commitPortalHandoffThenRedirect({
          access_token: loginData.access_token,
          client_id: loginData.client_id,
          actor_id: loginData.actor_id,
        });
      } catch {
        openLogin();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error');
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-signup-modal-backdrop backdrop-blur-sm z-[10000]"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[10001] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md bg-signup-modal rounded-lg shadow-2xl border border-signup-modal p-6 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 text-signup-modal-close-icon hover-text-signup-modal-close-icon transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-xl font-bold text-signup-modal-title mb-6">
                Create an account
              </h2>

              {error ? (
                <div className="mb-4 rounded-lg border border-[rgb(var(--signup-modal-error-border))] bg-[rgba(var(--signup-modal-error-bg))] p-3 text-sm text-[rgb(var(--signup-modal-error-text))] whitespace-pre-line">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    autoComplete="given-name"
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
                    autoComplete="family-name"
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
                    autoComplete="email"
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                  <p className="mt-1.5 text-xs text-signup-modal-helper">
                    You’ll use this email to sign in.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                  <div className="mt-2">
                    <SignupPasswordHint className="text-xs text-signup-modal-helper" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-signup-modal-label mb-1.5">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    className="w-full px-3 py-2.5 text-sm bg-signup-modal-input border border-signup-modal-input rounded-lg text-signup-modal-input placeholder-signup-modal-input focus:outline-none focus-border-signup-modal-input transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 text-sm bg-gradient-signup-modal-button hover-bg-gradient-signup-modal-button text-signup-modal-button font-medium rounded-lg transition-all duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
              </form>

              <div className="mt-5 text-center text-xs text-signup-modal-helper">
                Already have an account?{' '}
                <button
                  type="button"
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
