const express = require('express');
const orders = require('./routes/orders');
const { log } = require('./log');

const app = express();
app.use(express.json());
app.use('/api/v1/orders', orders);
app.get('/healthz', (_req, res) => res.send('ok'));

require('./jobs/status-sync').start();

app.listen(process.env.PORT || 8080, () => log('info', 'orders-service started'));
