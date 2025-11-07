import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: false,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🧩 Automatically include JWT if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;