# RateScope — Product Brief

Status: Draft v0.2 • Last updated: 2025-09-06

## Elevator Pitch
- Turn daily buy/sell sheets into live dashboards, smart rate guidance, and automatic compliance reports. Keep the right cash, improve margins, and close the day in minutes.

## Target Users
- Owners/managers of currency exchange offices (single or multi-branch)
- Head tellers/supervisors
- Compliance officers/auditors
- Regional groups/franchises

## Problems
- No instant view of volume, margin, and cash position by currency/denomination
- Rate overrides leak margin without guardrails or audit trail
- End-of-day reconciliation is slow and error-prone
- Compliance checks (large cash, structuring, KYC gaps) are manual
- No near-term forecasts for staffing and cash logistics

## Value Proposition
- Cash clarity: live open position and low-cash alerts by currency/denomination
- Pricing control: floors/ceilings, negotiation prompts, override leakage tracking
- Faster close: automated EoD variance explanations and exportable reports
- Compliance: AML rules, override audit, KYC completeness checks
- Forecasts: demand per currency/hour; staffing and replenishment hints
- Simple start: upload existing Excel; no hardware change

## Success Metrics
- Reduce override leakage by 20–40% within 60 days
- Cut EoD closing time by 50–80%
- Keep stock-outs of popular currencies under 1% of days
- Raise realized spread by 0.1–0.3%
- >90% teller weekly active use in pilot branches

## Roadmap
### MVP (sellable in weeks)
- Import: Excel/CSV mapping wizard; remember mappings per branch
- Dashboards: today vs target (volume, margin, overrides), hourly heatmap
- Cash & Liquidity: open position by currency/denomination; low-cash alerts
- Compliance basics: large-transaction alerts, missing KYC fields, override log
- EoD: automated reconciliation (expected vs counted) + PDF/Excel export
- Roles: Owner, Manager, Teller (basic RBAC); multi-tenant from day 1

### V1
- Scorecards: branch and teller, league tables
- Rate guardrails: floors/ceilings per currency/time; override reason codes
- Forecasts: 7/30-day per currency/hour; replenishment ETA suggestions
- AML pack: structuring detection; regulator-ready exports
- Integrations: webhooks/API for accounting/ERP; WhatsApp/SMS receipt share

### V2
- Dynamic pricing engine using live demand/supply + margin targets
- Anomaly detection (rate deviations, teller outliers)
- Cash‑van scheduling and denomination-aware logistics planning
- Competitor rate ingest (optional); A/B price tests
- Group view for multi-branch treasury

## Core Capabilities (by area)
- Import: map Excel/CSV columns; persist raw file + mapping for audits
- Dashboards: volume, margin, overrides; hourly heatmap; today vs target
- Cash & Liquidity: open position by currency/denomination; alerts
- Pricing: rate guidance, floors/ceilings, negotiation prompts, override audit
- Compliance: alerts queue, cases, report generator (PDF/Excel)
- Reconciliation: expected vs counted; variance reasons; sign-off trail
- Admin: users/roles, branches, mappings, policies, integrations

## Data Model (first cut)
- Transaction: id, branch_id, teller_id, txn_datetime, currency, amount_foreign, rate_displayed, rate_applied, rate_diff, countervalue_tnd, txn_type, partner_code, denom_foreign, denom_tnd, kyc_id_type, kyc_id_number, nationality, status, created_at, updated_at
- Branch: id, name, city, timezone, opening_hours, policies_json
- User (Teller): id, branch_id, name, role, email, phone, status, created_at, last_login_at
- Policy: id, branch_id, currency, min_rate, max_rate, max_override_pct, aml_thresholds_json
- Reconciliation: id, branch_id, teller_id, business_date, expected_by_denom_json, counted_by_denom_json, variance_tnd, notes, attachments

## KPIs & Analytics
- Volume and margin by day/hour/currency/branch/teller
- Override leakage: sum of (displayed − applied) × amount, by teller/currency
- Guardrail hit rate: blocked vs allowed; average negotiated delta
- Liquidity risk: stock-outs/near-outs; denomination mismatch incidents
- Compliance: alert counts by type; time to resolution; missing-field rate
- Operations: average EoD close time; variance frequency/magnitude

## AML & Compliance Rules (starter set)
- Large transactions above configurable threshold (e.g., 10,000 TND equivalent)
- Structuring: many small transactions just under threshold in short windows
- High-risk nationality + cash patterns; repeated same-ID in 24h
- Manual overrides beyond band or without reason code
- Missing/invalid KYC fields; ID reused across many customers

## Forecasting Approach (initial)
- Seasonality with holiday calendar; per-currency/hour models
- Fallback to moving averages when data is thin
- Show confidence intervals; recommend only (no auto-execution in MVP)

## Integrations (later)
- Accounting export schema; regulator report templates
- WhatsApp/SMS for receipts and alerts
- Competitor rate sources (optional, country-specific)

## Pilot Plan
- Recruit 3–5 branches; import last 6–12 months
- Define metrics: override leakage, EoD time, stock-outs
- 4-week pilot: week 1 setup; week 2–3 run; week 4 review & sign
- Gather testimonials and case study charts

## Sales Collateral
- One-pager PDF; mini-deck (owner, pricing, compliance)
- Case study with before/after metrics
- Short video walkthrough (~3 min)

## Open Questions
- Regulatory thresholds/report templates per country
- Required KYC fields; variation by branch
- Preferred accounting systems for export
- Data retention rules by market
- Appetite for dynamic pricing vs guidance only

## Glossary
- Override leakage: margin loss from negotiated rates under policy
- Open position: net cash exposure per currency at a point in time
- Structuring: splitting large amounts into many small transactions
- Denomination-aware: tracking note sizes for real-world cash ops

© 2025 RateScope. Draft
