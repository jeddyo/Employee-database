const { Pool } = require('pg'); // PostgreSQL client
require('dotenv').config();     // Load environment variables

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Test database connection
pool.connect()
  .then(() => console.log('Connected to the database successfully.'))
  .catch(err => console.error('Database connection error:', err.message));

module.exports = pool;
