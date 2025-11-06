"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Star } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
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
    <div className="min-h-screen bg-[#191c1c] text-gray-300 overflow-hidden">
      {/* Navbar */}
      <Navbar hideBanner={true} />
      
      {/* Sub-navigation Tabs */}
      <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative border-b pb-4" style={{ borderColor: '#4A4A4A' }}>
            <div className="flex items-center space-x-8">
              {/* Domains Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("domains")}
              >
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  activeTab === "domains" ? "bg-green-400" : "bg-gray-400"
                }`}></div>
                <span className={`font-medium transition-colors ${
                  activeTab === "domains" ? "text-white" : "text-gray-400"
                }`}>Domains</span>
              </div>
              
              {/* Pricing Tab */}
              <div 
                className="flex items-center space-x-2 pb-2 cursor-pointer transition-colors"
                onClick={() => setActiveTab("pricing")}
              >
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  activeTab === "pricing" ? "bg-green-400" : "bg-gray-400"
                }`}></div>
                <span className={`font-medium transition-colors ${
                  activeTab === "pricing" ? "text-white" : "text-gray-400"
                }`}>Pricing</span>
              </div>
            </div>
            
            {/* Sliding Blue Line */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-blue-500"
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
                placeholder="Search for a domain name here..."
                className="w-full pl-12 pr-4 py-5 text-base bg-transparent border rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 hover:transition-all duration-300"
                style={{ borderColor: '#4A4A4A' }}
                onFocus={(e) => e.target.style.borderColor = '#3A4ACB'}
                onBlur={(e) => e.target.style.borderColor = '#4A4A4A'}
              />
            </div>

            {/* Instruction Message */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-full p-5 flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <span className="text-gray-400 text-base font-semibold">Start typing above to search for a domain name.</span>
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
              <h2 className="text-3xl font-bold text-white text-center">
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
                    className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{result.name}</h3>
                      <div className="flex items-center space-x-2">
                        {result.popular && (
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">Popular</span>
                          </div>
                        )}
                        {result.premium && (
                          <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                            Premium
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {result.available ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mr-2" />
                        )}
                        <span
                          className={`font-medium ${
                            result.available ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {result.available ? "Available" : "Taken"}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold text-white">${result.price}</div>
                          {result.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              ${result.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">per year</div>
                      </div>
                    </div>

                    {result.available && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300"
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
