# Security Policy

## Supported Versions

The `main` branch of this repository receives continuous security updates and dependency scanning.

| Component | Version / Environment | Supported |
| :--- | :--- | :--- |
| Backend Express API | Node.js 20+ | ✅ Supported |
| Prisma ORM & PostgreSQL | 5.14+ / PG 16 | ✅ Supported |
| Frontend React SPA | React 18.3+ / Vite 5.2 | ✅ Supported |

## Security Best Practices Implemented

- **Helmet**: Secures HTTP headers across all API endpoints.
- **CORS Configuration**: Restricts API calls to approved domain origins.
- **Express Rate Limiting**: Global rate limiting (100 req/15 min) and strict authentication rate limiting (20 req/15 min) to prevent brute-force attacks.
- **JWT & Password Security**: Passwords salted and hashed with `bcryptjs` (cost factor 10); JWT authentication with short-lived access and refresh tokens.
- **Zod Schema Validation**: All request bodies, query params, and route parameters are validated using strict Zod schemas to prevent injection attacks.
- **Dependabot**: Automated weekly dependency scanning for npm and GitHub Actions.

## Reporting a Vulnerability

If you discover a security vulnerability in Flower Market, please do not disclose it publicly in an open GitHub issue. Instead:
1. Open a **Private Security Advisory** on GitHub under the repository's "Security" tab.
2. Or contact the lead developer at `security@flowermarket.shop`.
3. Provide detailed steps to reproduce the vulnerability. You will receive an acknowledgment within 24 hours.
