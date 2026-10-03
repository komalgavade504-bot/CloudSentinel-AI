const Report = require("../models/Report");

// Get all reports
const getAllReports = async () => {
  return await Report.find().sort({ createdAt: -1 });
};

// Get single report
const getReportById = async (id) => {
  return await Report.findById(id);
};

// Create report
const createReport = async (data) => {
  const report = new Report(data);
  return await report.save();
};

// Update report
const updateReport = async (id, data) => {
  return await Report.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete report
const deleteReport = async (id) => {
  return await Report.findByIdAndDelete(id);
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};