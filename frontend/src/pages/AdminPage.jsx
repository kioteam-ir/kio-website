import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { IconLogout, IconRefresh } from "../components/icons";
import { SubmissionsTable } from "../features/admin/SubmissionsTable";
import { SubmissionModal } from "../features/admin/SubmissionModal";
import { useSubmissions } from "../features/admin/hooks/useSubmissions";
import { useAuth } from "../hooks/useAuth";

export default function AdminPage() {
  const { submissions, loading, error, refetch, removeSubmission } = useSubmissions();
  const { logout } = useAuth();
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    await removeSubmission(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <MainLayout showChrome={false}>
      <Container dir="rtl" className="min-h-screen py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest text-amber-400/80">KIO / ADMIN</span>
            <h1 className="mt-1 text-xl font-medium text-slate-100">درخواست‌های همکاری</h1>
            {!loading && !error && <p className="mt-0.5 text-sm text-slate-500">{submissions.length} درخواست</p>}
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

        {error && <Alert tone="error" className="mb-4 text-start">{error}</Alert>}

        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : submissions.length === 0 ? (
          <p className="py-20 text-center text-sm text-slate-500">هیچ درخواستی ثبت نشده است.</p>
        ) : (
          <SubmissionsTable submissions={submissions} onSelect={setSelected} onDelete={handleDelete} />
        )}
      </Container>

      <SubmissionModal submission={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
    </MainLayout>
  );
}
