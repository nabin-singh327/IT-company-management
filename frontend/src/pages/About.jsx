import { useEffect, useState } from "react";
import { fetchCourses } from "../api/courseApi";

function About() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const courses = await fetchCourses();
        const seen = new Set();
        const team = [];
        courses.forEach((c) => {
          if (c.instructor?.name && !seen.has(c.instructor.name)) {
            seen.add(c.instructor.name);
            team.push(c.instructor);
          }
        });
        setInstructors(team);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">10 · about</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-10">
        About us
      </h1>

      <section className="mb-16 max-w-2xl">
        <h2 className="font-display font-semibold text-xl text-ink mb-3">
          Our mission
        </h2>
        <p className="text-ink/70 leading-relaxed mb-6">
          We exist to make practical, industry-relevant IT training accessible —
          bridging the gap between classroom learning and what employers
          actually need. Every course is built and taught by working engineers,
          not just instructors reading from a curriculum.
        </p>
        <h2 className="font-display font-semibold text-xl text-ink mb-3">
          Where we started
        </h2>
        <p className="text-ink/70 leading-relaxed">
          Sipalaya Info Tech began as a small team of developers running weekend
          workshops for aspiring programmers in Kathmandu. Since then, we've
          grown into a full training institute with dedicated placement support,
          but the hands-on, project-first approach has stayed the same.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="font-display font-semibold text-xl text-ink mb-6">
          Meet the instructors
        </h2>
        {loading ? (
          <p className="text-ink/40 font-mono text-sm">loading...</p>
        ) : instructors.length === 0 ? (
          <p className="text-ink/50">No instructors listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {instructors.map((instructor, i) => (
              <div
                key={i}
                className="border border-ink/10 rounded-xl p-6 bg-white"
              >
                <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-display font-semibold mb-4">
                  {instructor.name.charAt(0)}
                </div>
                <h3 className="font-medium text-ink mb-1">{instructor.name}</h3>
                <p className="text-ink/50 text-sm mb-2">
                  {instructor.experience}
                </p>
                <p className="text-ink/60 text-sm leading-relaxed">
                  {instructor.bio}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display font-semibold text-xl text-ink mb-4">
          Partnerships &amp; affiliations
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Microsoft Learn Partner",
            "Cisco Networking Academy",
            "AWS Educate",
          ].map((p) => (
            <span
              key={p}
              className="font-mono text-xs text-ink/60 border border-ink/15 px-3 py-2 rounded-md"
            >
              {p}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
