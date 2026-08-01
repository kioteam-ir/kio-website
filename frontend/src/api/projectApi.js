import { httpClient } from "../client/httpClient";

export const projectApi = {
  createProject: (data) => httpClient.post("/api/front/projects", data, { auth: false }),

  listProjects: () => httpClient.get("/api/admin/projects/list"),

  deleteProject: (id) => httpClient.delete(`/api/admin/projects/${id}`),
};
