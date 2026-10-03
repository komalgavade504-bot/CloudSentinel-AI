const Scan = require("../models/Scan");

// =========================
// GET ALL SCANS
// =========================
const getAllScans = async () => {
  return await Scan.find().sort({
    createdAt: -1,
  });
};

// =========================
// GET SINGLE SCAN
// =========================
const getScanById = async (id) => {
  return await Scan.findById(id);
};

// =========================
// START / CREATE SCAN
// =========================
const createScan = async (data) => {
  // Validate resource name
  if (!data.resourceName || !data.resourceName.trim()) {
    throw new Error("Resource name is required.");
  }

  // Generate simulated vulnerability findings
  const findings = Math.floor(Math.random() * 11);

  // Calculate risk level
  let riskLevel = "Low";

  if (findings >= 7) {
    riskLevel = "High";
  } else if (findings >= 4) {
    riskLevel = "Medium";
  }

  // Calculate security score
  const securityScore = Math.max(
    100 - findings * 7,
    20
  );

  // Create and save scan
  const scan = new Scan({
    resourceName: data.resourceName.trim(),
    scanType: data.scanType || "Quick",
    status: "Completed",
    findings,
    riskLevel,
    securityScore,
  });

  return await scan.save();
};

// =========================
// UPDATE SCAN
// =========================
const updateScan = async (id, data) => {
  return await Scan.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// =========================
// DELETE SCAN
// =========================
const deleteScan = async (id) => {
  return await Scan.findByIdAndDelete(id);
};

module.exports = {
  getAllScans,
  getScanById,
  createScan,
  updateScan,
  deleteScan,
};