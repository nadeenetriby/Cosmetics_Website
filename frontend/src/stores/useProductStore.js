import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  getAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/product/viewProducts");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to get all products", loading: false });
      toast.error(
        error.response?.data?.message || "Failed to get all products"
      );
    }
  },
  getProductRating: async (productId) => {
    try {
      const ratingRes = await axios.get(`/api/product/reviewRate/${productId}`);
      return ratingRes.data.averageRating;
    } catch (error) {
      console.error(
        `Failed to fetch rating for product ${productId}:`,
        error.message
      );
      return 0;
    }
  },

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      // === 1. Upload image to Cloudinary ===
      const file = productData.image;
      if (!file) throw new Error("No image provided");

      const formData = new FormData();
      formData.append("file", productData.image);
      formData.append("upload_preset", "cosmetics_upload");
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_API_NAME);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_API_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadData.secure_url) throw new Error("Image upload failed");

      // === 2. Replace local image with Cloudinary URL ===
      const updatedProductData = {
        ...productData,
        image: uploadData.secure_url,
      };

      // === 3. Send to backend ===
      const response = await axios.post(
        "/api/product/createProduct",
        updatedProductData
      );

      set((state) => ({
        products: [...state.products, response.data],
        loading: false,
      }));

      toast.success("Product created successfully!");
    } catch (error) {
      console.error(error);
      set({ error: "Failed to create product", loading: false });
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create product"
      );
    }
  },
  deleteProduct: async (productId) => {
    try {
      await axios.delete(`/api/product/deleteProduct/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
    } catch (error) {
      console.error(`Failed to delete product ${productId}:`, error.message);
    }
  },

  promoteUserToAdmin: async (email) => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(authToken);

      if (!authToken) throw new Error("No authentication token found");

      const response = await axios.put(
        "/api/user/promoteEmail",
        { email },
        {
          Headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      toast.success(response.data.msg);
    } catch (error) {
      console.error(`Failed to promote user ${email}:`, error.message);
      toast.error(error.response?.data?.msg || "Failed to promote user.");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      await axios.patch(`/api/product/updateProduct/${productId}`, {inStock: quantity });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  },
}));
