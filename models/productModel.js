// backend/models/productModel.js
const pool = require('../database/db');

class Product {
  static async create(name, price, description, imageUrl) {
    const query = `
      INSERT INTO products (name, price, description, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, price, description, imageUrl];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM products;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async search(searchTerm) {
    const query = `
      SELECT * FROM products
      WHERE LOWER(name) LIKE $1 OR LOWER(description) LIKE $1;
    `;
    const values = [`%${searchTerm.toLowerCase()}%`];
    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = Product;