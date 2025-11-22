"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const SetYourself = () => {
  const [showAll, setShowAll] = useState(false);

  const countries = [
    { name: "Albania", flag: "Albania.svg" },
    { name: "Argentina", flag: "Argentina.svg" },
    { name: "Australia", flag: "Australia.svg" },
    { name: "Austria", flag: "Austria.svg" },
    { name: "Belgium", flag: "Belgium.svg" },
    { name: "Brazil", flag: "Brazil.svg" },
    { name: "Bulgaria", flag: "Bulgaria.svg" },
    { name: "Canada", flag: "Canada.svg" },
    { name: "Chile", flag: "Chile.svg" },
    { name: "Colombia", flag: "Colombia.svg" },
    { name: "Costa Rica", flag: "Costa Rica.svg" },
    { name: "Croatia", flag: "Croatia.svg" },
    { name: "Czech", flag: "Czech.svg" },
    { name: "Denmark", flag: "Denmark.svg" },
    { name: "Estonia", flag: "Estonia.svg" },
    { name: "Finland", flag: "Finland.svg" },
    { name: "France", flag: "France.svg" },
    { name: "Germany", flag: "Germany.svg" },
    { name: "Greece", flag: "Greece.svg" },
    { name: "Hong Kong", flag: "HongKong.svg" },
    { name: "Hungary", flag: "Hungary.svg" },
    { name: "Iceland", flag: "Iceland.svg" },
    { name: "India", flag: "India.svg" },
    { name: "Ireland", flag: "Ireland.svg" },
    { name: "Italy", flag: "Italy.svg" },
    { name: "Japan", flag: "Japan.svg" },
    { name: "Latvia", flag: "Latvia.svg" },
    { name: "Luxembourg", flag: "Luxembourg.svg" },
    { name: "Malaysia", flag: "Malaysia.svg" },
    { name: "Mexico", flag: "Mexico.svg" },
    { name: "Moldova", flag: "Moldova.svg" },
    { name: "Netherlands", flag: "Netherlands.svg" },
    { name: "New Zealand", flag: "NewZeland.svg" },
    { name: "Norway", flag: "Norway.svg" },
    { name: "Pakistan", flag: "Pakistan.svg" },
    { name: "Peru", flag: "Peru.svg" },
    { name: "Philippines", flag: "Philippines.svg" },
    { name: "Poland", flag: "Poland.svg" },
    { name: "Portugal", flag: "Portugal.svg" },
    { name: "Romania", flag: "Romania.svg" },
    { name: "Serbia", flag: "Serbia.svg" },
    { name: "Singapore", flag: "Singapore.svg" },
    { name: "Slovakia", flag: "Slovakia.svg" },
    { name: "Slovenia", flag: "Slovenia.svg" },
    { name: "South Africa", flag: "SouthAfrica.svg" },
    { name: "South Korea", flag: "SouthKorea.svg" },
    { name: "Spain", flag: "Spain.svg" },
    { name: "Sweden", flag: "Sweden.svg" },
    { name: "Switzerland", flag: "Switzerland.svg" },
    { name: "Taiwan", flag: "Taiwan.svg" },
    { name: "Thailand", flag: "Thailand.svg" },
    { name: "Turkey", flag: "Turkey.svg" },
    { name: "UAE", flag: "UAEmirates.svg" },
    { name: "Ukraine", flag: "Ukraine.svg" },
    { name: "United Kingdom", flag: "UKingdom.svg" },
    { name: "United States", flag: "UnitedStates.svg" }
  ];

  // Show first 20 countries (5 rows) by default, all when "Show more" is clicked
  const displayedCountries = showAll ? countries : countries.slice(0, 20);

  const getFlagSrc = (flagName: string) => `/vpn/flags/${encodeURIComponent(flagName)}`;

  return (
    <section
      className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] flex items-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--vpn-section-bg))" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col items-center text-center">
          
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <ContentHeading
              title="Set yourself free"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-8 sm:mb-12 md:mb-16 max-w-4xl"
          >
            <ContentDescription
              text="Choose from 2,700+ high speed servers in 100+ countries and enjoy low-latency streaming, work, and gaming anywhere."
              size="lg"
              className="text-white/80"
            />
          </motion.div>

          {/* Countries Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="w-full mb-8 sm:mb-12"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
              {displayedCountries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="flex items-center gap-1 sm:gap-1.5 text-left"
                >
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
                    <Image
                      src={getFlagSrc(country.flag)}
                      alt={`${country.name} flag`}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-white text-xs sm:text-xs md:text-sm font-medium">
                    {country.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 border"
              style={{
                backgroundColor: "rgb(var(--vpn-set-yourself-button-bg))",
                color: "rgb(var(--vpn-set-yourself-button-text))",
                borderColor: "rgb(var(--vpn-set-yourself-button-border))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(var(--vpn-set-yourself-button-hover))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(var(--vpn-set-yourself-button-bg))";
              }}
            >
              {showAll ? "Show less" : "Show more"}
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SetYourself;
