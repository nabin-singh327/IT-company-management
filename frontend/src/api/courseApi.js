import api from "./axios";

export const fetchFeaturedCourses = async () => {
  const res = await api.get("/courses/featured");
  return res.data;
};

export const fetchCourses = async (params = {}) => {
  const res = await api.get("/courses", { params });
  return res.data;
};

export const fetchCourseBySlug = async (slug) => {
  const res = await api.get(`/courses/${slug}`);
  return res.data;
};

export const bookDemo = async (payload) => {
  const res = await api.post("/demo", payload);
  return res.data;
};