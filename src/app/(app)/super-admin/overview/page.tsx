
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { systemHealthStats, superAdminOverviewStats, recentSuperAdminActivities } from "@/lib/data";
import { ArrowUp, Server, Users, DollarSign, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuperAdminOverviewPage() {
  const iconMap = {
    "Total Organizations": Users,
    "Total Users": Users,
    "Active Campaigns": Activity,
    "Total Revenue": DollarSign,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Super Admin Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {superAdminOverviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {iconMap[stat.title as keyof typeof iconMap] && 
                React.createElement(iconMap[stat.title as keyof typeof iconMap], { className: "h-4 w-4 text-muted-foreground" })}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <span
                  className={cn(
                    "flex items-center",
                    stat.changeType === "increase"
                      ? "text-accent-success"
                      : "text-accent-danger"
                  )}
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time status of system resources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealthStats.map(stat => (
              <div key={stat.metric} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", {
                        "bg-green-500": stat.status === "Healthy",
                        "bg-yellow-500": stat.status === "Warning",
                        "bg-red-500": stat.status === "Critical",
                    })}></div>
                    <div>
                        <p className="font-medium">{stat.metric}</p>
                        <p className="text-sm text-muted-foreground">{stat.details}</p>
                    </div>
                </div>
                <Badge variant="outline">{stat.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent super admin actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden sm:table-cell">User</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSuperAdminActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{activity.user}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{activity.user}</TableCell>
                    <TableCell className="text-right">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
