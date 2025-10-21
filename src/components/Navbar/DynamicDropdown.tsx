"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Server, Mail, Cloud, ArrowRight, Star, HelpCircle } from "lucide-react";

interface UniversalDropdownProps {
  activeMenu: string;
  currentPath?: string;
}

export default function UniversalDropdown({ activeMenu, currentPath }: UniversalDropdownProps) {
  const menuData: Record<
    string,
    {
      title: string;
      sections: { title: string; desc: string }[];
    }
  > = {
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
        { title: "Transfer Hosting", desc: "Move your hosting to TheCloudaro." },
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

  const currentMenu = menuData[activeMenu] || menuData["domains"];

  const isPathActive = (path: string) => {
    if (!currentPath) return false;
    return currentPath.startsWith(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-[72px] left-0 w-full h-[100vh]
                 bg-slate-900/95 backdrop-blur-md 
                 border-t border-slate-700 
                 overflow-hidden z-40 rounded
                 sm:top-[80px] md:top-[88px] lg:top-[72px]"
    >
      <div className="flex h-full">
        {/* ===== Sidebar (NO SCROLLBAR) ===== */}
        <div className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 h-full 
                bg-slate-800/50 border-r border-slate-700 
                p-3 sm:p-4 md:p-5 flex flex-col overflow-y-auto 
                scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">

          <div className="space-y-3 sm:space-y-4 md:space-y-5 overflow-hidden">
            {/* Whats Hot */}
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-slate-400 mb-2 uppercase tracking-wider border-b border-slate-700 pb-1">
                Whats Hot
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/domain-search", icon: <Globe size={12} />, label: "Domain Name Search" },
                  { href: "/domain-pricing", icon: <Server size={12} />, label: "Domain Pricing" },
                  { href: "/transfer-domains", icon: <Mail size={12} />, label: "Transfer Domains" },
                  { href: "/web-hosting", icon: <Cloud size={12} />, label: "Web Hosting" },
                  { href: "/virtual-machines", icon: <Cloud size={12} />, label: "Virtual Machines" },
                  { href: "/business-email", icon: <Mail size={12} />, label: "Business Email" },
                  { href: "/request-feature", icon: <ArrowRight size={12} />, label: "Request New Feature" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 rounded-md transition ${
                        isPathActive(item.href)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Products */}
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-slate-400 mb-2 uppercase tracking-wider border-b border-slate-700 pb-1">
                All Products
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/domains", icon: <Globe size={12} />, label: "Domains" },
                  { href: "/hosting", icon: <Server size={12} />, label: "Hosting" },
                  { href: "/email", icon: <Mail size={12} />, label: "Email" },
                  { href: "/cloud", icon: <Cloud size={12} />, label: "Cloud" },
                  { href: "/security", icon: <HelpCircle size={12} />, label: "Security" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 rounded-md transition ${
                        isPathActive(item.href) || activeMenu === item.href.slice(1)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Universe */}
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-slate-400 mb-2 uppercase tracking-wider border-b border-slate-700 pb-1">
                TheCloudaro Universe
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/transfer-to-us", icon: <ArrowRight size={12} />, label: "Transfer to Us" },
                  { href: "/why-thecloudaro", icon: <Star size={12} />, label: "Why TheCloudaro" },
                  { href: "/about", icon: <HelpCircle size={12} />, label: "About Us" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 rounded-md transition ${
                        isPathActive(item.href)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== Main Dynamic Section ===== */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 bg-slate-900">
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-slate-400 mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">
            {currentMenu.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {currentMenu.sections.map((item, idx) => (
              <div
                key={idx}
                className="group hover:bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-transparent hover:border-slate-700 transition-all"
              >
                <h3 className="text-sm sm:text-base md:text-lg text-white font-medium group-hover:text-blue-400 transition">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
