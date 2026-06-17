// fetcher.ts
import axios from 'axios';
import { BASE_URL } from './url';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = {
  create_account: async (data) => {
    try {
      const response = await api.post('api/front/accounts/', data);
      return response.data;
    } catch (error) {
      console.error('Create account error:', error);
      throw error;
    }
  },

  // GET - Get user profile
  get_profile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // PUT - Update user
  update_user: async (userId, data) => {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  // DELETE - Delete user
  delete_user: async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  // POST - Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Store token if needed
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};

