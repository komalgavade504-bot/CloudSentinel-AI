const Threat = require("../models/Threat");

// =========================
// GET ALL THREATS
// =========================
const getAllThreats = async () => {
  return await Threat.find().sort({
    createdAt: -1,
  });
};

// =========================
// GET SINGLE THREAT
// =========================
const getThreatById = async (id) => {
  return await Threat.findById(id);
};

// =========================
// CREATE THREAT
// =========================
const createThreat = async (data) => {
  const threat = new Threat(data);

  return await threat.save();
};

// =========================
// UPDATE THREAT
// =========================
const updateThreat = async (id, data) => {
  return await Threat.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// =========================
// DELETE THREAT
// =========================
const deleteThreat = async (id) => {
  return await Threat.findByIdAndDelete(id);
};

module.exports = {
  getAllThreats,
  getThreatById,
  createThreat,
  updateThreat,
  deleteThreat,
};