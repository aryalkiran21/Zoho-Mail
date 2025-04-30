const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  topic: String,
  date: Date,
  duration: Number,
  meetingId: String,
  joinUrl: String,
  startUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Meeting", MeetingSchema);