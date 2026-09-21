import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { Input } from "../components/ui/Input";
import { IconRefresh, IconUser } from "../components/icons";
import { UsersTable } from "../features/admin/UsersTable";
import { UserDetailModal } from "../features/admin/UserDetailModal";
import { CreateUserModal } from "../features/admin/CreateUserModal";
import { useUsers } from "../features/admin/hooks/useUsers";

export default function AdminUsersPage() {
  const {
    users,
    counts,
    query,
    setQuery,
    loading,
    error,
    mutatingId,
    refetch,
    createUser,
  } = useUsers();
  const [selected, setSelected] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreate = async (payload) => {
    await createUser(payload);
    setCreateOpen(false);
  };

  return (
    <AdminLayout>
      <div dir="rtl" className="px-4 py-6 sm:py-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6 sm:items-center">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-medium text-neutral-100 sm:text-xl">
              کاربران
            </h1>
            {!loading && !error && (
              <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
                {counts.all} کاربر — {counts.admins} ادمین
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              aria-label="بروزرسانی"
            >
              <IconRefresh className="h-4 w-4" />
              <span className="hidden sm:inline">بروزرسانی</span>
            </Button>
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              <IconUser className="h-4 w-4" />
              افزودن کاربر
            </Button>
          </div>
        </div>

        <Input
          type="search"
          placeholder="جستجو بر اساس نام، ایمیل یا شماره…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="جستجوی کاربران"
          className="!mb-0 !mt-0 max-w-md"
        />

        <div className="mt-5">
          {error && (
            <Alert tone="error" className="mb-4 text-start">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          ) : users.length === 0 ? (
            <p className="py-20 text-center text-sm text-neutral-500">
              {query.trim()
                ? "کاربری مطابق جستجو یافت نشد."
                : "هیچ کاربری ثبت نشده است."}
            </p>
          ) : (
            <UsersTable users={users} onSelect={setSelected} />
          )}
        </div>
      </div>

      <UserDetailModal user={selected} onClose={() => setSelected(null)} />

      <CreateUserModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        mutatingId={mutatingId}
      />
    </AdminLayout>
  );
}