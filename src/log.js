// Structured logs: one JSON line per event, with request_id.
exports.log = (level, msg, fields = {}) =>
  console.log(JSON.stringify({ ts: new Date().toISOString(), level, msg, ...fields }));
