import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { IconLogout, IconRefresh } from "../components/icons";
import { ProjectsTable } from "../features/admin/ProjectsTable";
import { ProjectModal } from "../features/admin/ProjectModal";
import { ProjectsFilterTabs } from "../features/admin/ProjectsFilterTabs";
import { ProjectsPagination } from "../features/admin/ProjectsPagination";
import { useProjects } from "../features/admin/hooks/useProjects";
import { useAuth } from "../hooks/useAuth";

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
  const { logout } = useAuth();
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("این پروژه برای همیشه حذف می‌شود. ادامه می‌دهید؟"))
      return;
    await removeProject(id);
    if (selected?.id === id) setSelected(null);
  };

  const handleToggleDone = async (id, next) => {
    await toggleDone(id, next);
    setSelected((prev) =>
      prev?.id === id ? { ...prev, is_done: next } : prev,
    );
  };

  return (
    <MainLayout showChrome={false}>
      <Container dir="rtl" className="min-h-screen py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-neutral-500">
              KIO / ADMIN
            </span>
            <h1 className="mt-1 text-xl font-medium text-neutral-100">
              پروژه‌های ثبت‌شده
            </h1>
            {!loading && !error && (
              <p className="mt-0.5 text-sm text-neutral-500">
                {meta.total} پروژه — صفحه {meta.page} از {meta.pages}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refetch}>
              <IconRefresh className="h-4 w-4" /> بروزرسانی
            </Button>
            <Button variant="danger" size="sm" onClick={logout}>
              <IconLogout className="h-4 w-4" /> خروج
            </Button>
          </div>
        </div>

        <div className="mb-5">
          <ProjectsFilterTabs
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
        ) : projects.length === 0 ? (
          <p className="py-20 text-center text-sm text-neutral-500">
            {statusFilter === "all"
              ? "هیچ پروژه‌ای ثبت نشده است."
              : "پروژه‌ای با این وضعیت در این صفحه یافت نشد."}
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

        <ProjectsPagination
          page={page}
          pages={meta.pages}
          onChange={goToPage}
          disabled={loading}
        />
      </Container>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
        mutatingId={mutatingId}
      />
    </MainLayout>
  );
}
