const express = require('express');
const router = express.Router();
const Login = require('../models/Login');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
