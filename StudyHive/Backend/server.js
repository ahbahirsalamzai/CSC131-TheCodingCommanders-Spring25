require("dotenv").config();
console.log("✅ DEBUG: MONGODB_URI =", process.env.MONGODB_URI);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/otp', require('./routes/otpRoutes'));

app.get("/", (req, res) => {
  res.send("📚 StudyHive Backend is Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
