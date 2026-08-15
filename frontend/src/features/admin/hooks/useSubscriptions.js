import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../../../api/blogApi";

const PAGE_SIZE = 10;

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    size: PAGE_SIZE,
    pages: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutatingId, setMutatingId] = useState(null);

  const fetchData = useCallback(async (targetPage = page) => {
    setLoading(true);
    setError("");
    try {
      const data = await blogApi.listSubscriptions({
        page: targetPage,
        size: PAGE_SIZE,
      });
      setSubscriptions(data.items ?? []);
      setMeta({
        total: data.total,
        page: data.page,
        size: data.size,
        pages: data.pages,
      });
    } catch {
      setError("خطا در دریافت لیست مشترکین از سرور");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const goToPage = useCallback(
    (next) => {
      setPage(Math.min(Math.max(1, next), Math.max(1, meta.pages)));
    },
    [meta.pages],
  );

  const removeSubscription = useCallback(async (id) => {
    setMutatingId(id);
    try {
      await blogApi.deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((s) => s.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch {
      setError("حذف مشترک با خطا مواجه شد.");
    } finally {
      setMutatingId(null);
    }
  }, []);

  return {
    subscriptions,
    meta,
    page,
    goToPage,
    loading,
    error,
    mutatingId,
    refetch: () => fetchData(page),
    removeSubscription,
  };
}
