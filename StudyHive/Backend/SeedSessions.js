// SeedSessions.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Session from './models/Session.js';

// Helper to convert date and time string into start and end Date objects
const parseDateTime = (dateStr, timeRange) => {
  const [startTimeStr, endTimeStr] = timeRange.split(' - ');
  const start = new Date(`${dateStr} ${startTimeStr}`);
  const end = new Date(`${dateStr} ${endTimeStr}`);
  return { start, end };
};

// Updated seed data with new names and subjects
const rawSeedData = [
  { student: 'Ava Patel', subject: 'Computer Science', date: 'April 20, 2025', time: '10:00 AM - 11:00 AM' },
  { student: 'Liam Nguyen', subject: 'Biology', date: 'April 21, 2025', time: '1:00 PM - 2:00 PM' },
  { student: 'Noah Kim', subject: 'Economics', date: 'April 22, 2025', time: '2:30 PM - 3:30 PM' },
  { student: 'Sofia Garcia', subject: 'Chemistry', date: 'April 23, 2025', time: '11:00 AM - 12:00 PM' },
  { student: 'Maya Ali', subject: 'Philosophy', date: 'April 24, 2025', time: '9:00 AM - 10:00 AM' },
  { student: 'Ethan Rodriguez', subject: 'Physics', date: 'April 25, 2025', time: '12:00 PM - 1:00 PM' },
  { student: 'Zara Johnson', subject: 'Sociology', date: 'April 26, 2025', time: '3:00 PM - 4:00 PM' },
];

// Transform seed data
const seedData = rawSeedData.map(entry => {
  const { start, end } = parseDateTime(entry.date, entry.time);
  return {
    tutorName: 'Admin',
    student: entry.student,
    subject: entry.subject,
    start,
    end,
  };
});

const seedSessions = async () => {
  try {
    console.log('🔥 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('🧹 Deleting old sessions...');
    await Session.deleteMany({});

    console.log('🌱 Inserting new sessions...');
    const result = await Session.insertMany(seedData);

    console.log(`✅ ${result.length} session(s) seeded.`);
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedSessions();
