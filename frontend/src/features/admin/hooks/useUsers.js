import { useCallback, useEffect, useMemo, useState } from "react";
import { userApi } from "../../../api/userApi";

/**
 * Admin users list. The backend list endpoint is not paginated (it returns
 * everything as {result: [...]}), so search/filter runs client-side over
 * the full set — fine at the current scale. If the user base grows, the
 * follow-up is a paginated backend list; the hook shape below is ready
 * for it (swap filter for a server param, keep the same return contract).
 */
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutatingId, setMutatingId] = useState(null);
  const [query, setQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userApi.listUsers();
      setUsers(data.result ?? []);
    } catch {
      setError("خطا در دریافت لیست کاربران از سرور");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load the user list
    fetchData();
  }, [fetchData]);

  const createUser = useCallback(async (payload) => {
    setMutatingId("new");
    try {
      const created = await userApi.createUser(payload);
      setUsers((prev) => [created, ...prev]);
      return created;
    } finally {
      setMutatingId(null);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q) ||
        (u.phone_number ?? "").includes(q),
    );
  }, [users, query]);

  const counts = useMemo(
    () => ({
      all: users.length,
      admins: users.filter((u) => u.is_admin).length,
    }),
    [users],
  );

  return {
    users: filteredUsers,
    counts,
    query,
    setQuery,
    loading,
    error,
    mutatingId,
    refetch: fetchData,
    createUser,
  };
}