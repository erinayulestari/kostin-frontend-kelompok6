import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

export function getAuthToken() {
  return localStorage.getItem('auth_token') || null;
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

export function getUserData() {
  const user = localStorage.getItem('user_data');
  return user ? JSON.parse(user) : null;
}

export function setUserData(user) {
  if (user) {
    localStorage.setItem('user_data', JSON.stringify(user));
  } else {
    localStorage.removeItem('user_data');
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Request Interceptor: Menyisipkan Token Bearer
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Mengembalikan data JSON & Menangani Error Response secara Konsisten
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;
    const errorMsg = data?.message || data?.error || error.message || 'Terjadi kesalahan pada server';
    const customError = new Error(errorMsg);
    customError.status = error.response?.status;
    customError.data = data;
    return Promise.reject(customError);
  }
);

export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  axiosInstance,
};

export default api;
