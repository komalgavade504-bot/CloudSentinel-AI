const express = require("express");

const router = express.Router();

const {
  getAllCompliance,
  getComplianceById,
  createCompliance,
  updateCompliance,
  deleteCompliance,
} = require("../controllers/complianceController");

// Get all frameworks
router.get("/", getAllCompliance);

// Get one framework
router.get("/:id", getComplianceById);

// Create framework
router.post("/", createCompliance);

// Update framework
router.put("/:id", updateCompliance);

// Delete framework
router.delete("/:id", deleteCompliance);

module.exports = router;