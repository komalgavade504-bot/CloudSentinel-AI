const complianceService = require("../services/complianceService");

// Get all compliance frameworks
const getAllCompliance = async (req, res) => {
  try {
    const compliance =
      await complianceService.getAllCompliance();

    res.status(200).json({
      success: true,
      count: compliance.length,
      data: compliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one framework
const getComplianceById = async (req, res) => {
  try {
    const compliance =
      await complianceService.getComplianceById(
        req.params.id
      );

    if (!compliance) {
      return res.status(404).json({
        success: false,
        message: "Compliance framework not found",
      });
    }

    res.status(200).json({
      success: true,
      data: compliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create framework
const createCompliance = async (req, res) => {
  try {
    const compliance =
      await complianceService.createCompliance(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Compliance framework created successfully",
      data: compliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update framework
const updateCompliance = async (req, res) => {
  try {
    const compliance =
      await complianceService.updateCompliance(
        req.params.id,
        req.body
      );

    if (!compliance) {
      return res.status(404).json({
        success: false,
        message: "Compliance framework not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Compliance framework updated successfully",
      data: compliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete framework
const deleteCompliance = async (req, res) => {
  try {
    const compliance =
      await complianceService.deleteCompliance(
        req.params.id
      );

    if (!compliance) {
      return res.status(404).json({
        success: false,
        message: "Compliance framework not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Compliance framework deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCompliance,
  getComplianceById,
  createCompliance,
  updateCompliance,
  deleteCompliance,
};