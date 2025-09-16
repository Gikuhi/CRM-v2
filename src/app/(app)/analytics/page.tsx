import { DashboardStats } from "@/components/dashboard-stats";
import { AgentLeaderboard } from "@/components/agent-leaderboard";
import { CollectionFunnel } from "@/components/collection-funnel";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AgentLeaderboard />
        </div>
        <div className="lg:col-span-1">
          <CollectionFunnel />
        </div>
      </div>
    </div>
  );
}
