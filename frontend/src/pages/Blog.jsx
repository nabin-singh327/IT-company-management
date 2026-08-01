import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../api/contentApi";
import { useSelector } from "react-redux";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">08 · blog</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-10">
        Insights &amp; guides
      </h1>

      {(user?.role === "instructor" || user?.role === "admin") && (
        <Link
          to="/blog/new"
          className="inline-block bg-navy text-white font-semibold px-4 py-2 rounded-md hover:bg-navy/90 text-sm mb-8"
        >
          + Write a post
        </Link>
      )}

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-ink/50">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post._id}
              className="block border-b border-ink/10 pb-6 group"
            >
              <p className="font-mono text-xs text-ink/40 mb-2">
                {post.author?.name} ·{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <h2 className="font-display font-semibold text-xl text-ink group-hover:text-navy transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-ink/60 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
