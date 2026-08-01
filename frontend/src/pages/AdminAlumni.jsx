import { useEffect, useState } from "react";
import { fetchAlumniStories } from "../api/placementApi";
import { fetchAllCoursesAdmin, createAlumniStory } from "../api/adminApi";

function AdminAlumni() {
  const [stories, setStories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    position: "",
    story: "",
    course: "",
  });

  const load = async () => {
    try {
      const [storiesData, coursesData] = await Promise.all([
        fetchAlumniStories(),
        fetchAllCoursesAdmin(),
      ]);
      setStories(storiesData);
      setCourses(coursesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = { ...form };
      if (!payload.course) delete payload.course; // optional field — don't send an empty string
      await createAlumniStory(payload);
      setForm({ name: "", company: "", position: "", story: "", course: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add story");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink mb-6">Alumni stories</h2>

      <form
        onSubmit={handleSubmit}
        className="border border-ink/10 rounded-xl p-6 bg-white mb-10 space-y-4"
      >
        <h3 className="font-display font-semibold text-ink">Add a success story</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            required
            placeholder="Alumni name"
            value={form.name}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <input
            name="company"
            required
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="position"
            required
            placeholder="Position / job title"
            value={form.position}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm"
          >
            <option value="">Related course (optional)</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>
        </div>
        <textarea
          name="story"
          required
          placeholder="Their story..."
          value={form.story}
          onChange={handleChange}
          rows={3}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-navy text-white font-semibold px-5 py-2.5 rounded-md hover:bg-navy/90 disabled:opacity-50 text-sm"
        >
          {submitting ? "Adding..." : "Add story"}
        </button>
      </form>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : stories.length === 0 ? (
        <p className="text-ink/50">No stories added yet.</p>
      ) : (
        <div className="space-y-3">
          {stories.map((s) => (
            <div key={s._id} className="border border-ink/10 rounded-xl p-5 bg-white">
              <p className="font-medium text-ink">{s.name}</p>
              <p className="text-ink/50 text-sm">{s.position} at {s.company}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAlumni;