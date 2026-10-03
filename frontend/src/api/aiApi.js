import api from "./api";

// Ask AI
export const askAI = (question) => {
  return api.post("/ai/ask", {
    question,
  });
};

// Chat History
export const getHistory = () => {
  return api.get("/ai/history");
};