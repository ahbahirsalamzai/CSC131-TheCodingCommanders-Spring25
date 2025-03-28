const nodemailer = require("nodemailer");

let transporter;

async function setupTransporter() {
  if (!transporter) {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("🧪 Ethereal test account created:");
    console.log("   User:", testAccount.user);
    console.log("   Pass:", testAccount.pass);
  }

  return transporter;
}

async function sendOTPEmail(to, otp) {
  const transporter = await setupTransporter();

  const mailOptions = {
    from: `"StudyHive" <no-reply@studyhive.com>`,
    to,
    subject: "StudyHive OTP Verification",
    html: `
      <h1>Your OTP Code</h1>
      <p>Use the following OTP to verify your account:</p>
      <h2>${otp}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("📨 Preview URL:", nodemailer.getTestMessageUrl(info));
}

module.exports = sendOTPEmail;
