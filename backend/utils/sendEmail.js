const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,  // Change to your alert recipient if needed
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
