
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamPerformance } from "@/components/team-performance";
import { AgentLeaderboard } from "@/components/agent-leaderboard";
import { teamMembers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
                <div className="space-y-4">
                    {teamMembers.map(agent => (
                         <div key={agent.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                            <div>
                                <p className="font-medium">{agent.name}</p>
                                <p className="text-sm text-muted-foreground">{agent.email}</p>
                            </div>
                            <Badge
                                className={cn({
                                    'bg-green-500/20 text-green-400 border-green-500/20': agent.status === 'Online',
                                    'bg-red-500/20 text-red-400 border-red-500/20': agent.status === 'Offline',
                                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/20': agent.status === 'On Call',
                                    'bg-blue-500/20 text-blue-400 border-blue-500/20': agent.status === 'Break',
                                })}
                                variant="outline"
                            >
                                {agent.status}
                            </Badge>
                         </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
      <AgentLeaderboard />
    </div>
  );
}
