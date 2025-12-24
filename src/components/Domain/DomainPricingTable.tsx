"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Filter, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import TLDSearchBar from "@/components/ui/tld-search-bar";

const DomainPricingTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPriceFocused, setMinPriceFocused] = useState(false);
  const [maxPriceFocused, setMaxPriceFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPriceRange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const domainPricing = [
    {
      tld: ".com",
      register: { original: "$9.66", sale: "$8.88", isSale: true },
      renew: "$9.98",
      transfer: { original: "$9.66", sale: "$8.88", isSale: true },
      icannFee: "$0.20"
    },
    {
      tld: ".org",
      register: { original: "$12.98", sale: "$11.88", isSale: true },
      renew: "$12.98",
      transfer: { original: "$12.98", sale: "$11.88", isSale: true },
      icannFee: "$0.20"
    },
    {
      tld: ".net",
      register: { price: "$12.98", isSale: false },
      renew: "$12.98",
      transfer: { price: "$12.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".co",
      register: { price: "$29.98", isSale: false },
      renew: "$29.98",
      transfer: { price: "$29.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".io",
      register: { price: "$39.98", isSale: false },
      renew: "$39.98",
      transfer: { price: "$39.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".app",
      register: { price: "$19.98", isSale: false },
      renew: "$19.98",
      transfer: { price: "$19.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".info",
      register: { price: "$15.98", isSale: false },
      renew: "$15.98",
      transfer: { price: "$15.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".biz",
      register: { price: "$18.98", isSale: false },
      renew: "$18.98",
      transfer: { price: "$18.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".me",
      register: { price: "$24.98", isSale: false },
      renew: "$24.98",
      transfer: { price: "$24.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".tv",
      register: { price: "$29.98", isSale: false },
      renew: "$29.98",
      transfer: { price: "$29.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".cc",
      register: { price: "$25.98", isSale: false },
      renew: "$25.98",
      transfer: { price: "$25.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".name",
      register: { price: "$12.98", isSale: false },
      renew: "$12.98",
      transfer: { price: "$12.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".pro",
      register: { price: "$19.98", isSale: false },
      renew: "$19.98",
      transfer: { price: "$19.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".mobi",
      register: { price: "$22.98", isSale: false },
      renew: "$22.98",
      transfer: { price: "$22.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".asia",
      register: { price: "$18.98", isSale: false },
      renew: "$18.98",
      transfer: { price: "$18.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".tel",
      register: { price: "$15.98", isSale: false },
      renew: "$15.98",
      transfer: { price: "$15.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".travel",
      register: { price: "$35.98", isSale: false },
      renew: "$35.98",
      transfer: { price: "$35.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".jobs",
      register: { price: "$45.98", isSale: false },
      renew: "$45.98",
      transfer: { price: "$45.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".museum",
      register: { price: "$55.98", isSale: false },
      renew: "$55.98",
      transfer: { price: "$55.98", isSale: false },
      icannFee: "$0.20"
    },
    {
      tld: ".aero",
      register: { price: "$65.98", isSale: false },
      renew: "$65.98",
      transfer: { price: "$65.98", isSale: false },
      icannFee: "$0.20"
    }
  ];

  const filteredDomains = domainPricing.filter(domain =>
    domain.tld.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleClearPriceRange = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const handleApplyPriceRange = () => {
    // Handle apply price range logic here
    console.log(`Price range: ${minPrice} - ${maxPrice}`);
    setShowPriceRange(false);
  };

  const handleIncrementMin = () => {
    const currentValue = parseInt(minPrice) || 0;
    setMinPrice((currentValue + 1).toString());
  };

  const handleDecrementMin = () => {
    const currentValue = parseInt(minPrice) || 0;
    if (currentValue > 0) {
      setMinPrice((currentValue - 1).toString());
    }
  };

  const handleIncrementMax = () => {
    const currentValue = parseInt(maxPrice) || 0;
    setMaxPrice((currentValue + 1).toString());
  };

  const handleDecrementMax = () => {
    const currentValue = parseInt(maxPrice) || 0;
    if (currentValue > 0) {
      setMaxPrice((currentValue - 1).toString());
    }
  };

  return (
    <div className="space-y-8">
      {/* TLD Search and Controls */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* TLD Search - Wider and shorter */}
          <div className="relative max-w-md">
            <TLDSearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              containerClassName="p-2"
              inputClassName="text-[rgb(var(--hosting-text-white))] placeholder:text-[rgb(var(--domain-pricing-table-button-icon))]"
              bgColor={`rgb(var(--domain-pricing-table-search-bg))`}
              borderColor={`rgb(var(--domain-pricing-table-search-border))`}
            />
          </div>

          {/* Price Range Button - Right side */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              className="flex items-center px-3 py-2 rounded-full transition-colors duration-200 text-sm"
              style={{ 
                backgroundColor: 'rgb(var(--domain-pricing-table-filter-button-bg))',
                color: 'rgb(var(--domain-pricing-table-filter-button-text))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-filter-button-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-filter-button-bg))';
              }}
              onClick={() => setShowPriceRange(!showPriceRange)}
            >
              <Filter className="w-3 h-3 mr-2" />
              Price Range
            </button>

            {/* Price Range Dropdown */}
            {showPriceRange && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-72 rounded-md shadow-lg z-50"
                style={{ 
                  backgroundColor: 'rgb(var(--domain-pricing-table-dropdown-bg))',
                  borderColor: 'rgb(var(--domain-pricing-table-dropdown-border))',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                <div className="p-4">
                  {/* Heading */}
                  <h3 className="font-bold text-sm mb-4" style={{ color: 'rgb(var(--hosting-text-white))' }}>Price Range</h3>
                  
                  {/* Line before Min to Max */}
                  <div className="border-t -mx-4 mb-4" style={{ borderColor: 'rgb(var(--domain-pricing-table-divider))' }}></div>
                  
                  {/* Min to Max Input */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <label className="block text-xs mb-1" style={{ color: 'rgb(var(--hosting-text-white))' }}>Min</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          onFocus={() => setMinPriceFocused(true)}
                          onBlur={() => setMinPriceFocused(false)}
                          className="w-full px-3 py-2 pr-12 border rounded-md text-sm focus:outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-[rgb(var(--domain-pricing-table-input-placeholder))]"
                          style={{ 
                            backgroundColor: 'rgb(var(--domain-pricing-table-input-bg))',
                            borderColor: minPriceFocused ? 'rgb(var(--domain-pricing-table-input-border-focus))' : 'rgb(var(--domain-pricing-table-input-border-default))',
                            color: 'rgb(var(--hosting-text-white))'
                          }}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                          <button
                            onClick={handleIncrementMin}
                            className="p-1 rounded transition-colors duration-200"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <ChevronUp className="w-3 h-3" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon-hover))'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon))'; }} />
                          </button>
                          <button
                            onClick={handleDecrementMin}
                            className="p-1 rounded transition-colors duration-200"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <ChevronDown className="w-3 h-3" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon-hover))'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon))'; }} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm mt-6" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }}>to</span>
                    <div className="flex-1">
                      <label className="block text-xs mb-1" style={{ color: 'rgb(var(--hosting-text-white))' }}>Max</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="25000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          onFocus={() => setMaxPriceFocused(true)}
                          onBlur={() => setMaxPriceFocused(false)}
                          className="w-full px-3 py-2 pr-12 border rounded-md text-sm focus:outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-[rgb(var(--domain-pricing-table-input-placeholder))]"
                          style={{ 
                            backgroundColor: 'rgb(var(--domain-pricing-table-input-bg))',
                            borderColor: maxPriceFocused ? 'rgb(var(--domain-pricing-table-input-border-focus))' : 'rgb(var(--domain-pricing-table-input-border-default))',
                            color: 'rgb(var(--hosting-text-white))'
                          }}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                          <button
                            onClick={handleIncrementMax}
                            className="p-1 rounded transition-colors duration-200"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <ChevronUp className="w-3 h-3" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon-hover))'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon))'; }} />
                          </button>
                          <button
                            onClick={handleDecrementMax}
                            className="p-1 rounded transition-colors duration-200"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <ChevronDown className="w-3 h-3" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon-hover))'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon))'; }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Line after Min to Max */}
                  <div className="border-t -mx-4 mb-4" style={{ borderColor: 'rgb(var(--domain-pricing-table-divider))' }}></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleClearPriceRange}
                      className="px-3 py-1.5 rounded-full transition-colors duration-200 text-xs font-medium"
                      style={{ color: 'rgb(var(--domain-pricing-table-clear-button-text))' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-clear-button-hover-text))';
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-clear-button-text))';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleApplyPriceRange}
                      className="px-4 py-1.5 rounded-full transition-colors duration-200 text-xs font-medium"
                      style={{ 
                        backgroundColor: 'rgb(var(--domain-pricing-table-apply-button-bg))',
                        color: 'rgb(var(--hosting-text-white))'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-apply-button-bg))';
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-8 text-lg font-semibold px-6 py-4" style={{ color: 'rgb(var(--domain-pricing-table-header-text))' }}>
          <div>TLD</div>
          <div>Register</div>
          <div>Renew</div>
          <div>Transfer</div>
          <div>ICANN fee</div>
        </div>

        {/* Table Body */}
        <div className="divide-y" style={{ borderColor: 'rgb(var(--domain-pricing-table-divider-row))' }}>
          {filteredDomains.map((domain, index) => (
            <motion.div
              key={domain.tld}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="px-6 py-4 transition-colors duration-200 block md:grid md:grid-cols-5 md:gap-8 md:items-center"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-row-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* --- TLD (Visible on all screens) --- */}
              <div className="flex items-center justify-between mb-4 md:mb-0">
                <div className="flex items-center">
                  <Link 
                    href={`/domain-search?tld=${domain.tld}`}
                    className="font-semibold text-lg transition-colors duration-200 cursor-pointer"
                    style={{ color: 'rgb(var(--domain-pricing-table-tld-text))' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-tld-hover))'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-tld-text))'; }}
                  >
                    {domain.tld}
                  </Link>
                  <button 
                    className="ml-2 p-1 rounded transition-colors duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-button-hover-bg))'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <Heart 
                      className="w-3 h-3" 
                      style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-heart-hover))'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(var(--domain-pricing-table-button-icon))'; }}
                    />
                  </button>
                </div>
                <div className="md:hidden text-lg font-semibold" style={{ color: 'rgb(var(--hosting-text-white))' }}>
                  {domain.register.isSale ? domain.register.sale : domain.register.price} /yr
                </div>
              </div>

              {/* --- Mobile Layout (Card format) --- */}
              <div className="md:hidden space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'rgb(var(--domain-pricing-table-header-text))' }}>Register:</span>
                  <div style={{ color: 'rgb(var(--hosting-text-white))' }}>
                    {domain.register.isSale ? (
                      <div>
                        <span className="line-through text-xs mr-2" style={{ color: 'rgb(var(--domain-pricing-table-sale-original))' }}>{domain.register.original}</span>
                        <span className="font-semibold" style={{ color: 'rgb(var(--domain-pricing-table-sale-price))' }}>{domain.register.sale} /yr</span>
                      </div>
                    ) : (
                      <span className="font-semibold">{domain.register.price} /yr</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgb(var(--domain-pricing-table-header-text))' }}>Renew:</span>
                  <span className="font-semibold" style={{ color: 'rgb(var(--hosting-text-white))' }}>{domain.renew} /yr</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgb(var(--domain-pricing-table-header-text))' }}>Transfer:</span>
                  <div style={{ color: 'rgb(var(--hosting-text-white))' }}>
                    {domain.transfer.isSale ? (
                      <div>
                        <span className="line-through text-xs mr-2" style={{ color: 'rgb(var(--domain-pricing-table-sale-original))' }}>{domain.transfer.original}</span>
                        <span className="font-semibold" style={{ color: 'rgb(var(--domain-pricing-table-sale-price))' }}>{domain.transfer.sale} /yr</span>
                      </div>
                    ) : (
                      <span className="font-semibold">{domain.transfer.price} /yr</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'rgb(var(--domain-pricing-table-header-text))' }}>ICANN fee:</span>
                  <span className="font-semibold" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }}>{domain.icannFee} /yr</span>
                </div>
              </div>

              {/* --- Desktop Layout (Grid columns) --- */}
              {/* Register */}
              <div className="hidden md:block text-lg" style={{ color: 'rgb(var(--hosting-text-white))' }}>
                {domain.register.isSale ? (
                  <div>
                    <span className="line-through text-sm mr-2" style={{ color: 'rgb(var(--domain-pricing-table-sale-original))' }}>{domain.register.original}</span>
                    <span className="font-semibold" style={{ color: 'rgb(var(--domain-pricing-table-sale-price))' }}>{domain.register.sale} /yr</span>
                  </div>
                ) : (
                  <span className="font-semibold">{domain.register.price} /yr</span>
                )}
              </div>
              {/* Renew */}
              <div className="hidden md:block font-semibold text-lg" style={{ color: 'rgb(var(--hosting-text-white))' }}>
                {domain.renew} /yr
              </div>
              {/* Transfer */}
              <div className="hidden md:block text-lg" style={{ color: 'rgb(var(--hosting-text-white))' }}>
                {domain.transfer.isSale ? (
                  <div>
                    <span className="line-through text-sm mr-2" style={{ color: 'rgb(var(--domain-pricing-table-sale-original))' }}>{domain.transfer.original}</span>
                    <span className="font-semibold" style={{ color: 'rgb(var(--domain-pricing-table-sale-price))' }}>{domain.transfer.sale} /yr</span>
                  </div>
                ) : (
                  <span className="font-semibold">{domain.transfer.price} /yr</span>
                )}
              </div>
              {/* ICANN Fee */}
              <div className="hidden md:block font-semibold text-lg" style={{ color: 'rgb(var(--domain-pricing-table-button-icon))' }}>
                {domain.icannFee} /yr
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
          style={{ 
            backgroundColor: 'rgb(var(--domain-pricing-table-cta-button-bg))',
            color: 'rgb(var(--hosting-text-white))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-cta-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--domain-pricing-table-cta-button-bg))';
          }}
        >
          See More
        </motion.button>
      </div>
    </div>
  );
};

export default DomainPricingTable;
