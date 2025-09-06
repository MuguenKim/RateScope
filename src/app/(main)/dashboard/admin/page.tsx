import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tiles = [
  { title: "Users & Roles", desc: "Invite tellers and managers" },
  { title: "Branches", desc: "Manage locations and hours" },
  { title: "Policies", desc: "Rate floors, ceilings, overrides" },
  { title: "Mappings", desc: "Import column mappings" },
  { title: "Integrations", desc: "Accounting, exports, webhooks" },
];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tiles.map((t) => (
        <Card key={t.title} className="hover:bg-muted/50 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">{t.title}</CardTitle>
            <CardDescription>{t.desc}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
