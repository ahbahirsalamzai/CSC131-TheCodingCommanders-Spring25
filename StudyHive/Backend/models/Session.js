import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  tutorName: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  subject: { type: String },
  bookedBy: { type: String, default: null },
  student: { type: String, default: null },
  date: { type: String, default: null },
  time: { type: String, default: null },

  // ✅ New field: associate session with user who booked it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

export default Session;
