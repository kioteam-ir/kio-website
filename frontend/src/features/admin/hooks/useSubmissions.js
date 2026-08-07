import { useCallback, useEffect, useState } from "react";
import { projectApi } from "../../../api/projectApi";

export function useSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await projectApi.listProjects();
      setSubmissions(data.result ?? []);
    } catch (err) {
      if (err.status === 403) {
        console.log();
      } else {
        setError("خطا در دریافت اطلاعات از سرور");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const removeSubmission = useCallback(async (id) => {
    // Optimistic update — swap this for an await projectApi.deleteProject(id)
    // once the delete endpoint is wired up on the backend.
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { submissions, loading, error, refetch: fetchData, removeSubmission };
}
