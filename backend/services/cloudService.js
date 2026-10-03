const mongoose = require("mongoose");
const CloudResource = require("../models/CloudResource");

// Get all cloud resources
const getAllResources = async () => {
  return await CloudResource.find().sort({ createdAt: -1 });
};

// Get single cloud resource by ID
const getResourceById = async (id) => {
  console.log("=================================");
  console.log("Requested Resource ID:", id);
  console.log("Valid ObjectId:", mongoose.Types.ObjectId.isValid(id));

  const allResources = await CloudResource.find();

  console.log(
    "Resources in MongoDB:",
    allResources.map((resource) => ({
      id: resource._id.toString(),
      name: resource.name,
    }))
  );

  const resource = await CloudResource.findById(id);

  console.log("Found Resource:", resource);
  console.log("=================================");

  return resource;
};

// Create cloud resource
const createResource = async (data) => {
  const resource = new CloudResource(data);

  return await resource.save();
};

// Update cloud resource
const updateResource = async (id, data) => {
  return await CloudResource.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete cloud resource
const deleteResource = async (id) => {
  return await CloudResource.findByIdAndDelete(id);
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};