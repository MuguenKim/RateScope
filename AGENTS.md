# Agents Guide — Repo & Project Context

This guide keeps agents aligned on the product we’re building and the way this Next.js codebase is organized. Be surgical, keep context, and follow the conventions below.

## What You’re Building (Product Context)
- Product: RateScope — dashboards, analysis, pricing guidance, and compliance for currency exchange offices
- Users: owners/managers, head tellers, multi-branch groups
- Core value: live cash visibility, pricing control, faster EoD, AML alerts, basic forecasting, performance analysis
- MVP pillars: import Excel/CSV, dashboards, cash & liquidity, compliance basics, EoD recon, RBAC
- Non-goals (MVP):  heavy ML, prediction anomaly detection.

See `project.md` for product details.

## Project Structure & Modules
- `src/app`: Next.js App Router (routes, layouts). API routes in `src/app/api/*`.
- `src/components`, `src/lib`, `src/server`, `src/stores`, `src/types`, `src/config`, `src/hooks`.
- `src/styles/presets`: theme CSS presets scanned by the generator.
- `src/data`: local JSON persistence for MVP auth (users, sessions).
- Assets: `public/` (static) and `media/` (design assets).

## Development Workflow
- `npm install`: install dependencies
- `npm run dev`: start dev server (Turbopack) at http://localhost:3000
- `npm run build` / `npm start`: production build and serve
- `npm run lint`: ESLint checks; `npm run format[:check]`: Prettier write/check
- `npm run generate:presets`: rebuilds `src/types/preferences/theme.ts` from `src/styles/presets/*.css` (labels, values, `--primary` colors). Runs in Husky pre-commit

## Conventions
- Stack: TypeScript, React 19, Next.js 15 (App Router), Tailwind CSS v4
- Formatting: Prettier (2 spaces, 120 cols, trailing commas). Tailwind classes auto-sorted via `prettier-plugin-tailwindcss`
- Linting: flat ESLint with import order, complexity, and security rules
- Filenames: kebab-case (`unicorn/filename-case`); JSX components in PascalCase (`react/jsx-pascal-case`)
- Keep modules under ~300 lines where practical (`max-lines`)
- Avoid `console.*` in production code (Next strips it; still avoid)

## Themes & Presets
- Add a theme: create `src/styles/presets/<name>.css`
- Include a `--primary` token; generator updates `src/types/preferences/theme.ts`
- Run `npm run generate:presets` after changes (or rely on pre-commit)

## Data & Auth (MVP)
- File-backed auth under `src/data/auth/*` — for development only
- Session cookie `auth-token` is HttpOnly; Secure in production builds
- Never commit secrets; use `.env.local` for machine-specific config

## API & Server Patterns
- Use App Router route handlers in `src/app/api/*`
- Prefer server actions for form submissions when feasible
- Use `NextResponse` for responses; validate all inputs and sanitize outputs
- Keep business logic in `src/server` or `src/lib`; keep route handlers thin
- Define and reuse types in `src/types`; keep schemas in one place

## UI/UX Guidelines
- Use Tailwind v4 utilities; keep semantic, accessible markup
- Components in `src/components`; separate presentation and data-fetching concerns
- Use `next/link` and `next/image`; optimize assets under `public/`
- A11y: labels for controls, keyboard navigability, focus management, color contrast

## State Management
- Prefer local component state for ephemeral UI
- Use `src/stores` for shared client state; avoid over-globalizing
- Keep derived state computed, not duplicated

## Testing
- If adding tests, use Vitest + Testing Library
- Place tests next to code as `*.spec.ts(x)` or under `__tests__/`
- Target >= 80% coverage for critical paths; keep tests fast and focused

## Performance & Accessibility
- Minimize client bundle size; push logic server-side where possible
- Use streaming/SSR for data-heavy views; memoize expensive client computations
- Optimize media; prefer `next/image` with proper sizes
- Consider accessibility at feature design time, not as an afterthought

## Commit & PR Guidelines
- Conventional Commits (e.g., `feat(auth): add login flow`, `chore: update config`)
- PRs: clear description, link issues, screenshots/GIFs for UI changes
- Before PR: run `npm run lint`, `npm run format:check`, `npm run generate:presets`; ensure Husky pre-commit passes

## Agent Operating Rules
- Be surgical: change only what’s required; keep style consistent
- Don’t add dependencies without justification; prefer existing utilities
- Respect types: update `src/types` when data shapes change; validate inputs
- Prefer App Router patterns (server actions, route handlers)
- Keep files small; extract helpers instead of growing monoliths
- Add comments only where decisions aren’t obvious; avoid noise

## Quick Commands
- Start: `npm run dev`
- Lint: `npm run lint`
- Format: `npm run format` / `npm run format:check`
- Build: `npm run build` then `npm start`
- Themes: `npm run generate:presets`

## Template
we used ready made template with lots of visualizations already created.
you will find these templates under the `src/app/components` reuse components as much a possible.

When in doubt, read `project.md` for product intent and this file for repository conventions.
