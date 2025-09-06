"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schemaFields = [
  { value: "date", label: "Date" },
  { value: "currencyPair", label: "Currency Pair" },
  { value: "buyRate", label: "Buy Rate" },
  { value: "sellRate", label: "Sell Rate" },
  { value: "branch", label: "Branch" },
];

export function FileUploadWizard() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const text = await file.text();
    const firstLine = text.split(/\r?\n/)[0];
    const cols = firstLine.split(",").map((c) => c.trim());
    setHeaders(cols);
  };

  const handleMapChange = (header: string, field: string) => {
    setMapping((prev) => ({ ...prev, [header]: field }));
  };

  const handleSubmit = () => {
    console.log("File mapping", { fileName, mapping });
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      {headers.length > 0 && (
        <div className="space-y-2">
          {headers.map((h) => (
            <div key={h} className="flex items-center gap-2">
              <span className="w-1/3 text-sm">{h}</span>
              <Select value={mapping[h] ?? ""} onValueChange={(v) => handleMapChange(h, v)}>
                <SelectTrigger className="w-2/3">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {schemaFields.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button className="mt-4" onClick={handleSubmit}>
            Save Mapping
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploadWizard;
