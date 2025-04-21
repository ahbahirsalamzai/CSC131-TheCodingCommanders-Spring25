import express from 'express';
import { getAllSessions } from '../controllers/sessionController.js';
import Session from '../models/Session.js';

const router = express.Router();

// GET /api/sessions - Fetch all sessions (controller-based)
router.get('/', getAllSessions);

// GET /api/sessions/availability - Fetch all session availability
router.get('/availability', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api/sessions/availability - Create tutor availability
router.post('/availability', async (req, res) => {
  const { tutorName, start, end, subject } = req.body;

  if (!tutorName || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const session = new Session({ tutorName, start, end, subject });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// PATCH /api/sessions/book/:id - Book or unbook a session
router.patch('/book/:id', async (req, res) => {
  const { studentName } = req.body;
  const { id } = req.params;

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    if (!studentName && session.bookedBy) {
      session.bookedBy = null;
      await session.save();
      return res.json({ message: 'Session unbooked', session });
    }

    if (session.bookedBy && session.bookedBy !== studentName) {
      return res.status(400).json({ error: 'Session is already booked' });
    }

    session.bookedBy = studentName;
    await session.save();
    res.json({ message: 'Session booked', session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// DELETE /api/sessions/:id - Permanently delete a session
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(200).json({ message: 'Session canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel session' });
  }
});

export default router;
