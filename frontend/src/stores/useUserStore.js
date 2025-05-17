import { create } from "zustand";
import axios from "../lib/axios.jsx";
import { toast } from "react-hot-toast";
import api from "../lib/axios.jsx";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      console.log("Sending API request:", { name, email, password });
      const res = await axios.post(
        "/api/user/register",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response received:", res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      set({ user: res.data, loading: false });
      toast.success("Signup successful!");
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error.response?.data || "Unknown error"); // Log actual error
      set({ loading: false });
      toast.error(error.response?.data?.msg || "An error occurred");
      return {
        success: false,
        error: error.response?.data?.msg || "An error occurred",
      };
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      console.log("Sending login request:", { email, password }); // Debugging request
      const res = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login response received:", res.data); // Debugging response
      const token = res.data.token;
      localStorage.setItem("authToken", res.data.token);
      console.log(res.data);
      set({ user: res.data.user, loading: false }); // Store user object
      toast.success("Login successful!");

      return { success: true, user: res.data.user }; // Return user for admin check
    } catch (error) {
      console.error("Login error:", error.response?.data || "Unknown error");
      set({ loading: false });
      toast.error(error.response?.data?.msg || "An error occurred");
      return {
        success: false,
        error: error.response?.data?.msg || "An error occurred",
      };
    }
  },
  getUserInfo: async () => {
    set({ loading: true });
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(authToken, "authtoekn");

      if (!authToken) throw new Error("No authentication token found");

      const response = await api.get("/api/user/userInfo");
      set({ user: response.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch user info:", error.message);
      set({ user: null, loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ user: null });
    toast.success("Logged out successfully!");
  },

  updateUserInfo: async (updatedFields) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.patch(`/api/user/update`, updatedFields);

      toast.success("User info updated successfully!");
      return { success: true };
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      set({ loading: false });
      toast.error("Failed to update user info.");
      return {
        success: false,
        error: error.response?.data?.msg || "Update failed",
      };
    }
  },
}));
