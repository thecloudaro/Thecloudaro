"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import Logo from "./Logo";
import { Globe, ShoppingCart, User, Menu } from "lucide-react";
import { useDropdown } from "./DropdownContext";
import { useCart } from "@/components/Cart/CartContext";
import { useLogin } from "@/components/Login/LoginContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const { openCart } = useCart();
  const { openLogin } = useLogin();
  const [isPricingNavbarVisible, setIsPricingNavbarVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  // Check if we're on domain page or transfer page
  const isDomainPage = pathname?.includes('/domain');
  const isDomainSearchPage = pathname?.includes('/domain-search');
  const isTransferPage = pathname?.includes('/transfer');
  const isHostingPage = pathname?.includes('/hosting') && !pathname?.includes('/migration-to-thecloudaro');
  const isMigrationPage = pathname?.includes('/migration-to-thecloudaro');
  const isRoadmapPage = pathname?.includes('/roadmap');
  const isHomepage = pathname === '/';
  const isSecurityPage = pathname?.includes('/security');
  const isVpnPage = pathname?.includes('/vpn');
  const isWordPressPage = pathname?.includes('/hosting-for-wordpress');
  const isVirtualMachinePage = pathname?.includes('/virtual-machine');
  const isCdnPage = pathname?.includes('/cdn');
  const isCdnPage = pathname?.includes('/cdn');
  const isBusinessEmailPage = pathname?.includes('/business-email');
  const isLegalPage = pathname?.includes('/legal');

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
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDomainPage, isHomepage, isTransferPage, isMigrationPage]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (activeDropdown || isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDropdown, isMenuOpen]);

  const toggleDropdown = (menu: string) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  // Show single navbar - hide main navbar when pricing navbar is visible
  // Show navbar on domain/transfer page:
  // 1. Hero section: always show main navbar (transparent background)
  // 2. When pricing navbar is visible: hide main navbar completely (only pricing navbar shows)
  // 3. Other pages: always show main navbar
  
  const shouldShowNavbar = isMigrationPage
    ? true
    : (isDomainPage || isTransferPage) && !isDomainSearchPage 
    ? !isPricingNavbarVisible // Hide main navbar when pricing navbar is visible
    : true;
  
  if (!shouldShowNavbar) {
    return null; // Hide navbar when pricing navbar is visible
  }

  const navClassName = `left-0 right-0 absolute ${isHomepage && !isLegalPage ? "top-8" : "top-0"} ${isDomainPage || isHomepage || isTransferPage || isHostingPage || isRoadmapPage ? "" : "transition-all duration-500"} ${
    isDomainPage || isTransferPage || isHostingPage || isMigrationPage || isRoadmapPage
      ? "z-[120]"
      : isScrollingUp
      ? "z-[100]"
      : "z-50"
  }`;

  // Get page background color for navbar area - always transparent for all pages
  const getNavbarBackground = () => {
    if (activeDropdown) return 'hsl(var(--dropdown-bg-primary))';
    return 'transparent'; // Always transparent for all pages
  };

  // Consistent transparent style for all pages like homepage
  // On non-homepage pages, use page background to prevent body background showing through
  const navStyle: React.CSSProperties = {
    backgroundColor: getNavbarBackground(),
    transform: 'translateY(0)',
    willChange: 'transform, opacity',
    boxShadow: 'none',
    backdropFilter: activeDropdown ? 'blur(18px)' : 'none',
    WebkitBackdropFilter: activeDropdown ? 'blur(18px)' : 'none'
  };

  // Use regular nav for domain page (no animation), motion.nav for other pages
  const navContent = (
    <>
      <div
        className={`${isDomainPage || isHomepage || isTransferPage || isHostingPage ? "" : "transition-all duration-500"}`}
        style={{
          backgroundColor: getNavbarBackground(),
          boxShadow: "none",
          border: "none",
          borderTop: "none",
          borderBottom: "none",
          backdropFilter: activeDropdown ? "blur(18px)" : "none",
          WebkitBackdropFilter: activeDropdown ? "blur(18px)" : "none"
        }}
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: 'transparent' }}
        >
          <div 
            className="h-14 sm:h-16 md:h-20 flex items-center justify-between"
            style={{ backgroundColor: 'transparent' }}
          >

            {/* Left: Logo (desktop) */}
            <div className="hidden md:flex flex-shrink-0">
              <Logo />
            </div>

            {/* Center: Menu */}
            <div className="hidden md:flex flex-1 justify-center space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleDropdown(item)}
                  className={`font-medium transition-all duration-300 px-3 py-2 rounded-full ${
                    activeDropdown === item
                      ? 'bg-[hsl(var(--navbar-bg-hover))] text-[hsl(var(--navbar-text-active))]'
                      : (isHostingPage)
                        ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : (isDomainPage || isHomepage) 
                        ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {[Globe, ShoppingCart, User].map((Icon, i) => {
                const isCart = Icon === ShoppingCart;
                const isUser = Icon === User;
                return (
                  <button
                    key={i}
                    onClick={isCart ? openCart : isUser ? openLogin : undefined}
                    className={`font-medium transition-all duration-300 px-3 py-2 rounded-full ${
                      (isHostingPage)
                        ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : (isDomainPage || isHomepage) 
                        ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between flex-1 px-2">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo />
              </div>

              {/* Icons */}
              <div className="flex-1 flex justify-center items-center space-x-1">
                {[Globe, ShoppingCart, User].map((Icon, i) => {
                  const isCart = Icon === ShoppingCart;
                  const isUser = Icon === User;
                  return (
                    <button
                      key={i}
                      onClick={isCart ? openCart : isUser ? openLogin : undefined}
                      className={`font-medium transition-all duration-300 px-2 py-2 rounded-full ${
                        (isHostingPage)
                          ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                          : (isDomainPage || isHomepage) 
                          ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                          : 'text-[hsl(var(--navbar-text))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                      }`}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>

              {/* Hamburger */}
              <button
                onClick={() => {
                  if (activeDropdown) {
                    // If dropdown is open, close it
                    setActiveDropdown(null);
                    setIsMenuOpen(false);
                  } else {
                    // Open mobile menu by setting activeDropdown
                    setIsMenuOpen(true);
                    setActiveDropdown("Explore all");
                  }
                }}
                className={`p-2 ${
                  (isHostingPage)
                    ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))]'
                    : (isDomainPage || isHomepage)
                    ? 'text-[hsl(var(--navbar-text-slate))] hover:text-[hsl(var(--navbar-text-hover))]'
                    : 'text-[hsl(var(--navbar-text))] hover:text-[hsl(var(--navbar-text-hover))]'
                }`}
              >
                {(isMenuOpen || activeDropdown) ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Dropdown - Shows on desktop and mobile */}
      <AnimatePresence>
        {activeDropdown && (
          <UniversalDropdown
            activeMenu={activeDropdown}
            onClose={() => {
              setActiveDropdown(null);
              setIsMenuOpen(false);
            }}
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

  // Consistent behavior for all pages like homepage
  // For domain page: static navbar without animation
  if (isDomainPage && !isDomainSearchPage) {
    return (
      <nav
        className={navClassName}
        style={navStyle}
      >
        {navContent}
      </nav>
    );
  }

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
