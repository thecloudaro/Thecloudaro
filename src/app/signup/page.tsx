'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    'w-full rounded-lg border border-[rgb(var(--signup-modal-input-border))] bg-[rgb(var(--signup-modal-input-bg))] px-3 py-2 text-[rgb(var(--signup-modal-input-text))] placeholder:text-[rgb(var(--signup-modal-input-placeholder))] focus:border-[rgb(var(--signup-modal-input-focus-border))] focus:outline-none';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !cleanPassword ||
      !cleanConfirmPassword
    ) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setError("Passwords don't match.");
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
          password_confirmation: cleanConfirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data.error === 'object'
            ? JSON.stringify(data.error)
            : data.error;
        setError(errorMessage || 'Signup failed');
        setLoading(false);
        return;
      }

      alert('Account created successfully!');
      router.push('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-8 backdrop-blur-sm"
      style={{ backgroundColor: 'rgb(var(--login-page-bg))' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md rounded-lg border border-[rgb(var(--signup-modal-border))] bg-[rgb(var(--signup-modal-bg))] p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={() => router.push('/')}
          className="absolute right-3 top-3 text-[rgb(var(--signup-modal-close-icon))] transition-colors hover:text-[rgb(var(--signup-modal-close-icon-hover))]"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-2 text-xl font-bold text-[rgb(var(--signup-modal-title-text))]">
          Create your account
        </h2>
        <p className="mb-6 text-sm text-[rgb(var(--signup-modal-helper-text))]">
          Enter your details to get started. You’ll verify your email when logging in.
        </p>

        {error ? (
          <div className="mb-4 rounded-lg border border-[rgb(var(--signup-modal-error-border))] bg-[rgba(var(--signup-modal-error-bg))] p-3 text-sm text-[rgb(var(--signup-modal-error-text))]">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoCapitalize="words"
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoCapitalize="words"
            className={inputClass}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoCapitalize="none"
            autoCorrect="off"
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-medium text-[rgb(var(--signup-modal-button-text))] transition-colors bg-[rgb(var(--signup-modal-button-gradient-from))] ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-[rgb(var(--signup-modal-button-gradient-from-hover))]'}`}
          >
            {loading ? 'Creating...' : 'Continue'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[rgb(var(--signup-modal-helper-text))]">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[rgb(var(--signup-modal-link))] hover:text-[rgb(var(--signup-modal-link-hover))]"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
