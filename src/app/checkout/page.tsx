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
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-100">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
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
