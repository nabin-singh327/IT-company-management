import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEnrollmentById } from "../api/enrollmentApi";

function Certificate() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEnrollmentById(id);
        if (data.progress < 100) {
          setError("This course isn't completed yet.");
        } else {
          setEnrollment(data);
        }
      } catch (err) {
        setError("Certificate not found.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="text-center py-20 font-mono text-ink/40 text-sm">loading...</p>;
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-ink/50">{error}</p>
        <Link to="/dashboard" className="text-navy font-medium mt-4 inline-block">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="border-4 border-navy rounded-xl p-12 text-center bg-white">
        <span className="font-mono text-xs text-teal">certificate of completion</span>
        <h1 className="font-display text-3xl font-semibold text-ink mt-6">
          {enrollment.student?.name || "Student"}
        </h1>
        <p className="text-ink/60 mt-4">has successfully completed</p>
        <h2 className="font-display text-xl font-semibold text-navy mt-2">
          {enrollment.course.title}
        </h2>
        <p className="text-ink/40 text-sm mt-8 font-mono">
          issued {new Date(enrollment.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => window.print()}
          className="bg-navy text-white font-semibold px-6 py-2.5 rounded-md hover:bg-navy/90 transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

export default Certificate;