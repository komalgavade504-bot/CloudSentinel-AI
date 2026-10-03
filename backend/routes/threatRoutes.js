const express = require("express");

const router = express.Router();

const {
  getAllThreats,
  getThreatById,
  createThreat,
  updateThreat,
  deleteThreat,
} = require("../controllers/threatController");

// Get all threats
router.get("/", getAllThreats);

// Get single threat
router.get("/:id", getThreatById);

// Create threat
router.post("/", createThreat);

// Update threat
router.put("/:id", updateThreat);

// Delete threat
router.delete("/:id", deleteThreat);

module.exports = router;