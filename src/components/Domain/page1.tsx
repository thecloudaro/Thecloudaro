"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import shape3D from "../../../public/Domain/shape-3d.png";

export default function Page1() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowNavbar(false);
      else setShowNavbar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#111113] to-[#0c0c0e] text-gray-200 overflow-hidden">
      {/* Navbar (hidden on scroll) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -50 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 pt-28 md:pt-40 pb-20 gap-12 md:gap-20">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-gray-400 text-lg md:text-xl">
            Search for your domain name...
          </h2>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <Typewriter
              options={{
                strings: [
                  "idea.com",
                  "circle.net",
                  "brandnew.site",
                  "dream.io",
                  "future.tech",
                  "identity.org",
                  "vision.co",
                  "spark.app",
                  "project.dev",
                  "home.biz",
                ],
                autoStart: true,
                loop: true,
                delay: 70,
                deleteSpeed: 40,
              }}
            />
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl">
            Start your online story. Register a domain today.
          </p>

          <button className="bg-[#1a1a1d] hover:bg-[#222228] px-6 py-3 rounded-xl text-gray-300 border border-gray-700 hover:border-gray-500 transition-all duration-300 text-sm md:text-base">
            Search
          </button>
        </div>

        {/* Right 3D Image */}
        <div className="flex-1 flex justify-center items-center">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="relative w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[600px] lg:h-[600px]"
  >
    <Image
      src={shape3D}
      alt="3D glowing sphere"
      fill
      className="object-contain drop-shadow-[0_0_60px_rgba(0,255,180,0.45)]"
    />
  </motion.div>
</div>

      </div>
    </div>
  );
}
