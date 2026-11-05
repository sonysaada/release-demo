const { Pool } = require('pg');

// One pool per process, shared by HTTP requests and background jobs.
const pool = new Pool({
  host: process.env.DB_HOST || 'orders-db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;
