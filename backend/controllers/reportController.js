const reportService = require("../services/reportService");

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single report
const getReportById = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create report
const createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);

    res.status(201).json({
      success: true,
      message: "Report Generated Successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update report
const updateReport = async (req, res) => {
  try {
    const report = await reportService.updateReport(
      req.params.id,
      req.body
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report Updated Successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    const report = await reportService.deleteReport(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};