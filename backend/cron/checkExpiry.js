const mongoose = require('mongoose');
const Product = require('../models/Product');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  checkExpiry().then(() => {
    console.log('✅ Expiry check completed');
    process.exit(); // Exit after check
  });
}).catch((err) => {
  console.error('❌ DB error:', err);
  process.exit(1);
});

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,          // e.g., your Gmail ID
    pass: process.env.ADMIN_APP_PASSWORD,   // Gmail App Password (not your Gmail password)
  },
});

// Send Email Function
// const sendExpiryAlert = async (product, daysLeft) => {
//   const mailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: process.env.ADMIN_EMAIL,
//     subject: `⚠️ Expiry Alert: ${product.name}`,
//     text: `The product "${product.name}" will expire on ${new Date(product.expiryDate).toDateString()} (in ${daysLeft} days).`,
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`📧 Alert sent for ${product.name} (in ${daysLeft} days)`);
// };


// Send Email Function using sendEmail helper
const sendExpiryAlert = async (product, daysLeft) => {
  const subject = `⚠️ Expiry Alert: ${product.name}`;
  const html = `<p>The product <strong>${product.name}</strong> will expire on <strong>${new Date(product.expiryDate).toDateString()}</strong> (in ${daysLeft} days).</p>`;

  await sendEmail(subject, html);
  console.log(`📧 Alert sent for ${product.name} (in ${daysLeft} days)`);
};

// Main Logic
const checkExpiry = async () => {
  const products = await Product.find();
  const today = new Date();

  for (const product of products) {
    const expiryDate = new Date(product.expiryDate);
    const timeDiff = expiryDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if ([30, 15, 7,0].includes(daysLeft)) {
      await sendExpiryAlert(product, daysLeft);
    }
  }
};
