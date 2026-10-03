import api from "./api";

// Get all reports
export const getReports = () => {
  return api.get("/reports");
};

// Get single report
export const getReport = (id) => {
  return api.get(`/reports/${id}`);
};

// Generate report
export const createReport = (data) => {
  return api.post("/reports", data);
};

// Update report
export const updateReport = (id, data) => {
  return api.put(`/reports/${id}`, data);
};

// Delete report
export const deleteReport = (id) => {
  return api.delete(`/reports/${id}`);
};