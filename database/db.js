// backend/database/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "J5y14o18t2i.",
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;



