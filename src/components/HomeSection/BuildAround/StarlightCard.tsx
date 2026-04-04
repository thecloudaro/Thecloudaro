"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRevealOnceInView } from "@/hooks/useRevealOnceInView";

const StarlightCard = () => {
  const { ref, revealed } = useRevealOnceInView();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="ba-surface-starlight bg-[hsl(var(--starlight-card-bg))] rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[720px] flex flex-col transition-all duration-500 ease-in-out touch-manipulation">
        <div className="h-1/3 sm:h-2/5 bg-[hsl(var(--starlight-card-header-bg))] relative overflow-hidden flex items-center justify-center">
          <Image 
            src="/Home/VirtualMachine.png" 
            alt="Profile Fan" 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="ba-copy-starlight min-h-0 h-2/3 sm:h-3/5 p-3 sm:p-5 md:p-6 lg:pl-12 flex flex-col justify-center items-start text-left font-sans text-[hsl(var(--starlight-card-text))]">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 sm:mb-2 leading-tight">Virtual machines</h3>
          <p className="text-[hsl(var(--starlight-card-text-muted))] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed items-start text-left max-w-xl">
            Power more possibilities through extra server<br/> 
             muscle matched with flexible control and <br/> 
             scalability.
          </p>

          {/* See Plan button intentionally removed from this (Starlight) card */}
        </div>
      </div>
    </motion.div>
  );
};

export default StarlightCard;
