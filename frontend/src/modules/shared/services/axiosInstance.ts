import axios from "axios";
import { NavigateFunction } from "react-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const currency = localStorage.getItem("currency") || "EGP";
    config.headers["Currency"] = currency;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const setupInterceptors = (navigate: NavigateFunction) => {
  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && [401, 403].includes(error.response.status)) {
        localStorage.removeItem("token");
        navigate("/register");
      }
      return Promise.reject(error);
    },
  );
};
export default axiosInstance;
