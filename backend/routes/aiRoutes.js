const express = require("express");

const router = express.Router();

const {
  askAI,
  getChatHistory,
  clearChatHistory,
} = require("../controllers/aiController");

// Ask AI
router.post("/ask", askAI);

// Get Chat History
router.get("/history", getChatHistory);

// Clear Chat History
router.delete("/history", clearChatHistory);

module.exports = router;