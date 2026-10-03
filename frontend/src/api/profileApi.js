import api from "./api";

// Get profile
export const getProfile = () => {
  return api.get("/profile");
};

// Update profile
export const updateProfile = (data) => {
  return api.put("/profile", data);
};