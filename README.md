# RateScope

RateScope turns daily buy/sell sheets from currency exchange offices into:
- Live dashboards for volume, margin, and open positions
- Pricing guardrails and override tracking
- Compliance alerts (large txns, structuring, missing KYC)
- Faster End-of-Day reconciliation and exportable reports

See project scope in `project.md`.

## Stack
- Next.js 15, React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- TanStack Table/Query, Zustand

## Getting started
1) Install deps: `npm install`
2) Dev server: `npm run dev`
3) Open: http://localhost:3000

## Initial screens
- Dashboard -> Overview, Transactions, Cash & Liquidity, Pricing, Compliance, Reconciliation, Admin

This is an MVP scaffold using UI placeholders and mock data.

## Auth (v1)
- Login: `http://localhost:3000/auth/v1/login`
- Register: `http://localhost:3000/auth/v1/register`

### Backend
- Implemented using Next.js Route Handlers under `src/app/api/auth/*`.
- Endpoints:
  - `POST /api/auth/register` -> body: `{ email, password }`
  - `POST /api/auth/login` -> body: `{ email, password, remember? }`
  - `POST /api/auth/logout`
- Session cookie: `auth-token` (HttpOnly, SameSite=Lax, Secure in production).

### Persistence
- File-backed storage (MVP):
  - Users: `src/data/auth/users.json`
  - Sessions: `src/data/auth/sessions.json`
- Files are created on first use; no manual setup required.

### Middleware
- Enabled via `src/middleware.ts` using `authMiddleware`:
  - Protects `/dashboard/*` when not authenticated.
  - Redirects unauthenticated users to `/auth/v1/login`.
  - Redirects authenticated users away from `/auth/v1/login` and `/auth/v1/register` to `/dashboard`.
- Matchers configured for: `/dashboard/:path*`, `/auth/v1/login`, `/auth/v1/register`.

### Using the API (quick test)
```
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}' -i

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}' -i

curl -X POST http://localhost:3000/api/auth/logout -i
```

### Frontend hookup
- The v1 Login/Register forms submit to the API routes above.
- Successful auth redirects to `/dashboard` (which internally redirects to `/dashboard/default`).
- Logout trigger is available in the sidebar user menu and calls `/api/auth/logout`.

Notes:
- This is an MVP auth layer intended for local development. Replace file-backed storage with a real database for production.
