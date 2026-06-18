import axios from 'axios';
import { BASE_URL } from './url';

// ─── Instance ─────────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response error handler — rethrows so callers can handle UI
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data ?? error.message
    );
    return Promise.reject(error);
  }
);

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export const fetcher = {
  /**
   * POST /api/front/accounts/
   * @param {{ email: string, password: string, first_name: string, last_name: string, phone_number?: string }} data
   */
  create_account: async (data) => {
    const response = await api.post('/api/front/accounts/', data);
    return response.data;
  },

  /**
   * POST /auth/login
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const response = await api.post('/api/login/', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * GET /users/:userId
   * @param {string} userId
   */
  get_profile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * PUT /users/:userId
   * @param {string} userId
   * @param {object} data
   */
  update_user: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * DELETE /users/:userId
   * @param {string} userId
   */
  delete_user: async (userId) => {
    await api.delete(`/users/${userId}`);
  },

  /**
   * Clears the auth token from storage (call on logout)
   */
  logout: () => {
    localStorage.removeItem('token');
  },
};