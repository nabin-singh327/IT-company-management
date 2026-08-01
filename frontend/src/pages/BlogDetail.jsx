import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPostBySlug } from "../api/contentApi";

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBlogPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center py-20 font-mono text-ink/40 text-sm">
        loading...
      </p>
    );
  if (notFound)
    return (
      <p className="text-center py-20 font-mono text-ink/40 text-sm">
        post not found.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="font-mono text-xs text-ink/40 mb-3">
        {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">
        {post.title}
      </h1>
      <div className="text-ink/70 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
      {post.tags?.length > 0 && (
        <div className="flex gap-2 mt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] uppercase text-teal bg-teal/10 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
