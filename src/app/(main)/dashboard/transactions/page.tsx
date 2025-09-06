"use client";

import * as React from "react";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { transactionColumns } from "./_components/columns";
import { transactions } from "./_components/data";

export default function Page() {
  const columns = withDndColumn(transactionColumns);
  const table = useDataTableInstance({ data: transactions, columns, getRowId: (row) => row.id });

  return (
    <Tabs defaultValue="table" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="branch-selector" className="sr-only">
            Branch
          </Label>
          <Select defaultValue="all">
            <SelectTrigger className="w-36" size="sm" id="branch-selector">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="tunis">Tunis Centre</SelectItem>
              <SelectItem value="lac2">Lac 2</SelectItem>
              <SelectItem value="marsa">La Marsa</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="currency-selector" className="sr-only">
            Currency
          </Label>
          <Select defaultValue="all">
            <SelectTrigger className="w-28" size="sm" id="currency-selector">
              <SelectValue placeholder="CCY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsList>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            Export CSV
          </Button>
        </div>
      </div>
      <TabsContent value="table" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="export" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
