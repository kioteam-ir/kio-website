import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

/** Card for one published post on the blog grid. */
export function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-start transition-all hover:border-brand-blue-400/40 hover:bg-slate-900/70"
    >
      <span className="font-mono text-[11px] tracking-widest text-slate-500" dir="ltr">
        {formatDate(post.created_at)}
      </span>
      <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-brand-blue-300">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{post.summary}</p>
      <span className="mt-5 font-mono text-xs text-brand-blue-300 opacity-0 transition-opacity group-hover:opacity-100">
        ادامه مطلب ←
      </span>
    </Link>
  );
}