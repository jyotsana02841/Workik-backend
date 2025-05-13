// backend/database/db.js
require("dotenv").config({ path: ".env.local" });
const { Pool } = require("pg");
const url = require("url");

const dbUrl = new URL(process.env.DATABASE_URL);
const user = dbUrl.username;
const password = dbUrl.password;
const host = dbUrl.hostname;
const port = dbUrl.port;
const database = dbUrl.pathname.substring(1);
const searchParams = new URLSearchParams(dbUrl.search);
const sslmode = searchParams.get("sslmode");

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
  ssl: sslmode === "require" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
