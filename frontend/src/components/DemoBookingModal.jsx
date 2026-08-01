import { useState } from "react";
import { bookDemo } from "../api/courseApi";

function DemoBookingModal({ course, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", preferredDate: "", preferredTime: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await bookDemo({ courseId: course._id, ...form });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/40 hover:text-ink"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <p className="font-mono text-teal text-sm mb-2">// booking confirmed</p>
            <h3 className="font-display text-xl font-semibold text-ink">You're all set</h3>
            <p className="text-ink/60 text-sm mt-2">
              We'll email you a confirmation for the {course.title} demo.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl font-semibold text-ink mb-1">
              Schedule a demo
            </h3>
            <p className="text-ink/50 text-sm mb-6">{course.title}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy"
              />
              <input
                name="phone"
                required
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="preferredDate"
                  type="date"
                  required
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <input
                  name="preferredTime"
                  type="time"
                  required
                  value={form.preferredTime}
                  onChange={handleChange}
                  className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm outline-none focus:border-navy"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-amber text-ink font-semibold py-2.5 rounded-md hover:bg-amber/90 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Booking..." : "Confirm booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default DemoBookingModal;