'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

const CartSidebar = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartTotal 
  } = useCart();
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoFocused, setIsPromoFocused] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

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
            className="fixed inset-0 z-[9998]"
            style={{ backgroundColor: 'hsl(var(--cart-backdrop))' }}
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[9999] flex flex-col shadow-2xl"
            style={{ 
              backgroundColor: 'hsl(var(--cart-bg))',
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'hsl(var(--cart-border))' }}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" style={{ color: 'hsl(var(--cart-text-primary))' }} />
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[hsl(var(--cart-button-hover-bg))] transition-colors text-[hsl(var(--cart-text-secondary))] hover:text-[hsl(var(--cart-text-primary))]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Heading - Below Line */}
            <div className="px-6 py-4" style={{ backgroundColor: 'hsl(var(--cart-header-bg))' }}>
              <h2 className="text-lg font-bold text-left" style={{ color: 'hsl(var(--cart-text-primary))' }}>
                {items.length === 0 
                  ? "Looks like your cart is empty!" 
                  : "Shopping Cart"}
              </h2>
              {items.length === 0 && (
                <p className="text-sm leading-relaxed text-left mt-2" style={{ color: 'hsl(var(--cart-text-secondary))' }}>
                  Start adding some products or browse our Library to see what&apos;s new.
                </p>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: 'hsl(var(--cart-header-bg))' }}>
              {items.length > 0 && (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--cart-item-bg))' }}>
                      <div className="flex justify-between">
                        <div>
                          <p style={{ color: 'hsl(var(--cart-text-primary))' }}>{item.name}</p>
                          <p className="text-sm" style={{ color: 'hsl(var(--cart-text-secondary))' }}>${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => decreaseQuantity(index)} className="p-1 rounded-full hover:bg-[hsl(var(--cart-button-hover-bg))]">
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(index)} className="p-1 rounded-full hover:bg-[hsl(var(--cart-button-hover-bg))]">
                            <Plus size={16} />
                          </button>
                          <button onClick={() => removeItem(index)} className="p-1 rounded-full hover:bg-[hsl(var(--cart-button-hover-bg))]">
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-6 pb-12 space-y-5" style={{ borderColor: 'hsl(var(--cart-border))' }}>
              {/* Promo Code */}
              <div className="pb-4 border-b space-y-2" style={{ borderColor: 'hsl(var(--cart-border-light))' }}>
                <button 
                  onClick={() => setShowPromoInput(true)}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'hsl(var(--cart-link))' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--cart-link-hover))'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--cart-link))'}
                >
                  Add promo code
                </button>
                {showPromoInput && (
                  <div className="flex items-center gap-2">
                    <div 
                      className={`flex items-center gap-2 border rounded-lg px-2 py-1.5 transition-colors flex-1`}
                      style={{ borderColor: isPromoFocused ? 'hsl(var(--cart-link))' : 'hsl(var(--cart-border-lighter))' }}
                      onClick={() => setIsPromoFocused(true)}
                    >
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onFocus={() => setIsPromoFocused(true)}
                        onBlur={() => setIsPromoFocused(false)}
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-[hsl(var(--cart-text-placeholder))]"
                        style={{ color: 'hsl(var(--cart-text-primary))' }}
                      />
                      <button
                        onClick={() => {
                          setPromoCode('');
                          setShowPromoInput(false);
                          setIsPromoFocused(false);
                        }}
                        className="transition-colors text-[hsl(var(--cart-text-secondary))] hover:text-[hsl(var(--cart-text-primary))]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      className="text-sm font-medium transition-colors px-2"
                      style={{ color: 'hsl(var(--cart-link))' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--cart-link-hover))'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(var(--cart-link))'}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className={`flex items-center justify-between pt-3 pb-4 ${showPromoInput ? 'mb-2' : 'mb-0'}`}>
                <span className="text-lg font-bold" style={{ color: 'hsl(var(--cart-text-primary))' }}>Total</span>
                <span className="text-lg font-bold" style={{ color: 'hsl(var(--cart-text-primary))' }}>
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

