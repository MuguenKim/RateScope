export type Branch = {
  id: string;
  name: string;
  city?: string;
  timezone?: string;
};

export type User = {
  id: string;
  branch_id: string;
  name: string;
  role: "owner" | "manager" | "teller" | "admin";
  email?: string;
  phone?: string;
  status?: "active" | "inactive";
};

export type Policy = {
  id: string;
  branch_id: string;
  currency: string;
  min_rate: number;
  max_rate: number;
  max_override_pct: number;
};

export type Reconciliation = {
  id: string;
  branch_id: string;
  teller_id: string;
  business_date: string; // YYYY-MM-DD
  expected_by_denom_json: Record<string, number>;
  counted_by_denom_json: Record<string, number>;
  variance_tnd: number;
  notes?: string;
};
