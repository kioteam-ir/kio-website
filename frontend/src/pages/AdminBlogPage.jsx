import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { IconRefresh } from "../components/icons";
import { AdminPostsTable } from "../features/admin/AdminPostsTable";
import { PostDetailModal } from "../features/admin/PostDetailModal";
import { AdminPostsFilterTabs } from "../features/admin/AdminPostsFilterTabs";
import { ProjectsPagination } from "../features/admin/ProjectsPagination";
import { useAdminPosts } from "../features/admin/hooks/useAdminPosts";

export default function AdminBlogPage() {
  const {
    posts,
    counts,
    meta,
    page,
    goToPage,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    mutatingId,
    refetch,
    moderatePost,
    removePost,
  } = useAdminPosts();
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("این مقاله برای همیشه حذف می‌شود. ادامه می‌دهید؟"))
      return;
    await removePost(id);
    if (selected?.id === id) setSelected(null);
  };

  const handleModerate = async (id, nextStatus) => {
    await moderatePost(id, nextStatus);
    setSelected((prev) =>
      prev?.id === id ? { ...prev, status: nextStatus } : prev,
    );
  };

  return (
    <AdminLayout>
      <div dir="rtl" className="px-4 py-6 sm:py-8">
        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-medium text-neutral-100 sm:text-xl">
              مدیریت مقالات وبلاگ
            </h1>
            {!loading && !error && (
              <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
                {meta.total} مقاله — صفحه {meta.page} از {meta.pages}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            aria-label="بروزرسانی"
            className="shrink-0"
          >
            <IconRefresh className="h-4 w-4" />
            <span className="hidden sm:inline">بروزرسانی</span>
          </Button>
        </div>

        <div className="-mx-4 mb-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <AdminPostsFilterTabs
            active={statusFilter}
            onChange={setStatusFilter}
            counts={counts}
          />
        </div>

        {error && (
          <Alert tone="error" className="mb-4 text-start">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : posts.length === 0 ? (
          <p className="py-20 text-center text-sm text-neutral-500">
            {statusFilter === "all"
              ? "هیچ مقاله‌ای ثبت نشده است."
              : "مقاله‌ای با این وضعیت در این صفحه یافت نشد."}
          </p>
        ) : (
          <AdminPostsTable
            posts={posts}
            onSelect={setSelected}
            onDelete={handleDelete}
            mutatingId={mutatingId}
          />
        )}

        <ProjectsPagination
          page={page}
          pages={meta.pages}
          onChange={goToPage}
          disabled={loading}
        />
      </div>

      <PostDetailModal
        post={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
        onModerate={handleModerate}
        mutatingId={mutatingId}
      />
    </AdminLayout>
  );
}