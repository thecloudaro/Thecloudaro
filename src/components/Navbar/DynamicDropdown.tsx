"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Mail, Cloud, ArrowRight, Star, HelpCircle } from "lucide-react";
import SectionHeading from "../HomeSection/BuildAround/SectionHeading";

interface UniversalDropdownProps {
  activeMenu: string;
  currentPath?: string;
  onClose?: () => void;
}

export default function UniversalDropdown({ activeMenu, currentPath, onClose }: UniversalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

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
  const isPathActive = (path: string) => currentPath?.startsWith(path);

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-[72px] left-0 w-full h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[85vh] xl:h-[80vh] 
                 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 overflow-hidden z-40"
    >
      <div className="flex h-full overflow-hidden">
        {/* ==== Sidebar ==== */}
        <div className="bg-slate-800/50 border-r border-slate-700 p-5 flex flex-col"
             style={{ width: "18rem" }}>
          <div className="space-y-4 sm:space-y-6 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
        {/* What's Hot */}
            <div>
            <SectionHeading title="WHAT'S HOT" />


              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/domain-search", icon: <Globe size={12} className="sm:w-3 sm:h-3" />, label: "Domain Name Search" },
                  { href: "/transfer-domains", icon: <Mail size={12} className="sm:w-3 sm:h-3" />, label: "Transfer Domains" },
                  { href: "/web-hosting", icon: <Cloud size={12} className="sm:w-3 sm:h-3" />, label: "Web Hosting" },
                  { href: "/request-feature", icon: <ArrowRight size={12} className="sm:w-3 sm:h-3" />, label: "Request Feature" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 sm:py-[6px] rounded-md transition ${
                        isPathActive(item.href)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs sm:text-sm">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Products */}
            <div>
<SectionHeading title="ALL PRODUCTS" />

              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/domains", icon: <Globe size={12} className="sm:w-3 sm:h-3" />, label: "Domains" },
                  { href: "/hosting", icon: <Server size={12} className="sm:w-3 sm:h-3" />, label: "Hosting" },
                  { href: "/email", icon: <Mail size={12} className="sm:w-3 sm:h-3" />, label: "Email" },
                  { href: "/cloud", icon: <Cloud size={12} className="sm:w-3 sm:h-3" />, label: "Cloud" },
                  { href: "/security", icon: <HelpCircle size={12} className="sm:w-3 sm:h-3" />, label: "Security" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 sm:py-[6px] rounded-md transition ${
                        isPathActive(item.href) || activeMenu === item.href.slice(1)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs sm:text-sm">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* TheCloudaro Universe */}
            <div>
            <SectionHeading title="THECLOUDARO UNIVERSE" />

              <ul className="space-y-1 text-xs sm:text-sm">
                {[
                  { href: "/transfer-to-us", icon: <ArrowRight size={12} className="sm:w-3 sm:h-3" />, label: "Transfer to Us" },
                  { href: "/why-thecloudaro", icon: <Star size={12} className="sm:w-3 sm:h-3" />, label: "Why TheCloudaro" },
                  { href: "/about", icon: <HelpCircle size={12} className="sm:w-3 sm:h-3" />, label: "About Us" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 sm:py-[6px] rounded-md transition ${
                        isPathActive(item.href)
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/50"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs sm:text-sm">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


{/* ==== Main Dropdown (Responsive Grid) ==== */}
<div className="flex-1 p-4 sm:p-6 md:p-8 bg-slate-900 relative overflow-hidden">
  {/* Heading same style + shorter line */}
  <SectionHeading title={currentMenu.title} showLine={true} lineWidth="700px" />

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-5 w-full sm:w-[80%] lg:w-[70%] xl:w-[60%]">
    {currentMenu.sections.map((item, idx) => (
      <div
        key={idx}
        className="group hover:bg-slate-800/40 p-2 sm:p-3 rounded-lg transition-all cursor-pointer"
      >
        <h3 className="text-white font-semibold text-xs sm:text-sm group-hover:text-blue-400">
          {item.title}
        </h3>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>

  {/* Light blue blur accent */}
  <div className="absolute bottom-0 right-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-blue-500/10 blur-3xl rounded-full" />
</div>

</div>
    </motion.div>
  );
}
