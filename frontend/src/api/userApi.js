import { httpClient } from "../client/httpClient";

export const userApi = {
  /** Returns the full user list — backend sends {result: [...]}, not paginated. */
  listUsers: () => httpClient.get("/api/admin/accounts/"),

  getUser: (id) => httpClient.get(`/api/admin/accounts/${id}/`),

  createUser: (payload) =>
    httpClient.post("/api/admin/accounts/create-account/", payload),
};