import { httpClient, tokenStorage } from "../client/httpClient";

/**
 * Everything the app knows about talking to the auth endpoints lives here.
 * Contexts/hooks/components call these functions; they never touch
 * httpClient or localStorage directly.
 */
export const authApi = {
  login: (email, password) => httpClient.post("/api/login/", { email, password }, { auth: false }),

  signup: (data) => httpClient.post("/api/front/accounts/", data, { auth: false }),

  verifyToken: (token) =>
    httpClient.post("/auth/verify", {}, { headers: { Authorization: `Bearer ${token}` }, auth: false }),

  refreshToken: (refreshToken) =>
    httpClient.post("/auth/refresh", { refresh_token: refreshToken }, { auth: false }),

  logout: () => {
    tokenStorage.clear();
  },
};
