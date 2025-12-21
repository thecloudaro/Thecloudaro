"use client";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-bold text-gray-400 drop-shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>

        <p className="mt-3 text-base text-gray-300">Page Not Found</p>

        <motion.a
          href="/"
          className="mt-5 inline-block px-5 py-2 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-full hover:bg-gray-700/60 transition text-sm text-gray-200 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  );
}
