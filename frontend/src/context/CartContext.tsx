import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (book_id: number, quantity?: number) => Promise<void>;
  removeFromCart: (book_id: number) => void;
  clearCart: () => void;
  updateQuantity: (book_id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const token = localStorage.getItem("token");

  const addToCart = async (book_id: number, quantity: number = 1) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await axiosInstance.post(
        "/cart/",
        { book_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if item already exists
      setCart((prev) => {
        const existing = prev.find((item) => item.id === book_id);
        if (existing) {
          return prev.map((item) =>
            item.id === book_id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // Fetch book details for new cart item
          return [...prev, { id: book_id, title: "Book", author: "Author", price: 0, quantity }];
        }
      });

      alert("Added to cart 🛒");
    } catch (err: any) {
      console.error("Add to cart failed:", err.response || err.message);
      alert("Failed to add to cart");
    }
  };

  const removeFromCart = (book_id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== book_id));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (book_id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === book_id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
