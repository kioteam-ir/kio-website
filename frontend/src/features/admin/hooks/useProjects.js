import { useCallback, useEffect, useMemo, useState } from "react";
import { projectApi } from "../../../api/projectApi";

const PAGE_SIZE = 10;

/**
 * Drives the admin projects table: server-side pagination (the backend
 * only accepts page/size — there's no is_done filter param), plus a
 * client-side status filter applied to whatever page is currently loaded.
 *
 * Worth knowing: because filtering is client-side, "done" or "undone"
 * counts reflect only the current page, not the whole dataset. If the
 * backend ever adds an `is_done` query param to the list endpoint, swap
 * the filter to a server-side param instead — it'll scale much better
 * than this once there are more than a page or two of projects.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, size: PAGE_SIZE, pages: 1 });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "done" | "undone"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutatingId, setMutatingId] = useState(null);

  const fetchData = useCallback(async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const data = await projectApi.listProjects({ page: targetPage, size: PAGE_SIZE });
      setProjects(data.items ?? []);
      setMeta({ total: data.total, page: data.page, size: data.size, pages: data.pages });
    } catch {
      setError("خطا در دریافت اطلاعات از سرور");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const goToPage = useCallback((next) => {
    setPage(Math.min(Math.max(1, next), Math.max(1, meta.pages)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.pages]);

  const removeProject = useCallback(async (id) => {
    setMutatingId(id);
    try {
      await projectApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch {
      setError("حذف پروژه با خطا مواجه شد.");
    } finally {
      setMutatingId(null);
    }
  }, []);

  const toggleDone = useCallback(async (id, nextIsDone) => {
    setMutatingId(id);
    try {
      const updated = await projectApi.setProjectStatus(id, nextIsDone);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_done: updated.is_done } : p)));
    } catch {
      setError("تغییر وضعیت پروژه با خطا مواجه شد.");
    } finally {
      setMutatingId(null);
    }
  }, []);

  const filteredProjects = useMemo(() => {
    if (statusFilter === "done") return projects.filter((p) => p.is_done);
    if (statusFilter === "undone") return projects.filter((p) => !p.is_done);
    return projects;
  }, [projects, statusFilter]);

  const counts = useMemo(
    () => ({
      all: projects.length,
      done: projects.filter((p) => p.is_done).length,
      undone: projects.filter((p) => !p.is_done).length,
    }),
    [projects],
  );

  return {
    projects: filteredProjects,
    counts,
    meta,
    page,
    goToPage,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    mutatingId,
    refetch: () => fetchData(page),
    removeProject,
    toggleDone,
  };
}
