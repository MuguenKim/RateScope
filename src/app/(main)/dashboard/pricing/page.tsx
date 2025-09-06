import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const policies = [
  { currency: "EUR", min_rate: 3.3, max_rate: 3.38, max_override_pct: 0.5 },
  { currency: "USD", min_rate: 3.02, max_rate: 3.08, max_override_pct: 0.4 },
  { currency: "GBP", min_rate: 3.9, max_rate: 4.02, max_override_pct: 0.3 },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card>
        <CardHeader>
          <CardDescription>Rate Guardrails</CardDescription>
          <CardTitle className="text-xl">Floors, ceilings, and override policy</CardTitle>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead className="text-right">Floor</TableHead>
              <TableHead className="text-right">Ceiling</TableHead>
              <TableHead className="text-right">Max Override</TableHead>
              <TableHead>Policy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((p) => (
              <TableRow key={p.currency}>
                <TableCell>{p.currency}</TableCell>
                <TableCell className="text-right tabular-nums">{p.min_rate.toFixed(3)}</TableCell>
                <TableCell className="text-right tabular-nums">{p.max_rate.toFixed(3)}</TableCell>
                <TableCell className="text-right tabular-nums">{p.max_override_pct.toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge variant="outline">Active</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
