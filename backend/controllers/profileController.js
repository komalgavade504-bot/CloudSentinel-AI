const User = require("../models/User");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findOne()
      .select("-password")
      .sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, role, profileImage } = req.body;

    const user = await User.findOne()
      .sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    if (fullName !== undefined) {
      user.fullName = fullName;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    const updatedUser = await user.save();

    const safeUser = await User.findById(
      updatedUser._id
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};