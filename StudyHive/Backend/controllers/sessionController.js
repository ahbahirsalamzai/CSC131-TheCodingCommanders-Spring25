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
    const firstName = req.user?.firstName || '';
    const lastName = req.user?.lastName || '';
    const tutorName = `${firstName} ${lastName}`.trim();

    if (!tutorName || tutorName === '') {
      return res.status(400).json({ message: 'Tutor name is missing from token.' });
    }

    const sessions = await Session.find({ tutorName });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
