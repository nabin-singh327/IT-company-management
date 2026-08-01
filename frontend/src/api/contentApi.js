import api from "./axios";

export const fetchBlogPosts = async (tag) => {
  const res = await api.get("/blog", { params: tag ? { tag } : {} });
  return res.data;
};

export const fetchBlogPostBySlug = async (slug) => {
  const res = await api.get(`/blog/${slug}`);
  return res.data;
};

export const fetchReviewsForCourse = async (courseId) => {
  const res = await api.get(`/reviews/course/${courseId}`);
  return res.data;
};

export const createReview = async (courseId, rating, comment) => {
  const res = await api.post("/reviews", { courseId, rating, comment });
  return res.data;
};
