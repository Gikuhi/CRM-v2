
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamPerformance } from "@/components/team-performance";
import { AgentLeaderboard } from "@/components/agent-leaderboard";

export default function SupervisorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <TeamPerformance />
        <Card>
            <CardHeader>
                <CardTitle>Live Agent Status</CardTitle>
                <CardDescription>Real-time status of agents in your team.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-8">
                    <p>A list of agents and their current status (e.g., Available, On Call, Break) will be displayed here.</p>
                </div>
            </CardContent>
        </Card>
      </div>
      <AgentLeaderboard />
    </div>
  );
}
