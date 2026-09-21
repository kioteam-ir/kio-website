import { MainLayout } from "../components/layout/MainLayout";
import { Container } from "../components/ui/Container";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { SectionTag } from "../components/ui/SectionTag";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PostList } from "../features/blog/PostList";
import { ProjectsPagination } from "../features/admin/ProjectsPagination";
import { useBlogPosts } from "../features/blog/hooks/useBlogPosts";

export default function BlogListPage() {
  const { posts, meta, page, goToPage, loading, error } = useBlogPosts();

  return (
    <MainLayout>
      <Container as="section" className="min-h-[70vh] py-24" dir="rtl">
        <SectionHeading
          index="05"
          eyebrow="وبلاگ"
          title="نوشته‌ها و یادداشت‌های تیم کایو"
          description="تجربه‌ها، آموزش‌ها و روایت پروژه‌هایی که در تیم کایو می‌سازیم."
        />

        <div className="mt-12">
          {error && (
            <Alert tone="error" className="mb-6">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          ) : posts.length === 0 ? (
            <p className="py-20 text-center text-sm text-neutral-500">
              هنوز مقاله‌ای منتشر نشده است. به‌زودی برمی‌گردیم.
            </p>
          ) : (
            <>
              <PostList posts={posts} />
              <ProjectsPagination
                page={page}
                pages={meta.pages}
                onChange={goToPage}
                disabled={loading}
              />
            </>
          )}
        </div>
      </Container>
    </MainLayout>
  );
}