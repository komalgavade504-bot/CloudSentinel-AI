const express = require("express");

const router = express.Router();

const {
  getAllScans,
  getScanById,
  createScan,
  updateScan,
  deleteScan,
} = require("../controllers/scannerController");

// GET all scans
router.get("/", getAllScans);

// GET single scan
router.get("/:id", getScanById);

// START/Create scan
router.post("/", createScan);

// UPDATE scan
router.put("/:id", updateScan);

// DELETE scan
router.delete("/:id", deleteScan);

module.exports = router;