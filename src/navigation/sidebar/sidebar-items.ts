import {
  ReceiptText,
  Users,
  Fingerprint,
  LayoutDashboard,
  Banknote,
  Gauge,
  ClipboardList,
  Upload,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "RateScope",
    items: [
      { title: "Overview", url: "/dashboard/overview", icon: LayoutDashboard },
      { title: "Transactions", url: "/dashboard/transactions", icon: ReceiptText },
      { title: "Cash & Liquidity", url: "/dashboard/liquidity", icon: Banknote },
      { title: "Pricing", url: "/dashboard/pricing", icon: Gauge },
      { title: "Compliance", url: "/dashboard/compliance", icon: Fingerprint },
      { title: "Reconciliation", url: "/dashboard/reconciliation", icon: ClipboardList },
      { title: "Import", url: "/dashboard/import", icon: Upload },
      { title: "Admin", url: "/dashboard/admin", icon: Users },
    ],
  },
  {
    id: 2,
    label: "Account",
    items: [
      {
        title: "Authentication",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Login v1", url: "/auth/v1/login", newTab: true },
          { title: "Login v2", url: "/auth/v2/login", newTab: true },
          { title: "Register v1", url: "/auth/v1/register", newTab: true },
          { title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
      { title: "Settings", url: "/dashboard/admin", icon: Settings },
    ],
  },
];
