const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// GET /api/sessions/availability — fetch all sessions
router.get("/availability", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// POST /api/sessions/availability — create tutor availability
router.post("/availability", async (req, res) => {
  const { tutorName, start, end, notes } = req.body;

  if (!tutorName || !start || !end) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const session = new Session({ tutorName, start, end, notes }); // ✅ includes notes
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to create session" });
  }
});

// PATCH /api/sessions/book/:id — book a session as a student
router.patch("/book/:id", async (req, res) => {
  const { studentName } = req.body;
  const { id } = req.params;

  try {
    const session = await Session.findById(id);
    if (!session || session.bookedBy) {
      return res.status(400).json({ error: "Session not available" });
    }

    session.bookedBy = studentName;
    await session.save();
    res.json({ message: "Session booked", session });
  } catch {
    res.status(500).json({ error: "Booking failed" });
  }
});

// DELETE /api/sessions/:id — cancel/delete a session
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json({ message: "Session canceled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel session" });
  }
});

module.exports = router;
