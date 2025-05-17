import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
});

// Automatically attach token to requests under x-auth-token header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
