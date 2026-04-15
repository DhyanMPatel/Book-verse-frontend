import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_NODE_ENV == "production" ? import.meta.env.VITE_LIVE_API_URL : import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Skip redirect for change-password endpoint (401 means wrong current password, not expired token)
    const isChangePasswordEndpoint = error.config?.url?.includes('/user/change-password');
    
    if (error.response?.status === 401 && !isChangePasswordEndpoint) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
