"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import HeaderBanner from "@/components/HeaderBanner";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import RightIcons from "./RightIcons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock when dropdown or mobile menu is open
  useEffect(() => {
    if (activeDropdown || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeDropdown, isMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  useEffect(() => {
    if (!isMenuOpen) setActiveDropdown(null);
  }, [isMenuOpen]);

  const menuItems = ["Domains", "Hosting", "Email", "Cloud", "Security", "Explore all"];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        activeDropdown
          ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
          : isScrolled
          ? "bg-slate-900/70 backdrop-blur-md shadow-sm"
          : "bg-transparent backdrop-blur-none"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Banner - Hide when dropdown is open */}
      {!activeDropdown && <HeaderBanner />}

      <div
        className={`transition-all duration-500 ${
          activeDropdown
            ? "bg-slate-900/80 backdrop-blur-lg"
            : isScrolled
            ? "bg-slate-900/70 backdrop-blur-md"
            : "bg-transparent backdrop-blur-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <DesktopMenu
                menuItems={menuItems}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
              />
            </div>

            {/* Right icons for desktop */}
            <div className="hidden md:flex items-center">
              <RightIcons />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <MobileMenu
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                menuItems={menuItems}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Universal Dropdown */}
      <AnimatePresence>
        {activeDropdown && (
          <UniversalDropdown
            activeMenu={activeDropdown.toLowerCase()}
            currentPath={pathname || ""}
            onClose={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
