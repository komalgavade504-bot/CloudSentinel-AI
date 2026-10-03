const scannerService = require("../services/scannerService");

// Get all scans
const getAllScans = async (req, res) => {
  try {
    const scans = await scannerService.getAllScans();

    res.status(200).json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single scan
const getScanById = async (req, res) => {
  try {
    const scan = await scannerService.getScanById(req.params.id);

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: scan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Start/Create scan
const createScan = async (req, res) => {
  try {
    const scan = await scannerService.createScan(req.body);

    res.status(201).json({
      success: true,
      message: "Scan Started Successfully",
      data: scan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update scan
const updateScan = async (req, res) => {
  try {
    const scan = await scannerService.updateScan(
      req.params.id,
      req.body
    );

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Scan Updated Successfully",
      data: scan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete scan
const deleteScan = async (req, res) => {
  try {
    const scan = await scannerService.deleteScan(req.params.id);

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Scan Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllScans,
  getScanById,
  createScan,
  updateScan,
  deleteScan,
};