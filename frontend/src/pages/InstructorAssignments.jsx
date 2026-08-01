import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createAssignment, fetchAssignmentsByCourse } from "../api/instructorApi";

function InstructorAssignments() {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const data = await fetchAssignmentsByCourse(courseId);
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAssignment({ courseId, ...form });
      setForm({ title: "", description: "", dueDate: "" });
      load(); 
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/instructor" className="text-sm text-navy font-medium hover:underline">
        ← Back to my courses
      </Link>
      <h1 className="font-display text-2xl font-semibold text-ink mt-4 mb-8">Assignments</h1>

      <form
        onSubmit={handleSubmit}
        className="border border-ink/10 rounded-xl p-6 bg-white mb-10 space-y-4"
      >
        <h2 className="font-display font-semibold text-ink">New assignment</h2>
        <input
          name="title"
          required
          placeholder="Assignment title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <textarea
          name="description"
          required
          placeholder="Description / instructions"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="dueDate"
          type="date"
          required
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-navy text-white font-semibold px-5 py-2.5 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create assignment"}
        </button>
      </form>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : assignments.length === 0 ? (
        <p className="text-ink/50">No assignments created yet.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div
              key={a._id}
              className="border border-ink/10 rounded-xl p-5 bg-white flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-ink">{a.title}</h3>
                <p className="text-ink/50 text-sm font-mono mt-1">
                  due {new Date(a.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/instructor/assignments/${a._id}/submissions`}
                className="text-sm font-medium text-navy hover:underline"
              >
                View submissions
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorAssignments;