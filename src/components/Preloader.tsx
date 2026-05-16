'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Show preloader on internal navigations that actually change the route (pathname/search).
  // Hash-only links (same page, e.g. #article-2) must not toggle loading — pathname does not
  // change so the hide effect below would never run and the overlay could stay forever.
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link?.href) return;

      try {
        const url = new URL(link.href);
        if (url.origin !== window.location.origin) return;

        const nextKey = `${url.pathname}${url.search}`;
        const curKey = `${window.location.pathname}${window.location.search}`;
        if (nextKey === curKey) {
          return;
        }

        setIsLoading(true);
      } catch {
        // Invalid URL, ignore
      }
    };

    document.addEventListener("click", handleLinkClick, true);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, []);

  // Hash / history updates without pathname change (safety net)
  useEffect(() => {
    const clear = () => setIsLoading(false);
    window.addEventListener("hashchange", clear);
    window.addEventListener("popstate", clear);
    return () => {
      window.removeEventListener("hashchange", clear);
      window.removeEventListener("popstate", clear);
    };
  }, []);

  useEffect(() => {
    const hidePreloader = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsLoading(false);
        });
      });
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      hidePreloader();
      return;
    }

    const handleDOMReady = () => {
      hidePreloader();
    };

    document.addEventListener("DOMContentLoaded", handleDOMReady, { once: true });
    window.addEventListener("load", hidePreloader, { once: true });

    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMReady);
      window.removeEventListener("load", hidePreloader);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
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

