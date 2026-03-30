"use client";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[rgb(var(--not-found-bg-from))] to-[rgb(var(--not-found-bg-to))] text-[rgb(var(--not-found-text))]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-bold drop-shadow-lg text-[rgb(var(--not-found-title))]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>

        <p className="mt-3 text-base text-[rgb(var(--not-found-subtitle))]">Page Not Found</p>

        <motion.a
          href="/"
          className="mt-5 inline-block rounded-full border px-5 py-2 text-sm shadow-md backdrop-blur-md transition border-[rgb(var(--not-found-button-border))] bg-[rgba(var(--not-found-button-bg))] text-[rgb(var(--not-found-button-text))] hover:bg-[rgba(var(--not-found-button-hover-bg))]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  );
}
