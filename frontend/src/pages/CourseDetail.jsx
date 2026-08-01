import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseBySlug } from "../api/courseApi";
import DemoBookingModal from "../components/DemoBookingModal";
import EnrollButton from "../components/EnrollButton";
import CourseReviews from "../components/CourseReviews";
import CourseThumbnail from "../components/CourseThumbnail";

function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseBySlug(slug);
        setCourse(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return <p className="text-center py-20 font-mono text-ink/40 text-sm">loading...</p>;
  if (notFound) return <p className="text-center py-20 font-mono text-ink/40 text-sm">course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <CourseThumbnail course={course} className="h-64 rounded-xl mb-6" />
      <span className="font-mono text-[11px] uppercase tracking-wide text-teal bg-teal/10 px-2 py-1 rounded">
        {course.category}
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-4">{course.title}</h1>
      <p className="text-ink/60 mt-3 leading-relaxed">{course.description}</p>

      <div className="grid grid-cols-3 gap-4 mt-8 font-mono text-sm">
        <div className="border border-ink/10 rounded-lg p-4">
          <p className="text-ink/40 text-xs mb-1">Duration</p>
          <p className="text-ink font-medium">{course.duration}</p>
        </div>
        <div className="border border-ink/10 rounded-lg p-4">
          <p className="text-ink/40 text-xs mb-1">Level</p>
          <p className="text-ink font-medium">{course.skillLevel}</p>
        </div>
        <div className="border border-ink/10 rounded-lg p-4">
          <p className="text-ink/40 text-xs mb-1">Fee</p>
          <p className="text-ink font-medium">Rs. {course.fee.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display font-semibold text-lg text-ink mb-3">Syllabus</h2>
        <ul className="space-y-2">
          {course.syllabus.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
              <span className="font-mono text-teal">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 border-t border-ink/10 pt-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-display font-semibold">
          {course.instructor.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-ink">{course.instructor.name}</p>
          <p className="text-ink/50 text-sm">{course.instructor.bio}</p>
        </div>
      </div>

      <div className="mt-10 flex gap-3">
        <EnrollButton course={course} />
        <button
          onClick={() => setShowModal(true)}
          className="border border-ink/15 text-ink font-medium px-6 py-3 rounded-md hover:border-ink/30 transition-colors"
        >
          Schedule a demo
        </button>
      </div>
      <CourseReviews courseId={course._id} />

      {showModal && <DemoBookingModal course={course} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CourseDetail;