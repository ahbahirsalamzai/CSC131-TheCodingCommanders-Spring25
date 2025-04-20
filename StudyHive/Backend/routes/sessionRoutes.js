import express from 'express';
import { getAllSessions } from '../controllers/sessionController.js';

const router = express.Router();

// GET /api/sessions - Fetch all sessions
router.get('/', getAllSessions);

export default router;
