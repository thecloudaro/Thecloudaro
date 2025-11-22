"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const YourPrivacy = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/DomainNamePrivacy/bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Gradient Overlay from top - merging with upper component */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            rgb(var(--domain-name-privacy-private-bg)) 0%, 
            rgb(var(--domain-name-privacy-private-bg)) 20%,
            rgba(var(--domain-name-privacy-gradient-gray-90)) 35%,
            rgba(var(--domain-name-privacy-gradient-gray-75)) 50%,
            rgba(var(--domain-name-privacy-gradient-gray-50)) 65%,
            rgba(var(--domain-name-privacy-gradient-gray-30)) 80%,
            rgba(var(--domain-name-privacy-gradient-gray-15)) 90%,
            transparent 100%)`
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center min-h-[150vh] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          {/* Heading and Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12"
          >
            <ContentHeading 
              title="Your privacy is our priority"
              className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl"
            />
            <ContentDescription 
              text="See the difference"
              size="lg"
              className="text-[hsl(var(--domain-name-privacy-hero-description))] text-xl sm:text-2xl md:text-3xl lg:text-2xl"
            />
          </motion.div>

          {/* Cards Container - Positioned to overlap gradient and solid background */}
          <div className="relative flex-1 flex items-end justify-center pb-0 -mb-20 sm:-mb-24 md:-mb-32 lg:-mb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-2xl mx-auto w-full mb-0">
              {/* Unprotected Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="rounded-sm p-6 sm:p-8 shadow-lg min-h-[320px]"
                style={{ backgroundColor: 'rgb(var(--domain-name-privacy-card-unprotected-bg))' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'rgb(var(--domain-name-privacy-text-white))' }}>
                  Unprotected
                </h3>
                <p className="text-xs uppercase mb-6" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }}>
                  WHOIS LOOKUP
                </p>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-left" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }}>
                  <div>123, Amber Drive, Springfield, US</div>
                  <div>Smith Consultancy</div>
                  <div>john@smithconsultancy.com</div>
                  <div>John Smith</div>
                  <div>301-301-9000</div>
                </div>
              </motion.div>

              {/* With protection Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="rounded-sm p-6 sm:p-8 shadow-lg min-h-[320px]"
                style={{ backgroundColor: 'rgb(var(--domain-name-privacy-card-protected-bg))' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'rgb(var(--domain-name-privacy-text-white))' }}>
                  With protection
                </h3>
                <p className="text-xs uppercase mb-6" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }}>
                  WHOIS LOOKUP
                </p>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-left" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }}>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }} />
                    <span>Redacted for privacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }} />
                    <span>Redacted for privacy</span>
                  </div>
                  <div>withheld@withheldforprivacy.com</div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }} />
                    <span>Redacted for privacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'rgb(var(--domain-name-privacy-text-gray))' }} />
                    <span>Redacted for privacy</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Solid Background Section - below background image */}
      <div 
        className="relative z-20 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24"
        style={{ backgroundColor: 'rgb(var(--domain-name-privacy-private-bg))' }}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* This section provides the solid background color below the image */}
        </div>
      </div>
    </div>
  );
};

export default YourPrivacy;

