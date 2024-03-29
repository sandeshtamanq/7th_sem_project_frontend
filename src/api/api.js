import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Credentials"] = "true";
    // config.headers["Content-Type"] = "application/json";
    config.headers["accept"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
