const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Profile settings
    displayName: {
      type: String,
      default: "Admin User",
    },

    email: {
      type: String,
      default: "",
    },

    // Notification settings
    emailAlerts: {
      type: Boolean,
      default: true,
    },

    threatAlerts: {
      type: Boolean,
      default: true,
    },

    scanAlerts: {
      type: Boolean,
      default: true,
    },

    reportAlerts: {
      type: Boolean,
      default: false,
    },

    // Security settings
    mfaEnabled: {
      type: Boolean,
      default: true,
    },

    loginAlerts: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
