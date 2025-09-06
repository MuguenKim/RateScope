# RateScope — Project Guideline

> One‑word app name: **RateScope** 

## 1) Vision & Elevator Pitch
- **Vision:** Turn raw exchange logs into cash, compliance, and pricing intelligence for every exchange office.
- **Pitch (≤15s):** *RateScope turns your daily buy/sell sheet into live dashboards, smart rate guidance, and automatic compliance reports—so you keep the right cash, make better margins, and close the day in minutes.*

## 2) Who It’s For
- Owners / managers of currency exchange offices (single or multi‑branch).
- Head tellers / supervisors.
- Compliance officers / auditors (internal or external).
- Regional groups/franchises operating many branches.

## 3) Core Problems We Solve
- No instant view of **volume, margin, and cash position** by currency & denomination.
- **Rate overrides** leak margin with no audit trail or guardrails.
- **EoD reconciliation** is slow and error‑prone.
- Compliance checks (large cash, structuring, KYC gaps) are manual.
- No short‑term **forecasts** for staffing and cash logistics.

## 4) Value Proposition (What They Get)
- **Cash clarity:** live open position & low‑cash alerts by currency/denomination.
- **Pricing control:** rate floors/ceilings + negotiation prompts; track override leakage.
- **Faster close:** automated EoD variance explanations & exportable reports.
- **Compliance peace of mind:** AML rules, rate‑override audit, KYC completeness.
- **Forecasts:** tomorrow’s demand per currency/hour; staffing & replenishment hints.
- **Simple start:** upload existing Excel; no hardware change.

## 5) Outcomes / Success Metrics
- Reduce override leakage by **20–40%** within 60 days.
- Cut end‑of‑day closing time by **50–80%**.
- Keep **stock‑outs** of popular currencies under **1%** of days.
- Raise realized spread by **0.1–0.3%** (depending on policy).
- Reach weekly active use by **>90%** of tellers in pilot branches.

## 6) Product Scope by Phase
### MVP (sellable in weeks)
- **Import:** Excel/CSV mapping wizard (remember mappings per branch). 
- **Dashboards:** today vs target (volume, margin, overrides), hourly heatmap.
- **Cash & Liquidity:** open position by currency & denomination; low‑cash alerts.
- **Compliance basics:** large-transaction alerts, missing KYC fields, override log.
- **EoD:** auto reconciliation report (expected vs counted) + PDF/Excel export.
- **User roles:** Owner, Manager, Teller (basic RBAC). Multi‑tenant from day 1.

### V1
- **Branch & teller scorecards**, league tables.
- **Rate guardrails:** configurable floors/ceilings per currency/time; override reason codes.
- **Forecasts:** 7/30‑day per currency/hour; replenishment ETA suggestions.
- **AML pack:** structuring detection, daily/weekly regulator-ready exports.
- **Webhooks/API** for accounting/ERP; WhatsApp/SMS receipt share.

### V2
- **Dynamic pricing engine** using live demand/supply + margin targets.
- **Anomaly detection** (sudden rate deviations, teller outliers).
- **Cash‑van scheduling** & denom‑aware logistics planning.
- **Competitor rate ingest** (optional sources), A/B price tests.
- **Multi‑currency treasury view** for groups/franchises.

## 7) Data Model (first cut)
**Transaction**  
`id, branch_id, teller_id, txn_datetime, currency, amount_foreign, rate_displayed, rate_applied, rate_diff, countervalue_tnd, txn_type, partner_code, denom_foreign, denom_tnd, kyc_id_type, kyc_id_number, nationality, status, created_at, updated_at`

**Branch**  
`id, name, city, timezone, opening_hours, policies_json`

**Teller (User)**  
`id, branch_id, name, role, email, phone, status, created_at, last_login_at`

**Policy**  
`id, branch_id, currency, min_rate, max_rate, max_override_pct, aml_thresholds_json`

**Reconciliation**  
`id, branch_id, teller_id, business_date, expected_by_denom_json, counted_by_denom_json, variance_tnd, notes, attachments`

> Map 1:1 from your Excel columns during import; store raw file + mapping for audits.

## 8) KPIs & Analytics
- **Volume & margin:** by day/hour/currency/branch/teller.
- **Override leakage:** sum of (displayed – applied) × amount, per teller/currency.
- **Hit rate of guardrails:** attempts blocked vs allowed; average negotiated delta.
- **Liquidity risk:** days with stock‑outs or near‑outs; denom mismatch incidents.
- **Compliance:** #alerts by type; time‑to‑resolution; missing‑field rate.
- **Ops:** average EoD close time; variance frequency & magnitude.

