const threatService = require("../services/threatService");

// Get all threats
const getAllThreats = async (req, res) => {
  try {
    const threats = await threatService.getAllThreats();

    res.status(200).json({
      success: true,
      count: threats.length,
      data: threats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single threat
const getThreatById = async (req, res) => {
  try {
    const threat = await threatService.getThreatById(req.params.id);

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: "Threat not found",
      });
    }

    res.status(200).json({
      success: true,
      data: threat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create threat
const createThreat = async (req, res) => {
  try {
    const threat = await threatService.createThreat(req.body);

    res.status(201).json({
      success: true,
      message: "Threat Created Successfully",
      data: threat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update threat
const updateThreat = async (req, res) => {
  try {
    const threat = await threatService.updateThreat(
      req.params.id,
      req.body
    );

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: "Threat not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Threat Updated Successfully",
      data: threat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete threat
const deleteThreat = async (req, res) => {
  try {
    const threat = await threatService.deleteThreat(req.params.id);

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: "Threat not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Threat Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllThreats,
  getThreatById,
  createThreat,
  updateThreat,
  deleteThreat,
};