"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import HeaderBanner from "@/components/HeaderBanner";
import Logo from "./Logo";
import { Globe, ShoppingCart, User, Menu } from "lucide-react";

// ✅ Add props type
interface NavbarProps {
  hideBanner?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideBanner }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPricingNavbarVisible, setIsPricingNavbarVisible] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  // Check if we're on domain page or transfer page
  const isDomainPage = pathname?.includes('/domain');
  const isDomainSearchPage = pathname?.includes('/domain-search');
  const isTransferPage = pathname?.includes('/transfer');
  const isHostingPage = pathname?.includes('/hosting');
  const isHomepage = pathname === '/';

  const menuItems = ["Domains", "Hosting", "Email", "Cloud", "Security", "Explore all"];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Full viewport height
      
      // Detect scroll direction with threshold to prevent flickering
      const scrollThreshold = 5;
      if (Math.abs(scrollY - lastScrollY) > scrollThreshold) {
        if (scrollY > lastScrollY) {
          setIsScrollingUp(false); // Scrolling down
        } else {
          setIsScrollingUp(true); // Scrolling up
        }
        setLastScrollY(scrollY);
      }
      
      setIsPricingNavbarVisible(scrollY > heroHeight && (isDomainPage || isTransferPage));
      setIsInHeroSection(scrollY < heroHeight && (isDomainPage || isHomepage || isTransferPage));
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDomainPage, isHomepage, isTransferPage]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (activeDropdown || isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDropdown, isMenuOpen]);

  const toggleDropdown = (menu: string) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  // Show main navbar always (both navbars can be visible)
  // Main navbar should always be visible, never hidden
  // Hide main navbar when pricing navbar is visible (domain extension pages)

  // Show navbar on domain/transfer page:
  // 1. Hero section: always show (transparent background)
  // 2. Scroll up on other pages: show navbar (with background color)
  // 3. Scroll down on other pages: hide navbar (only pricing navbar visible)
  
  // Hide navbar only when scrolling down past hero section
  // Show navbar: on hero section OR when scrolling up
  // For transfer page: always show on scroll up (regardless of pricing navbar visibility)
  const shouldShowNavbar = (isDomainPage || isTransferPage) && !isDomainSearchPage 
    ? (isInHeroSection || (isTransferPage && isScrollingUp) || (isScrollingUp && isPricingNavbarVisible))
    : true;
  
  if (!shouldShowNavbar) {
    return null; // Hide navbar when scrolling down past hero section
  }

  // Background logic based on scroll direction:
  // - Hosting page: always transparent (static) - even with dropdown
  // - Transfer hero: always transparent
  // - Scroll up: show background on all pages
  // - Scroll down: transparent on transfer page, default on others
  const shouldShowBackground = isHostingPage
    ? false  // Always transparent on hosting page (even with dropdown)
    : activeDropdown 
    ? true
    : (isTransferPage && isInHeroSection)
    ? false  // Always transparent on transfer hero
    : isScrollingUp
    ? true  // Show background when scrolling up (all pages)
    : (isTransferPage && !isInHeroSection)
    ? false  // Transparent on transfer page scroll down
    : false;  // Default transparent

  const navClassName = `${''} ${''} left-0 right-0 relative ${isDomainPage || isHomepage || isTransferPage ? '' : 'transition-all duration-500'} ${
    isDomainPage || isTransferPage ? 'z-[100]' : (isScrollingUp ? 'z-[100]' : 'z-50')
  } ${
    shouldShowBackground && !isHostingPage
      ? "bg-dropdown-bg-primary"
      : ""
  }`;

  const navStyle = { 
    backgroundColor: isHostingPage
      ? 'transparent'  // Always transparent on hosting page
      : shouldShowBackground
      ? (activeDropdown ? 'hsl(var(--dropdown-bg-primary))' : 'hsl(var(--dropdown-bg-primary))')
      : 'transparent',
    // No fixed positioning; let navbar scroll with the page (static)
    transform: 'translateY(0)',
    willChange: 'transform, opacity',
    // Remove shadow
    boxShadow: 'none'
  };

  // Use regular nav for domain page (no animation), motion.nav for other pages
  const navContent = (
    <>

      {/* ✅ Hide banner when hideBanner=true or on domain/transfer/hosting page */}
      {!hideBanner && !activeDropdown && !isDomainPage && !isTransferPage && !isHostingPage && <HeaderBanner />}

      <div className={`${isDomainPage || isHomepage || isTransferPage ? '' : 'transition-all duration-500'} ${
        shouldShowBackground && !isHostingPage
          ? "bg-dropdown-bg-primary"
          : ""
      }`}
      style={{ 
        backgroundColor: isHostingPage
          ? 'transparent'  // Always transparent on hosting page
          : shouldShowBackground
          ? (activeDropdown ? 'hsl(var(--dropdown-bg-primary))' : 'hsl(var(--dropdown-bg-primary))')
          : 'transparent',
        boxShadow: 'none'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between">

            {/* Left: Logo (desktop) */}
            <div className="hidden md:flex flex-shrink-0">
              <Logo showText={true} />
            </div>

            {/* Center: Menu */}
            <div className="hidden md:flex flex-1 justify-center space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDropdown(item)}
                  className={`font-medium transition-all duration-300 px-3 py-2 rounded-full ${
                    activeDropdown === item
                      ? 'bg-gray-700/50 text-white'
                      : (isHostingPage)
                        ? 'text-white hover:text-white hover:bg-gray-700/50' 
                        : (isDomainPage || isHomepage) 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {[Globe, ShoppingCart, User].map((Icon, i) => (
                <button
                  key={i}
                  className={`font-medium transition-all duration-300 px-3 py-2 rounded-full ${
                    (isHostingPage)
                      ? 'text-white hover:text-white hover:bg-gray-700/50' 
                      : (isDomainPage || isHomepage) 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between flex-1 px-2">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo showText={false} />
              </div>

              {/* Icons */}
              <div className="flex-1 flex justify-center items-center space-x-1">
                {[Globe, ShoppingCart, User].map((Icon, i) => (
                  <button
                    key={i}
                    className={`font-medium transition-all duration-300 px-2 py-2 rounded-full ${
                      (isHostingPage)
                        ? 'text-white hover:text-white hover:bg-gray-700/50' 
                        : (isDomainPage || isHomepage) 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                        : 'text-navbar-text hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${
                  (isHostingPage)
                    ? 'text-white hover:text-white'
                    : (isDomainPage || isHomepage)
                    ? 'text-slate-200 hover:text-white'
                    : 'text-navbar-text hover:text-white'
                }`}
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {activeDropdown && (
          <UniversalDropdown
            activeMenu={activeDropdown}
            onClose={() => setActiveDropdown(null)}
            currentPath={pathname}
            onMenuSelect={(menuName) => {
              // Update activeDropdown when sidebar item is selected
              setActiveDropdown(menuName);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );

  return (
    <motion.nav
      className={navClassName}
      style={navStyle}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {navContent}
    </motion.nav>
  );
};

export default Navbar;
