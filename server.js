// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const productRoutes = require("./routes/productRoutes");
// const { Pool } = require("pg"); // Import the pg Pool
// require("dotenv").config({ path: ".env.local" }); // Load .env.local  **Add this line**

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // **Add this:** Connect to the database using environment variables
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Test the database connection
// pool
//   .connect()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection error:", err));

// app.use("/api/products", productRoutes);

// // In your productRoutes.js

// router.post("/", async (req, res) => {
//   try {
//     console.log("Received product data:", req.body); // Log the incoming data
//     const { name, description, price } = req.body;

//     // Example database query (adjust based on your schema)
//     const result = await pool.query(
//       "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
//       [name, description, price]
//     );

//     console.log("Product inserted successfully:", result.rows[0]);
//     res.status(201).json(result.rows[0]); // Respond with the newly created product
//   } catch (error) {
//     console.error("Error creating product:", error); // Log the error on the server
//     res.status(500).json({ error: "Failed to create product" }); // Send an error response to the client
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Import the router
const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// **Mount the productRoutes on the /api/products path**
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});