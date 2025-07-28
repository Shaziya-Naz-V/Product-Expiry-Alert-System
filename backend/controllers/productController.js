// const Product = require('../models/Product');

// // GET all products
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST a product
// const addProduct = async (req, res) => {
//   const { name, category, expiryDate } = req.body;
//   try {
//     const newProduct = new Product({ name, category, expiryDate });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// module.exports = { getProducts, addProduct };
const Product = require('../models/Product');

// Helper to get status
const getStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return 'Expired';
  if (diffDays <= 7) return 'Expiring Soon';
  return 'Safe';
};

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a product
const addProduct = async (req, res) => {
  const { name, category, expiryDate, quantity } = req.body;

  const status = getStatus(expiryDate);

  try {
    const newProduct = new Product({ name, category, expiryDate, quantity, status });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct };
