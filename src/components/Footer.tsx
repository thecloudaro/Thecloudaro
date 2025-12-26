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
    { title: "Follow Us", links: ["Facebook", "LinkedIn", "Instagram"] },
  ];

  const paymentMethods = [
    { name: "Visa", src: "/Footer/visa.webp" },
    { name: "Mastercard", src: "/Footer/master.png" },
    { name: "PayPal", src: "/Footer/paypal.png" },
   
  ];

  return (
    <footer className="bg-footer-bg-primary text-footer-text-secondary">
      {/* Newsletter */}
      <div className="border-b border-footer-border">
        <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-footer-text-primary text-2xl font-bold mb-2">Join our universe</h1>
            <p className="text-footer-text-muted text-sm md:text-base">
              Subscribe to keep up with everything happening on Spaceship, from deals and promotions to product launches.
            </p>
          </div>

          <div className="relative w-full md:w-auto min-w-[300px]">
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-footer-bg-secondary text-footer-text-primary placeholder-footer-text-muted pr-12 h-12 rounded-full border border-footer-border"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 rounded-full bg-primary hover:bg-primaryHover"
            >
              <Image src="/Footer/search.png" alt="Send" width={24} height={24} className="object-contain" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* FIRST COLUMN */}
        <div>
          {footerSections[0].subSections?.map((sub) => (
            <div key={sub.heading} className="mb-6">
              <h4 className="text-footer-text-primary font-semibold text-lg mb-3">{sub.heading}</h4>
              <ul className="space-y-2">
                {sub.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-footer-accent transition-colors text-sm">
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
            <h4 className="text-footer-text-primary font-semibold text-lg mb-4">{section.title}</h4>
            {section.title === "Follow Us" ? (
              <div className="flex gap-4">
                <Link href="https://facebook.com/thecloudaro">
                  <Image src="/Footer/fb.webp" alt="Facebook" width={40} height={40} className="object-cover"/>
                </Link>
                <Link href="https://linkedin.com/company/thecloudaro">
                  <Image src="/Footer/linkedin.png" alt="LinkedIn" width={40} height={40} className="object-cover"/>
                </Link>
                <Link href="https://instagram.com/thecloudaro">
                  <Image src="/Footer/insta.jpeg" alt="Instagram" width={40} height={40} className="object-cover"/>
                </Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {section.links?.map((link) => (
                  <li key={link}>
                    <Link
                      href={link === "Contact Us" ? "/about/contactus" : link === "About Us" ? "/about" : link === "Roadmap" ? "/roadmap" : link === "Privacy Policy" ? "/privacy-policy" : link === "Domain Registration Data Disclosure Policy" ? "/domain-registration-data-disclosure-policy" : link === "Request New Feature" ? "/request-new-feature" : link === "Status Updates" ? "https://twitter.com/cloudaro" : link === "Knowledge Base" ? "/knowledge-base" : link === "Terms & Conditions" ? "/terms-and-conditions" : "#"} 
                      className="hover:text-footer-accent transition-colors text-sm" >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {section.hasButton && (
              <Link href="/request-new-feature">
                <Button className="mt-4 border border-footer-border text-footer-text-secondary hover:bg-footer-bg-secondary hover:text-footer-accent">
                  Request New Feature
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Payment & Copyright */}
      <div className="border-t border-footer-border bg-footer-bg-secondary">
        <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h5 className="text-footer-text-primary font-semibold mb-3">Payment Options</h5>
            <div className="flex flex-wrap gap-2 mb-3">
              {paymentMethods.map((method) => (
                <div key={method.name} className="w-10 h-7 rounded-md overflow-hidden flex items-center justify-center bg-footer-payment-bg" title={method.name}>
                  <Image src={method.src} alt={method.name} width={40} height={28} className="object-cover rounded-md" />
                </div>
              ))}
            </div>
            
          </div>

          <div className="text-footer-text-muted text-sm mt-4 lg:mt-0">
            <p>©2025 The Cloud Aro</p>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
