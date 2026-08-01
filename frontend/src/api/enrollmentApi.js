import api from "./axios";

export const initiateEnrollment = async (courseId) => {
  const res = await api.post("/enrollments/initiate", { courseId });
  return res.data;
};

export const verifyEnrollment = async (encodedData) => {
  const res = await api.get(`/enrollments/verify?data=${encodedData}`);
  return res.data;
};

export const fetchMyEnrollments = async () => {
  const res = await api.get("/enrollments/my");
  return res.data;
};

export const fetchEnrollmentById = async (id) => {
  const res = await api.get(`/enrollments/${id}`);
  return res.data;
};