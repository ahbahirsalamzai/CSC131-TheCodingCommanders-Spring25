import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await mongoose.connection.db.collection('users').find().toArray();
    res.json({
      database: mongoose.connection.db.databaseName,
      collection: 'users',
      count: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
