"use client";

import Link from "next/link";

const Links = () => {
  const hostingLinks = [
    "Starlight™ Terms of Service",
    "Hosting Acceptable Use Policy (AUP)",
    "EasyWP Terms of Service Agreement",
    "Hosting Terms of Service",
    "Hosting Uptime Guarantee",
    "EasyWP Uptime Guarantee",
    "CDN Uptime Guarantee"
  ];

  const sslLinks = [
    "SSL Certificates Service Agreement"
  ];

  const generalLinks = [
    "Refund Policy",
    "Privacy Policy",
    "The Cloud Aro Cookie Policy",
    "CCPA Privacy Notice",
    "Copyright and Trademark Policies",
    "Domain Registration Data Disclosure Policy + Guide",
    "How to Report Abuse Incidents in The Cloud Aro",
    "The Cloud Aro Court Order & Subpoena Policy",
    "LGPD Privacy Notice",
    "India: Reporting Grievances",
    "Notice and Removal of Non-Consensual Intimate Visual Depictions"
  ];

  // Second Section Links
  const domainLinks = [
    "Domain Marketplace Agreement",
    "Registration Data Access Protocol (\"RDAP\") Terms of Service Agreement",
    "ICANN Fee",
    "Domain Registration Agreement",
    "Registrant Rights, Benefits and Responsibilities",
    "Supplemental Registry Agreement for Certain TLDs",
    "Uniform Domain Name Dispute Resolution Policy"
  ];

  const vpnLinks = [
    "FastVPN Privacy Policy",
    "FastVPN Terms of Service"
  ];

  const spacemailLinks = [
    "Spacemail Terms of Service"
  ];

  const surveysLinks = [
    "Privacy for Public Blog",
    "Surveys and Competitions Terms & Conditions"
  ];

  const whoisLinks = [
    "WHOIS Privacy Service Agreement"
  ];

  const universalLinks = [
    "Data Processing Addendum",
    "The Cloud Aro Universal Terms of Service Agreement"
  ];

  return (
    <div 
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
          {/* Left Column - Hosting and SSL Certificates */}
          <div className="md:col-span-1 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Hosting Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                Hosting
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {hostingLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SSL Certificates Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                SSL Certificates
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {sslLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - General Policies / Notices */}
          <div className="md:col-span-2">
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                General Policies / Notices
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {generalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          {/* Left Column - Domains, VPN, Spacemail */}
          <div className="md:col-span-1 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Domains Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                Domains
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {domainLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* VPN Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                VPN
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {vpnLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spacemail Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                Spacemail
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {spacemailLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Surveys, WHOIS, Universal */}
          <div className="md:col-span-2 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Surveys, Competitions and Comments Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                Surveys, Competitions and Comments
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {surveysLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHOIS Privacy Service Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                WHOIS Privacy Service
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {whoisLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Universal Terms of Service Section */}
            <div>
              <h3 
                className="text-lg sm:text-xl md:text-xl font-bold mb-2 sm:mb-3"
                style={{ color: 'rgb(255 255 255)' }}
              >
                Universal Terms of Service
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {universalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs transition-all hover:underline"
                      style={{ 
                        color: 'rgb(59 130 246)',
                        textDecorationColor: 'rgb(59 130 246)'
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Section Divider */}
      <div className="relative w-full">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,5L1200,120L0,120Z" 
            fill="#1a1a1a" 
            opacity="1" />
        </svg>
      </div>
    </div>
  );
};

export default Links;

