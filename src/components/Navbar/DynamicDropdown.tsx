"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Server,
  Mail,
  Cloud,
  ArrowRight,
  Star,
  Shield,
  ChevronLeft,
  User,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Logo from "./Logo";

interface UniversalDropdownProps {
  activeMenu: string;
  currentPath?: string;
  onClose?: () => void;
  onMenuSelect?: (menuKey: string) => void;
}

export default function UniversalDropdown({
  activeMenu,
  currentPath,
  onClose,
  onMenuSelect
}: UniversalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHostingPage = currentPath?.includes('/hosting');
  
  // Map navbar menu names to dropdown keys
  const mapMenuToKey = (menu: string | null): string => {
    if (!menu) return "domains";
    const menuLower = menu.toLowerCase().trim();
    const menuMap: Record<string, string> = {
      "domains": "domains",
      "hosting": "hosting",
      "email": "email",
      "cloud": "cloud",
      "security": "security",
      "explore all": "domains"
    };
    return menuMap[menuLower] || "domains";
  };

  // Map dropdown keys back to navbar menu names
  const mapKeyToMenu = (key: string): string => {
    const keyMap: Record<string, string> = {
      "domains": "Domains",
      "hosting": "Hosting",
      "email": "Email",
      "cloud": "Cloud",
      "security": "Security"
    };
    return keyMap[key] || "Domains";
  };

  const initialMenuKey = mapMenuToKey(activeMenu);
  const [selectedMenu, setSelectedMenu] = useState(initialMenuKey);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  

  // Update selectedMenu when activeMenu changes
  useEffect(() => {
    const menuKey = mapMenuToKey(activeMenu);
    setSelectedMenu(menuKey);
  }, [activeMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest("nav") || target.closest("[data-dropdown-trigger]")) return;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Types
  type MenuSection = { title: string; desc: string; href?: string };
  type MenuCategory = { title: string; sections: MenuSection[] };

  // Menu data
  const menuData: Record<string, MenuCategory> = {
    domains: {
      title: "Domains",
      sections: [
        { title: "Domains", desc: "Start your story with the right domain name.", href: "/domain" },
        { title: "Domain Name Search", desc: "Find the perfect domain name.", href: "/domain-search" },
        { title: "Domain Pricing", desc: "Check the latest domain prices.", href: "/domain" },
        { title: "Transfer Domains", desc: "Move your domains easily.", href: "/domain/transfer" }
      ]
    },
    hosting: {
      title: "Hosting",
      sections: [
        { title: "Web Hosting", desc: "Fast and reliable hosting for any site.", href: "/web-hosting" },
        { title: "WordPress Hosting", desc: "Optimized hosting for WP sites.", href: "/hosting-for-wordpress" },
        { title: "Business Hosting", desc: "Powerful hosting for growing teams.", href: "/web-hosting" },
        { title: "Ecommerce Hosting", desc: "Secure hosting for online stores.", href: "/web-hosting" },
        { title: "Transfer Hosting", desc: "Make your move to better hosting.", href: "/migration-to-thecloudaro" }
      ]
    },
    email: {
      title: "Email",
      sections: [
        { title: "Business Email", desc: "Professional email for your domain.", href: "/business-email" },
        { title: "Business Email Login", desc: "Access your business email." },
        { title: "Migrate Email", desc: "Move your email with ease.", href: "/migrate-business-email" }
      ]
    },
    cloud: {
      title: "Cloud",
      sections: [
        { title: "Virtual Machines", desc: "Scale your cloud infrastructure.", href: "/virtual-machine" },
        { title: "VM Manager", desc: "Manage your virtual machines easily.", href: "/virtual-machine" }
      ]
    },
    security: {
      title: "Security",
      sections: [
        { title: "Security", desc: "See how Thecloudaro keeps you secure." },
        { title: "Domain Privacy", desc: "Keep your domain info private.", href: "/domain-name-privacy" },
        { title: "CDN", desc: "Speed up your site worldwide.", href: "/cdn" },
        { title: "VPN", desc: "Secure your online presence.", href: "/vpn" }
      ]
    }
  };

  const currentMenu: MenuCategory = menuData[selectedMenu as keyof typeof menuData] || menuData.domains;

  const isPathActive = (path: string) => currentPath?.startsWith(path);

  const handleMenuSelect = (key: string) => {
    setSelectedMenu(key);
    setShowMobileDetail(true);
    onMenuSelect?.(key);
  };

  const handleBackToMenu = () => setShowMobileDetail(false);

  const menuItems = [
    { key: "domains", icon: <Globe size={18} />, label: "Domains" },
    { key: "hosting", icon: <Server size={18} />, label: "Hosting" },
    { key: "email", icon: <Mail size={18} />, label: "Email" },
    { key: "cloud", icon: <Cloud size={18} />, label: "Cloud" },
    { key: "security", icon: <Shield size={18} />, label: "Security" }
  ];

  const hotItems = [
    { href: "/domain-search", icon: <Globe size={14} />, label: "Domain Name Search" },
    { href: "/domain/transfer", icon: <Mail size={14} />, label: "Transfer Domains" },
    { href: "/web-hosting", icon: <Cloud size={14} />, label: "Web Hosting" }
  ];

  const universeItems = [
    { href: "/transfer-to-us", icon: <ArrowRight size={14} />, label: "Transfer to Us" },
    { href: "/why-thecloudaro", icon: <Star size={14} />, label: "Why TheCloudaro" },
    { href: "/about", icon: <HelpCircle size={14} />, label: "About Us" }
  ];

  const getMenuIcon = (menu: string) => {
    const icons = {
      domains: <Globe size={24} />,
      hosting: <Server size={24} />,
      email: <Mail size={24} />,
      cloud: <Cloud size={24} />,
      security: <Shield size={24} />
    };
    return icons[menu as keyof typeof icons] || <Globe size={24} />;
  };

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`z-[200] md:z-40 ${isHostingPage ? '' : 'border-t border-dropdown-border'} overflow-hidden bg-dropdown-bg-primary md:absolute md:top-0 md:left-0 md:w-full md:h-[75vh] fixed inset-0 md:inset-auto`}
      onClick={(e) => e.stopPropagation()}
    >
{/* Mobile View */}
<div className="md:hidden fixed top-0 left-0 right-0 h-screen overflow-y-auto z-[200] bg-dropdown-bg-primary">
  <AnimatePresence mode="wait">
    {!showMobileDetail ? (
      <motion.div
        key="menu-list"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="px-4 pt-4 pb-4"
      >
        {/* Logo & Close/Back Button */}
<div className="flex items-center justify-between mb-6 px-4">
  <Logo />

  <button
    onClick={onClose}
    className="text-dropdown-text-secondary hover:text-dropdown-text-primary transition-colors text-2xl font-bold"
  >
    ✕
  </button>
</div>


        {/* Login Section */}
        <div 
          className="rounded-lg p-4 mb-6 border"
          style={{
            background: `linear-gradient(to right, rgba(var(--dropdown-login-gradient-from)), rgba(var(--dropdown-login-gradient-to)))`,
            borderColor: 'rgba(var(--dropdown-login-border))'
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <User className="mt-1" size={20} style={{ color: 'rgb(var(--dropdown-login-icon))' }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: 'rgb(var(--navbar-mobile-menu-text))' }}>
                Log in to TheCloudaro
              </h3>
              <p className="text-dropdown-text-muted text-xs mt-1">
                Manage your products and Apps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
<span className="text-dropdown-text-muted">Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: 'rgb(var(--dropdown-login-link))' }}
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Sidebar Links (Domains, Hosting, etc.) */}
        <div className="mb-6">
          <SectionHeading title="ALL PRODUCTS" />
          <ul className="space-y-2">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    handleMenuSelect(item.key);
                    // Map key back to navbar menu name and notify parent
                    const navbarMenuName = mapKeyToMenu(item.key);
                    onMenuSelect?.(navbarMenuName);
                  }}
                  className="w-full text-left flex items-center justify-between gap-3 px-3 py-3 rounded-md transition-all duration-300 text-dropdown-text-secondary hover:scale-105"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* What's Hot */}
        <div className="mb-6">
          <SectionHeading title="WHAT'S HOT" />
          <ul className="space-y-2">
            {hotItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 text-dropdown-text-secondary hover:scale-105"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* TheCloudaro Universe */}
        <div className="mb-6">
          <SectionHeading title="AROVERSE" />
          <ul className="space-y-2">
            {universeItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 text-dropdown-text-secondary hover:scale-105"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Language & Currency - static text only */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-dropdown-bg-secondary text-dropdown-text-secondary">
            <span className="text-sm font-medium">English-US</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-dropdown-bg-secondary text-dropdown-text-secondary">
            <span className="text-sm font-medium">US Dollar $</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </motion.div>
    ) : (
      <motion.div
        key="detail-view"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        className="px-4 pt-4 pb-4"
      >
        {/* Back Button */}
        <div
          className="flex items-center gap-2 text-dropdown-text-secondary mb-6 cursor-pointer"
          onClick={handleBackToMenu}
        >
          <ChevronLeft size={20} className="text-white" />
          <span className="font-medium">Back</span>
        </div>

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          {getMenuIcon(selectedMenu)}
          <h2 className="text-white text-xl font-bold">{currentMenu.title}</h2>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {currentMenu.sections.map((item, idx) => (
            <Link
              key={idx}
              href={item.href || "#"}
              onClick={onClose}
              className="group p-4 rounded-lg transition-all cursor-pointer border border-dropdown-border block"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <h3 className="text-white font-semibold text-base mb-1">
                {item.title}
              </h3>
              <p className="text-dropdown-text-muted text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


      {/* Desktop View */}
      <div className="hidden md:flex h-full max-h-[80vh]">
        {/* Sidebar */}
        <div className="bg-dropdown-bg-secondary border-r border-dropdown-border p-6 w-[18rem] flex flex-col">
          <div className="flex-1 ml-[40px]">
            {/* What's Hot */}
            <div className="mb-4">
              <SectionHeading title="WHAT'S HOT" />
              <ul className="space-y-1">
                {hotItems.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                        isPathActive(item.href)
                          ? "hover:scale-105"
                          : "hover:scale-105"
                      }`}
                      style={isPathActive(item.href) ? {
                        backgroundColor: 'rgba(var(--dropdown-item-hover-bg))',
                        color: 'rgb(var(--navbar-mobile-menu-text))',
                        border: 'none'
                      } : {}}
                      onMouseEnter={(e) => {
                        if (!isPathActive(item.href)) {
                          e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-text))';
                          e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isPathActive(item.href)) {
                          e.currentTarget.style.color = '';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Products */}
            <div className="mb-4">
              <SectionHeading title="ALL PRODUCTS" />
              <ul className="space-y-1">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        setSelectedMenu(item.key);
                        // Map key back to navbar menu name and notify parent
                        const navbarMenuName = mapKeyToMenu(item.key);
                        onMenuSelect?.(navbarMenuName);
                      }}
                      className={`w-full text-left flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                        selectedMenu === item.key
                          ? "border shadow hover:scale-105"
                          : "hover:scale-105"
                      }`}
                      style={selectedMenu === item.key ? {
                        background: `linear-gradient(to right, rgba(var(--dropdown-active-gradient-from)), rgba(var(--dropdown-active-gradient-to)))`,
                        color: 'rgb(var(--dropdown-active-text))',
                        borderColor: 'rgba(var(--dropdown-active-border))'
                      } : {
                        color: 'rgb(var(--dropdown-slate-text))'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedMenu !== item.key) {
                          e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-text))';
                          e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedMenu !== item.key) {
                          e.currentTarget.style.color = 'rgb(var(--dropdown-slate-text))';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* TheCloudaro Universe */}
            <div className="mb-4">
              <SectionHeading title="AROVERSE" />
              <ul className="space-y-1">
                {universeItems.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                        isPathActive(item.href)
                          ? "hover:scale-105"
                          : "hover:scale-105"
                      }`}
                      style={isPathActive(item.href) ? {
                        backgroundColor: 'rgba(var(--dropdown-item-hover-bg))',
                        color: 'rgb(var(--navbar-mobile-menu-text))',
                        border: 'none'
                      } : {}}
                      onMouseEnter={(e) => {
                        if (!isPathActive(item.href)) {
                          e.currentTarget.style.color = 'rgb(var(--navbar-mobile-menu-text))';
                          e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isPathActive(item.href)) {
                          e.currentTarget.style.color = '';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-dropdown-bg-primary relative overflow-y-auto max-h-[80vh]">
          <SectionHeading title={currentMenu.title} showLine lineWidth="700px" />

          <div className="grid grid-cols-2 gap-4 mt-4 w-full sm:w-[80%] lg:w-[70%] xl:w-[60%]">
            {currentMenu.sections.map((item, idx) => (
              <Link
                key={idx}
                href={item.href || "#"}
                onClick={onClose}
                className="group p-3 rounded-lg transition-all cursor-pointer block"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(var(--dropdown-item-hover-bg))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <h3 className="text-white font-semibold text-sm group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-dropdown-text-muted text-xs mt-1 leading-relaxed group-hover:text-white">{item.desc}</p>
              </Link>
            ))}
          </div>

          {/* Light blue blur accent */}
          <div 
            className="absolute bottom-0 right-0 w-[180px] h-[180px] blur-3xl rounded-full"
            style={{ backgroundColor: 'rgba(var(--dropdown-accent-blur))' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
