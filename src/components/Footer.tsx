'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface SubSection {
  heading: string;
  links: string[];
}

interface FooterSection {
  title?: string;
  links?: string[];
  subSections?: SubSection[];
  hasButton?: boolean;
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      subSections: [
        { heading: "Products", links: ["Domain Name Search", "Domain Pricing"] },
        { heading: "Hosting", links: ["Web Hosting","WordPress Hosting","Business Hosting","Ecommerce Hosting","Transfer Hosting"] },
        { heading: "Email", links: ["Business Email", "Business Email Login"] },
        { heading: "Cloud", links: ["Virtual Machines", "VM Manager"] },
        { heading: "Security", links: ["Domain Privacy", "CDN", "VPN"] },
      ],
    },
    { title: "Transfer to Us", links: ["Transfer Domains","Migrate Hosting","Migrate Email","Transfer WordPress"] },
    { title: "Customer Service", links: ["Contact Us","Status Updates","Knowledge Base"], hasButton: true },
    { title: "About Cloud Aro", links: ["About Us","Roadmap","Terms & Conditions","Privacy Policy","Domain Registration Data Disclosure Policy","Cookies Preferences"] },
  ];

  const socialIcons = [
    { name: "Facebook", src: "/Footer/fb.webp" },
    { name: "LinkedIn", src: "/Footer/linkedin.png" },
    { name: "Instagram", src: "/Footer/insta.jpeg" },
  ];

  const paymentMethods = [
    { name: "Visa", src: "/Footer/visa.webp" },
    { name: "Mastercard", src: "/Footer/master.png" },
    { name: "Amex", src: "/Footer/amex.png" },
    { name: "Discover", src: "/Footer/discover.jpeg" },
    { name: "Diners", src: "/Footer/diner.png" },
    { name: "JCB", src: "/Footer/jcb.png" },
    { name: "UnionPay", src: "/Footer/union.png" },
    { name: "Bitcoin", src: "/Footer/bitcoin.jpeg" },
    { name: "PayPal", src: "/Footer/paypal.png" },
    { name: "GPay", src: "/Footer/gpay.png" },
    { name: "Apple Pay", src: "/Footer/apple.jpeg" },
    { name: "Alipay", src: "/Footer/alipay.png" },
  ];

  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-white text-2xl font-bold mb-2">Join our universe</h1>
            <p className="text-gray-400 text-sm md:text-base">
              Subscribe to keep up with everything happening here, from deals and promotions to product launches.
            </p>
          </div>

          <div className="relative w-full md:w-auto min-w-[300px]">
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-gray-800 text-white placeholder-gray-400 pr-12 h-12 rounded-full border border-gray-700"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500"
            >
              <Image src="/Footer/search.png" alt="Send" width={24} height={24} className="object-contain" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* FIRST COLUMN */}
        <div>
          {footerSections[0].subSections?.map((sub) => (
            <div key={sub.heading} className="mb-6">
              <h4 className="text-white font-semibold text-lg mb-3">{sub.heading}</h4>
              <ul className="space-y-2">
                {sub.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* REMAINING COLUMNS */}
        {footerSections.slice(1).map((section) => (
          <div key={section.title}>
            <h4 className="text-white font-semibold text-lg mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links?.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            {section.hasButton && (
              <Button className="mt-4 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                Request New Feature
              </Button>
            )}
          </div>
        ))}

        {/* FOLLOW US */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {socialIcons.map((icon) => (
              <Link key={icon.name} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors overflow-hidden">
                <Image src={icon.src} alt={icon.name} width={40} height={40} className="object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Payment & Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h5 className="text-white font-semibold mb-3">Payment Options</h5>
            <div className="flex flex-wrap gap-2 mb-3">
              {paymentMethods.map((method) => (
                <div key={method.name} className="w-10 h-7 rounded-md overflow-hidden flex items-center justify-center bg-gray-800" title={method.name}>
                  <Image src={method.src} alt={method.name} width={40} height={28} className="object-cover rounded-md" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">We protect and safeguard your data.</p>
          </div>

          <div className="text-gray-400 text-sm mt-4 lg:mt-0">
            <p>© 2019–2025 Cloud Aro</p>
            <p className="mt-1">4600 East Washington Street, Suite 300, Phoenix, AZ 85034, USA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
