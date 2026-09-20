import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Container } from "../components/ui/Container";
import { Spinner } from "../components/ui/Spinner";
import { Alert } from "../components/ui/Alert";
import { CornerFrame } from "../components/ui/CornerFrame";
import { formatDate } from "../utils/formatDate";
import { useBlogPost } from "../features/blog/hooks/useBlogPost";

function ContentBody({ content }) {
  return (
    <div className="space-y-4">
      {content.split(/\n{2,}/).map((paragraph, index) => (
        <p key={index} className="text-[15px] leading-8 text-slate-300">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, error, notFound } = useBlogPost(slug);

  return (
    <MainLayout>
      <Container as="article" className="min-h-[70vh] py-24" dir="rtl">
        {loading && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}

        {!loading && notFound && (
          <CornerFrame className="mx-auto max-w-lg rounded-lg border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
            <p className="text-lg font-bold text-white">این مقاله پیدا نشد</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              ممکن است حذف شده، منتشر نشده یا آدرس اشتباه باشد.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-block rounded-md border border-slate-700 px-5 py-2.5 text-sm text-slate-200 transition-colors hover:border-brand-blue-400/40 hover:text-brand-blue-300"
            >
              بازگشت به وبلاگ
            </Link>
          </CornerFrame>
        )}

        {!loading && !notFound && post && (
          <div className="mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="font-mono text-xs text-slate-500 transition-colors hover:text-brand-blue-300"
            >
              → بازگشت به وبلاگ
            </Link>

            <span className="mt-8 block font-mono text-[11px] tracking-widest text-slate-500" dir="ltr">
              {formatDate(post.created_at)}
            </span>
            <h1 className="mt-3 text-3xl font-bold leading-snug text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-5 border-s-2 border-brand-blue-400/50 ps-4 text-sm leading-7 text-slate-400">
              {post.summary}
            </p>

            <div className="mt-10">
              <ContentBody content={post.content} />
            </div>

            {error && (
              <Alert tone="error" className="mt-10">
                {error}
              </Alert>
            )}
          </div>
        )}
      </Container>
    </MainLayout>
  );
}