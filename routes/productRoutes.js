const express = require("express");
const router = express.Router(); // **Create an Express router instance**
const pool = require("../database/db"); // Assuming your db.js is in the parent directory

// Define your POST route for /api/products here
router.post("/", async (req, res) => {
  try {
    console.log("Received product data:", req.body);
    const { name, description, price } = req.body;

    const result = await pool.query(
      "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );

    console.log("Product inserted successfully:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// You can add other product-related routes here (GET, PUT, DELETE, etc.)

module.exports = router; // **Export the router**
