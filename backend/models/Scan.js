const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    resourceName: {
      type: String,
      required: true,
    },

    scanType: {
      type: String,
      enum: ["Quick", "Full", "Compliance"],
      default: "Quick",
    },

    status: {
      type: String,
      enum: ["Running", "Completed", "Failed"],
      default: "Running",
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    findings: {
      type: Number,
      default: 0,
    },

    securityScore: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);