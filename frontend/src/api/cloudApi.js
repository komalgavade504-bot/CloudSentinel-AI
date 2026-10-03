import api from "./api";

// Get all resources
export const getCloudResources = () => {
  return api.get("/cloud-resources");
};

// Get one resource
export const getCloudResource = (id) => {
  return api.get(`/cloud-resources/${id}`);
};

// Create
export const createCloudResource = (data) => {
  return api.post("/cloud-resources", data);
};

// Update
export const updateCloudResource = (id, data) => {
  return api.put(`/cloud-resources/${id}`, data);
};

// Delete
export const deleteCloudResource = (id) => {
  return api.delete(`/cloud-resources/${id}`);
};