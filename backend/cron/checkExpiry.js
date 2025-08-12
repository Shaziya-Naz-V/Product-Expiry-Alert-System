const mongoose = require('mongoose');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return checkExpiry();
  })
  .then(() => {
    console.log('✅ Expiry check completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ DB or script error:', err);
    process.exit(1);
  });

// Send expiry alert email
const sendExpiryAlert = async (product, daysLeft) => {
  const subject = `⚠️ Expiry Alert: ${product.name}`;
  const html = `<p>The product <strong>${product.name}</strong> will expire on <strong>${new Date(product.expiryDate).toDateString()}</strong> (in ${daysLeft} days).</p>`;

  await sendEmail(subject, html);
  console.log(`📧 Alert sent for ${product.name} (in ${daysLeft} days)`);
};

// Check products and send alerts
const checkExpiry = async () => {
  const products = await Product.find();
  const today = new Date();

  for (const product of products) {
    const expiryDate = new Date(product.expiryDate);
    const timeDiff = expiryDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if ([30, 15, 7,6,5,4,3,2,1,0].includes(daysLeft)) {
      try {
        await sendExpiryAlert(product, daysLeft);
      } catch (err) {
        console.error(`❌ Failed to send alert for ${product.name}:`, err);
      }
    }
  }
};
