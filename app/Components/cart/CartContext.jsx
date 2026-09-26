"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "luma-form-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedItems = window.localStorage.getItem(CART_KEY);
      if (savedItems) setItems(JSON.parse(savedItems));
    } catch {
      window.localStorage.removeItem(CART_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem(product) {
      setItems((currentItems) => {
        const match = currentItems.find((item) => item.id === product.id);
        if (match) return currentItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        return [...currentItems, { ...product, quantity: 1 }];
      });
    },
    updateQuantity(id, quantity) {
      setItems((currentItems) => quantity < 1 ? currentItems.filter((item) => item.id !== id) : currentItems.map((item) => item.id === id ? { ...item, quantity } : item));
    },
    removeItem(id) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
