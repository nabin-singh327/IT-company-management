import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSubmissionsForAssignment, gradeSubmission } from "../api/instructorApi";

function InstructorSubmissions() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({}); 
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSubmissionsForAssignment(assignmentId);
        setSubmissions(data);
   
        const seeded = {};
        data.forEach((s) => {
          seeded[s._id] = { grade: s.grade ?? "", feedback: s.feedback ?? "" };
        });
        setDrafts(seeded);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [assignmentId]);

  const updateDraft = (id, field, value) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleGrade = async (id) => {
    setSavingId(id);
    try {
      const { grade, feedback } = drafts[id];
      const updated = await gradeSubmission(id, Number(grade), feedback);
      setSubmissions((prev) => prev.map((s) => (s._id === id ? updated : s)));
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/instructor" className="text-sm text-navy font-medium hover:underline">
        ← Back to my courses
      </Link>
      <h1 className="font-display text-2xl font-semibold text-ink mt-4 mb-8">Submissions</h1>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-ink/50">No submissions yet.</p>
      ) : (
        <div className="space-y-5">
          {submissions.map((s) => (
            <div key={s._id} className="border border-ink/10 rounded-xl p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-ink">{s.student.name}</p>
                  <p className="text-ink/50 text-sm">{s.student.email}</p>
                </div>
                <span
                  className={`font-mono text-xs px-2 py-1 rounded ${
                    s.status === "graded"
                      ? "bg-teal/10 text-teal"
                      : "bg-amber/10 text-amber"
                  }`}
                >
                  {s.status}
                </span>
              </div>

              <p className="text-ink/70 text-sm border border-ink/10 rounded-md p-3 mb-4 bg-ink/[0.02]">
                {s.content}
              </p>

              <div className="flex gap-3 items-start">
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Grade"
                  value={drafts[s._id]?.grade ?? ""}
                  onChange={(e) => updateDraft(s._id, "grade", e.target.value)}
                  className="w-24 border border-ink/15 rounded-md px-2 py-2 font-mono text-sm"
                />
                <input
                  type="text"
                  placeholder="Feedback (optional)"
                  value={drafts[s._id]?.feedback ?? ""}
                  onChange={(e) => updateDraft(s._id, "feedback", e.target.value)}
                  className="flex-1 border border-ink/15 rounded-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleGrade(s._id)}
                  disabled={savingId === s._id || drafts[s._id]?.grade === ""}
                  className="bg-navy text-white font-semibold px-4 py-2 rounded-md hover:bg-navy/90 disabled:opacity-50 text-sm"
                >
                  {savingId === s._id ? "Saving..." : "Save grade"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorSubmissions;