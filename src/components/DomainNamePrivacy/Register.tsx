"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";

const Register = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      // Handle search logic here
      console.log("Searching for:", term);
    }
  };

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

      {/* Gradient Overlay - Teal to Dark Green */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, 
            rgba(var(--domain-name-privacy-register-gradient-teal-1)) 0%, 
            rgba(var(--domain-name-privacy-register-gradient-teal-2)) 50%,
            rgba(var(--domain-name-privacy-register-gradient-teal-3)) 100%)`
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto w-full text-center"
        >
          {/* Heading */}
          <ContentHeading 
            title="Register your domain confidentially"
            className="mb-8 sm:mb-10 md:mb-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap"
          />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                placeholder="Enter a domain name"
                className="w-full pl-4 pr-16 py-4 text-lg rounded-full text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(var(--domain-name-privacy-register-input-bg))',
                  borderColor: 'hsl(var(--cart-border-light))',
                  color: 'rgb(var(--hosting-text-white))'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--cart-border-lighter))';
                  e.currentTarget.style.boxShadow = '0 0 0 2px hsla(var(--cart-border-lighter), 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--cart-border-light))';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(searchTerm)}
                className="absolute right-2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                style={{ 
                  backgroundColor: 'rgb(var(--hosting-blue-600))',
                  color: 'rgb(var(--hosting-text-white))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--domain-transfer-button-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--hosting-blue-600))';
                }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

