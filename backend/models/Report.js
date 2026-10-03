const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
      required: true,
    },

    reportType: {
      type: String,
      enum: [
        "Security",
        "Compliance",
        "Threat",
        "Cloud",
      ],
      default: "Security",
    },

    generatedBy: {
      type: String,
      default: "Admin",
    },

    status: {
      type: String,
      enum: [
        "Generated",
        "Downloading",
        "Completed",
      ],
      default: "Generated",
    },

    totalResources: {
      type: Number,
      default: 0,
    },

    totalThreats: {
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

module.exports = mongoose.model(
  "Report",
  reportSchema
);