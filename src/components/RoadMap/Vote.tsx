"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ArrowUpDown, ThumbsUp, Plus } from "lucide-react";

interface Feature {
  id: string;
  category: string;
  title: string;
  votes: number;
}

const underReviewFeatures: Feature[] = [
  { id: "1", category: "DOMAINS", title: "Fast Transfer with Afternic", votes: 596 },
  { id: "2", category: "DOMAINS", title: "Cancel a domain registration", votes: 324 },
  { id: "3", category: "DOMAINS", title: "Domain backorder and monitoring", votes: 281 },
  { id: "4", category: "DOMAINS", title: "Dynamic DNS", votes: 271 },
  { id: "5", category: "EMAIL", title: "DMARC Generator in Spacemail Manager", votes: 206 },
  { id: "6", category: "DOMAINS", title: "Registry lock service support", votes: 198 },
  { id: "7", category: "DOMAINS", title: "Domain ownership transfer: Extra security", votes: 176 },
  { id: "8", category: "DOMAINS", title: "Shared domain management", votes: 158 },
  { id: "9", category: "DOMAINS", title: "Domain Portfolio: Multiple categories", votes: 151 },
  { id: "10", category: "DOMAINS", title: "Bulk transfer out functionality", votes: 144 },
  { id: "11", category: "DOMAINS", title: "Transfer connected products together with a domain name to another Spaceship account", votes: 122 },
  { id: "12", category: "DOMAINS", title: ".is domain registration", votes: 106 },
  { id: "13", category: "DOMAINS", title: "Domain ownership transfer: Contact info", votes: 103 },
  { id: "14", category: "DOMAINS", title: "Domain ownership transfer: Moving products", votes: 94 },
  { id: "15", category: "EMAIL", title: "Scheduled send in Spacemail", votes: 39 },
  { id: "16", category: "EMAIL", title: "Filter rules improvements", votes: 18 },
  { id: "17", category: "DOMAINS", title: "Domain Portfolio: AI estimated value", votes: 9 },
  { id: "18", category: "DOMAINS", title: "Domain Portfolio: Domain notes", votes: 9 },
  { id: "19", category: "DOMAINS", title: "Domain Portfolio: URL Redirect Destination", votes: 5 },
  { id: "20", category: "DOMAINS", title: "Domain Portfolio: Date picker", votes: 4 },
  { id: "21", category: "DOMAINS", title: "Domain Portfolio: A Record column", votes: 4 },
  { id: "22", category: "DOMAINS", title: "Domain Portfolio: Filter by length", votes: 3 },
  { id: "23", category: "HOSTING", title: "Hyperlift Scaling", votes: 1 },
  { id: "24", category: "HOSTING", title: "Hyperlift Build history", votes: 1 },
];

const upcomingFeatures: Feature[] = [
  { id: "up1", category: "PLATFORM", title: "UPI", votes: 328 },
  { id: "up2", category: "PLATFORM", title: "Wire transfers", votes: 200 },
  { id: "up3", category: "PLATFORM", title: "Max order increase (500+)", votes: 198 },
  { id: "up4", category: "EMAIL", title: "Set automatic replies in Spacemail", votes: 112 },
  { id: "up5", category: "PLATFORM", title: "Spanish alphabet symbols", votes: 97 },
  { id: "up6", category: "HOSTING", title: "Load balancer for Starlight™ Virtual Machines", votes: 72 },
  { id: "up7", category: "HOSTING", title: "Backup for Starlight™ Virtual Machines", votes: 53 },
  { id: "up8", category: "SELLERHUB", title: "External API support", votes: 52 },
  { id: "up9", category: "HOSTING", title: "Floating IP for Starlight™ Virtual Machines", votes: 46 },
  { id: "up10", category: "HOSTING", title: "Hyperlift Resource monitoring", votes: 7 },
  { id: "up11", category: "DOMAINS", title: "Domain Portfolio: SellerHub domain listing", votes: 6 },
  { id: "up12", category: "SELLERHUB", title: "Lease-to-Own: bulk updates", votes: 5 },
  { id: "up13", category: "DOMAINS", title: "Domain Portfolio: SellerHub status filter", votes: 3 },
  { id: "up14", category: "SELLERHUB", title: "Early Payoff for Lease-to-Own Domains", votes: 45 },
  { id: "up15", category: "PLATFORM", title: "New language — Khmer, Cambodia", votes: 35 },
  { id: "up16", category: "DOMAINS", title: "DNSSEC support for .ad, .eu, and more", votes: 28 },
  { id: "up17", category: "DOMAINS", title: "External domains verification improvement", votes: 28 },
  { id: "up18", category: "EMAIL", title: "New language for Spacemail — Khmer, Cambodia", votes: 26 },
  { id: "up19", category: "HOSTING", title: "Starlight™ Managed Databases", votes: 22 },
  { id: "up20", category: "DOMAINS", title: "DNS record import improvements", votes: 22 },
  { id: "up21", category: "DOMAINS", title: "Register .cat and .barcelona domains", votes: 17 },
  { id: "up22", category: "DOMAINS", title: "Manual connections validation", votes: 12 },
];

