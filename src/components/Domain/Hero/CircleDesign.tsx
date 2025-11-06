import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircleDesignProps {
  className?: string;
}

export const CircleDesign = ({ 
  className
}: CircleDesignProps) => {
  const containerClasses = cn(
    "relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]",
    className
  );

  return (
    <div className={containerClasses}>
      <GeometricCircleDesign />
    </div>
  );
};

// Geometric Circle Design with Fixed Color Scheme
const GeometricCircleDesign = () => (
  <div className="relative w-full h-full">
    {/* Outer Glow */}
    <div className="absolute inset-0 rounded-full bg-[hsl(var(--gradient-turquoise))]/20 blur-3xl"></div>
    
    {/* Main Sphere Base */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--gradient-dark-teal))] via-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-near-black))] shadow-2xl">
      
      {/* Bright Green Highlight - Center Right */}
      <div className="absolute top-[20%] right-[15%] w-[50%] h-[50%] rounded-full bg-[hsl(var(--gradient-bright-green))] opacity-70 blur-2xl"></div>
      
      {/* Turquoise Mid-tone */}
      <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] rounded-full bg-[hsl(var(--gradient-turquoise))] opacity-50 blur-3xl"></div>
      
      {/* Aqua Layer */}
      <div className="absolute inset-[15%] rounded-full bg-gradient-radial from-[hsl(var(--gradient-aqua))]/40 to-transparent blur-xl"></div>
      
      {/* Dark Shadow - Bottom Left */}
      <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[hsl(var(--gradient-near-black))] opacity-80 blur-2xl"></div>
      
      {/* Glass Shine Effect */}
      <div className="absolute top-[15%] right-[20%] w-[30%] h-[30%] rounded-full bg-white/20 blur-lg"></div>
      
      {/* Geometric Shapes Animation */}
      <GeometricShapes />
    </div>
  </div>
);

// Animated Geometric Shapes
const GeometricShapes = () => (
  <div className="absolute inset-0">
    {/* Rotating Triangle */}
    <motion.div
      className="absolute top-[25%] left-[25%] w-0 h-0"
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-[hsl(var(--gradient-bright-green))]/60"
        style={{ filter: 'blur(1px)' }}
      />
    </motion.div>

    {/* Rotating Square */}
    <motion.div
      className="absolute top-[35%] right-[30%] w-[25px] h-[25px]"
      animate={{ 
        rotate: -360,
        scale: [1, 0.8, 1],
        opacity: [0.5, 0.9, 0.5]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    >
      <div 
        className="w-full h-full bg-[hsl(var(--gradient-turquoise))]/50"
        style={{ 
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(1px)'
        }}
      />
    </motion.div>

    {/* Rotating Hexagon */}
    <motion.div
      className="absolute bottom-[30%] left-[35%] w-[30px] h-[30px]"
      animate={{ 
        rotate: 360,
        scale: [0.8, 1.1, 0.8],
        opacity: [0.4, 0.8, 0.4]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    >
      <div 
        className="w-full h-full bg-[hsl(var(--gradient-aqua))]/40"
        style={{ 
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          filter: 'blur(1px)'
        }}
      />
    </motion.div>

    {/* Floating Diamond */}
    <motion.div
      className="absolute top-[45%] right-[20%] w-[20px] h-[20px]"
      animate={{ 
        y: [-10, 10, -10],
        rotate: [0, 180, 360],
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{ 
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    >
      <div 
        className="w-full h-full bg-[hsl(var(--gradient-bright-green))]/50"
        style={{ 
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(1px)'
        }}
      />
    </motion.div>

    {/* Pulsing Circle */}
    <motion.div
      className="absolute bottom-[25%] right-[25%] w-[15px] h-[15px] rounded-full"
      animate={{ 
        scale: [1, 2, 1],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{ 
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    >
      <div 
        className="w-full h-full rounded-full bg-[hsl(var(--gradient-teal))]/60"
        style={{ filter: 'blur(1px)' }}
      />
    </motion.div>

    {/* Rotating Star */}
    <motion.div
      className="absolute top-[60%] left-[20%] w-[18px] h-[18px]"
      animate={{ 
        rotate: 360,
        scale: [0.7, 1.2, 0.7],
        opacity: [0.5, 0.9, 0.5]
      }}
      transition={{ 
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    >
      <div 
        className="w-full h-full bg-[hsl(var(--gradient-turquoise))]/45"
        style={{ 
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          filter: 'blur(1px)'
        }}
      />
    </motion.div>
  </div>
);
