import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  getUserOrders: async (userId) => {
    set({ loading: true, error: null });
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("User not authenticated");

      const response = await axios.get(`/api/order/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      set({ orders: response.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch orders",
        loading: false,
      });
      toast.error(
        error.response?.data?.message || "Error fetching your orders."
      );
    }
  },
}));