const releasedFeatures: Feature[] = [
  { id: "rel1", category: "DOMAINS, SELLERHUB", title: "SellerHub", votes: 565 },
  { id: "rel2", category: "PLATFORM", title: "Dark mode", votes: 477 },
  { id: "rel3", category: "DOMAINS", title: "API management", votes: 477 },
  { id: "rel4", category: "EMAIL", title: "Spacemail app for Android", votes: 350 },
  { id: "rel5", category: "PLATFORM", title: "Alipay", votes: 283 },
  { id: "rel6", category: "NEW PRODUCT", title: "Thunderbolt App", votes: 272 },
  { id: "rel7", category: "EMAIL", title: "Spacemail app for iOS", votes: 268 },
  { id: "rel8", category: "DOMAINS", title: ".de domain registration", votes: 265 },
  { id: "rel9", category: "HOSTING", title: "VPS Hosting", votes: 249 },
  { id: "rel10", category: "DOMAINS", title: "Bulk registration", votes: 165 },
  { id: "rel11", category: "DOMAINS", title: "Custom URL redirects from subdomains", votes: 143 },
  { id: "rel12", category: "DOMAINS", title: "SEDO integration", votes: 132 },
  { id: "rel13", category: "EMAIL", title: "Email auto-discovery (auto-configuration) for Spacemail", votes: 129 },
  { id: "rel14", category: "EMAIL", title: "Keep your data safe with tracking protection - Spacemail", votes: 123 },
  { id: "rel15", category: "DOMAINS", title: "IDN domains registration", votes: 104 },
  { id: "rel16", category: "SECURITY & PRIVACY", title: "HTTPS URL Redirect", votes: 101 },
  { id: "rel17", category: "EMAIL", title: "Spacemail calendar", votes: 93 },
  { id: "rel18", category: "DOMAINS", title: "Transfer In: Set default DNS presets", votes: 68 },
  { id: "rel19", category: "HOSTING", title: "Direct cPanel Login", votes: 64 },
  { id: "rel20", category: "HOSTING", title: "Volumes for Starlight™ Virtual Machines", votes: 63 },
  { id: "rel21", category: "DOMAINS", title: "Registrar lock and EPP checker before transfer submission", votes: 62 },
  { id: "rel22", category: "HOSTING", title: "Shared Hosting dedicated IP address", votes: 60 },
  { id: "rel23", category: "SELLERHUB", title: "SellerHub: Billing settings configuration", votes: 60 },
  { id: "rel24", category: "DOMAINS", title: ".to domain registration", votes: 59 },
  { id: "rel25", category: "DOMAINS", title: ".im domain registration", votes: 59 },
  { id: "rel26", category: "DOMAINS", title: "Whois +", votes: 57 },
  { id: "rel27", category: "DOMAINS", title: "DNS import during domain transfer", votes: 56 },
  { id: "rel28", category: "HOSTING", title: "Asia Hosting", votes: 51 },
  { id: "rel29", category: "DOMAINS", title: ".fast, .talk, and .you domain registrations", votes: 51 },
  { id: "rel30", category: "EMAIL", title: "Make your mark with a profile picture", votes: 50 },
  { id: "rel31", category: "EMAIL", title: "Email address auto-suggestions", votes: 49 },
  { id: "rel32", category: "SECURITY & PRIVACY", title: "Passwordless login with passkey", votes: 48 },
  { id: "rel33", category: "EMAIL", title: "Light/Dark mode for Spacemail", votes: 48 },
  { id: "rel34", category: "EMAIL", title: "IMAP/SMTP/POP3 configuration details in Spacemail Manager", votes: 44 },
  { id: "rel35", category: "EMAIL", title: "Send from aliases", votes: 44 },
  { id: "rel36", category: "SELLERHUB", title: "Domain list export in SellerHub", votes: 44 },
  { id: "rel37", category: "PLATFORM", title: "API Key permissions", votes: 41 },
  { id: "rel38", category: "HOSTING", title: "Starlight™ Virtual Machines monitoring", votes: 40 },
  { id: "rel39", category: "HOSTING", title: "EU Hosting", votes: 40 },
  { id: "rel40", category: "HOSTING", title: "UK Hosting", votes: 40 },
  { id: "rel41", category: "SELLERHUB", title: "Lease-to-Own: Setup via CSV", votes: 36 },
  { id: "rel42", category: "EMAIL", title: "Two-factor authentication (2FA) for Spacemail", votes: 36 },
  { id: "rel43", category: "EASYWP", title: "Automatic WordPress core/themes/plugins update", votes: 35 },
  { id: "rel44", category: "HOSTING", title: "Domain aliases", votes: 35 },
  { id: "rel45", category: "EMAIL", title: "Migration tool", votes: 34 },
  { id: "rel46", category: "EMAIL", title: "Add more storage to your Spacemail account", votes: 33 },
  { id: "rel47", category: "DOMAINS", title: ".free, .hot, and .spot domain registration", votes: 33 },
  { id: "rel48", category: "DOMAINS", title: ".cv domain registration", votes: 33 },
  { id: "rel49", category: "SELLERHUB", title: "Optional Downpayment & Final Payment for Lease-to-Own domains", votes: 32 },
  { id: "rel50", category: "EASYWP", title: "WordPress migration tool", votes: 32 },
  { id: "rel51", category: "HOSTING", title: "Security Tool for Shared Hosting", votes: 30 },
  { id: "rel52", category: "SECURITY & PRIVACY", title: "Universal Two-Factor Authentication (U2F)", votes: 30 },
  { id: "rel53", category: "DOMAINS", title: "Transfer in external domain names", votes: 28 },
  { id: "rel54", category: "DOMAINS", title: "Advanced DNS: TLSA records", votes: 24 },
  { id: "rel55", category: "PLATFORM", title: "New language — Chinese Cantonese", votes: 23 },
  { id: "rel56", category: "DOMAINS", title: "HelperWidget for Transfers", votes: 23 },
  { id: "rel57", category: "DOMAINS", title: "Domain Lifecycle: after-expiration process", votes: 22 },
  { id: "rel58", category: "DOMAINS", title: ".ad domain registration", votes: 20 },
  { id: "rel59", category: "DOMAINS", title: "Bulk transfer domains", votes: 19 },
  { id: "rel60", category: "PLATFORM", title: "UnionPay and JCB", votes: 19 },
  { id: "rel61", category: "DOMAINS", title: "External API: domain billing operations", votes: 19 },
  { id: "rel62", category: "HOSTING", title: "AutoBackup – Shared Hosting", votes: 19 },
  { id: "rel63", category: "DOMAINS", title: "Unbox™: Default DNS presets", votes: 19 },
  { id: "rel64", category: "EMAIL", title: "Access to spam management tool for Spacemail", votes: 3 },
  { id: "rel65", category: "EMAIL", title: "New language for Spacemail — Spanish", votes: 3 },
  { id: "rel66", category: "EMAIL", title: "New language version for Spacemail — Spanish (Spain)", votes: 3 },
  { id: "rel67", category: "DOMAINS", title: ".hiphop domain registration", votes: 3 },
  { id: "rel68", category: "DOMAINS", title: ".abogado, .blackfriday, .compare, .courses, .gay, .health, .ink, .luxe, .photo, .select, .study, .wiki registration", votes: 3 },
  { id: "rel69", category: "EMAIL", title: "New language for Spacemail — Portuguese", votes: 3 },
  { id: "rel70", category: "DOMAINS", title: ".top domain registration", votes: 3 },
  { id: "rel71", category: "DOMAINS", title: "Transfer App enhancements", votes: 3 },
  { id: "rel72", category: "DOMAINS", title: "DNS import during nameserver switch", votes: 3 },
  { id: "rel73", category: "EMAIL", title: "New language for Spacemail — German", votes: 3 },
  { id: "rel74", category: "EMAIL", title: "New language for Spacemail — Bengali", votes: 3 },
  { id: "rel75", category: "PLATFORM", title: "New language — Korean", votes: 2 },
  { id: "rel76", category: "DOMAINS", title: "Premium domain renewal", votes: 2 },
  { id: "rel77", category: "EMAIL", title: "New language for Spacemail — Ukrainian", votes: 2 },
  { id: "rel78", category: "DOMAINS", title: "Submit transfers from the Transfer App", votes: 2 },
  { id: "rel79", category: "EMAIL", title: "New language for Spacemail — Hindi", votes: 2 },
  { id: "rel80", category: "PLATFORM", title: "New language — Thai", votes: 2 },
  { id: "rel81", category: "DOMAINS", title: ".bot domain registration", votes: 2 },
  { id: "rel82", category: "EMAIL", title: "New language for Spacemail — Chinese Mandarin", votes: 2 },
  { id: "rel83", category: "PLATFORM", title: "New language — Vietnamese", votes: 2 },
  { id: "rel84", category: "EMAIL", title: "CalDAV and CardDAV sync for calendar and contacts", votes: 2 },
  { id: "rel85", category: "EMAIL", title: "Movable compose window for seamless productivity", votes: 2 },
  { id: "rel86", category: "EMAIL", title: "Free trials with Spacemail", votes: 2 },
  { id: "rel87", category: "EMAIL", title: "New language for Spacemail - Polish", votes: 1 },
  { id: "rel88", category: "SELLERHUB", title: "Lease-to-Own default amount settings", votes: 1 },
  { id: "rel89", category: "EMAIL", title: "New language for Spacemail — Hungarian", votes: 1 },
  { id: "rel90", category: "EMAIL", title: "New language for Spacemail — Korean", votes: 1 },
  { id: "rel91", category: "PLATFORM", title: "CHF, PKR, PHP, COP, ZAR, DKK, and TWD currencies", votes: 0 },
  { id: "rel92", category: "SELLERHUB", title: "Lease-to-Own support", votes: 0 },
  { id: "rel93", category: "EMAIL", title: "Mark emails as favorites for quick access", votes: 0 },
  { id: "rel94", category: "EMAIL", title: "New language for Spacemail — Thai", votes: 0 },
  { id: "rel95", category: "DOMAINS", title: "Uniregistry TLDs registration", votes: 0 },
  { id: "rel96", category: "SECURITY & PRIVACY", title: "Credentials Recovery with Domain", votes: 0 },
  { id: "rel97", category: "DOMAINS", title: "Switch domain ownership: Choose contacts", votes: 0 },
];

