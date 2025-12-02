'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Eye, EyeOff, Key } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ username, password });
    // Navigate to dashboard or home after login
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: 'rgb(var(--login-page-bg))' }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-sm bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-800 p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
          Log into The Cloud Aro
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 sm:py-2.5 text-sm bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Log in with password button */}
          <button
            type="submit"
            className="w-full py-2.5 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Log in with password
          </button>

          {/* OR separator */}
          <div className="flex items-center justify-center my-3">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Log in with passkey button */}
          <button
            type="button"
            className="w-full py-2.5 text-sm sm:text-base bg-[#2a2a2a] border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Log in with passkey
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs">
          <div className="text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
              Sign up
            </Link>
          </div>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Trouble with log in?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

