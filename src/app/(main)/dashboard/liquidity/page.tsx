import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { currency: "EUR", notes: { 50: 320, 20: 480, 10: 600 }, total: 48200, status: "ok" },
  { currency: "USD", notes: { 100: 180, 20: 200, 10: 300 }, total: 32750, status: "ok" },
  { currency: "GBP", notes: { 50: 90, 20: 100, 10: 110 }, total: 12100, status: "low" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.map((row) => (
          <Card key={row.currency}>
            <CardHeader>
              <CardDescription>Open Position ({row.currency})</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {row.currency} {new Intl.NumberFormat().format(row.total)}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead>Denominations</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.currency}>
                <TableCell>{row.currency}</TableCell>
                <TableCell className="text-muted-foreground">
                  {Object.entries(row.notes)
                    .map(([k, v]) => `${k}×${v}`)
                    .join(" · ")}
                </TableCell>
                <TableCell className="text-right tabular-nums">{new Intl.NumberFormat().format(row.total)}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "low" ? "destructive" : "outline"}>
                    {row.status === "low" ? "Low" : "OK"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
