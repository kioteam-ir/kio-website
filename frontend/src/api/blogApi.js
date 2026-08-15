import { httpClient } from "../client/httpClient";

export const blogApi = {
  subscribeEmail: (email) =>
    httpClient.post(
      "/api/front/blog/subscriptions/",
      { email },
      { auth: false },
    ),

  listSubscriptions: ({ page = 1, size = 10 } = {}) =>
    httpClient.post(`/api/admin/blog/subscriptions/?page=${page}&size=${size}`),

  deleteSubscription: (id) =>
    httpClient.delete(`/api/admin/blog/subscriptions/${id}`),
};
