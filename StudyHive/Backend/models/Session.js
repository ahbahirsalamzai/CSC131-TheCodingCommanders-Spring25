import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  student: String,
  subject: String,
  date: String,
  time: String,
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

export default Session;
