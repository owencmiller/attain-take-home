// context/CartContext.js
import { Item } from '@/components/Item';
import React, { createContext, useState, useContext } from 'react';

export interface CartItem extends Item {
  quantity: number;
}


interface CartContextType {
  cart: Map<number, CartItem>;
  setCart: React.Dispatch<React.SetStateAction<Map<number, CartItem>>>;
}


// Cart is a mapping from item.id -> {...item, quantity}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<Map<number, CartItem>>(new Map());

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () : CartContextType => {
  const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }
