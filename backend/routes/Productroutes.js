const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const today = new Date();

    const updatedProducts = products.map(product => {
      const expiry = new Date(product.expiryDate);
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      let status = '';
      if (diffDays < 0) status = 'Expired';
      else if (diffDays <= 7) status = 'Expiring Soon';
      else status = 'Active';

      return {
        ...product._doc,
        status,
      };
    });

    res.json(updatedProducts);
  } catch (err) {
    console.error('Error in GET /products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.json(saved);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/stats', async (req, res) => {
  try {
    const products = await Product.find();
    const today = new Date();

    let total = products.length;
    let expired = 0;
    let expiring = 0;
    let active = 0;

    products.forEach(product => {
      const expiry = new Date(product.expiryDate);
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) expired++;
      else if (diffDays <= 7) expiring++;
      else active++;
    });

    res.json({ total, expired, expiring, active });
  } catch (err) {
    console.error('Error in /products/stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
