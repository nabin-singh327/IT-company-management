import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyCourses, deleteCourse } from "../api/instructorApi";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await fetchMyCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-xs text-teal">05 · instructor</span>
          <h1 className="font-display text-3xl font-semibold text-ink mt-2">
            My courses
          </h1>
        </div>
        <Link
          to="/instructor/courses/new"
          className="bg-navy text-white font-semibold px-5 py-2.5 rounded-md hover:bg-navy/90 transition-colors"
        >
          + New course
        </Link>
      </div>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-ink/50">You haven't created any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border border-ink/10 rounded-xl p-6 bg-white"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-teal bg-teal/10 px-2 py-1 rounded">
                {course.category}
              </span>
              <h3 className="font-display font-semibold text-ink text-lg mt-3 mb-4">
                {course.title}
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  to={`/instructor/courses/${course._id}/students`}
                  className="text-navy font-medium hover:underline"
                >
                  View students
                </Link>
                <Link
                  to={`/instructor/courses/${course._id}/assignments`}
                  className="text-navy font-medium hover:underline"
                >
                  Assignments
                </Link>
                <Link
                  to={`/instructor/courses/${course._id}/edit`}
                  className="text-ink/60 font-medium hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-500 font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorDashboard;
