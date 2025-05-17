import axios from "axios";
import { create } from "zustand";
import api from "../lib/axios";

export const useCart = create((set) => ({
  cartItems: [],
  total: 0,
  loading: false,
  error: null,

  addToCart: async (productId) => {
    try {
      const quantity = 1; // Or let user choose
      const response = await api.post("/api/user/cart/addToCart", {
        productId,
        quantity,
      });
      const updatedCart = response.data;
      set((state) => ({
        cartItems: updatedCart.items,
        total: updatedCart.total,
        error: null,
      }));
      alert("Added to cart!");
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error adding to cart");
    }
  },

  getAuthHeaders: () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },

  fetchCartData: async () => {
    try {
      const response = await api.get("/api/user/cart/viewCart");
      const updatedCart = response.data;
      set((state) => ({
        cartItems: updatedCart.items,
        total: updatedCart.total,
        error: null,
      }));
      return response.data;
    } catch (error) {
      console.error(
        "Error viewing cart:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  removeFromCart: async (id) => {
    try {
      const response = await api.delete(`/api/user/cart/deleteFromCart/${id}`);
    
      return response.data;
    } catch (error) {
      console.error(
        "Error viewing cart:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  updateCartItems: (newItems) => set({ cartItems: newItems }),
}));
