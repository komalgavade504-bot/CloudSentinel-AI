const aiService = require("../services/aiService");

// Ask AI
const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const chat = await aiService.askAI(question);

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get AI Chat History
const getChatHistory = async (req, res) => {
  try {
    const history = await aiService.getChatHistory();

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// CLEAR CHAT HISTORY
// =========================
const clearChatHistory = async (req, res) => {
  try {
    await aiService.clearChatHistory();

    res.status(200).json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  askAI,
  getChatHistory,
  clearChatHistory,
};