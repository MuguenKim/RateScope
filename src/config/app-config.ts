import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "RateScope",
  version: packageJson.version,
  copyright: `© ${currentYear}, RateScope.`,
  meta: {
    title: "RateScope — Exchange Ops & Pricing Intelligence",
    description:
      "RateScope turns daily buy/sell logs into live dashboards, cash visibility, pricing guardrails, and automated compliance & EoD reconciliation. Built on Next.js 15, Tailwind v4, and shadcn/ui.",
  },
};
