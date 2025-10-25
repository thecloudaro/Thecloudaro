"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import HeaderBanner from "@/components/HeaderBanner";
import Logo from "./Logo";
import { Globe, ShoppingCart, User, Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuItems = ["Domains", "Hosting", "Email", "Cloud", "Security", "Explore all"];

  useEffect(() => {
    setIsLoaded(true);
    if (typeof window === "undefined") return;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (activeDropdown || isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDropdown, isMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        activeDropdown
          ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
          : isScrolled
          ? "bg-slate-900/70 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {!activeDropdown && <HeaderBanner />}

      <div className={`transition-all duration-500 ${
        activeDropdown
          ? "bg-slate-900/80 backdrop-blur-lg"
          : isScrolled
          ? "bg-slate-900/70 backdrop-blur-md"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between">

            {/* Left: Logo (desktop) */}
            <div className="hidden md:flex flex-shrink-0 -ml-10">
              <Logo showText={true} />
            </div>

            {/* Center: Menu */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDropdown(item)}
                  className="text-slate-200 hover:text-white font-medium transition-all hover:bg-gray-600/50 px-2 py-2 rounded-full"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {[Globe, ShoppingCart, User].map((Icon, i) => (
                <button
                  key={i}
                  className="text-slate-200 hover:text-white font-medium transition-all hover:bg-gray-600/50 px-2 py-2 rounded-full"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between flex-1 px-2">
              {/* Left: Logo (icon only) */}
              <div className="flex-shrink-0">
                <Logo showText={false} />
              </div>

              {/* Center: Right Icons */}
              <div className="flex-1 flex justify-center items-center space-x-2">
                {[Globe, ShoppingCart, User].map((Icon, i) => (
                  <button
                    key={i}
                    className="text-slate-200 hover:text-white font-medium transition-all hover:bg-gray-600/50 px-2 py-2 rounded-full"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              {/* Right: Hamburger */}
              <div className="flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-slate-200 hover:text-white p-2"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Universal Dropdown */}
      <AnimatePresence>
        {(activeDropdown || isMenuOpen) && (
          <UniversalDropdown
            activeMenu={(activeDropdown || "domains").toLowerCase()}
            currentPath={pathname || ""}
            onClose={() => {
              setActiveDropdown(null);
              setIsMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
