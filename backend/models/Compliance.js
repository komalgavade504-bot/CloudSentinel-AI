const mongoose = require("mongoose");

const complianceSchema = new mongoose.Schema(
  {
    framework: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Compliant", "Needs Review", "In Progress"],
      default: "Needs Review",
    },

    controls: {
      type: Number,
      default: 0,
    },

    passedControls: {
      type: Number,
      default: 0,
    },

    lastAudit: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Compliance",
  complianceSchema
);