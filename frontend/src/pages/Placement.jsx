import { useEffect, useState } from "react";
import { fetchJobs, fetchAlumniStories } from "../api/placementApi";

function Placement() {
  const [jobs, setJobs] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [jobsData, storiesData] = await Promise.all([
          fetchJobs(),
          fetchAlumniStories(),
        ]);
        setJobs(jobsData);
        setStories(storiesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">07 · placement</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-10">
        Job placement
      </h1>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading...</p>
      ) : (
        <>
          <section className="mb-16">
            <h2 className="font-display font-semibold text-xl text-ink mb-5">
              Open positions
            </h2>
            {jobs.length === 0 ? (
              <p className="text-ink/50">No open positions right now.</p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border border-ink/10 rounded-xl p-6 bg-white flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-ink">{job.title}</h3>
                        <span className="font-mono text-[11px] uppercase text-teal bg-teal/10 px-2 py-0.5 rounded">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-ink/60 text-sm">
                        {job.company} · {job.location}
                      </p>
                      <p className="text-ink/40 text-xs font-mono mt-1">
                        apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy text-white font-medium px-4 py-2 rounded-md hover:bg-navy/90 text-sm whitespace-nowrap"
                    >
                      Apply now
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-ink mb-5">
              Alumni success stories
            </h2>
            {stories.length === 0 ? (
              <p className="text-ink/50">No stories yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {stories.map((s) => (
                  <div key={s._id} className="border border-ink/10 rounded-xl p-6 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-display font-semibold">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{s.name}</p>
                        <p className="text-ink/50 text-xs">
                          {s.position} at {s.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-ink/70 text-sm leading-relaxed">{s.story}</p>
                    {s.course && (
                      <p className="font-mono text-xs text-teal mt-3">
                        {s.course.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Placement;