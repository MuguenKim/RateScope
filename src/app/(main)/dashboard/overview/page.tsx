import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartAreaInteractive } from "../default/_components/chart-area-interactive";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Volume Today</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1,842 txns</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +8.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Vs. same day last week</div>
            <div className="text-muted-foreground">Across all branches</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Margin Today</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">+0.22%</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +0.04%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Realized vs target</div>
            <div className="text-muted-foreground">Includes overrides</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Overrides</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">37</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingDown />
                -12%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Leakage improving</div>
            <div className="text-muted-foreground">Tracked with reasons</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Alerts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">5 open</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <AlertTriangle />
                AML
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">3 high, 2 medium</div>
            <div className="text-muted-foreground">Resolve in Compliance</div>
          </CardFooter>
        </Card>
      </div>

      {/* Hourly Heatmap (placeholder using existing chart) */}
      <ChartAreaInteractive />

      {/* Open Position callout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Open Position (EUR)</CardDescription>
            <CardTitle className="text-2xl font-semibold">€ 48,200</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ShieldCheck />
                Healthy
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Open Position (USD)</CardDescription>
            <CardTitle className="text-2xl font-semibold">$ 32,750</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ShieldCheck />
                Healthy
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Open Position (GBP)</CardDescription>
            <CardTitle className="text-2xl font-semibold">£ 12,100</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <AlertTriangle />
                Low cash
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
