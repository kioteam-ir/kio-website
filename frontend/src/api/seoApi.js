import { httpClient } from "../client/httpClient";

/**
 * SEO admin endpoints. Note (backend, #58): there is no GET for main
 * content yet — saving works via upsert, reading back saved values
 * will be wired in once the read endpoint lands.
 */
export const seoApi = {
  saveMainContent: (payload) => httpClient.post("/api/admin/seo/", payload),

  deleteMainContent: (id) => httpClient.post(`/api/admin/seo/${id}`),
};