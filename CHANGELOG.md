# Changelog

## 1.7.0

- orders-service moved from the legacy monorepo to its own repository; earlier history (up to v1.6.x) stays in the monorepo
- Orders API: `GET /api/v1/orders/:id`, `POST /api/v1/orders`
- Payment provider client
- orders-db connection pool: `max` 20, `connectionTimeoutMillis` 10000
