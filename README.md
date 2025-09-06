# RateScope

RateScope turns daily buy/sell sheets from currency exchange offices into:
- Live dashboards for volume, margin, and open positions
- Pricing guardrails and override tracking
- Compliance alerts (large txns, structuring, missing KYC)
- Faster End‑of‑Day reconciliation and exportable reports

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
- Dashboard → Overview, Transactions, Cash & Liquidity, Pricing, Compliance, Reconciliation, Admin

This is an MVP scaffold using UI placeholders and mock data. Back‑end, auth, imports, and persistence will follow next.
