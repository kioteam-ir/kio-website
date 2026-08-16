import { AdminLayout } from "../components/layout/AdminLayout";
import { Container } from "../components/ui/Container";
import { CornerFrame } from "../components/ui/CornerFrame";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { IconRefresh } from "../components/icons";
import { SubscriptionsList } from "../features/admin/SubscriptionsList";
import { ProjectsPagination } from "../features/admin/ProjectsPagination";
import { useSubscriptions } from "../features/admin/hooks/useSubscriptions";

export default function AdminEmailsPage() {
  const {
    subscriptions,
    meta,
    page,
    goToPage,
    loading,
    error,
    mutatingId,
    refetch,
    removeSubscription,
  } = useSubscriptions();

  const handleDelete = async (id) => {
    if (!window.confirm("این ایمیل از لیست مشترکین حذف می‌شود. ادامه می‌دهید؟"))
      return;
    await removeSubscription(id);
  };

  return (
    <AdminLayout>
      <Container dir="rtl" className="py-6 sm:py-8">
        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-medium text-neutral-100 sm:text-xl">
              اشتراک ایمیل وبلاگ
            </h1>
            {!loading && !error && (
              <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
                {meta.total} مشترک — صفحه {meta.page} از {meta.pages}
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

        <CornerFrame className="mb-6 rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-5">
          <p className="font-mono text-xs text-neutral-500">کل مشترکین</p>
          <p className="mt-2 font-mono text-2xl font-bold sm:text-3xl">
            <span className="grad-brand-text">
              {loading ? "—" : meta.total}
            </span>
          </p>
        </CornerFrame>

        {error && (
          <Alert tone="error" className="mb-4 text-start">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : subscriptions.length === 0 ? (
          <p className="py-20 text-center text-sm text-neutral-500">
            هیچ مشترکی ثبت نشده است.
          </p>
        ) : (
          <SubscriptionsList
            subscriptions={subscriptions}
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
      </Container>
    </AdminLayout>
  );
}
