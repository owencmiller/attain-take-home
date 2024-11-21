// context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext({});

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({}); // Shared state

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCart = () => useContext(CartContext);
