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
      router.push('/login'); // ya next step page
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: 'rgb(var(--signup-page-bg))' }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-800 p-4 sm:p-6"
      >
        <button
          onClick={handleClose}
          className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
          Create an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
              className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Please use a valid email and proceed with email verification promptly to avoid account issues.
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              pattern="[a-zA-Z0-9]+"
              className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Your username must contain only letters (a-z) and numbers (0-9).
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Next'}
          </button>
        </form>

        <div className="mt-4 sm:mt-5 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
            Log in
          </Link>
        </div>
      </motion.div>

      
    </div>
  );
};

export default SignUpPage;
