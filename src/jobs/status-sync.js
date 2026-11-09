// Reconciles payment statuses with the payment provider.
// Runs every minute: takes orders in pending_payment status in batches of up to 500
// and processes them in 8 parallel workers.
const pool = require('../db/pool');
const provider = require('../clients/payment-provider');

const WORKERS = 8;
const BATCH = 500;

async function syncBatch(orderIds) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const id of orderIds) {
      const status = await provider.getStatus(id); // HTTP call to the provider, ~150-300 ms
      await client.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function runOnce() {
  const { rows } = await pool.query(
    "SELECT id FROM orders WHERE status = 'pending_payment' ORDER BY id LIMIT $1", [BATCH * WORKERS],
  );
  const ids = rows.map((r) => r.id);
  const chunks = Array.from({ length: WORKERS }, (_, i) => ids.filter((_, j) => j % WORKERS === i));
  await Promise.all(chunks.filter((c) => c.length).map(syncBatch));
}

module.exports = { start: () => setInterval(runOnce, 60_000) };
