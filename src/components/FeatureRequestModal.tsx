"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, FormEvent } from "react";

interface FeatureRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeatureRequestModal({
  isOpen,
  onClose,
}: FeatureRequestModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ title, description, email, name, agree });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-modal-bg text-modal-text rounded-2xl shadow-2xl border border-modal-border p-6 sm:p-7"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-modal-text-muted hover:text-modal-text text-lg"
            >
              ✕
            </button>

            {/* Header */}
<div className="text-center mb-6">
  <div className="relative flex justify-center mb-5">
    {/* Background Glow */}
    <div className="absolute w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-700 via-indigo-500 to-purple-600 rounded-full blur-3xl opacity-40 animate-pulse" />
    {/* Main Icon Badge */}
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-800/40 border border-blue-500/30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
  </div>

  <h2 className="text-xl sm:text-2xl font-semibold">
    Request a New Feature
  </h2>
  <p className="text-modal-text-muted text-sm mt-1">
    We love to know what you like to see next.
  </p>
  <p className="text-modal-text-secondary text-xs mt-1">
    Need help instead?{" "}
    <Link 
      href="/about/contactus" 
      className="hover:underline"
      style={{ color: 'rgb(var(--feature-modal-link))' }}
    >
      Contact Support
    </Link>
  </p>
</div>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'rgb(var(--feature-modal-label))' }}>
                  Title <span className="text-xs" style={{ color: 'rgb(var(--feature-modal-label-optional))' }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a short title"
                  className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none transition"
                  style={{ borderColor: 'rgb(var(--feature-modal-input-border))' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border-focus))';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border))';
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-1" style={{ color: 'rgb(var(--feature-modal-label))' }}>
                  Feature Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your feature..."
                  rows={3}
                  className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none transition"
                  style={{ borderColor: 'rgb(var(--feature-modal-input-border))' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border-focus))';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border))';
                  }}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'rgb(var(--feature-modal-label))' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none transition"
                    style={{ borderColor: 'rgb(var(--feature-modal-input-border))' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border-focus))';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border))';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'rgb(var(--feature-modal-label))' }}>
                    Full Name{" "}
                    <span className="text-xs" style={{ color: 'rgb(var(--feature-modal-label-optional))' }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none transition"
                    style={{ borderColor: 'rgb(var(--feature-modal-input-border))' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border-focus))';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--feature-modal-input-border))';
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                  style={{ accentColor: 'rgb(var(--feature-modal-checkbox-accent))' }}
                />
                <label className="leading-tight" style={{ color: 'rgb(var(--feature-modal-checkbox-label))' }}>
                  I agree to be contacted about my feedback.
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-medium"
                  style={{ color: 'rgb(var(--feature-modal-cancel-text))' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgb(var(--feature-modal-cancel-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(var(--feature-modal-cancel-text))';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full px-5 py-2 text-sm transition-all"
                  style={{
                    backgroundColor: 'rgb(var(--feature-modal-submit-bg))',
                    color: 'rgb(var(--feature-modal-submit-text))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--feature-modal-submit-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--feature-modal-submit-bg))';
                  }}
                >
                  Submit Feature
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
