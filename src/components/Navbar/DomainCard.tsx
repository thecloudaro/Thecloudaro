'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface DomainCardProps {
  title: string;
  desc: string;
}

export default function DomainCard({ title, desc }: DomainCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        bg-card/80
        p-4 sm:p-5
        rounded-2xl
        border border-border
        hover:border-primary/60
        transition
        w-full
        shadow-md
      "
    >
      <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2 flex items-center justify-between">
        {title}
        <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
      </h3>

      <p className="text-muted-foreground text-sm sm:text-sm leading-snug">
        {desc}
      </p>
    </motion.div>
  );
}
