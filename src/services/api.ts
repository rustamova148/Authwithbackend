import axios from "axios";
import { refreshAccessToken } from "./authService";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
 headers: {
    "Content-Type": "application/json",
 },
});

api.interceptors.request.use((config) => {
 const token = localStorage.getItem("accessToken");
 if (token) {
   config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
})

export default api;


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // təkrar istək
      } catch (err) {
        localStorage.clear(); // logout və ya yönləndir
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
