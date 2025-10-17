// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// const PageTransition: React.FC = () => {
//   // 📜 Scroll tracking
//   const { scrollY } = useScroll();

//   // 🎭 Overlay visibility
//   const [isOverlayVisible, setIsOverlayVisible] = useState(true);

//   // 🔗 References
//   const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null);
//   const scrollTimeout = useRef<number | null>(null);

//   // --------------------------------------------------
//   // 🧠 INTERSECTION OBSERVER — Hide overlay when section is fully visible
//   // --------------------------------------------------
//   useEffect(() => {
//     sectionsRef.current = document.querySelectorAll('section');

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const anyFullyVisible = entries.some((entry) => entry.isIntersecting);
//         setIsOverlayVisible(!anyFullyVisible);
//       },
//       { threshold: 1.0 } // section fully in view
//     );

//     sectionsRef.current.forEach((section) => observer.observe(section));
//     return () => observer.disconnect();
//   }, []);

//   // --------------------------------------------------
//   // 🎡 SCROLL LISTENER — Show overlay during scroll movement
//   // --------------------------------------------------
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsOverlayVisible(true);

//       // Optional: short delay before letting IntersectionObserver handle visibility
//       if (scrollTimeout.current !== null) {
//         window.clearTimeout(scrollTimeout.current);
//       }

//       scrollTimeout.current = window.setTimeout(() => {
//         // overlay hide will auto trigger by observer
//       }, 150);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (scrollTimeout.current !== null) window.clearTimeout(scrollTimeout.current);
//     };
//   }, []);

//   // --------------------------------------------------
//   // 🎥 CINEMATIC MOTION EFFECTS (rotate + scale)
//   // --------------------------------------------------
//   const rawScale = useTransform(scrollY, [0, 600], [1, 2.2]);
//   const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

//   const rawRotate = useTransform(scrollY, [0, 600], [0, 180]);
//   const rotate = useSpring(rawRotate, { stiffness: 80, damping: 20 });

//   // --------------------------------------------------
//   // 🪄 RENDER
//   // --------------------------------------------------
//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden bg-black"
//       animate={{ opacity: isOverlayVisible ? 1 : 0 }}
//       transition={{ duration: 0.2, ease: 'easeOut' }} // faster fade
//     >
//       {/* 🔥 Cinematic rotating radial layer */}
//       <motion.div
//         className="absolute w-[200vw] h-[200vh] bg-gradient-radial from-black via-[#0a0a0a] to-black"
//         style={{
//           scale,
//           rotate,
//           mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
//         }}
//       />

//       {/* 🖤 Deep subtle overlay */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black"
//         style={{ opacity: 0.95 }}
//       />
//     </motion.div>
//   );
// };

// export default PageTransition;
