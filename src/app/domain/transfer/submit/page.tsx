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
    <div className="min-h-screen overflow-hidden pt-14" style={{ backgroundColor: 'rgb(var(--domain-transfer-submit-bg))', color: 'rgb(var(--domain-transfer-submit-text))' }}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: 'rgb(var(--domain-transfer-submit-heading))' }}>
              Complete Your Domain Transfer
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--domain-transfer-submit-description))' }}>
              Review your domains and complete the transfer process
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Search and Cart */}
            <div>
              {/* Search Section */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgb(var(--domain-transfer-submit-input-icon))' }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                    placeholder="Type your domain to transfer..."
                    className="w-full pl-12 pr-4 py-4 text-lg border rounded-lg focus:outline-none transition-all duration-300 placeholder:text-[rgb(var(--domain-transfer-submit-input-placeholder))]"
                    style={{
                      backgroundColor: 'rgba(var(--domain-transfer-submit-input-bg))',
                      borderColor: 'rgb(var(--domain-transfer-submit-input-border))',
                      color: 'rgb(var(--domain-transfer-submit-input-text))'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'hsl(var(--gradient-teal))';
                      e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--gradient-teal) / 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(var(--domain-transfer-submit-input-border))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch(searchTerm)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-md font-medium transition-all duration-300"
                    style={{
                      backgroundColor: 'rgb(var(--domain-transfer-submit-button-bg))',
                      color: 'rgb(var(--domain-transfer-submit-button-text))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(var(--domain-transfer-submit-button-hover))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(var(--domain-transfer-submit-button-bg))';
                    }}
                  >
                    Transfer
                  </motion.button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="backdrop-blur-sm rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-transfer-submit-card-bg))', border: '1px solid rgb(var(--domain-transfer-submit-card-border))' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'rgb(var(--domain-transfer-submit-card-title))' }}>Domains eligible for transfer</h3>
                
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="rounded-lg p-4"
                      style={{ backgroundColor: 'rgba(var(--domain-transfer-submit-item-bg))' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold" style={{ color: 'rgb(var(--domain-transfer-submit-item-name))' }}>{item.name}</h4>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: 'rgb(var(--domain-transfer-submit-item-price))' }}>
                            ${item.price}
                          </div>
                          <div className="text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-item-label))' }}>per year</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--domain-transfer-submit-item-label))' }}>
                            Authorization code
                          </label>
                          <input
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="Enter authorization code"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 placeholder:text-[rgb(var(--domain-transfer-submit-input-placeholder))]"
                            style={{
                              backgroundColor: 'rgba(var(--domain-transfer-submit-auth-input-bg))',
                              borderColor: 'rgb(var(--domain-transfer-submit-auth-input-border))',
                              color: 'rgb(var(--domain-transfer-submit-input-text))'
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = 'hsl(var(--gradient-teal))';
                              e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--gradient-teal) / 0.2)';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = 'rgb(var(--domain-transfer-submit-auth-input-border))';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-sm mr-2" style={{ color: 'rgb(var(--domain-transfer-submit-item-label))' }}>Register Lock</span>
                            <button
                              onClick={() => setRegisterLock(!registerLock)}
                              className="w-12 h-6 rounded-full transition-all duration-300"
                              style={{ backgroundColor: registerLock ? 'rgb(var(--domain-transfer-submit-toggle-active))' : 'rgb(var(--domain-transfer-submit-toggle-inactive))' }}
                            >
                              <div 
                                className="w-5 h-5 rounded-full transition-all duration-300"
                                style={{ 
                                  backgroundColor: 'rgb(var(--domain-transfer-submit-toggle-thumb))',
                                  transform: registerLock ? 'translateX(24px)' : 'translateX(4px)'
                                }}
                              />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-sm font-medium"
                            style={{ color: 'rgb(var(--domain-transfer-submit-remove-text))' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'rgb(var(--domain-transfer-submit-remove-hover))';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'rgb(var(--domain-transfer-submit-remove-text))';
                            }}
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
              <div className="backdrop-blur-sm rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-transfer-submit-card-bg))', border: '1px solid rgb(var(--domain-transfer-submit-card-border))' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'rgb(var(--domain-transfer-submit-card-title))' }}>Transfer Process</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'rgb(var(--domain-transfer-submit-step-bg))' }}>
                      <span className="font-bold text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-text))' }}>1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'rgb(var(--domain-transfer-submit-step-title))' }}>Unlock your domain</h4>
                      <p className="text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-description))' }}>Remove domain lock at your current registrar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'rgb(var(--domain-transfer-submit-step-bg))' }}>
                      <span className="font-bold text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-text))' }}>2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'rgb(var(--domain-transfer-submit-step-title))' }}>Get ready to transfer</h4>
                      <p className="text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-description))' }}>Disable privacy protection and get auth code</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ backgroundColor: 'rgb(var(--domain-transfer-submit-step-bg))' }}>
                      <span className="font-bold text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-text))' }}>3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'rgb(var(--domain-transfer-submit-step-title))' }}>Get your authorization code</h4>
                      <p className="text-sm" style={{ color: 'rgb(var(--domain-transfer-submit-step-description))' }}>Request EPP code from current registrar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-transfer-submit-warning-bg))', border: '1px solid rgba(var(--domain-transfer-submit-warning-border))' }}>
                <div className="flex items-start mb-3">
                  <AlertCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" style={{ color: 'rgb(var(--domain-transfer-submit-warning-icon))' }} />
                  <h4 className="text-lg font-semibold" style={{ color: 'rgb(var(--domain-transfer-submit-warning-title))' }}>
                    Important Notes
                  </h4>
                </div>
                <ul className="text-sm space-y-2" style={{ color: 'rgb(var(--domain-transfer-submit-warning-text))' }}>
                  <li>• Domain must be unlocked at current registrar</li>
                  <li>• Privacy protection must be disabled</li>
                  <li>• Domain must be older than 60 days</li>
                  <li>• No pending transfers or disputes</li>
                  <li>• Valid authorization code required</li>
                </ul>
              </div>

              {/* Transfer Summary */}
              <div className="backdrop-blur-sm rounded-xl p-6" style={{ backgroundColor: 'rgba(var(--domain-transfer-submit-card-bg))', border: '1px solid rgb(var(--domain-transfer-submit-card-border))' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgb(var(--domain-transfer-submit-card-title))' }}>Transfer Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between" style={{ color: 'rgb(var(--domain-transfer-submit-summary-item))' }}>
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4" style={{ borderColor: 'rgb(var(--domain-transfer-submit-summary-border))' }}>
                  <div className="flex justify-between text-lg font-semibold" style={{ color: 'rgb(var(--domain-transfer-submit-summary-total))' }}>
                    <span>Total</span>
                    <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgb(var(--domain-transfer-submit-button-bg))',
                    color: 'rgb(var(--domain-transfer-submit-button-text))'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(var(--domain-transfer-submit-button-hover))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--domain-transfer-submit-button-bg))';
                  }}
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
