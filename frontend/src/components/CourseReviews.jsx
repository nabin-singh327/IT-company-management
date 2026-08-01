import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchReviewsForCourse, createReview } from "../api/contentApi";

function Stars({ rating }) {
  return (
    <span className="text-amber">
      {"★".repeat(rating)}
      <span className="text-ink/15">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function CourseReviews({ courseId }) {
  const { user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await fetchReviewsForCourse(courseId);
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createReview(courseId, form.rating, form.comment);
      setForm({ rating: 5, comment: "" });
      load(); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : null;

  return (
    <div className="mt-12 border-t border-ink/10 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display font-semibold text-lg text-ink">Reviews</h2>
        {avgRating && (
          <span className="font-mono text-sm text-ink/50">
            <Stars rating={Math.round(avgRating)} /> {avgRating} (
            {reviews.length})
          </span>
        )}
      </div>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="border border-ink/10 rounded-xl p-5 mb-8 bg-white"
        >
          <div className="flex items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setForm({ ...form, rating: n })}
                className={`text-xl ${n <= form.rating ? "text-amber" : "text-ink/15"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            required
            placeholder="Share your experience with this course..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            rows={3}
            className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-navy text-white font-semibold px-5 py-2 rounded-md hover:bg-navy/90 text-sm disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit review"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-ink/50 text-sm">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="border border-ink/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-ink text-sm">
                  {r.student?.name}
                </p>
                <Stars rating={r.rating} />
              </div>
              <p className="text-ink/60 text-sm">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseReviews;
