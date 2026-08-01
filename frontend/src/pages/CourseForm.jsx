import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCourse,
  updateCourse,
  fetchCourseById,
} from "../api/instructorApi";

const CATEGORIES = [
  "Programming",
  "Web Development",
  "Data Science",
  "Graphic Design",
];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

function CourseForm() {
  const { id } = useParams(); // present only in edit mode
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Programming",
    skillLevel: "Beginner",
    duration: "",
    fee: "",
    prerequisites: "",
    instructorName: "",
    instructorBio: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [error, setError] = useState("");

  // pre-fill the form when editing an existing course
  useEffect(() => {
    if (!isEdit) return;

    const loadCourse = async () => {
      try {
        const course = await fetchCourseById(id);
        setForm({
          title: course.title,
          slug: course.slug,
          description: course.description,
          category: course.category,
          skillLevel: course.skillLevel,
          duration: course.duration,
          fee: course.fee,
          prerequisites: course.prerequisites || "",
          thumbnail: course.thumbnail || "",
          instructorName: course.instructor?.name || "",
          instructorBio: course.instructor?.bio || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load course");
      } finally {
        setInitialLoading(false);
      }
    };

    loadCourse();
  }, [id, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
      // only auto-generate the slug for NEW courses — editing shouldn't silently
      // change a slug that might already be shared/bookmarked
      slug: isEdit
        ? form.slug
        : title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        category: form.category,
        skillLevel: form.skillLevel,
        duration: form.duration,
        fee: Number(form.fee),
        prerequisites: form.prerequisites,
        thumbnail: form.thumbnail,
        instructor: { name: form.instructorName, bio: form.instructorBio },
      };

      if (isEdit) {
        await updateCourse(id, payload);
      } else {
        await createCourse(payload);
      }
      navigate("/instructor");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <p className="text-center py-20 font-mono text-ink/40 text-sm">
        loading course...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-semibold text-ink mb-6">
        {isEdit ? "Edit course" : "Create a new course"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          required
          placeholder="Course title"
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
          name="description"
          required
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="thumbnail"
          placeholder="Thumbnail image URL (e.g. from Unsplash, Pexels)"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            name="skillLevel"
            value={form.skillLevel}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm"
          >
            {SKILL_LEVELS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="duration"
            required
            placeholder="Duration (e.g. 8 weeks)"
            value={form.duration}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <input
            name="fee"
            type="number"
            required
            placeholder="Fee (Rs.)"
            value={form.fee}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>

        <input
          name="prerequisites"
          placeholder="Prerequisites (optional)"
          value={form.prerequisites}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="instructorName"
          required
          placeholder="Instructor name"
          value={form.instructorName}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="instructorBio"
          placeholder="Instructor bio"
          value={form.instructorBio}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Save changes" : "Create course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
