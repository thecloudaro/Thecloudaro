"use client";

import { motion } from "framer-motion";
import React from "react";

interface DomainCardProps {
  title: string;
  subtitle: string;
  description: string;
  color?: string;
}

const DomainCard: React.FC<DomainCardProps> = ({
  title,
  subtitle,
  description,
  color = "bg-neutral-800",
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`rounded-2xl p-6 ${color} text-white flex flex-col justify-between shadow-lg`}
    >
      {/* Placeholder for image or icon */}
      <div className="h-40 w-full rounded-xl bg-gradient-to-tr from-neutral-700 to-neutral-900 mb-5" />

      <div>
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          {subtitle}
        </p>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default DomainCard;
