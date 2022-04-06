/**
 * File schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const fileSchema = new mongoose.Schema(
  {
    files: [
      {
        file: String,
      },
    ],
    number: {
      type: String,
    },
    letter: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("file", fileSchema);
