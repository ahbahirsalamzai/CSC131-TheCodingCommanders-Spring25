import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//  Import route files
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ADDED THIS LINE

const app = express();
const PORT = process.env.PORT || 3001;

//  Warn if email config is missing
if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ WARNING: Missing email SMTP configuration in .env!");
}

//  Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

//  Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

//  Mount API routes
app.use('/api/test', testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes); //  

//  Serve frontend (for production build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Frontend/studyhive/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/studyhive/build/index.html"));
});

//  Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
