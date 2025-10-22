"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import { Menu, X, Globe, ShoppingCart, User } from "lucide-react";
import HeaderBanner from "@/components/HeaderBanner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // becomes dark after scrolling a bit
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

  const menuItems = ["Domains", "Hosting", "Email", "Cloud", "Security" , "Explore all"];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        activeDropdown
          ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
          : isScrolled
          ? "bg-slate-900/70 backdrop-blur-md"
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18">
{/* Logo */}
<div className="flex items-center -ml-14 sm:-ml-16">
  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-sm mr-2 flex items-center justify-center">
    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 transform rotate-45"></div>
  </div>
  <Link href="/" className="text-white text-xl sm:text-2xl font-light font-nunito">
    TheCloudaro
  </Link>
</div>


            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDropdown(item)}
                  className={`text-white hover:text-white font-medium py-2 px-2 rounded-full transition-colors ${
                    activeDropdown === item ? "bg-gray-800/50" : "hover:bg-gray-800/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
              {[Globe, ShoppingCart, User].map((Icon, i) => (
                <button
                  key={i}
                  className="text-white hover:text-white p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-full transition-colors"
                >
                  <Icon size={16} className="sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-400 p-1.5 sm:p-2 rounded-full hover:bg-gray-800/50 transition-colors"
              >
                {isMenuOpen ? (
                  <X size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <Menu size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdowns */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden bg-transparent backdrop-blur-md overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleDropdown(item)}
                    className={`text-white hover:text-gray-400 font-medium py-2 px-4 rounded-full transition-colors text-left ${
                      activeDropdown === item
                        ? "bg-gray-800/50"
                        : "hover:bg-gray-800/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Universal Dropdown */}
      <AnimatePresence>
        {activeDropdown && (
          <UniversalDropdown 
            activeMenu={activeDropdown.toLowerCase()} 
            currentPath={pathname || ''} 
            onClose={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
