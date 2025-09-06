import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  txn_datetime: z.string(), // ISO or display string
  branch: z.string(),
  teller: z.string(),
  currency: z.string(),
  amount_foreign: z.number(),
  rate_displayed: z.number(),
  rate_applied: z.number(),
  countervalue_tnd: z.number(),
  txn_type: z.enum(["buy", "sell"]),
  override: z.boolean(),
});

export type Transaction = z.infer<typeof transactionSchema>;
