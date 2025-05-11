// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const newProduct = await Product.create(name, price, description, imageUrl);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/search?query=...
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (query) {
    try {
      const results = await Product.search(query);
      res.json(results);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Failed to search products' });
    }
  } else {
    // If no query, return all products
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
});

module.exports = router;