
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FilePlus2 } from "lucide-react";
import { PerformanceOverview } from "@/components/performance-overview";
import { AgentLeaderboard } from "@/components/agent-leaderboard";

export default function SuperAdminReportsPage() {
  const prebuiltReports = [
      { name: "All Organizations Performance", description: "Comparative metrics for all organizations." },
      { name: "Agent Performance Global Leaderboard", description: "Top agents across the entire platform." },
      { name: "Billing and Revenue Summary", description: "Monthly and annual revenue breakdown." },
      { name: "System Usage Report", description: "Call volumes, user activity, and campaign stats." },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Global Reports & Analytics</h2>
          <p className="text-muted-foreground">Aggregated metrics and downloadable reports for all organizations.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4"/>
            Create Custom Report
          </Button>
        </div>
      </div>
      
      <PerformanceOverview />
      <AgentLeaderboard />

      <Card>
        <CardHeader>
            <CardTitle>Pre-built Global Reports</CardTitle>
            <CardDescription>Download platform-wide reports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {prebuiltReports.map(report => (
            <Card key={report.name}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <p className="font-semibold">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
