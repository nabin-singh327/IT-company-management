import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeaturedCourses } from "../api/courseApi";
import CourseThumbnail from "./CourseThumbnail";

function HighlightFeatures() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFeaturedCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load featured courses", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="font-mono text-xs text-teal">01 · courses</span>
          <h2 className="font-display text-2xl font-semibold text-ink mt-2">
            Featured programs
          </h2>
        </div>
        <Link
          to="/courses"
          className="text-sm font-medium text-navy hover:underline"
        >
          View all →
        </Link>
      </div>

      {loading ? (
        <p className="text-ink/40 font-mono text-sm">loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-ink/40 font-mono text-sm">
          no featured courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <Link
              to={`/courses/${course.slug}`}
              key={course._id}
              className="group border border-ink/10 rounded-xl overflow-hidden hover:border-navy/30 hover:shadow-md transition-all bg-white block"
            >
              <CourseThumbnail course={course} className="h-36" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-teal bg-teal/10 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <span className="font-mono text-[11px] text-ink/40">
                    {course.skillLevel}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-ink text-lg mb-1.5 group-hover:text-navy transition-colors">
                  {course.title}
                </h3>
                <p className="text-ink/55 text-sm mb-5 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between font-mono text-sm pt-4 border-t border-ink/10">
                  <span className="text-ink/50">{course.duration}</span>
                  <span className="font-medium text-ink">
                    Rs. {course.fee.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default HighlightFeatures;
