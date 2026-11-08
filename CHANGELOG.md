# Changelog

## 1.9.1

- Fixed rounding of the discounted order total (cents were lost)

## 1.9.0

- Pool connection acquire timeout reduced from 10 to 5 seconds: a request fails fast instead of hanging
- Pool size unchanged (`max` 20)

## 1.8.0

- Logs are JSON, one line per event
- `request_id` field in every request log line

## 1.7.0

- orders-service moved from the legacy monorepo to its own repository; earlier history (up to v1.6.x) stays in the monorepo
- Orders API: `GET /api/v1/orders/:id`, `POST /api/v1/orders`
- Payment provider client
- orders-db connection pool: `max` 20, `connectionTimeoutMillis` 10000
