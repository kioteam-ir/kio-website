import { useCallback, useEffect, useMemo, useState } from "react";
import { blogApi } from "../../../api/blogApi";

const PAGE_SIZE = 10;

export const POST_STATUS_LABELS = {
  waiting: "در انتظار بازبینی",
  published: "منتشرشده",
  rejected: "ردشده",
};

/**
 * Drives the admin blog management page. Same contract as useProjects:
 * server-side pagination, client-side status filter over the currently
 * loaded page (counts therefore reflect the current page, not the whole
 * dataset — if the backend adds a `status` query param to the list
 * endpoint in #46, switch the filter server-side instead).
 */
export function useAdminPosts() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, size: PAGE_SIZE, pages: 1 });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutatingId, setMutatingId] = useState(null);

  const fetchData = useCallback(async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const data = await blogApi.listAllPosts({ page: targetPage, size: PAGE_SIZE });
      setPosts(data.items ?? []);
      setMeta({ total: data.total, page: data.page, size: data.size, pages: data.pages });
    } catch {
      setError("خطا در دریافت مقالات از سرور");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load the current page
    fetchData(page);
  }, [page, fetchData]);

  const goToPage = useCallback((next) => {
    setPage(Math.min(Math.max(1, next), Math.max(1, meta.pages)));
  }, [meta.pages]);

  const moderatePost = useCallback(async (id, nextStatus) => {
    setMutatingId(id);
    try {
      const updated = await blogApi.setPostStatus(id, nextStatus);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: updated.status ?? nextStatus } : p,
        ),
      );
    } catch {
      setError("تغییر وضعیت مقاله با خطا مواجه شد.");
    } finally {
      setMutatingId(null);
    }
  }, []);

  const removePost = useCallback(async (id) => {
    setMutatingId(id);
    try {
      await blogApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch {
      setError("حذف مقاله با خطا مواجه شد.");
    } finally {
      setMutatingId(null);
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (statusFilter === "all") return posts;
    return posts.filter((p) => p.status === statusFilter);
  }, [posts, statusFilter]);

  const counts = useMemo(
    () => ({
      all: posts.length,
      waiting: posts.filter((p) => p.status === "waiting").length,
      published: posts.filter((p) => p.status === "published").length,
      rejected: posts.filter((p) => p.status === "rejected").length,
    }),
    [posts],
  );

  return {
    posts: filteredPosts,
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
    moderatePost,
    removePost,
  };
}