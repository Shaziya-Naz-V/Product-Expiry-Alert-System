const Product = require('../models/Product');

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
  const { name, category, expiryDate } = req.body;
  try {
    const newProduct = new Product({ name, category, expiryDate });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct };
