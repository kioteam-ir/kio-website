// import axios from 'axios';

// const api = axios.create({ baseURL: 'http://localhost:5000' });  // آدرس بک‌اند

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const login = (data) => api.post('/auth/login', data);
// export const register = (data) => api.post('/auth/register', data);
// // دیگر endpointها مثل getDashboardData