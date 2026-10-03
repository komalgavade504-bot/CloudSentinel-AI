const mongoose = require("mongoose");

const cloudResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["AWS", "Azure", "GCP"],
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Running", "Stopped", "Pending"],
      default: "Running",
    },

    securityScore: {
      type: Number,
      default: 100,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CloudResource",
  cloudResourceSchema
);