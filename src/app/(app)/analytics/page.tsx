
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/data";
import { PerformanceOverview } from "@/components/performance-overview";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <PerformanceOverview />

       <Card>
        <CardHeader>
          <CardTitle>Call Outcomes</CardTitle>
          <CardDescription>Breakdown of your call results for the current month.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>A chart showing call outcomes (e.g., Paid, Promise, Follow-up) will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
