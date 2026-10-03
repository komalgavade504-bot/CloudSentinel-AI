const Settings = require("../models/Settings");
const User = require("../models/User");

// Get settings
const getSettings = async (req, res) => {
  try {
    const user = await User.findOne().sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let settings = await Settings.findOne({
      userId: user._id,
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await Settings.create({
        userId: user._id,
        displayName: user.fullName,
        email: user.email,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update settings
const updateSettings = async (req, res) => {
  try {
    const user = await User.findOne().sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const allowedFields = [
      "displayName",
      "email",
      "emailAlerts",
      "threatAlerts",
      "scanAlerts",
      "reportAlerts",
      "mfaEnabled",
      "loginAlerts",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const settings = await Settings.findOneAndUpdate(
      { userId: user._id },
      updateData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // Keep profile name/email synchronized with User
    if (req.body.displayName !== undefined) {
      user.fullName = req.body.displayName;
    }

    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
