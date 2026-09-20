import { httpClient } from "../client/httpClient";

export const blogApi = {
  listPosts: ({ page = 1, size = 10 } = {}) =>
    httpClient.get(`/api/front/blog/list/?page=${page}&size=${size}`),

  getPost: (slug) => httpClient.get(`/api/front/blog/${encodeURIComponent(slug)}/`),

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
