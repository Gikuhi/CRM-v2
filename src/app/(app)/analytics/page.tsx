
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { agentPerformance, dashboardStats, performanceData } from "@/lib/data";
import { TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const dailyTarget = {
    calls: { current: 68, target: 100 },
    collections: { current: 2350, target: 4000 },
    successRate: { current: 12, target: 15 },
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Daily Targets</CardTitle>
          <CardDescription>Your progress towards today's goals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Calls Made</span>
              <span className="text-sm text-muted-foreground">{dailyTarget.calls.current} / {dailyTarget.calls.target}</span>
            </div>
            <Progress value={(dailyTarget.calls.current / dailyTarget.calls.target) * 100} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Collections ($)</span>
              <span className="text-sm text-muted-foreground">${dailyTarget.collections.current} / ${dailyTarget.collections.target}</span>
            </div>
            <Progress value={(dailyTarget.collections.current / dailyTarget.collections.target) * 100} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Success Rate (%)</span>
              <span className="text-sm text-muted-foreground">{dailyTarget.successRate.current}% / {dailyTarget.successRate.target}%</span>
            </div>
            <Progress value={(dailyTarget.successRate.current / dailyTarget.successRate.target) * 100} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
