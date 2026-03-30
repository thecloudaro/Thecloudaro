'use client';

import { useCart } from '@/components/Cart/CartContext';

const CheckoutPage = () => {
  const { items, clearCart } = useCart();

  const handlePayment = () => {
    // In a real application, you would integrate a payment gateway here.
    // For this example, we'll just simulate a successful payment.
    alert('Payment successful!');
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-[rgb(var(--checkout-row-bg))] p-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[rgb(var(--checkout-price-text))]">${item.price}</p>
                </div>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center font-bold text-xl">
              <p>Total:</p>
              <p>${items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)}</p>
            </div>
            <button
              onClick={handlePayment}
              className="mt-4 w-full rounded-lg py-3 font-semibold text-[rgb(var(--checkout-pay-text))] transition-colors bg-[rgb(var(--checkout-pay-bg))] hover:bg-[rgb(var(--checkout-pay-hover))]"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
