import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const alerts = [
  { id: "A-2001", type: "Large Transaction", severity: "high", txn: "TXN-1007", time: "11:12" },
  { id: "A-2002", type: "Structuring", severity: "high", txn: "TXN-1003", time: "09:32" },
  { id: "A-2003", type: "Missing KYC", severity: "medium", txn: "TXN-1001", time: "09:05" },
  { id: "A-2004", type: "Override Out of Band", severity: "medium", txn: "TXN-1010", time: "12:20" },
  { id: "A-2005", type: "Repeated ID", severity: "low", txn: "TXN-1008", time: "11:35" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card>
        <CardHeader>
          <CardDescription>Compliance</CardDescription>
          <CardTitle className="text-xl">Alerts queue and case triage</CardTitle>
        </CardHeader>
      </Card>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Txn</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-mono">{a.id}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>
                  <Badge variant={a.severity === "high" ? "destructive" : "outline"} className="capitalize">
                    {a.severity}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{a.txn}</TableCell>
                <TableCell>{a.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
