"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Star } from "lucide-react";
import DomainPricingTable from "@/components/Domain/DomainPricingTable";
import BackToTopButton from "@/components/BackToTopButton";

interface DomainResult {
  name: string;
  available: boolean;
  price: number;
  currency: string;
  originalPrice?: number;
  popular?: boolean;
  premium?: boolean;
}

const DomainSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [activeTab, setActiveTab] = useState("domains");

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    // Simulate API call
    setTimeout(() => {
      const mockResults: DomainResult[] = [
        { 
          name: `${term}.com`, 
          available: Math.random() > 0.3, 
          price: 8.88, 
          originalPrice: 12.99,
          currency: "USD",
          popular: true
        },
        { 
          name: `${term}.net`, 
          available: Math.random() > 0.4, 
          price: 11.2, 
          currency: "USD" 
        },
        { 
          name: `${term}.org`, 
          available: Math.random() > 0.5, 
          price: 6.48, 
          currency: "USD" 
        },
        { 
          name: `${term}.io`, 
          available: Math.random() > 0.2, 
          price: 31.05, 
          currency: "USD",
          premium: true
        },
        { 
          name: `${term}.co`, 
          available: Math.random() > 0.6, 
          price: 25.99, 
          currency: "USD" 
        },
        { 
          name: `${term}.app`, 
          available: Math.random() > 0.4, 
          price: 20.99, 
          currency: "USD" 
        },
        { 
          name: `${term}.dev`, 
          available: Math.random() > 0.3, 
          price: 15.99, 
          currency: "USD" 
        },
        { 
          name: `${term}.xyz`, 
          available: Math.random() > 0.7, 
          price: 1.99, 
          currency: "USD" 
        },
      ];

      setSearchResults(mockResults);
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{ backgroundColor: 'rgb(var(--domain-search-bg))', color: 'rgb(var(--domain-search-text))' }}>
      
      {/* Sub-navigation Tabs */}
      <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative border-b pb-4" style={{ borderColor: 'rgb(var(--domain-search-tab-border))' }}>
            <div className="flex items-center space-x-8">
              {/* Domains Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("domains")}
              >
                <div 
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ backgroundColor: activeTab === "domains" ? 'rgb(var(--domain-search-tab-active-dot))' : 'rgb(var(--domain-search-tab-inactive-dot))' }}
                ></div>
                <span 
                  className="font-medium transition-colors"
                  style={{ color: activeTab === "domains" ? 'rgb(var(--domain-search-tab-active-text))' : 'rgb(var(--domain-search-tab-inactive-text))' }}
                >Domains</span>
              </div>
              
              {/* Pricing Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("pricing")}
              >
                <div 
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ backgroundColor: activeTab === "pricing" ? 'rgb(var(--domain-search-tab-active-dot))' : 'rgb(var(--domain-search-tab-inactive-dot))' }}
                ></div>
                <span 
                  className="font-medium transition-colors"
                  style={{ color: activeTab === "pricing" ? 'rgb(var(--domain-search-tab-active-text))' : 'rgb(var(--domain-search-tab-inactive-text))' }}
                >Pricing</span>
              </div>
            </div>
            
            {/* Sliding Blue Line */}
            <motion.div
              className="absolute bottom-0 h-0.5"
              style={{ backgroundColor: 'rgb(var(--domain-search-tab-indicator))' }}
              initial={false}
              animate={{
                x: activeTab === "domains" ? 0 : 120,
                width: activeTab === "domains" ? 80 : 70
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-4 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgb(var(--domain-search-input-icon))' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
                placeholder="Search for a domain name here..."
                className="w-full pl-12 pr-4 py-5 text-base bg-transparent border rounded-full focus:outline-none hover:transition-all duration-300 placeholder:text-[rgb(var(--domain-search-input-placeholder))]"
                style={{ 
                  borderColor: 'rgb(var(--domain-search-input-border))',
                  color: 'rgb(var(--domain-search-input-text))'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(var(--domain-search-input-border-focus))';
                  e.currentTarget.style.boxShadow = `0 0 0 1px rgba(var(--domain-search-input-focus-ring))`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(var(--domain-search-input-border))';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Instruction Message */}
            <div 
              className="rounded-full p-5 flex items-center space-x-3"
              style={{ 
                backgroundColor: 'rgba(var(--domain-search-info-bg))',
                border: '1px solid rgba(var(--domain-search-info-border))'
              }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--domain-search-info-icon-bg))' }}>
                <span className="text-sm font-bold" style={{ color: 'rgb(var(--domain-search-info-icon-text))' }}>!</span>
              </div>
              <span className="text-base font-semibold" style={{ color: 'rgb(var(--domain-search-info-text))' }}>Start typing above to search for a domain name.</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-center" style={{ color: 'rgb(var(--domain-search-heading))' }}>
                Available Domains
              </h2>
              
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(var(--domain-search-card-bg))',
                      border: '1px solid rgb(var(--domain-search-card-border))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(var(--domain-search-card-border-hover))';
                      e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(var(--domain-search-card-shadow-hover)), 0 4px 6px -2px rgba(var(--domain-search-card-shadow-hover))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--domain-search-card-border))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold" style={{ color: 'rgb(var(--domain-search-card-name))' }}>{result.name}</h3>
                      <div className="flex items-center space-x-2">
                        {result.popular && (
                          <div className="flex items-center" style={{ color: 'rgb(var(--domain-search-popular-text))' }}>
                            <Star className="w-4 h-4 mr-1" style={{ color: 'rgb(var(--domain-search-popular-icon))' }} />
                            <span className="text-sm font-medium">Popular</span>
                          </div>
                        )}
                        {result.premium && (
                          <div className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(var(--domain-search-premium-bg))', color: 'rgb(var(--domain-search-premium-text))' }}>
                            Premium
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {result.available ? (
                          <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'rgb(var(--domain-search-available-icon))' }} />
                        ) : (
                          <XCircle className="w-5 h-5 mr-2" style={{ color: 'rgb(var(--domain-search-unavailable-icon))' }} />
                        )}
                        <span
                          className="font-medium"
                          style={{ color: result.available ? 'rgb(var(--domain-search-available-text))' : 'rgb(var(--domain-search-unavailable-text))' }}
                        >
                          {result.available ? "Available" : "Taken"}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold" style={{ color: 'rgb(var(--domain-search-price))' }}>${result.price}</div>
                          {result.originalPrice && (
                            <div className="text-sm line-through" style={{ color: 'rgb(var(--domain-search-original-price))' }}>
                              ${result.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-sm" style={{ color: 'rgb(var(--domain-search-price-label))' }}>per year</div>
                      </div>
                    </div>

                    {result.available && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-lg font-medium transition-all duration-300"
                        style={{ 
                          backgroundColor: 'rgb(var(--domain-search-button-bg))',
                          color: 'rgb(var(--domain-search-button-text))'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-hover))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--domain-search-button-bg))';
                        }}
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Domain Pricing Table - Only show when pricing tab is active */}
      {activeTab === "pricing" && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DomainPricingTable />
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      <BackToTopButton />

    </div>
  );
};

export default DomainSearchPage;
