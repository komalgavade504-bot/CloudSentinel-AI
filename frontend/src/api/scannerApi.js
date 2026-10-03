import api from "./api";

// Get all scans
export const getScans = () => {
  return api.get("/scanner");
};

// Get one scan
export const getScan = (id) => {
  return api.get(`/scanner/${id}`);
};

// Start a new scan
export const createScan = (data) => {
  return api.post("/scanner", data);
};

// Update scan
export const updateScan = (id, data) => {
  return api.put(`/scanner/${id}`, data);
};

// Delete scan
export const deleteScan = (id) => {
  return api.delete(`/scanner/${id}`);
};