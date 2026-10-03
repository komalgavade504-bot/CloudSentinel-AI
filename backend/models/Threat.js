const mongoose = require("mongoose");

const threatSchema = new mongoose.Schema(
  {
    // =========================
    // THREAT TITLE
    // =========================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // THREAT DESCRIPTION
    // =========================
    description: {
      type: String,
      default: "No description provided.",
    },

    // =========================
    // THREAT SOURCE
    // Example: AWS GuardDuty, Security Scanner
    // =========================
    source: {
      type: String,
      default: "CloudSentinel AI",
    },

    // =========================
    // SEVERITY
    // =========================
    severity: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      default: "Medium",
    },

    // =========================
    // STATUS
    // =========================
    status: {
      type: String,
      enum: ["Active", "Resolved", "Open"],
      default: "Active",
    },

    // =========================
    // AFFECTED RESOURCE
    // =========================
    affectedResource: {
      type: String,
      default: "Not specified",
    },

    // =========================
    // RECOMMENDATION
    // =========================
    recommendation: {
      type: String,
      default: "Investigate and remediate this threat.",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Threat",
  threatSchema
);