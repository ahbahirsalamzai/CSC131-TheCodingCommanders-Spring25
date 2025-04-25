// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

// Print EMAIL config (to debug)
console.log("EMAIL CONFIG:", process.env.EMAIL_HOST, process.env.EMAIL_PORT);

const app = express();
const PORT = process.env.PORT || 3001;

// Check if email environment variables are missing
if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ WARNING: Missing email SMTP configuration in .env!");
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

// Serve frontend build (ES module-compatible __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Frontend/studyhive/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/studyhive/build/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
