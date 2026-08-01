import { useEffect, useState } from "react";
import { fetchAllCoursesAdmin } from "../api/adminApi";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllCoursesAdmin();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink mb-6">All courses</h2>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : (
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-ink/50 font-mono text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Instructor</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Enrollments</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="border-t border-ink/10">
                  <td className="px-4 py-3 font-medium text-ink">{c.title}</td>
                  <td className="px-4 py-3 text-ink/60">
                    {c.createdBy?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-ink/60">{c.category}</td>
                  <td className="px-4 py-3 font-mono text-ink/70">{c.enrollmentCount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-mono text-xs px-2 py-1 rounded ${
                        c.isActive ? "bg-teal/10 text-teal" : "bg-red-50 text-red-500"
                      }`}
                    >
                      {c.isActive ? "active" : "inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCourses;