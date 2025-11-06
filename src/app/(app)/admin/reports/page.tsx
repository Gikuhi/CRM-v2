"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FilePlus2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const teamPerformanceData = [
  { name: 'Alpha Team', calls: 450, collections: 12000 },
  { name: 'Bravo Team', calls: 520, collections: 15500 },
  { name: 'Charlie Team', calls: 380, collections: 9800 },
];

const agentPerformanceData = [
    { rank: 1, name: 'Peris Wanyangi', calls: 150, collections: 5200 },
    { rank: 2, name: 'John Okoro', calls: 120, collections: 4800 },
    { rank: 3, name: 'Grace Akinyi', calls: 180, collections: 6100 },
];

export default function ComprehensiveReportingCenterPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex items-center gap-2">
           <Select defaultValue="this-week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/> Export CSV</Button>
            <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/> Export PDF</Button>
        </div>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Comparison of calls made and collections achieved by each team.</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                         contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))'
                        }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="collections" fill="hsl(var(--chart-1))" name="Collections ($)" />
                    <Bar yAxisId="right" dataKey="calls" fill="hsl(var(--chart-2))" name="Calls Made" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Agent Leaderboard</CardTitle>
            <CardDescription>Top performing agents in the selected period.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground py-8">
                <p>An agent leaderboard table will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
