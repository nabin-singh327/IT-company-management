import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAssignmentsForCourse, submitAssignment } from "../api/studentApi";

function StudentAssignments() {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({}); 
  const [submittedIds, setSubmittedIds] = useState({}); 
  const [errors, setErrors] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAssignmentsForCourse(courseId);
        setAssignments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const handleDraftChange = (id, value) => {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (assignmentId) => {
    setSubmittingId(assignmentId);
    setErrors((prev) => ({ ...prev, [assignmentId]: "" }));
    try {
      await submitAssignment(assignmentId, drafts[assignmentId] || "");
      setSubmittedIds((prev) => ({ ...prev, [assignmentId]: true }));
    } catch (err) {
      const message = err.response?.data?.message || "Submission failed";
      setErrors((prev) => ({ ...prev, [assignmentId]: message }));

      if (message.toLowerCase().includes("already submitted")) {
        setSubmittedIds((prev) => ({ ...prev, [assignmentId]: true }));
      }
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/dashboard"
        className="text-sm text-navy font-medium hover:underline"
      >
        ← Back to dashboard
      </Link>
      <h1 className="font-display text-2xl font-semibold text-ink mt-4 mb-8">
        Assignments
      </h1>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : assignments.length === 0 ? (
        <p className="text-ink/50">
          No assignments posted yet for this course.
        </p>
      ) : (
        <div className="space-y-5">
          {assignments.map((a) => {
            const isDone = submittedIds[a._id];
            return (
              <div
                key={a._id}
                className="border border-ink/10 rounded-xl p-6 bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-ink">
                    {a.title}
                  </h3>
                  <span className="font-mono text-xs text-ink/40">
                    due {new Date(a.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-ink/60 text-sm mb-4">{a.description}</p>

                {isDone ? (
                  <p className="font-mono text-xs text-teal bg-teal/10 inline-block px-3 py-1.5 rounded">
                    ✓ submitted
                  </p>
                ) : (
                  <>
                    <textarea
                      rows={3}
                      placeholder="Paste your answer, notes, or a link to your work..."
                      value={drafts[a._id] || ""}
                      onChange={(e) => handleDraftChange(a._id, e.target.value)}
                      className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy mb-3"
                    />
                    {errors[a._id] && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors[a._id]}
                      </p>
                    )}
                    <button
                      onClick={() => handleSubmit(a._id)}
                      disabled={
                        submittingId === a._id || !drafts[a._id]?.trim()
                      }
                      className="bg-navy text-white font-semibold px-5 py-2 rounded-md hover:bg-navy/90 disabled:opacity-50 text-sm"
                    >
                      {submittingId === a._id
                        ? "Submitting..."
                        : "Submit assignment"}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentAssignments;
