'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from './CartContext';

const CartSidebar = () => {
  const { isOpen, closeCart, items } = useCart();
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoFocused, setIsPromoFocused] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[420px] bg-[#1a1a1a] z-[9999] flex flex-col shadow-2xl"
            style={{ 
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Heading - Below Line */}
            <div className="px-6 py-4" style={{ backgroundColor: '#222222' }}>
              <h2 className="text-lg font-bold text-white text-left">
                {items.length === 0 
                  ? "Looks like your cart is empty!" 
                  : "Shopping Cart"}
              </h2>
              {items.length === 0 && (
                <p className="text-gray-400 text-sm leading-relaxed text-left mt-2">
                  Start adding some products or browse our Library to see what&apos;s new.
                </p>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#222222' }}>
              {items.length > 0 && (
                <div className="space-y-4">
                  {/* Cart items will go here */}
                  {items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-lg">
                      <p className="text-white">{item.name}</p>
                      <p className="text-gray-400 text-sm">${item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 px-6 py-6 pb-12 space-y-5">
              {/* Promo Code */}
              <div className="pb-4 border-b border-gray-700 space-y-2">
                <button 
                  onClick={() => setShowPromoInput(true)}
                  className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
                >
                  Add promo code
                </button>
                {showPromoInput && (
                  <div className="flex items-center gap-2">
                    <div 
                      className={`flex items-center gap-2 border rounded-lg px-2 py-1.5 transition-colors flex-1 ${
                        isPromoFocused ? 'border-blue-500' : 'border-gray-600'
                      }`}
                      onClick={() => setIsPromoFocused(true)}
                    >
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onFocus={() => setIsPromoFocused(true)}
                        onBlur={() => setIsPromoFocused(false)}
                        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                      />
                      <button
                        onClick={() => {
                          setPromoCode('');
                          setShowPromoInput(false);
                          setIsPromoFocused(false);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors px-2">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className={`flex items-center justify-between pt-3 pb-4 ${showPromoInput ? 'mb-2' : 'mb-0'}`}>
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-lg font-bold text-white">
                  ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </span>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

