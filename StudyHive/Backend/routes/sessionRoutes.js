import express from 'express';
import Session from '../models/Session.js';
import authenticateToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleAuth.js';
import {
  getAllSessions,
  getSessionsByTutor,
  getMySessions,
} from '../controllers/sessionController.js';

const router = express.Router();

// GET /api/sessions - All sessions (admin/debug)
router.get('/', authenticateToken, getAllSessions);

// GET /api/sessions/my-sessions - Sessions booked by current user
router.get('/my-sessions', authenticateToken, getMySessions);

// GET /api/sessions/availability - All available sessions (any user)
router.get('/availability', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api/sessions/availability - Tutor posts availability
router.post(
  '/availability',
  authenticateToken,
  authorizeRoles('tutor'),
  async (req, res) => {
    const { start, end, subject } = req.body;
    const tutorName = `${req.user.firstName} ${req.user.lastName}`;

    if (!start || !end) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const session = new Session({
        tutorName,
        start,
        end,
        subject,
      });

      await session.save();
      res.status(201).json(session);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create session' });
    }
  }
);

// PATCH /api/sessions/book/:id - Book or unbook a session (students only)
router.patch(
  '/book/:id',
  authenticateToken,
  authorizeRoles('student'),
  async (req, res) => {
    const { studentName, cancel } = req.body;
    const { id } = req.params;

    try {
      const session = await Session.findById(id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      // ✅ Cancel logic: only the same user who booked it can cancel
      if (cancel) {
        if (!session.user || session.user.toString() !== req.user.id) {
          return res.status(403).json({ error: 'Unauthorized to cancel this session' });
        }

        session.bookedBy = null;
        session.student = null;
        session.user = null;
        await session.save();

        return res.json({ message: 'Session unbooked', session });
      }

      // ✅ Prevent booking if already taken by someone else
      if (session.user && session.user.toString() !== req.user.id) {
        return res.status(400).json({ error: 'Session already booked by someone else' });
      }

      // ✅ Book session
      session.bookedBy = studentName;
      session.student = studentName;
      session.user = req.user.id;
      await session.save();

      res.json({ message: 'Session booked', session });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  }
);

// DELETE /api/sessions/:id - Tutor/Admin deletes a session
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'tutor'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const session = await Session.findByIdAndDelete(id);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      res.status(200).json({ message: 'Session canceled successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to cancel session' });
    }
  }
);

export default router;
