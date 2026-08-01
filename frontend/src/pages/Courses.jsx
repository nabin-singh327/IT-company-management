import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchCourses } from "../api/courseApi";
import CourseThumbnail from "../components/CourseThumbnail";

const CATEGORIES = [
  "Programming",
  "Web Development",
  "Data Science",
  "Graphic Design",
];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const skillLevel = searchParams.get("skillLevel") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCourses({ search, category, skillLevel, sort });
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, category, skillLevel, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <span className="font-mono text-xs text-teal">02 · browse</span>
        <h1 className="font-display text-3xl font-semibold text-ink mt-2">
          All courses
        </h1>
        {search && (
          <p className="text-ink/50 text-sm mt-1 font-mono">
            search results for "{search}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-2">
              Category
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => updateParam("category", "")}
                className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
                  !category
                    ? "bg-navy text-white"
                    : "text-ink/70 hover:bg-ink/5"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => updateParam("category", c)}
                  className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
                    category === c
                      ? "bg-navy text-white"
                      : "text-ink/70 hover:bg-ink/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-2">
              Skill Level
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => updateParam("skillLevel", "")}
                className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
                  !skillLevel
                    ? "bg-navy text-white"
                    : "text-ink/70 hover:bg-ink/5"
                }`}
              >
                All
              </button>
              {SKILL_LEVELS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateParam("skillLevel", s)}
                  className={`block text-sm w-full text-left px-2 py-1.5 rounded ${
                    skillLevel === s
                      ? "bg-navy text-white"
                      : "text-ink/70 hover:bg-ink/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="md:col-span-3">
          <div className="flex justify-end mb-4">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="font-mono text-sm border border-ink/15 rounded-md px-3 py-2 text-ink/70 bg-white"
            >
              <option value="">Newest</option>
              <option value="popularity">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <p className="text-ink/40 font-mono text-sm">loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-ink/40 font-mono text-sm">
              no courses match these filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {courses.map((course) => (
                <Link
                  to={`/courses/${course.slug}`}
                  key={course._id}
                  className="group border border-ink/10 rounded-xl overflow-hidden hover:border-navy/30 hover:shadow-md transition-all bg-white block"
                >
                  <CourseThumbnail course={course} className="h-32" />
                  <div className="p-6">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-teal bg-teal/10 px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <h3 className="font-display font-semibold text-ink text-lg mt-3 mb-1.5 group-hover:text-navy transition-colors">
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
        </div>
      </div>
    </div>
  );
}

export default Courses;
