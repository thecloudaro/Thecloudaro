'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Navbar/SideBar";
import DomainCard from "@/components/Navbar/DomainCard";

interface UniversalLayoutProps {
  section: string;
}

export default function UniversalLayout({ section }: UniversalLayoutProps) {
  const [active, setActive] = useState(section);

  useEffect(() => {
    setActive(section);
  }, [section]);

  const allOptions: Record<string, { title: string; desc: string }[]> = {
    domains: [
      { title: "Domains", desc: "Start your story with the right domain." },
      { title: "Domain Name Search", desc: "Search and find your ideal domain name." },
      { title: "Domain Pricing", desc: "Check the latest and best domain prices." },
      { title: "Transfer Domains", desc: "Move your domains to Spaceship easily." },
    ],
    hosting: [
      { title: "Web Hosting", desc: "Fast and reliable web hosting for your site." },
      { title: "WordPress Hosting", desc: "Optimized hosting for WordPress users." },
      { title: "Business Hosting", desc: "Powerful hosting built for business needs." },
      { title: "Ecommerce Hosting", desc: "Grow your online store with speed and security." },
    ],
    email: [
      { title: "Professional Email", desc: "Get a personalized business email address." },
      { title: "Email Security", desc: "Protect your inbox with advanced spam filters." },
      { title: "Email Migration", desc: "Easily move your email to our secure servers." },
      { title: "Email Hosting", desc: "Reliable and scalable email hosting for teams." },
    ],
    cloud: [
      { title: "Cloud Storage", desc: "Secure cloud solutions for your growing data." },
      { title: "Starlight™ Cloud", desc: "Experience lightning-fast performance with our cloud tech." },
      { title: "Compute Services", desc: "Scalable computing power for any workload." },
      { title: "Cloud Backup", desc: "Automatic and encrypted backups for peace of mind." },
    ],
    security: [
      { title: "SSL Certificates", desc: "Protect your website with trusted SSL certificates." },
      { title: "Website Security", desc: "Monitor and secure your site from threats." },
      { title: "DDoS Protection", desc: "Advanced protection for high-traffic websites." },
      { title: "Privacy Tools", desc: "Keep your online identity safe and private." },
    ],
  };

  const options = allOptions[active?.toLowerCase()] || [];

  return (
    <div className="flex flex-col lg:flex-row min-h-[50vh] bg-[#0c0c0e] text-gray-200 rounded-xl">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          {active.charAt(0).toUpperCase() + active.slice(1).toLowerCase()}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {options.map((opt, i) => (
            <DomainCard key={i} title={opt.title} desc={opt.desc} />
          ))}
        </div>
      </motion.main>
    </div>
  );
}
