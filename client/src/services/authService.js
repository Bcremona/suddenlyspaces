import api from "./api";

// Logs in a user
export const loginRequest = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};