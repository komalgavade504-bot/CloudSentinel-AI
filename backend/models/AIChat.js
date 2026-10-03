const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    user: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AIChat", aiChatSchema);