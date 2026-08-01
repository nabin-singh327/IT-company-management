import { useEffect, useState } from "react";
import { fetchJobs } from "../api/placementApi";
import { createJob, deleteJob } from "../api/adminApi";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    applicationDeadline: "",
    applyLink: "",
  });

  const load = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split(",").map((r) => r.trim()).filter(Boolean),
      };
      await createJob(payload);
      setForm({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        description: "",
        requirements: "",
        applicationDeadline: "",
        applyLink: "",
      });
      load(); // refresh list to include the new posting
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this job posting?")) return;
    await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink mb-6">Job postings</h2>

      <form
        onSubmit={handleSubmit}
        className="border border-ink/10 rounded-xl p-6 bg-white mb-10 space-y-4"
      >
        <h3 className="font-display font-semibold text-ink">Post a new opening</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            required
            placeholder="Job title"
            value={form.title}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <input
            name="company"
            required
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="location"
            required
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm"
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <textarea
          name="description"
          required
          placeholder="Job description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="requirements"
          placeholder="Requirements, comma-separated"
          value={form.requirements}
          onChange={handleChange}
          className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="applicationDeadline"
            type="date"
            required
            value={form.applicationDeadline}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
          <input
            name="applyLink"
            required
            placeholder="Apply link (URL or mailto:)"
            value={form.applyLink}
            onChange={handleChange}
            className="border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-navy text-white font-semibold px-5 py-2.5 rounded-md hover:bg-navy/90 disabled:opacity-50 text-sm"
        >
          {submitting ? "Posting..." : "Post job"}
        </button>
      </form>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-ink/50">No jobs posted yet.</p>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-ink/10 rounded-xl p-5 bg-white flex items-center justify-between"
            >
              <div>
                <h4 className="font-medium text-ink">{job.title}</h4>
                <p className="text-ink/50 text-sm">
                  {job.company} · {job.location}
                </p>
              </div>
              <button
                onClick={() => handleDelete(job._id)}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminJobs;