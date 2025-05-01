import express from 'express';
import Session from '../models/Session.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();

// GET /api/sessions - Fetch all sessions (requires auth)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// GET /api/sessions/availability - Fetch available sessions (auth required)
router.get('/availability', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api/sessions/availability - Tutor posts availability
router.post('/availability', authenticateToken, authorizeRoles('tutor'), async (req, res) => {
  const { start, end, subject } = req.body;
  const tutorName = `${req.user.firstName} ${req.user.lastName}`.trim();

  if (!start || !end) {
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

// PATCH /api/sessions/book/:id - Student books or unbooks a session
router.patch('/book/:id', authenticateToken, authorizeRoles('student'), async (req, res) => {
  const { studentName, cancel } = req.body;
  const { id } = req.params;

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    if (cancel) {
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

// DELETE /api/sessions/:id - Tutor/Admin deletes session
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'tutor'), async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findByIdAndDelete(id);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    res.status(200).json({ message: 'Session canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel session' });
  }
});

export default router;
