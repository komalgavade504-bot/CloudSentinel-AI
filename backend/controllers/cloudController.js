const cloudService = require("../services/cloudService");

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await cloudService.getAllResources();

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get resource by ID
const getResourceById = async (req, res) => {
  try {
    const resource = await cloudService.getResourceById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Cloud Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create resource
const createResource = async (req, res) => {
  try {
    const resource = await cloudService.createResource(req.body);

    res.status(201).json({
      success: true,
      message: "Cloud Resource Created Successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update resource
const updateResource = async (req, res) => {
  try {
    const resource = await cloudService.updateResource(
      req.params.id,
      req.body
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Cloud Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cloud Resource Updated Successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete resource
const deleteResource = async (req, res) => {
  try {
    const resource = await cloudService.deleteResource(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Cloud Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cloud Resource Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};