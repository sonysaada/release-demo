const router = require('express').Router();
const pool = require('../db/pool');

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  if (!rows.length) return res.status(404).end();
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { items, discountPercent = 0 } = req.body;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.round(subtotal * (100 - discountPercent)) / 100;
  const { rows } = await pool.query(
    'INSERT INTO orders (items, total, status) VALUES ($1, $2, $3) RETURNING id',
    [JSON.stringify(items), total, 'pending_payment'],
  );
  res.status(201).json({ id: rows[0].id, total });
});

module.exports = router;
