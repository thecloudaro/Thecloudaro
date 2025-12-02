'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Show preloader immediately on link click
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element is a link or inside a link
      const link = target.closest('a');
      
      if (link && link.href) {
        // Check if it's an internal link (same origin)
        try {
          const url = new URL(link.href);
          if (url.origin === window.location.origin) {
            // Show preloader immediately on click
            setIsLoading(true);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_err) {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  useEffect(() => {
    // Show preloader immediately on route change
    setIsLoading(true);

    // Hide preloader as soon as page content is ready
    const hidePreloader = () => {
      // Small delay to ensure smooth transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsLoading(false);
        });
      });
    };

    // Check current ready state
    if (document.readyState === 'complete') {
      // Page already loaded, hide immediately
      hidePreloader();
    } else if (document.readyState === 'interactive') {
      // DOM is ready, hide immediately
      hidePreloader();
    } else {
      // Wait for DOM to be ready (faster than load event)
      const handleDOMReady = () => {
        hidePreloader();
      };

      document.addEventListener('DOMContentLoaded', handleDOMReady, { once: true });
      
      // Backup: also listen for load event
      window.addEventListener('load', hidePreloader, { once: true });

      return () => {
        document.removeEventListener('DOMContentLoaded', handleDOMReady);
        window.removeEventListener('load', hidePreloader);
      };
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            backdropFilter: 'blur(5px)'
          }}
        >
          {/* 4 Dots Spinner */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgb(var(--hosting-text-white))' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

