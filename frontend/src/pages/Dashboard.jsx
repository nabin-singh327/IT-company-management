import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchMyEnrollments } from "../api/enrollmentApi";

function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error("Failed to load enrollments", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">04 · dashboard</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="text-ink/50 text-sm mt-1">
        {enrollments.length} enrolled course{enrollments.length !== 1 && "s"}
      </p>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm mt-8">loading...</p>
      ) : enrollments.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink/20 rounded-xl p-10 text-center">
          <p className="text-ink/50 mb-4">
            You haven't enrolled in any courses yet.
          </p>
          <Link to="/courses" className="text-navy font-medium">
            Browse courses →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment._id}
              className="border border-ink/10 rounded-xl p-6 bg-white"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-teal bg-teal/10 px-2 py-1 rounded">
                {enrollment.course.duration}
              </span>
              <h3 className="font-display font-semibold text-ink text-lg mt-3 mb-4">
                {enrollment.course.title}
              </h3>

              <div className="flex items-center justify-between text-xs font-mono text-ink/50 mb-1.5">
                <span>Progress</span>
                <span>{enrollment.progress}%</span>
              </div>
              <ProgressBar percent={enrollment.progress} />

              <div className="flex items-center justify-between mt-5">
                <Link
                  to={`/courses/${enrollment.course.slug}`}
                  className="text-sm font-medium text-navy hover:underline"
                >
                  Continue learning
                </Link>
                <Link
                  to={`/courses/${enrollment.course._id}/assignments`}
                  className="text-sm font-medium text-navy hover:underline"
                >
                  Assignments
                </Link>
                {enrollment.progress === 100 && (
                  <Link
                    to={`/certificate/${enrollment._id}`}
                    className="text-sm font-medium text-amber hover:underline"
                  >
                    View certificate
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
