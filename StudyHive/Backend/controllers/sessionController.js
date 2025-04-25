import Session from '../models/Session.js';

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessionsByTutor = async (req, res) => {
  try {
    const tutorName = req.user.name; // Assuming you store tutorName during login/session
    const sessions = await Session.find({ tutorName });

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
