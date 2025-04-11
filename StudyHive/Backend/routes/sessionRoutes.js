const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// GET /api/sessions/popularity
router.get("/popularity", async (req, res) => {
  try {
    const popularity = await Session.aggregate([
      {
        $group: {
          _id: "$subject",
          sessionCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          sessions: "$sessionCount",
        },
      },
      { $sort: { sessions: -1 } }, // Most popular first
    ]);

    res.json(popularity);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subject popularity" });
  }
});

module.exports = router;
