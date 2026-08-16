import { httpClient } from "../client/httpClient";

export const projectApi = {
  createProject: (data) =>
    httpClient.post("/api/front/projects/", data, { auth: false }),

  listProjects: ({ page = 1, size = 10 } = {}) =>
    httpClient.get(`/api/admin/projects/list/?page=${page}&size=${size}`),

  getProject: (id) => httpClient.get(`/api/admin/projects/${id}/`),

  deleteProject: (id) => httpClient.delete(`/api/admin/projects/${id}`),

  setProjectStatus: (id, isDone) =>
    httpClient.patch(`/api/admin/projects/${id}/status?is_done=${isDone}`),
};
