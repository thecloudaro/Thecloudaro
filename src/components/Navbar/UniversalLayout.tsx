"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Navbar/SideBar";
import DomainCard from "@/components/Navbar/DomainCard";

interface UniversalLayoutProps {
  section: string; // incoming section from dropdown
}

export default function UniversalLayout({ section }: UniversalLayoutProps) {
  const [active, setActive] = useState(section);

  useEffect(() => {
    setActive(section); // Update active section when dropdown changes
  }, [section]);

  // Define options dynamically for all sections
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

  // Get options for current active section
  const options = allOptions[active.toLowerCase()] || [];

  return (
    <div className="flex min-h-[50vh] bg-[#0c0c0e] text-gray-200 rounded-xl">
      <Sidebar active={active} setActive={setActive} />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-10 overflow-y-auto"
      >
        {/* Display heading with first letter uppercase */}
        <h1 className="text-2xl font-bold text-white mb-6">
          {active.charAt(0).toUpperCase() + active.slice(1).toLowerCase()}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((opt, i) => (
            <DomainCard key={i} title={opt.title} desc={opt.desc} />
          ))}
        </div>
      </motion.main>
    </div>
  );
}
