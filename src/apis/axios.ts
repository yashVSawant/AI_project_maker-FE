import axios from "axios";
import { showToast } from "../store/toast.store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("AI_PROJECT_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data  // 👈 removes axios wrapper
  },
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";

    showToast({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);


export default axiosInstance;