## 9) AML & Compliance Rules (starter set)
- Transactions ≥ configurable threshold (e.g., 10,000 TND eq.).
- **Structuring:** many small txns just under threshold in short windows.
- High‑risk nationality + cash combo; repeated same‑ID in 24h.
- **Manual overrides** beyond allowed band or without reason code.
- Missing or invalid KYC fields; ID reused across many customers.

## 10) Pricing (draft)
- **Starter:** 1–2 branches, up to 5 tellers — flat monthly.
- **Growth:** up to 10 branches — per‑branch + discounted teller add‑ons.
- **Group:** enterprise pricing w/ custom AML packs and SSO.
- Add‑ons: competitor‑rate ingest, API + accounting package, advanced AML.

## 11) Architecture (lean)
- **Frontend:** Next.js (React + Tailwind) built directly from the starter now in the repository root, shadcn/ui, TanStack Query.
- **Backend:** FastAPI (Python) or Node (NestJS). 
- **DB:** PostgreSQL (Supabase/Neon). Time‑series via indexed tables.
- **Auth:** JWT + RBAC; optional SSO (OIDC) at V1+.
- **Storage:** S3‑compatible for raw Excel & exports.
- **Jobs:** Celery/HTMX tasks / BullMQ for imports, forecasts, reports.
- **Infra:** Docker; deploy on Fly.io/Render/Vercel + RDS/Neon; Terraform later.
- **Observability:** OpenTelemetry traces + structured logs per tenant.
- **Multi‑tenancy:** schema-per-tenant or row‑level with tenant_id (prefer RLS).

## 12) Security & Privacy
- Row‑level security by tenant & role.
- All PII encrypted at rest; KMS‑managed keys.
- Audit log for all data changes & overrides.
- Backups: daily full + WAL; 35‑day retention; quarterly restore test.
- Data residency notes if required by regulator.

## 13) UX Principles
- **Owner view first:** “today vs target” at top; deep‑dive in 1–2 clicks.
- **Denomination‑aware** components (chips for 5/10/20/etc.).
- **Fast import:** drag‑drop → preview → map columns → save mapping.
- **Explainability:** every alert or guardrail shows *why* and *what to do*.
- **Offline‑friendly** teller view (optional PWA later).

## 14) Key Screens (no art, just scope)
- **Overview:** KPIs, hourly heatmap, open position by currency, alerts.
- **Transactions:** filterable table; diff badge; export.
- **Cash & Liquidity:** by currency/denom; low‑cash forecast; replenishment plan.
- **Pricing:** rate floors/ceilings; suggested rate; override policy; logs.
- **Compliance:** alerts queue, cases, report generator (PDF/Excel).
- **Reconciliation:** expected vs counted; variance reasons; sign‑off trail.
- **Admin:** users/roles, branches, mappings, policies, integrations.

## 15) Forecasting Approach (initial)
- STL/Prophet‑style seasonality + holiday calendar (local + tourism peaks).
- Per‑currency/hour model; fallback to moving averages when data is thin.
- Confidence intervals shown; never auto‑execute—**recommend** only (MVP).

## 16) Integrations (later)
- Accounting (export schema), regulator report templates.
- WhatsApp/SMS for digital receipts and alerts.
- Competitor rates scrapers/APIs (optional, country‑specific).

## 17) Pilot Plan
- Recruit **3–5 branches** (varied size). Import the last 6–12 months.
- Define 3 metrics to move: override leakage, EoD time, stock‑outs.
- 4‑week pilot: week 1 setup; week 2–3 run; week 4 review & sign.
- Gather testimonials + case study charts for sales kit.

## 18) Sales Collateral Checklist
- 1‑pager PDF (problem → solution → outcomes → screenshots).
- 3 slide mini‑deck (owner, pricing, compliance stories).
- Case study with before/after metrics.
- Short video walkthrough (≤3 min).

## 19) Open Questions
- Regulatory thresholds & reporting templates per country?
- Required KYC fields per office; variation by branch?
- Preferred accounting system(s) for export?
- Data retention rules by market? 
- Appetite for dynamic pricing vs guidance only?

## 20) Glossary
- **Override leakage:** margin loss from negotiated rates under policy.
- **Open position:** net cash exposure per currency at a point in time.
- **Structuring:** splitting large amounts into many small transactions.
- **Denomination‑aware:** tracking note sizes for real‑world cash ops.

---

© 2025 RateScope. Draft v0.1
