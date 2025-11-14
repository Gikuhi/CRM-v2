
import { AgentStatus } from "@/components/dashboard/agent-status";
import { CallOutcomes } from "@/components/dashboard/call-outcomes";
import { DailyProgress } from "@/components/dashboard/daily-progress";
import { NextDebtor } from "@/components/dashboard/next-debtor";
import { QueueProgress } from "@/components/dashboard/queue-progress";
import { UpcomingFollowUps } from "@/components/dashboard/upcoming-follow-ups";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Left Column */}
      <div className="lg:col-span-3 space-y-6">
        <DailyProgress />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CallOutcomes />
          <QueueProgress />
        </div>
        <UpcomingFollowUps />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1 space-y-6">
        <NextDebtor />
        <AgentStatus />
      </div>
    </div>
  );
}
