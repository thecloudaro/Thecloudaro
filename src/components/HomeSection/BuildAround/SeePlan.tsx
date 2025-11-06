'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface SeePlanButtonProps {
  href?: string
  onClick?: () => void
  className?: string
}

const SeePlanButton: React.FC<SeePlanButtonProps> = ({ href, onClick, className = '' }) => {
  const baseClasses = `
    inline-flex items-center justify-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-sm
    bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
    transition-transform duration-200 ease-in-out ${className}
  `

  const hover = { y: -4, scale: 1.03 }
  const tap = { scale: 0.98 }

  if (href) {
    return (
      <motion.div whileHover={hover} whileTap={tap}>
        <Link
          href={href}
          className={baseClasses}
        >
          See Plan
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={hover}
      whileTap={tap}
      className={baseClasses}
    >
      See Plan
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </motion.button>
  )
}

export default SeePlanButton
