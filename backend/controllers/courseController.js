import Course from "../models/Course.js";

export const getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      isFeatured: true,
      isActive: true,
    }).limit(6);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const { search, category, skillLevel, minPrice, maxPrice, sort } =
      req.query;

    const filter = { isActive: true };

    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (skillLevel) filter.skillLevel = skillLevel;

    if (minPrice || maxPrice) {
      filter.fee = {};
      if (minPrice) filter.fee.$gte = Number(minPrice);
      if (maxPrice) filter.fee.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "popularity") sortOption = { enrollmentCount: -1 };
    if (sort === "price_low") sortOption = { fee: 1 };
    if (sort === "price_high") sortOption = { fee: -1 };

    const courses = await Course.find(filter).sort(sortOption);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this course" });
    }

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this course" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this course" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
