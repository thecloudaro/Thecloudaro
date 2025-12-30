'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  name: string;
  price: number;
  quantity?: number;
}

interface CartContextType {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  
  const addItem = (item: CartItem) => {
    const existingItemIndex = items.findIndex((i) => i.name === item.name);
    if (existingItemIndex > -1) {
      const newItems = [...items];
      newItems[existingItemIndex].quantity! += 1;
      setItems(newItems);
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`);
  };
  
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const clearCart = () => {
    setItems([]);
  };

  const increaseQuantity = (index: number) => {
    const newItems = [...items];
    if (newItems[index]) {
      newItems[index].quantity! += 1;
      setItems(newItems);
    }
  };

  const decreaseQuantity = (index: number) => {
    const newItems = [...items];
    if (newItems[index] && newItems[index].quantity! > 1) {
      newItems[index].quantity! -= 1;
      setItems(newItems);
    } else {
      removeItem(index);
    }
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * (item.quantity ?? 1),
      0
    );
  };

  return (
    <CartContext.Provider 
      value={{ 
        isOpen, 
        items, 
        openCart, 
        closeCart, 
        addItem, 
        removeItem, 
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

