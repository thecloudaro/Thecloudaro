"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface UniversalDropdownProps {
  activeMenu: string;
  currentPath?: string;
  onClose?: () => void;
}

export default function UniversalDropdown({ 
  activeMenu, 
  currentPath, 
  onClose 
}: UniversalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedMenu, setSelectedMenu] = useState(activeMenu || "domains");
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    setSelectedMenu(activeMenu || "domains");
  }, [activeMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest("nav") || target.closest("[data-dropdown-trigger]")) return;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuData = {
    domains: {
      title: "Domains",
      sections: [
        { title: "Domain Name Search", desc: "Find the perfect domain name." },
        { title: "Domain Pricing", desc: "Check the latest domain prices." },
        { title: "Transfer Domains", desc: "Move your domains easily." },
      ],
    },
    hosting: {
      title: "Hosting",
      sections: [
        { title: "Web Hosting", desc: "Fast and reliable hosting for any site." },
        { title: "WordPress Hosting", desc: "Optimized hosting for WP sites." },
        { title: "Business Hosting", desc: "Powerful hosting for growing teams." },
        { title: "Ecommerce Hosting", desc: "Secure hosting for online stores." },
      ],
    },
    email: {
      title: "Email",
      sections: [
        { title: "Business Email", desc: "Professional email for your domain." },
        { title: "Business Email Login", desc: "Access your business email." },
        { title: "Migrate Email", desc: "Move your email with ease." },
      ],
    },
    cloud: {
      title: "Cloud",
      sections: [
        { title: "Virtual Machines", desc: "Scale your cloud infrastructure." },
        { title: "VM Manager", desc: "Manage your virtual machines easily." },
      ],
    },
    security: {
      title: "Security",
      sections: [
        { title: "Domain Privacy", desc: "Keep your domain info private." },
        { title: "CDN", desc: "Speed up your site worldwide." },
        { title: "VPN", desc: "Secure your online presence." },
      ],
    },
  };

  const currentMenu = menuData[selectedMenu as keyof typeof menuData] || menuData.domains;
  const isPathActive = (path: string) => currentPath?.startsWith(path);

  const handleMenuSelect = (key: string) => {
    setSelectedMenu(key);
    setShowMobileDetail(true);
  };

  const handleBackToMenu = () => {
    setShowMobileDetail(false);
  };

  const menuItems = [
    { key: "domains", icon: <Globe size={18} />, label: "Domains" },
    { key: "hosting", icon: <Server size={18} />, label: "Hosting" },
    { key: "email", icon: <Mail size={18} />, label: "Email" },
    { key: "cloud", icon: <Cloud size={18} />, label: "Cloud" },
    { key: "security", icon: <Shield size={18} />, label: "Security" },
  ];

  const hotItems = [
    { href: "/domain-search", icon: <Globe size={14} />, label: "Domain Name Search" },
    { href: "/transfer-domains", icon: <Mail size={14} />, label: "Transfer Domains" },
    { href: "/web-hosting", icon: <Cloud size={14} />, label: "Web Hosting" },
  ];

  const universeItems = [
    { href: "/transfer-to-us", icon: <ArrowRight size={14} />, label: "Transfer to Us" },
    { href: "/why-thecloudaro", icon: <Star size={14} />, label: "Why TheCloudaro" },
    { href: "/about", icon: <HelpCircle size={14} />, label: "About Us" },
  ];

  const getMenuIcon = (menu: string) => {
    const icons = {
      domains: <Globe size={24} />,
      hosting: <Server size={24} />,
      email: <Mail size={24} />,
      cloud: <Cloud size={24} />,
      security: <Shield size={24} />,
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
      className="fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-slate-900 border-t border-slate-700 overflow-hidden z-40"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Mobile View - No top space */}
      <div className="md:hidden h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {!showMobileDetail ? (
            <motion.div
              key="menu-list"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="p-4"
            >
              {/* Login Section */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 mb-6 border border-blue-400/30">
                <div className="flex items-start gap-3 mb-3">
                  <User className="text-blue-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold text-sm">Log in to TheCloudaro</h3>
                    <p className="text-slate-400 text-xs mt-1">Manage your products and Apps</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Don&apos;t have an account?</span>
                <a href="/signup" className="text-blue-400 font-medium hover:underline">Sign up</a>
                </div>
              </div>

              {/* What's Hot */}
              <div className="mb-6">
                <SectionHeading title="WHAT'S HOT" />
                <ul className="space-y-2">
                  {hotItems.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                          isPathActive(item.href)
                            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Products */}
              <div className="mb-6">
                <SectionHeading title="ALL PRODUCTS" />
                <ul className="space-y-2">
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleMenuSelect(item.key)}
                        className={`w-full text-left flex items-center justify-between gap-3 px-3 py-3 rounded-md transition-all duration-300 ${
                          selectedMenu === item.key
                            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                        }`}
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

              {/* TheCloudaro Universe */}
              <div className="mb-6">
                <SectionHeading title="THECLOUDARO UNIVERSE" />
                <ul className="space-y-2">
                  {universeItems.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                          isPathActive(item.href)
                            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Language and Currency */}
              <div className="mb-6">
                <SectionHeading title="LANGUAGE AND CURRENCY" />
                
                {/* Language Dropdown */}
                <div className="mb-3">
                  <button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/60 text-slate-300 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm font-medium">English-US</span>
                    <ChevronDown size={16} className={`transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {languageOpen && (
                    <div className="mt-1 ml-4 space-y-1">
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        English-UK
                      </button>
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        Spanish
                      </button>
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        French
                      </button>
                    </div>
                  )}
                </div>

                {/* Currency Dropdown */}
                <div>
                  <button
                    onClick={() => setCurrencyOpen(!currencyOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/60 text-slate-300 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm font-medium">US Dollar $</span>
                    <ChevronDown size={16} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {currencyOpen && (
                    <div className="mt-1 ml-4 space-y-1">
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        Euro €
                      </button>
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        GBP £
                      </button>
                      <button className="w-full text-left px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors">
                        INR ₹
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Appearance Section REMOVED */}
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="p-4"
            >
              {/* Back Button */}
              <button
                onClick={handleBackToMenu}
                className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Back</span>
              </button>

              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                {getMenuIcon(selectedMenu)}
                <h2 className="text-white text-xl font-bold">{currentMenu.title}</h2>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {currentMenu.sections.map((item, idx) => (
                  <div
                    key={idx}
                    className="group hover:bg-slate-800/40 p-4 rounded-lg transition-all cursor-pointer border border-slate-600/50"
                  >
                    <h3 className="text-white font-semibold text-base group-hover:text-blue-400 mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

{/* Desktop View */}
<div className="hidden md:flex h-full max-h-[80vh]">
  {/* Sidebar - Logo ki seedhi line mein aligned */}
  <div className="bg-slate-800 border-r border-slate-700 p-6 w-[18rem] flex flex-col">
    <div className="flex-1">
      {/* What's Hot - Logo ke niche seedha */}
      <div className="mb-8">
        <SectionHeading title="WHAT'S HOT" />
        <ul className="space-y-1">
          {hotItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className={`flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                  isPathActive(item.href)
                    ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* All Products - Logo ke niche seedha */}
      <div className="mb-8">
        <SectionHeading title="ALL PRODUCTS" />
        <ul className="space-y-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => setSelectedMenu(item.key)}
                className={`w-full text-left flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                  selectedMenu === item.key
                    ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* TheCloudaro Universe - Logo ke niche seedha */}
      <div>
        <SectionHeading title="THECLOUDARO UNIVERSE" />
        <ul className="space-y-1">
          {universeItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className={`flex items-center gap-2 px-0 py-1.5 rounded-md transition-all duration-300 text-sm ${
                  isPathActive(item.href)
                    ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/60 shadow"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Main Content - Height sidebar ke equal */}
  <div className="flex-1 p-6 bg-slate-900 relative overflow-y-auto max-h-[80vh]">
    <SectionHeading title={currentMenu.title} showLine lineWidth="700px" />
    
    <div className="grid grid-cols-2 gap-4 mt-4 w-full sm:w-[80%] lg:w-[70%] xl:w-[60%]">
      {currentMenu.sections.map((item, idx) => (
        <div
          key={idx}
          className="group hover:bg-slate-800/40 p-3 rounded-lg transition-all cursor-pointer"
        >
          <h3 className="text-white font-semibold text-sm group-hover:text-blue-400">{item.title}</h3>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Light blue blur accent */}
    <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-blue-500/10 blur-3xl rounded-full" />
  </div>
</div>
    </motion.div>
  );
}