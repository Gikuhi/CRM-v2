
"use client"

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { systemHealthStats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SuperAdminSystemHealthPage() {
    const resourceUsageData = [
        { name: "CPU Load", usage: 58, limit: 80 },
        { name: "Memory", usage: 75, limit: 90 },
        { name: "Active Sessions", usage: 45, limit: 100 },
        { name: "DB Connections", usage: 62, limit: 85 },
    ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Health Monitoring</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Real-time status of core system components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealthStats.map(stat => (
              <div key={stat.metric} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                    <p className="font-medium flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", {
                            "bg-green-500": stat.status === "Healthy",
                            "bg-yellow-500": stat.status === "Warning",
                            "bg-red-500": stat.status === "Critical",
                        })}></div>
                        {stat.metric}
                    </p>
                    <p className="text-sm text-muted-foreground ml-5">{stat.details}</p>
                </div>
                <Badge variant="outline">{stat.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Live overview of system resource utilization.</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                }}/>
                <Legend />
                <Bar dataKey="usage" fill="hsl(var(--chart-1))" name="Usage (%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
