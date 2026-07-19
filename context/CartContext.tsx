"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  addToCart: (product: { name: string; price: number; image?: string }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount.
  // Intentionally hydrate in an effect rather than a lazy useState initializer:
  // both server and first client render must start from an empty cart to avoid an
  // SSR hydration mismatch on the header cart-count badge; the stored cart is applied
  // only after mount. The set-state-in-effect rule is disabled here for that reason.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("two_souls_cart");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("two_souls_cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [cartItems, isHydrated]);

  const addToCart = (product: { name: string; price: number; image?: string }) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.name}-${Date.now()}`,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
