const express = require("express");

const router = express.Router();

const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

// Get all reports
router.get("/", getAllReports);

// Get single report
router.get("/:id", getReportById);

// Generate report
router.post("/", createReport);

// Update report
router.put("/:id", updateReport);

// Delete report
router.delete("/:id", deleteReport);

module.exports = router;