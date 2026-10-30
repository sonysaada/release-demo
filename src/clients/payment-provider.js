// Payment provider client (simplified).
exports.getStatus = async (orderId) => {
  const r = await fetch(`https://payments.example.com/v2/orders/${orderId}/status`);
  return (await r.json()).status;
};
