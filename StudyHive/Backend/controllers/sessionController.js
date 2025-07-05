import Session from '../models/Session.js';

// ✅ Get all sessions (for admin/debugging purposes)
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error in getAllSessions:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get upcoming sessions booked by the logged-in user
export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await Session.find({
      user: userId,
      start: { $gte: new Date() }, // upcoming only
    }).sort({ start: 1 }); // sort ascending by start time

    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error in getMySessions:", err);
    res.status(500).json({ message: "Failed to fetch your sessions." });
  }
};

// ✅ Get sessions for the logged-in tutor by name
export const getSessionsByTutor = async (req, res) => {
  try {
    const firstName = req.user?.firstName || '';
    const lastName = req.user?.lastName || '';
    const tutorName = `${firstName} ${lastName}`.trim();

    if (!tutorName) {
      return res.status(400).json({ message: 'Tutor name is missing from token.' });
    }

    const sessions = await Session.find({ tutorName }).sort({ start: 1 });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error in getSessionsByTutor:", err);
    res.status(500).json({ message: err.message });
  }
};
