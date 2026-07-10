import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

export const getDashboard = async () => {
  const response = await api.get("/renewals/dashboard");
  return response.data;
};

export const createRenewal = async (renewal) => {
  const response = await api.post("/renewals/", renewal);
  return response.data;
};

export default api;