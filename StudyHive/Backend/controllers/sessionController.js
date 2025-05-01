import Session from '../models/Session.js';

export const getAllSessions = async (req, res) => { // Fetch the seesion in the data base
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessionsByTutor = async (req, res) => { //Fetch only the seesions for the logged-in tutor
  try {
    const tutorName = req.user.name; // Assuming you store tutorName during login/session
    const sessions = await Session.find({ tutorName });

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
