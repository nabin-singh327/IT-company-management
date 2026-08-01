const CATEGORY_COLORS = {
  Programming: "from-navy to-teal",
  "Web Development": "from-teal to-amber",
  "Data Science": "from-navy to-ink",
  "Graphic Design": "from-amber to-navy",
};

function CourseThumbnail({ course, className = "" }) {
  if (course.thumbnail) {
    return (
      <img
        src={course.thumbnail}
        alt={course.title}
        className={`w-full object-cover ${className}`}
      />
    );
  }

  const gradient = CATEGORY_COLORS[course.category] || "from-navy to-teal";

  return (
    <div
      className={`w-full bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      <span className="font-display font-semibold text-white/90 text-sm text-center px-4">
        {course.category}
      </span>
    </div>
  );
}

export default CourseThumbnail;