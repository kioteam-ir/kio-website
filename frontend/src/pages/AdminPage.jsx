import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { IconRefresh } from "../components/icons";
import { ProjectsTable } from "../features/admin/ProjectsTable";
import { ProjectModal } from "../features/admin/ProjectModal";
import { ProjectsFilterTabs } from "../features/admin/ProjectsFilterTabs";
import { ProjectsPagination } from "../features/admin/ProjectsPagination";
import { useProjects } from "../features/admin/hooks/useProjects";

export default function AdminPage() {
  const {
    projects,
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
    removeProject,
    toggleDone,
  } = useProjects();
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("این پروژه برای همیشه حذف می‌شود. ادامه می‌دهید؟")) return;
    await removeProject(id);
    if (selected?.id === id) setSelected(null);
  };

  const handleToggleDone = async (id, next) => {
    await toggleDone(id, next);
    setSelected((prev) => (prev?.id === id ? { ...prev, is_done: next } : prev));
  };

  return (
    <AdminLayout>
      <Container dir="rtl" className="py-6 sm:py-8">
        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-medium text-neutral-100 sm:text-xl">پروژه‌های ثبت‌شده</h1>
            {!loading && !error && (
              <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">{meta.total} پروژه — صفحه {meta.page} از {meta.pages}</p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={refetch} aria-label="بروزرسانی" className="shrink-0">
            <IconRefresh className="h-4 w-4" />
            <span className="hidden sm:inline">بروزرسانی</span>
          </Button>
        </div>

        <div className="-mx-4 mb-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ProjectsFilterTabs active={statusFilter} onChange={setStatusFilter} counts={counts} />
        </div>

        {error && <Alert tone="error" className="mb-4 text-start">{error}</Alert>}

        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : projects.length === 0 ? (
          <p className="py-20 text-center text-sm text-neutral-500">
            {statusFilter === "all" ? "هیچ پروژه‌ای ثبت نشده است." : "پروژه‌ای با این وضعیت در این صفحه یافت نشد."}
          </p>
        ) : (
          <ProjectsTable
            projects={projects}
            onSelect={setSelected}
            onDelete={handleDelete}
            onToggleDone={handleToggleDone}
            mutatingId={mutatingId}
          />
        )}

        <ProjectsPagination page={page} pages={meta.pages} onChange={goToPage} disabled={loading} />
      </Container>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
        mutatingId={mutatingId}
      />
    </AdminLayout>
  );
}
