"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Filter, ChevronUp, ChevronDown } from "lucide-react";
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

  const handleDomainClick = (tld: string) => {
    // Handle domain click - you can add your logic here
    console.log(`Clicked on ${tld}`);
  };

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
              inputClassName="text-white placeholder-gray-400"
              bgColor="#0F0F11"
              borderColor="#374151"
            />
          </div>

          {/* Price Range Button - Right side */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              className="flex items-center bg-gray-800 text-gray-300 px-3 py-2 rounded-full transition-colors duration-200 text-sm hover:bg-gray-700"
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
                className="absolute top-full right-0 mt-2 w-72 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50"
              >
                <div className="p-4">
                  {/* Heading */}
                  <h3 className="text-white font-bold text-sm mb-4">Price Range</h3>
                  
                  {/* Line before Min to Max */}
                  <div className="border-t -mx-4 mb-4" style={{ borderColor: '#4A4A4A' }}></div>
                  
                  {/* Min to Max Input */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <label className="block text-white text-xs mb-1">Min</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          onFocus={() => setMinPriceFocused(true)}
                          onBlur={() => setMinPriceFocused(false)}
                          className="w-full px-3 py-2 pr-12 bg-gray-800 border rounded-md text-white placeholder-white text-sm focus:outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          style={{ borderColor: minPriceFocused ? '#3A4ACB' : '#4A4A4A' }}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                          <button
                            onClick={handleIncrementMin}
                            className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                          >
                            <ChevronUp className="w-3 h-3 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={handleDecrementMin}
                            className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                          >
                            <ChevronDown className="w-3 h-3 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm mt-6">to</span>
                    <div className="flex-1">
                      <label className="block text-white text-xs mb-1">Max</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="25000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          onFocus={() => setMaxPriceFocused(true)}
                          onBlur={() => setMaxPriceFocused(false)}
                          className="w-full px-3 py-2 pr-12 bg-gray-800 border rounded-md text-white placeholder-white text-sm focus:outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          style={{ borderColor: maxPriceFocused ? '#3A4ACB' : '#4A4A4A' }}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                          <button
                            onClick={handleIncrementMax}
                            className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                          >
                            <ChevronUp className="w-3 h-3 text-gray-400 hover:text-white" />
                          </button>
                          <button
                            onClick={handleDecrementMax}
                            className="p-1 hover:bg-gray-700 rounded transition-colors duration-200"
                          >
                            <ChevronDown className="w-3 h-3 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Line after Min to Max */}
                  <div className="border-t -mx-4 mb-4" style={{ borderColor: '#4A4A4A' }}></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleClearPriceRange}
                      className="px-3 py-1.5 text-blue-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors duration-200 text-xs font-medium"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleApplyPriceRange}
                      className="px-4 py-1.5 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 text-xs font-medium"
                      style={{ backgroundColor: '#3A4ACB' }}
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
        <div className="px-6 py-4">
          <div className="grid grid-cols-5 gap-8 text-lg font-semibold text-gray-300">
            <div>TLD</div>
            <div>Register</div>
            <div>Renew</div>
            <div>Transfer</div>
            <div>ICANN fee</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700">
          {filteredDomains.map((domain, index) => (
            <motion.div
              key={domain.tld}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="px-6 py-4 hover:bg-gray-750 transition-colors duration-200"
            >
              <div className="grid grid-cols-5 gap-8 items-center py-4">
                {/* TLD */}
                <div className="flex items-center">
                  <button 
                    onClick={() => handleDomainClick(domain.tld)}
                    className="text-blue-400 font-semibold text-lg hover:text-blue-300 transition-colors duration-200 cursor-pointer"
                  >
                    {domain.tld}
                  </button>
                  <button className="ml-2 p-1 hover:bg-gray-600 rounded transition-colors duration-200">
                    <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Register */}
                <div className="text-white text-lg">
                  {domain.register.isSale ? (
                    <div>
                      <span className="line-through text-gray-400 text-sm mr-2">
                        {domain.register.original}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {domain.register.sale} /yr
                      </span>
                      <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold">{domain.register.price} /yr</span>
                  )}
                </div>

                {/* Renew */}
                <div className="text-white font-semibold text-lg">
                  {domain.renew} /yr
                </div>

                {/* Transfer */}
                <div className="text-white text-lg">
                  {domain.transfer.isSale ? (
                    <div>
                      <span className="line-through text-gray-400 text-sm mr-2">
                        {domain.transfer.original}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {domain.transfer.sale} /yr
                      </span>
                      <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold">{domain.transfer.price} /yr</span>
                  )}
                </div>

                {/* ICANN Fee */}
                <div className="text-gray-400 font-semibold text-lg">
                  {domain.icannFee} /yr
                </div>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
        >
          See More
        </motion.button>
      </div>
    </div>
  );
};

export default DomainPricingTable;
