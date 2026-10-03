import api from "./api";

// Get all compliance frameworks
export const getCompliance = () => {
  return api.get("/compliance");
};

// Get one compliance framework
export const getComplianceById = (id) => {
  return api.get(`/compliance/${id}`);
};

// Create compliance framework
export const createCompliance = (data) => {
  return api.post("/compliance", data);
};

// Update compliance framework
export const updateCompliance = (id, data) => {
  return api.put(`/compliance/${id}`, data);
};

// Delete compliance framework
export const deleteCompliance = (id) => {
  return api.delete(`/compliance/${id}`);
};