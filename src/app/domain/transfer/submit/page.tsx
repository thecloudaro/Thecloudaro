"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, AlertCircle } from "lucide-react";

const DomainTransferSubmitPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [registerLock, setRegisterLock] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      name: "envidat.com",
      price: 9.48,
      currency: "USD",
      type: "transfer"
    }
  ]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    // Simulate adding to cart
    const newItem = {
      name: term,
      price: Math.random() * 50 + 5,
      currency: "USD",
      type: "transfer"
    };
    
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#191c1c] text-gray-300 overflow-hidden pt-14">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Complete Your Domain Transfer
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
              Review your domains and complete the transfer process
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Search and Cart */}
            <div>
              {/* Search Section */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                    placeholder="Type your domain to transfer..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[hsl(var(--gradient-teal))] focus:ring-2 focus:ring-[hsl(var(--gradient-teal))]/20 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch(searchTerm)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white px-6 py-2 rounded-md font-medium transition-all duration-300"
                  >
                    Transfer
                  </motion.button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Domains eligible for transfer</h3>
                
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            ${item.price}
                          </div>
                          <div className="text-sm text-gray-400">per year</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Authorization code
                          </label>
                          <input
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="Enter authorization code"
                            className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[hsl(var(--gradient-teal))] focus:ring-2 focus:ring-[hsl(var(--gradient-teal))]/20 transition-all duration-300"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-gray-300 text-sm mr-2">Register Lock</span>
                            <button
                              onClick={() => setRegisterLock(!registerLock)}
                              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                registerLock ? 'bg-[hsl(var(--gradient-teal))]' : 'bg-gray-500'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                                registerLock ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Transfer Info */}
            <div className="space-y-8">
              {/* Transfer Steps */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Transfer Process</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[hsl(var(--gradient-teal))] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Unlock your domain</h4>
                      <p className="text-gray-400 text-sm">Remove domain lock at your current registrar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[hsl(var(--gradient-teal))] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Get ready to transfer</h4>
                      <p className="text-gray-400 text-sm">Disable privacy protection and get auth code</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[hsl(var(--gradient-teal))] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Get your authorization code</h4>
                      <p className="text-gray-400 text-sm">Request EPP code from current registrar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
                <div className="flex items-start mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-yellow-400">
                    Important Notes
                  </h4>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Domain must be unlocked at current registrar</li>
                  <li>• Privacy protection must be disabled</li>
                  <li>• Domain must be older than 60 days</li>
                  <li>• No pending transfers or disputes</li>
                  <li>• Valid authorization code required</li>
                </ul>
              </div>

              {/* Transfer Summary */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Transfer Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-white">
                    <span>Total</span>
                    <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-[hsl(var(--gradient-teal))] hover:bg-[hsl(var(--gradient-teal))]/80 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  Just to cart
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainTransferSubmitPage;
