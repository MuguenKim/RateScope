import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const expected = [
  { denom: 50, expected: 320, counted: 318 },
  { denom: 20, expected: 480, counted: 480 },
  { denom: 10, expected: 600, counted: 598 },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card>
        <CardHeader>
          <CardDescription>End of Day</CardDescription>
          <CardTitle className="text-xl">Reconciliation — EUR drawer</CardTitle>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Denomination</TableHead>
              <TableHead className="text-right">Expected</TableHead>
              <TableHead className="text-right">Counted</TableHead>
              <TableHead className="text-right">Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expected.map((r) => {
              const variance = r.counted - r.expected;
              return (
                <TableRow key={r.denom}>
                  <TableCell>€ {r.denom}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.expected}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.counted}</TableCell>
                  <TableCell className={`text-right tabular-nums ${variance !== 0 ? "text-red-500" : ""}`}>
                    {variance}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
