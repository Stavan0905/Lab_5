const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔍 Get all products (sorted by sortOrder)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ sortOrder: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ➕ Add new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 🔄 Full update (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// ✏️ Partial update (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to patch product' });
  }
});

// ❌ Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
