import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); 

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false, // use true if using port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// OTP email sender function
async function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: `"StudyHive Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "StudyHive OTP Verification",
    html: `
      <h1>Your OTP Code</h1>
      <p>Use the following OTP to verify your account:</p>
      <h2>${otp}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err.message);
    throw err;
  }
}

export default sendOTPEmail;
