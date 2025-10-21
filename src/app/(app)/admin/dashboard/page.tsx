
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, Phone, BarChart3, ShieldCheck } from "lucide-react";

const AdminStatCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: React.ElementType, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export default function SystemOverviewDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Overview Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard title="Total Users" value="152" icon={Users} description="3 Admins, 10 Supervisors, 139 Agents" />
        <AdminStatCard title="Active Calls" value="42" icon={Phone} description="Across all teams" />
        <AdminStatCard title="System Performance" value="99.8%" icon={BarChart3} description="Uptime over last 24h" />
        <AdminStatCard title="System Health" value="Healthy" icon={ShieldCheck} description="No active alerts" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>A log of recent important system events and alerts.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>System activity feed will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
