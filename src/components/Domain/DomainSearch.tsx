"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Star } from "lucide-react";

interface DomainResult {
  name: string;
  available: boolean;
  price: number;
  currency: string;
  category: string;
  popular?: boolean;
}

const DomainSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Domains", icon: "🌐" },
    { id: "popular", name: "Popular", icon: "⭐" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "tech", name: "Technology", icon: "💻" },
    { id: "creative", name: "Creative", icon: "🎨" },
  ];

  const popularDomains = [
    { name: "mybusiness.com", price: 12.99, available: true },
    { name: "techstartup.io", price: 45.99, available: true },
    { name: "creativeagency.net", price: 15.99, available: false },
    { name: "onlinestore.shop", price: 25.99, available: true },
    { name: "blogname.blog", price: 8.99, available: true },
  ];

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: DomainResult[] = [
        {
          name: `${term}.com`,
          available: Math.random() > 0.3,
          price: 12.99,
          currency: "USD",
          category: "business",
          popular: Math.random() > 0.7
        },
        {
          name: `${term}.net`,
          available: Math.random() > 0.4,
          price: 15.99,
          currency: "USD",
          category: "business"
        },
        {
          name: `${term}.org`,
          available: Math.random() > 0.5,
          price: 18.99,
          currency: "USD",
          category: "business"
        },
        {
          name: `${term}.io`,
          available: Math.random() > 0.2,
          price: 45.99,
          currency: "USD",
          category: "tech"
        },
        {
          name: `${term}.co`,
          available: Math.random() > 0.6,
          price: 25.99,
          currency: "USD",
          category: "business"
        },
        {
          name: `${term}.app`,
          available: Math.random() > 0.4,
          price: 20.99,
          currency: "USD",
          category: "tech"
        },
        {
          name: `${term}.dev`,
          available: Math.random() > 0.3,
          price: 15.99,
          currency: "USD",
          category: "tech"
        },
        {
          name: `${term}.blog`,
          available: Math.random() > 0.7,
          price: 8.99,
          currency: "USD",
          category: "creative"
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const filteredResults = searchResults.filter(result => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "popular") return result.popular;
    return result.category === selectedCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Domain
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Search for available domains and get instant results with competitive pricing
          </p>
          
          {/* Search Input */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                placeholder="Enter your domain name..."
                className="w-full pl-12 pr-4 py-4 text-lg bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[hsl(var(--gradient-teal))] focus:ring-2 focus:ring-[hsl(var(--gradient-teal))]/20 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(searchTerm)}
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-6 py-2 rounded-md font-medium transition-all duration-300 disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[hsl(var(--gradient-teal))] text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6 hover:border-[hsl(var(--gradient-teal))]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{result.name}</h3>
                  {result.popular && (
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Popular</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {result.available ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mr-2" />
                    )}
                    <span className={`font-medium ${result.available ? 'text-green-400' : 'text-red-400'}`}>
                      {result.available ? 'Available' : 'Taken'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      ${result.price}
                    </div>
                    <div className="text-sm text-gray-400">per year</div>
                  </div>
                </div>
                
                {result.available && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Popular Domains */}
        {searchResults.length === 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Popular Domains</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDomains.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6 hover:border-[hsl(var(--gradient-teal))]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{domain.name}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Popular</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {domain.available ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      <span className={`font-medium ${domain.available ? 'text-green-400' : 'text-red-400'}`}>
                        {domain.available ? 'Available' : 'Taken'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${domain.price}
                      </div>
                      <div className="text-sm text-gray-400">per year</div>
                    </div>
                  </div>
                  
                  {domain.available && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white py-3 rounded-lg font-medium transition-all duration-300"
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Domain Suggestions */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Domain Name Suggestions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Business", suggestions: ["company.com", "business.net", "enterprise.org"] },
              { category: "Technology", suggestions: ["tech.io", "digital.co", "innovation.app"] },
              { category: "Creative", suggestions: ["creative.xyz", "design.studio", "art.gallery"] },
              { category: "Personal", suggestions: ["personal.blog", "portfolio.me", "profile.online"] }
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-4">{category.category}</h4>
                <div className="space-y-2">
                  {category.suggestions.map((suggestion, suggestionIndex) => (
                    <div key={suggestionIndex} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{suggestion}</span>
                      <button className="text-[hsl(var(--gradient-teal))] hover:text-[hsl(var(--gradient-teal))]/80 text-sm font-medium">
                        Search
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSearch;
