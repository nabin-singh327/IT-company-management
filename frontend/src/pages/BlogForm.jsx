import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../api/instructorApi";

function BlogForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      await createBlogPost(payload);
      navigate("/blog");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-semibold text-ink mb-6">
        Write a blog post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          required
          placeholder="Post title"
          value={form.title}
          onChange={handleTitleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          value={form.slug}
          disabled
          className="w-full border border-ink/10 rounded-md px-3 py-2.5 text-sm bg-ink/5 text-ink/40 font-mono"
        />
        <textarea
          name="excerpt"
          required
          placeholder="Short excerpt (shown on the blog listing page)"
          value={form.excerpt}
          onChange={handleChange}
          rows={2}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <textarea
          name="content"
          required
          placeholder="Full post content"
          value={form.content}
          onChange={handleChange}
          rows={10}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="tags"
          placeholder="Tags, comma-separated (e.g. career, web-development)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish post"}
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
