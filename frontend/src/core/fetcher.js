import axios from "axios";
import { BASE_URL } from "./url";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data ?? error.message,
    );
    return Promise.reject(error);
  },
);

export const fetcher = {
  create_account: async (data) => {
    const response = await api.post("/api/front/accounts/", data);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/api/login/", { email, password });
    return response.data;
  },

  get_profile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  create_project: async (data) => {
    const response = await api.post("/api/front/projects", data);
    return response.data;
  },
  verify_token: async (token) => {
    const response = await api.post("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  refresh_token: async (refresh_token) => {
    const response = await api.post("/auth/refresh", { refresh_token });
    return response.data;
  },

  update_user: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  delete_user: async (userId) => {
    await api.delete(`/users/${userId}`);
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
