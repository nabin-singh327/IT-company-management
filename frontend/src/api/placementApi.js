import api from "./axios";

export const fetchJobs = async () => {
  const res = await api.get("/jobs");
  return res.data;
};

export const fetchAlumniStories = async () => {
  const res = await api.get("/alumni");
  return res.data;
};