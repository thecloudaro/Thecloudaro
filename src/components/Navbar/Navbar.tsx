"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UniversalDropdown from "@/components/Navbar/DynamicDropdown";
import Logo from "./Logo";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useDropdown } from "./DropdownContext";
import { useCart } from "@/components/Cart/CartContext";

interface NavbarProps {
  hasHeaderBanner: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hasHeaderBanner }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const { openCart, items } = useCart();
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isBeyondHero, setIsBeyondHero] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Ref to track dropdown state in the scroll listener without re-binding the listener
  const activeDropdownRef = useRef(activeDropdown);
  useEffect(() => {
    activeDropdownRef.current = activeDropdown;
  }, [activeDropdown]);

  const isDomainPage = pathname?.includes('/domain');
  const isDomainSearchPage = pathname?.includes('/domain-search');
  const isTransferPage = pathname?.includes('/transfer');
  const isHostingPage = pathname?.includes('/hosting') && !pathname?.includes('/migration-to-thecloudaro');
  const isHomepage = pathname === '/';

  const menuItems = ["Domains", "Hosting", "Email", /* "Cloud", */ "Security", "Explore all"];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Do not update scroll-based state when a dropdown is open, using the ref
      if (activeDropdownRef.current) {
        return;
      }

      const scrollY = window.scrollY;
      const scrollThreshold = 5; // A small threshold to prevent flickering on minor scrolls
      
      if (Math.abs(scrollY - lastScrollY.current) > scrollThreshold) {
        const isScrollingDown = scrollY > lastScrollY.current;
        if (isScrollingDown) {
          setIsScrollingUp(false);
        } else {
          setIsScrollingUp(true);
        }
      }
      
      setIsBeyondHero(scrollY > 50);
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (activeDropdown || isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDropdown, isMenuOpen]);

  const toggleDropdown = (menu: string) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  const navClassName = `fixed left-0 right-0 ${
    hasHeaderBanner && !isBeyondHero ? "top-12" : "top-0"
  } ${activeDropdown ? 'z-[120]' : 'z-50'}`;

  const navStyle: React.CSSProperties = {
    backgroundColor: activeDropdown
      ? 'hsl(var(--dropdown-bg-primary))'
      : isScrollingUp && isBeyondHero
        ? 'hsl(var(--navbar-bg-scrolled))'
        : 'transparent',
    transform: activeDropdown || !isBeyondHero || isScrollingUp ? 'translateY(0)' : 'translateY(-150%)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
    willChange: 'transform, opacity, background-color',
    boxShadow: 'none',
    backdropFilter: activeDropdown ? 'blur(18px)' : 'none',
    WebkitBackdropFilter: activeDropdown ? 'blur(18px)' : 'none'
  };

  const navContent = (
    <div
      className={`${isDomainPage || isHomepage || isTransferPage || isHostingPage ? "" : "transition-all duration-500"}`}
      style={{
        backgroundColor: 'transparent',
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

          <div className="hidden md:flex flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-4">
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

            {/* Promotions Button - animated gradient CTA */}
            <Link
              href="/promotions"
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide nav-promotions-gradient border border-white/10"
              style={{
                color: "#ffffff",
              }}
            >
              Promotions
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {[ShoppingCart, User].map((Icon, i) => {
              const isCart = Icon === ShoppingCart;
              const isUser = Icon === User;
              return (
                <div key={i} className="relative">
                  {isUser ? (
                    <Link href="/login" className={`font-medium transition-all duration-300 w-9 h-9 flex items-center justify-center rounded-full ${
                      (isHostingPage)
                        ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : (isDomainPage || isHomepage) 
                        ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                        : 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                    }`}>
                      <Icon size={16} />
                    </Link>
                  ) : (
                    <button
                      onClick={isCart ? openCart : undefined}
                      className={`font-medium transition-all duration-300 w-9 h-9 flex items-center justify-center rounded-full ${
                        (isHostingPage)
                          ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                          : (isDomainPage || isHomepage) 
                          ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]' 
                          : 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                      }`}
                    >
                      <Icon size={16} />
                    </button>
                  )}
                  {isCart && items.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {items.length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 md:hidden items-center w-full gap-2">
            <div className="flex justify-start">
              <Logo />
            </div>

            <div className="flex justify-center space-x-3">
              {[ShoppingCart, User].map((Icon, i) => {
                const isCart = Icon === ShoppingCart;
                const isUser = Icon === User;
                return (
                  <div key={i} className="relative">
                    {isUser ? (
                      <Link href="/login" className={`font-medium transition-all duration-300 w-9 h-9 rounded-full flex items-center justify-center ${
                        (isHostingPage)
                          ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                          : (isDomainPage || isHomepage)
                          ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                          : 'text-[hsl(var(--navbar-text))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                      }`}>
                        <Icon size={16} />
                      </Link>
                    ) : (
                      <button
                        onClick={isCart ? openCart : undefined}
                        className={`font-medium transition-all duration-300 w-9 h-9 rounded-full flex items-center justify-center ${
                          (isHostingPage)
                            ? 'text-[hsl(var(--navbar-text-active))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                            : (isDomainPage || isHomepage)
                            ? 'text-[hsl(var(--navbar-text-default))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                            : 'text-[hsl(var(--navbar-text))] hover:text-[hsl(var(--navbar-text-hover))] hover:bg-[hsl(var(--navbar-bg-hover))]'
                        }`}
                      >
                        <Icon size={16} />
                      </button>
                    )}
                    {isCart && items.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {items.length}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (activeDropdown) {
                    setActiveDropdown(null);
                    setIsMenuOpen(false);
                  } else {
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
    </div>
  );

  if (isDomainPage && !isDomainSearchPage) {
    return (
      <>
        <nav
          className={navClassName}
          style={navStyle}
        >
          {navContent}
        </nav>
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
                setActiveDropdown(menuName);
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <motion.nav
        className={navClassName}
        style={navStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {navContent}
      </motion.nav>
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
              setActiveDropdown(menuName);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
