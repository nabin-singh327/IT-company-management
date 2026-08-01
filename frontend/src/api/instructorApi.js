import api from "./axios";

export const fetchMyCourses = async () => {
  const res = await api.get("/courses/instructor/mine");
  return res.data;
};

export const createCourse = async (courseData) => {
  const res = await api.post("/courses", courseData);
  return res.data;
};

export const updateCourse = async (id, courseData) => {
  const res = await api.put(`/courses/${id}`, courseData);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await api.get(`/courses/id/${id}`);
  return res.data;
};

export const fetchStudentsForCourse = async (courseId) => {
  const res = await api.get(`/enrollments/course/${courseId}/students`);
  return res.data;
};

export const updateStudentProgress = async (enrollmentId, progress) => {
  const res = await api.patch(`/enrollments/${enrollmentId}/progress`, { progress });
  return res.data;
};

export const createAssignment = async (assignmentData) => {
  const res = await api.post("/assignments", assignmentData);
  return res.data;
};

export const fetchAssignmentsByCourse = async (courseId) => {
  const res = await api.get(`/assignments/course/${courseId}`);
  return res.data;
};

export const fetchSubmissionsForAssignment = async (assignmentId) => {
  const res = await api.get(`/submissions/assignment/${assignmentId}`);
  return res.data;
};

export const gradeSubmission = async (submissionId, grade, feedback) => {
  const res = await api.patch(`/submissions/${submissionId}/grade`, { grade, feedback });
  return res.data;
};

export const createBlogPost = async (postData) => {
  const res = await api.post("/blog", postData);
  return res.data;
};