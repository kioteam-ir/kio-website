import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../../../api/blogApi";

/** Single published post by slug; `notFound` drives the 404 UI. */
export function useBlogPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const fetchPost = useCallback(async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    setNotFound(false);
    try {
      const data = await blogApi.getPost(slug);
      setPost(data);
    } catch (err) {
      if (err?.status === 404) {
        setNotFound(true);
      } else {
        setError("خطا در دریافت مقاله از سرور");
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load the post
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error, notFound, refetch: fetchPost };
}