import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { transactionSchema } from "./schema";

function formatNumber(n: number, fraction = 2) {
  return new Intl.NumberFormat(undefined, { minimumFractionDigits: fraction, maximumFractionDigits: fraction }).format(
    n,
  );
}

export const transactionColumns: ColumnDef<z.infer<typeof transactionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "txn_datetime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date/Time" />,
    cell: ({ row }) => new Date(row.original.txn_datetime).toLocaleString(),
  },
  {
    accessorKey: "branch",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Branch" />,
  },
  {
    accessorKey: "teller",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teller" />,
  },
  {
    accessorKey: "txn_type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 capitalize">
        {row.original.txn_type}
      </Badge>
    ),
  },
  {
    accessorKey: "currency",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CCY" />,
  },
  {
    accessorKey: "amount_foreign",
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Amount" />,
    cell: ({ row }) => <div className="text-right tabular-nums">{formatNumber(row.original.amount_foreign)}</div>,
  },
  {
    accessorKey: "rate_displayed",
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Rate (Disp)" />,
    cell: ({ row }) => <div className="text-right tabular-nums">{formatNumber(row.original.rate_displayed, 3)}</div>,
  },
  {
    accessorKey: "rate_applied",
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Rate (Appl)" />,
    cell: ({ row }) => <div className="text-right tabular-nums">{formatNumber(row.original.rate_applied, 3)}</div>,
  },
  {
    id: "delta",
    header: () => <div className="text-right">Diff</div>,
    cell: ({ row }) => {
      const diff =
        (row.original.rate_applied - row.original.rate_displayed) * (row.original.txn_type === "buy" ? -1 : 1);
      const isLeak = diff < 0;
      return (
        <div className="text-right">
          <Badge variant={isLeak ? "destructive" : "outline"} className="font-mono">
            {isLeak ? "-" : "+"}
            {formatNumber(Math.abs(diff), 3)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "countervalue_tnd",
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Countervalue (TND)" />,
    cell: ({ row }) => <div className="text-right tabular-nums">{formatNumber(row.original.countervalue_tnd)}</div>,
  },
  {
    accessorKey: "override",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Override" />,
    cell: ({ row }) => (
      <Badge variant={row.original.override ? "destructive" : "outline"}>{row.original.override ? "Yes" : "No"}</Badge>
    ),
  },
];
