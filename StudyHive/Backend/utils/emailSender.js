// Backend/utils/emailSender.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: `"StudyHive" <${process.env.EMAIL_USER}>`,
    to,
    subject: "StudyHive OTP Verification",
    html: `
      <h1>Your OTP Code</h1>
      <p>Use the following OTP to verify your account:</p>
      <h2>${otp}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPEmail;
