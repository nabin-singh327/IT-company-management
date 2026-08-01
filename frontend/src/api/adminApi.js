import api from "./axios";

export const fetchAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const updateUserRole = async (userId, role) => {
  const res = await api.patch(`/users/${userId}/role`, { role });
  return res.data;
};

export const updateUserStatus = async (userId, isActive) => {
  const res = await api.patch(`/users/${userId}/status`, { isActive });
  return res.data;
};

export const fetchAllCoursesAdmin = async () => {
  const res = await api.get("/courses/admin/all");
  return res.data;
};

export const fetchAllEnrollments = async () => {
  const res = await api.get("/enrollments/admin/all");
  return res.data;
};

export const createJob = async (jobData) => {
  const res = await api.post("/jobs", jobData);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
};

export const createAlumniStory = async (storyData) => {
  const res = await api.post("/alumni", storyData);
  return res.data;
};