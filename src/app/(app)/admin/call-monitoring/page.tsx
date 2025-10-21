
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SystemWideCallMonitoringPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System-Wide Call Monitoring</h1>
       <Card>
        <CardHeader>
            <CardTitle>Live Call Center View</CardTitle>
            <CardDescription>Real-time view of all active calls and queue status across the organization.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground py-8">
                <p>Live call grid and queue monitoring will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
