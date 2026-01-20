"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// Social icons for Instagram/LinkedIn are served from /public/Footer assets

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
  // Simple config to hide/show items - Change false to true to show them
  const hiddenItems = {
    cloud: true,           // Set to false to show Cloud section
    businessEmail: true,    // Set to false to show Business Email
    cdn: true,             // Set to false to show CDN
    vpn: true,             // Set to false to show VPN
    roadmap: true,         // Set to false to show Roadmap
    transferWordpress: true, // Set to false to show Transfer WordPress
    migrateEmail: true,     // Set to false to show Migrate Email
    cookiesPreferences: true, // Set to false to show Cookies Preferences
    virtualMachines: true,  // Set to false to show Virtual Machines
    statusUpdates: true,    // Set to false to show Status Updates (will be removed completely)
  };

  const footerSections: FooterSection[] = [
    {
      subSections: [
        {
          heading: "Products",
          links: ["Domain Name Search", "Domain Pricing"],
        },
        {
          heading: "Hosting",
          links: [
            "Web Hosting",
            "WordPress Hosting",
            "Business Hosting",
            "Ecommerce Hosting",
            "Transfer Hosting",
          ],
        },
        { heading: "Email", links: ["Business Email", "Business Email Login"] },
        { heading: "Cloud", links: ["Virtual Machines", "VM Manager"] },
        { heading: "Security", links: ["Domain Privacy", "CDN", "VPN", "SSL Certificates"] },
      ],
    },
    {
      title: "Transfer to Us",
      links: [
        "Transfer Domains",
        "Migrate Hosting",
        "Migrate Email",
        "Transfer WordPress",
      ],
    },
    {
      title: "Customer Service",
      links: ["Contact Us", ...(hiddenItems.statusUpdates ? [] : ["Status Updates"]), "Knowledge Base"],
      hasButton: true,
    },
    { title: "About The Cloud Aro", links: ["About Us","Roadmap","Terms & Conditions","Privacy Policy","Domain Registration Data Disclosure Policy","Cookies Preferences"] },
    { title: "Follow Us", links: ["Facebook", "LinkedIn", "Instagram"] },
  ];

  const paymentMethods = [
    { name: "Visa", src: "/Footer/visa.webp" },
    { name: "Mastercard", src: "/Footer/master.png" },
    { name: "PayPal", src: "/Footer/paypal.png" },
  ];

  return (
    <footer className="bg-footer-bg-primary text-footer-text-secondary">
      {/* Footer Links */}
      <div className="container mx-auto max-w-screen-xl px-8 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* FIRST COLUMN */}
        <div>
          {footerSections[0].subSections?.map((sub) => (
            (sub.heading === "Cloud" && hiddenItems.cloud) ? null : (
              <div key={sub.heading} className="mb-6">
                <h4 className="text-footer-text-primary font-semibold text-lg mb-3">
                  {sub.heading}
                </h4>
                <ul className="space-y-2">
                  {sub.links.map((link) => (
                    ((link === "Business Email" && hiddenItems.businessEmail) || 
                     (link === "CDN" && hiddenItems.cdn) || 
                     (link === "VPN" && hiddenItems.vpn)) ? null : (
                      <li key={link}>
                        <Link
                          href={
                            link === "Domain Name Search"
                              ? "/domain-search"
                              : link === "Domain Pricing"
                                ? "/domain-search"
                                : link === "Web Hosting"
                                  ? "/web-hosting"
                                  : link === "WordPress Hosting"
                                    ? "/hosting-for-wordpress"
                                    : link === "Business Hosting"
                                      ? "/business-hosting"
                                      : link === "Ecommerce Hosting"
                                        ? "/ecommerce-hosting"
                                        : link === "Transfer Hosting"
                                          ? "/transfer"
                                          : link === "Business Email"
                                            ? "/business-email"
                                            : link === "Business Email Login"
                                              ? "/login"
                                              : link === "Virtual Machines"
                                                ? "/virtual-machine"
                                                : link === "VM Manager"
                                                  ? "/vm-manager"
                                                  : link === "Domain Privacy"
                                                    ? "/domain-name-privacy"
                                                    : link === "CDN"
                                                      ? "/cdn"
                                                      : link === "VPN"
                                                        ? "/vpn"
                                                        : link === "SSL Certificates"
                                                          ? "/ssl-certificates"
                                                          : "#"
                          }
                          className="hover:text-footer-accent transition-colors text-sm"
                        >
                          {link}
                        </Link>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        {/* REMAINING COLUMNS */}
        {footerSections.slice(1).map((section) => (
          <div key={section.title}>
            <h4 className="text-footer-text-primary font-semibold text-lg mb-4">
              {section.title}
            </h4>
            {section.title === "Follow Us" ? (
              <div className="flex gap-3">
                {/* Facebook - use asset from public/Footer */}
                <Link
                  href="https://facebook.com/thecloudaro"
                  aria-label="The Cloud Aro on Facebook"
                  className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-footer-payment-bg transition-transform"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "rgb(var(--footer-facebook-bg))" }}
                  >
                    <Image
                      src="/Footer/facebook.svg"
                      alt="Facebook"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                </Link>
                {/* LinkedIn */}
                <Link
                  href="https://linkedin.com/company/thecloudaro"
                  aria-label="The Cloud Aro on LinkedIn"
                  className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-footer-payment-bg transition-transform"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src="/Footer/linkedin.png"
                    alt="LinkedIn"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </Link>
                {/* Instagram */}
                <Link
                  href="https://instagram.com/thecloudaro"
                  aria-label="The Cloud Aro on Instagram"
                  className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-footer-payment-bg transition-transform"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src="/Footer/insta.jpeg"
                    alt="Instagram"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {section.links?.map((link) => (
                  ((link === "Roadmap" && hiddenItems.roadmap) ||
                   (link === "Status Updates" && hiddenItems.statusUpdates) ||
                   (link === "Migrate Email" && hiddenItems.migrateEmail) ||
                   (link === "Transfer WordPress" && hiddenItems.transferWordpress) ||
                   (link === "Cookies Preferences" && hiddenItems.cookiesPreferences)) ? null : (
                    <li key={link}>
                      <Link
                        href={
                          link === "Contact Us"
                            ? "/about/contactus"
                            : link === "About Us"
                              ? "/about"
                              : link === "Roadmap"
                                ? "/roadmap"
                                : link === "Privacy Policy"
                                  ? "/legal/policy"
                                  : link ===
                                      "Domain Registration Data Disclosure Policy"
                                    ? "/legal/domain-registration-data-disclosure-policy"
                                    : link === "Request New Feature"
                                      ? "/request-new-feature"
                                      : link === "Status Updates"
                                        ? "https://twitter.com/cloudaro"
                                    : link === "Knowledge Base"
                                      ? "/knowledgebase"
                                      : link === "Terms & Conditions"
                                            ? "/legal"
                                            : link === "Transfer Domains"
                                              ? "/domain/transfer"
                                              : link === "Migrate Hosting"
                                                ? "/migration-to-thecloudaro"
                                                : link === "Migrate Email"
                                                  ? "/migrate-business-email"
                                                  : link === "Transfer WordPress"
                                                    ? "/hosting-for-wordpress/migrate"
                                                    : "#"
                        }
                        className="hover:text-footer-accent transition-colors text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  )
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
            <h5 className="text-footer-text-primary font-semibold mb-3">
              Payment Options
            </h5>
            <div className="flex flex-wrap gap-2 mb-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="w-10 h-7 rounded-md overflow-hidden flex items-center justify-center bg-footer-payment-bg"
                  title={method.name}
                >
                  <Image
                    src={method.src}
                    alt={method.name}
                    width={40}
                    height={28}
                    className="object-cover rounded-md"
                  />
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
