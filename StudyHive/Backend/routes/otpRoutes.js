const express = require('express');
const nodemailer = require('nodemailer');
const OTP = require('../models/otpModel');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: testAccount.user,
      to: email,
      subject: 'Your OTP Code (Test)',
      text: `Your OTP code is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);

    const otpRecord = new OTP({
      email,
      otp,
      expiresAt: Date.now() + 600000,
    });

    await otpRecord.save(); // ✅ save first

    res.status(200).json({
      message: 'OTP sent (TEST)',
      previewURL: nodemailer.getTestMessageUrl(info),
    });

  } catch (error) {
    console.error("OTP SEND ERROR:", error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

module.exports = router;
