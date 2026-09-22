import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../../../api/blogApi";

/**
 * Latest published posts for the home teaser: single fetch, no pagination.
 * Fails silently (error flag) so the landing page can degrade gracefully —
 * the /blog page owns the real error UX.
 */
export function useLatestPosts(limit = 3) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLatest = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await blogApi.listPosts({ page: 1, size: limit });
      setPosts(data.items ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount
    fetchLatest();
  }, [fetchLatest]);

  return { posts, loading, error };
}