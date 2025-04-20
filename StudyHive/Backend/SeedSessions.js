// SeedSessions.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Session from './models/Session.js'; // Adjust path if needed

// Seed data
const seedData = [
  {
    student: 'Jane Doe',
    subject: 'Math',
    date: 'April 15, 2025',
    time: '10:00 AM - 11:00 AM',
  },
  {
    student: 'John Smith',
    subject: 'Science',
    date: 'April 16, 2025',
    time: '1:00 PM - 2:00 PM',
  },
  {
    student: 'Emily Lee',
    subject: 'History',
    date: 'April 17, 2025',
    time: '9:00 AM - 10:00 AM',
  },
  {
    student: 'Manuel',
    subject: 'History',
    date: 'April 01, 2025',
    time: '9:00 AM - 10:00 AM',
  },
  {
    student: 'Diego',
    subject: 'Gneder Studies',
    date: 'April 02, 2025',
    time: '9:00 AM - 10:00 AM',
  },
  {
    student: 'Alejadro',
    subject: 'Gneder Studies',
    date: 'April 19, 2025',
    time: '9:00 AM - 10:00 AM',
  },
  {
    student: 'Joe',
    subject: 'Gneder Studies',
    date: 'April 04, 2025',
    time: '9:00 AM - 10:00 AM',
  },
];

const seedSessions = async () => {
  try {
    console.log('🔥 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('🧹 Deleting old sessions...');
    await Session.deleteMany({});

    console.log('🌱 Inserting new sessions...');
    const result = await Session.insertMany(seedData);
    console.log(`✅ ${result.length} session(s) seeded.`);
    console.log("📦 Inserted sessions:", result);

    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedSessions();
