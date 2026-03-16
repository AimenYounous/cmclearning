import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('cmc_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401 & errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Avoid redirect loop if already on login page
            if (!window.location.pathname.includes('/login')) {
                localStorage.removeItem('cmc_token');
                localStorage.removeItem('cmc_user');
                window.location.href = '/login';
            }
        }

        // Extract meaningful error message from API response
        const serverMessage = error.response?.data?.message || error.response?.data?.error;
        if (serverMessage) {
            error.message = serverMessage;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
