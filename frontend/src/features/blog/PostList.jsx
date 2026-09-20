import { PostCard } from "./PostCard";

/** Responsive grid of published posts. */
export function PostList({ posts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}