'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { commitPortalHandoffThenRedirect } from '@/lib/upmind/commitPortalHandoffClient';

const LoginPage = () => {
  const router = useRouter();
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
        const resolvedClientId = data.client_id || data.actor_id || null;
        const resolvedActorId = data.actor_id || data.client_id || null;

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        if (resolvedClientId) {
          localStorage.setItem('client_id', resolvedClientId);
        }
        if (resolvedActorId) {
          localStorage.setItem('actor_id', resolvedActorId);
        }

        try {
          await commitPortalHandoffThenRedirect({
            access_token: data.access_token,
            client_id: resolvedClientId,
            actor_id: resolvedActorId,
          });
        } catch {
          setError('Signed in but could not open client area. Try again or use the client portal link.');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgb(var(--login-page-bg))' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-sm rounded-lg border border-[rgb(var(--login-modal-border))] bg-[rgb(var(--login-modal-bg))] p-4 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 text-[rgb(var(--login-modal-icon-muted))] transition-colors hover:text-[rgb(var(--login-modal-icon-hover-text))] sm:right-3 sm:top-3"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <h2 className="mb-4 text-lg font-bold text-[rgb(var(--login-modal-text-primary))] sm:mb-6 sm:text-xl">
          Log into The Cloud Aro
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--login-modal-text-secondary))] sm:text-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full rounded-lg border border-[rgb(var(--login-modal-input-border))] bg-[rgb(var(--login-modal-input-bg))] px-3 py-2 text-sm text-[rgb(var(--login-modal-text-primary))] transition-colors placeholder:text-[rgb(var(--login-modal-text-placeholder))] focus:border-[rgb(var(--login-modal-input-border-focus))] focus:outline-none sm:py-2.5"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--login-modal-text-secondary))] sm:text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-[rgb(var(--login-modal-input-border))] bg-[rgb(var(--login-modal-input-bg))] px-3 py-2 pr-10 text-sm text-[rgb(var(--login-modal-text-primary))] transition-colors placeholder:text-[rgb(var(--login-modal-text-placeholder))] focus:border-[rgb(var(--login-modal-input-border-focus))] focus:outline-none sm:py-2.5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 transform text-[rgb(var(--login-modal-icon-muted))] transition-colors hover:text-[rgb(var(--login-modal-icon-hover-text))]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="mb-4 text-center text-sm text-[rgb(var(--login-modal-error))]">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2.5 text-sm font-medium text-[rgb(var(--login-modal-primary-text))] transition-colors sm:text-base bg-[rgb(var(--login-modal-primary-bg))] ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-[rgb(var(--login-modal-primary-hover))]'}`}
          >
            {loading ? 'Logging in...' : 'Log in with password'}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-start justify-between gap-2 text-xs sm:mt-5 sm:flex-row sm:items-center sm:gap-0">
          <div className="text-[rgb(var(--login-modal-text-muted))]">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-[rgb(var(--login-modal-link))] transition-colors hover:text-[rgb(var(--login-modal-link-hover))]"
            >
              Sign up
            </Link>
          </div>
          <Link
            href="#"
            className="text-[rgb(var(--login-modal-link))] transition-colors hover:text-[rgb(var(--login-modal-link-hover))]"
          >
            Trouble with log in?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
