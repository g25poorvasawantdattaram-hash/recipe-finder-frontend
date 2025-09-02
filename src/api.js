// src/api.js
import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://recipe-finder-backend-y6vy.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // set true only if you use cookies/sessions
});

// Attach/remove token on the axios instance + persist in localStorage
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
}

// Load token on page refresh
const saved = localStorage.getItem('token');
if (saved) setAuthToken(saved);

export default api;
