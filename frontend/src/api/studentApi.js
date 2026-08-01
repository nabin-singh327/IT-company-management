import api from "./axios";

export const fetchAssignmentsForCourse = async (courseId) => {
  const res = await api.get(`/assignments/course/${courseId}`);
  return res.data;
};

export const submitAssignment = async (assignmentId, content) => {
  const res = await api.post("/submissions", { assignmentId, content });
  return res.data;
};