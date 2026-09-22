import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { PostCard } from "../blog/PostCard";
import { useLatestPosts } from "../blog/hooks/useLatestPosts";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-slate-800" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-slate-800/70" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-800/70" />
      </div>
    </div>
  );
}

/** Landing-page teaser: the 3 newest published posts, hidden entirely on error/empty. */
export function BlogTeaser() {
  const { posts, loading, error } = useLatestPosts(3);

  // Graceful degradation: a marketing page must not show broken states —
  // the /blog page owns loading/error UX for real browsing.
  if (!loading && (error || posts.length === 0)) return null;

  return (
    <Container as="section" id="blog" dir="rtl" className="py-20">
      <SectionHeading index="06" eyebrow="وبلاگ" title="آخرین مقالات" />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {loading
          ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/blog"
          className="grad-brand-text font-mono text-md font-bold uppercase tracking-widest transition-transform hover:scale-105"
        >
          <span className="border-2 border-transparent p-2 transition-all duration-500 [border-image:linear-gradient(to_right,theme(colors.brand.crimson.500),theme(colors.brand.navy.500))_1] hover:[border-image:linear-gradient(to_left,theme(colors.brand.crimson.500),theme(colors.brand.navy.500))_1]">
            {"⥛ "}مشاهده همه مقالات{" ⥚"}
          </span>
        </Link>
      </div>
    </Container>
  );
}