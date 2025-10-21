
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CrossTeamAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cross-Team Analytics</h1>
      <Card>
        <CardHeader>
            <CardTitle>Team Performance Comparison</CardTitle>
            <CardDescription>Analyze and compare key performance indicators across all teams.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground py-8">
                <p>Team comparison charts and metrics will be displayed here.</p>
                <p className="text-sm">Including CSAT, AHT, FCR, NPS, and call volume.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

