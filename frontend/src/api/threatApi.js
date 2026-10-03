import axios from "axios";

const API_URL = "http://localhost:5000/api/threats";

// Get all threats
export const getThreats = () => {
  return axios.get(API_URL);
};

// Get single threat
export const getThreatById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Create threat
export const createThreat = (data) => {
  return axios.post(API_URL, data);
};

// Update threat
export const updateThreat = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// Delete threat
export const deleteThreat = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};