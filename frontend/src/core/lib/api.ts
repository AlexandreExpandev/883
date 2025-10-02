import axios from 'axios';

/**
 * @singleton api
 * @summary Centralized Axios instance for API communication.
 * @type api-client
 * @category core-library
 */
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.url?.startsWith('/internal')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data.data, // Return data directly from success response
  (error) => {
    // Handle API errors globally
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);
