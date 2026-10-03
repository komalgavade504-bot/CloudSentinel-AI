const Compliance = require("../models/Compliance");

// Get all compliance frameworks
const getAllCompliance = async () => {
  return await Compliance.find().sort({
    createdAt: -1,
  });
};

// Get one framework
const getComplianceById = async (id) => {
  return await Compliance.findById(id);
};

// Create framework
const createCompliance = async (data) => {
  const compliance = new Compliance(data);
  return await compliance.save();
};

// Update framework
const updateCompliance = async (id, data) => {
  return await Compliance.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete framework
const deleteCompliance = async (id) => {
  return await Compliance.findByIdAndDelete(id);
};

module.exports = {
  getAllCompliance,
  getComplianceById,
  createCompliance,
  updateCompliance,
  deleteCompliance,
};