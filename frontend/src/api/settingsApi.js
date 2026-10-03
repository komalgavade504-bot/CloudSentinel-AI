import api from "./api";

// Get settings
export const getSettings = () => {
  return api.get("/settings");
};

// Update settings
export const updateSettings = (data) => {
  return api.put("/settings", data);
};