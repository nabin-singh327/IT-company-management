import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStudentsForCourse, updateStudentProgress } from "../api/instructorApi";

function InstructorStudents() {
  const { courseId } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStudentsForCourse(courseId);
        setEnrollments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const handleProgressChange = (enrollmentId, value) => {
    setEnrollments((prev) =>
      prev.map((e) => (e._id === enrollmentId ? { ...e, progress: value } : e))
    );
  };

  const handleSave = async (enrollmentId, progress) => {
    setSavingId(enrollmentId);
    try {
      await updateStudentProgress(enrollmentId, Number(progress));
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/instructor" className="text-sm text-navy font-medium hover:underline">
        ← Back to my courses
      </Link>
      <h1 className="font-display text-2xl font-semibold text-ink mt-4 mb-8">
        Enrolled students
      </h1>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : enrollments.length === 0 ? (
        <p className="text-ink/50">No students enrolled yet.</p>
      ) : (
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-ink/50 font-mono text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Student</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Progress</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id} className="border-t border-ink/10">
                  <td className="px-4 py-3 font-medium text-ink">
                    {enrollment.student.name}
                  </td>
                  <td className="px-4 py-3 text-ink/60">{enrollment.student.email}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={enrollment.progress}
                      onChange={(e) => handleProgressChange(enrollment._id, e.target.value)}
                      className="w-20 border border-ink/15 rounded-md px-2 py-1 font-mono text-sm"
                    />
                    <span className="text-ink/40 ml-1">%</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleSave(enrollment._id, enrollment.progress)}
                      disabled={savingId === enrollment._id}
                      className="text-sm font-medium text-white bg-navy px-3 py-1.5 rounded-md hover:bg-navy/90 disabled:opacity-50"
                    >
                      {savingId === enrollment._id ? "Saving..." : "Save"}
                    </button>
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

export default InstructorStudents;