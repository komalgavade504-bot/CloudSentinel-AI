const express = require("express");

const router = express.Router();

const {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/cloudController");

// GET all cloud resources
router.get("/", getAllResources);

// GET single cloud resource
router.get("/:id", getResourceById);

// CREATE cloud resource
router.post("/", createResource);

// UPDATE cloud resource
router.put("/:id", updateResource);

// DELETE cloud resource
router.delete("/:id", deleteResource);

module.exports = router;