const Vote = () => {
  const [activeTab, setActiveTab] = useState<"under-review" | "upcoming" | "released">("under-review");
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());

  const handleVote = (featureId: string) => {
    setVotedFeatures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };

  // Get features based on active tab
  const getFeatures = () => {
    switch (activeTab) {
      case "under-review":
        return underReviewFeatures;
      case "upcoming":
        return upcomingFeatures;
      case "released":
        return releasedFeatures;
      default:
        return underReviewFeatures;
    }
  };

  const features = getFeatures();

  return (
    <div 
      className="w-full py-8 sm:py-12 md:py-16"
      style={{ backgroundColor: '#17181a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
        {/* Tabs and Action Buttons */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b flex-1 pb-3" style={{ borderColor: 'rgb(55 65 81)' }}>
              <button
                onClick={() => setActiveTab("under-review")}
                className="pb-3 px-1 text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === "under-review" 
                    ? 'rgb(37 99 235)' 
                    : 'rgb(156 163 175)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "under-review") {
                    e.currentTarget.style.color = 'rgb(255 255 255)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "under-review") {
                    e.currentTarget.style.color = 'rgb(156 163 175)';
                  }
                }}
              >
                Under Review
                {activeTab === "under-review" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'rgb(37 99 235)' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className="pb-3 px-1 text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === "upcoming" 
                    ? 'rgb(37 99 235)' 
                    : 'rgb(156 163 175)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "upcoming") {
                    e.currentTarget.style.color = 'rgb(255 255 255)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "upcoming") {
                    e.currentTarget.style.color = 'rgb(156 163 175)';
                  }
                }}
              >
                Upcoming
                {activeTab === "upcoming" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'rgb(37 99 235)' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("released")}
                className="pb-3 px-1 text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === "released" 
                    ? 'rgb(37 99 235)' 
                    : 'rgb(156 163 175)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "released") {
                    e.currentTarget.style.color = 'rgb(255 255 255)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "released") {
                    e.currentTarget.style.color = 'rgb(156 163 175)';
                  }
                }}
              >
                Released
                {activeTab === "released" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'rgb(37 99 235)' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Filter and Votes Buttons - Under Review tab ke neeche */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: 'rgb(31 41 55)',
                color: 'rgb(209 213 219)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(55 65 81)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(31 41 55)';
              }}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: 'rgb(31 41 55)',
                color: 'rgb(209 213 219)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(55 65 81)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(31 41 55)';
              }}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Votes
            </button>
            </div>

            {/* Request new feature button */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: 'rgb(37 99 235)',
                color: 'rgb(255 255 255)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(29 78 216)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(37 99 235)';
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              Request new feature
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {features.map((feature, index) => {
            const isVoted = votedFeatures.has(feature.id);
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-lg transition-all h-full flex flex-col"
                style={{
                  backgroundColor: '#252626',
                  border: `1px solid rgb(55 65 81)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(75 85 99)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(55 65 81)';
                }}
              >
                {/* Category Tag */}
                <div
                  className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold mb-4 w-fit"
                  style={{
                    backgroundColor: 'rgb(37 99 235)',
                    color: 'rgb(255 255 255)',
                  }}
                >
                  {feature.category}
                </div>

                {/* Feature Title */}
                <h3 
                  className="text-sm font-semibold mb-4 flex-1"
                  style={{ color: 'rgb(255 255 255)' }}
                >
                  {feature.title}
                </h3>

                {/* Votes and Add Vote Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'rgb(55 65 81)' }}>
                  <span 
                    className="text-[8px] font-medium"
                    style={{ color: 'rgb(156 163 175)' }}
                  >
                    {feature.votes} VOTES
                  </span>
                  <button
                    onClick={() => handleVote(feature.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      backgroundColor: '#252626',
                      color: isVoted 
                        ? 'rgb(255 255 255)' 
                        : 'rgb(209 213 219)',
                    }}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {isVoted ? 'Voted' : 'Add vote'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Diagonal Section Divider */}
      <div className="relative w-full">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,5L1200,120L0,120Z" 
            fill="#17181a" 
            opacity="1" />
        </svg>
      </div>
    </div>
  );
};

export default Vote;

