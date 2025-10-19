"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Server, Mail, Cloud, ArrowRight, Star, HelpCircle } from "lucide-react";

interface UniversalDropdownProps {
  activeMenu: string; // domains | hosting | email | cloud | security
}

export default function UniversalDropdown({ activeMenu }: UniversalDropdownProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
       className="fixed top-[72px] left-0 w-full h-[70vh]
                  bg-slate-900/95 backdrop-blur-md 
                  border-t border-slate-700 
                  overflow-hidden z-40 rounded"
    >
      <div className="flex h-full">
        {/* ===== Sidebar ===== */}
        <div className="w-60 md:w-72 lg:w-80 h-full bg-slate-800/50 border-r border-slate-700 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-400 mb-2 uppercase tracking-wider border-b border-slate-700 pb-1.5">
              Whats Hot
            </h3>
             <ul className="space-y-1 mt-3 text-[14px]">
               <li>
                 <a href="/domain-search" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Globe size={14} /> Domain Name Search
                 </a>
               </li>
               <li>
                 <a href="/domain-pricing" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Server size={14} /> Domain Pricing
                 </a>
               </li>
               <li>
                 <a href="/transfer-domains" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Mail size={14} /> Transfer Domains
                 </a>
               </li>
               <li>
                 <a href="/web-hosting" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Cloud size={14} /> Web Hosting
                 </a>
               </li>
               <li>
                 <a href="/virtual-machines" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Cloud size={14} /> Virtual Machines
                 </a>
               </li>
               <li>
                 <a href="/business-email" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Mail size={14} /> Business Email
                 </a>
               </li>
               <li>
                 <a href="/request-feature" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <ArrowRight size={14} /> Request New Feature
                 </a>
               </li>
             </ul>

            <h3 className="text-[11px] font-semibold text-slate-400 mt-6 mb-2 uppercase tracking-wider border-b border-slate-700 pb-1.5">
              TheCloudaro Universe
                        </h3>
            <ul className="space-y-1 mt-3 text-[12px]">
               <li>
                 <a href="/transfer-to-us" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <ArrowRight size={14} /> Transfer to Us
                 </a>
               </li>
               <li>
                 <a href="/why-thecloudaro" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <Star size={14} /> Why TheCloudaro
                 </a>
               </li>
               <li>
                 <a href="/about" className="flex items-center gap-2.5 px-3 py-1.5 text-slate-300 hover:bg-slate-800/60 hover:text-white rounded-md transition">
                   <HelpCircle size={14} /> About
                 </a>
               </li>
             </ul>
                      </div>
                    </div>

        {/* ===== Main Dynamic Section ===== */}
        <div className="flex-1 p-8 bg-slate-900">
          <h2 className="text-[11px] font-semibold text-slate-400 mb-5 uppercase tracking-wider border-b border-slate-700 pb-2">
            {currentMenu.title}
                  </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentMenu.sections.map((item, idx) => (
              <div
                key={idx}
                className="group hover:bg-slate-800/50 p-3.5 rounded-lg border border-transparent hover:border-slate-700 transition-all"
              >
                <h3 className="text-[16px] text-white font-medium group-hover:text-blue-400 transition">
                            {item.title}
                          </h3>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
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
