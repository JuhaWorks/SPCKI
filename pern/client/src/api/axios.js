import axios from 'axios';
import { useAuthStore } from '../features/auth/authStore.js';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent intercepting requests made TO the refresh endpoint to avoid infinite loops
      if (originalRequest.url === '/auth/refresh' || originalRequest.url === '/auth/login') {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        
        // Refresh successful. Process queue.
        isRefreshing = false;
        processQueue(null);

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (token expired/invalid). Logout user.
        isRefreshing = false;
        processQueue(refreshError, null);
        
        useAuthStore.getState().logout(); // Clear store state
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
