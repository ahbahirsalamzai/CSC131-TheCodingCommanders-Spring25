const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  tutorName: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  subject: { type: String },
  bookedBy: { type: String, default: null },
});

module.exports = mongoose.model("Session", sessionSchema);
