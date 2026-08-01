import api from "./axios";

export const submitContactMessage = async (payload) => {
  const res = await api.post("/contact", payload);
  return res.data;
};