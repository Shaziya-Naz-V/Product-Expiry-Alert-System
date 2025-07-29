const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Loginroutes = require('./routes/loginRoutes');
const productRoutes = require('./routes/Productroutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/products', productRoutes);
app.use('/api', Loginroutes);

// DATABASE + SERVER
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
