import axios from "axios";
import { NavigateFunction } from "react-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (navigate: NavigateFunction) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers = config.headers || {};
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

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
