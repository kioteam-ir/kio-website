import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../../../api/blogApi";

const PAGE_SIZE = 10;

/**
 * Public blog list: server-side pagination of published posts
 * (same page/size contract as useProjects / useSubscriptions).
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, size: PAGE_SIZE, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const data = await blogApi.listPosts({ page: targetPage, size: PAGE_SIZE });
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

  return {
    posts,
    meta,
    page,
    goToPage,
    loading,
    error,
    refetch: () => fetchData(page),
  };
}