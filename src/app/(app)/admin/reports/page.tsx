
"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const teamPerformanceData = [
  { name: 'Alpha Team', calls: 450, collections: 12000 },
  { name: 'Bravo Team', calls: 520, collections: 15500 },
  { name: 'Charlie Team', calls: 380, collections: 9800 },
];

const agentPerformanceData = [
    { rank: 1, name: 'Peris Wanyangi', team: 'Alpha Team', calls: 150, collections: 5200 },
    { rank: 2, name: 'Grace Akinyi', team: 'Bravo Team', calls: 180, collections: 6100 },
    { rank: 3, name: 'John Okoro', team: 'Alpha Team', calls: 120, collections: 4800 },
    { rank: 4, name: 'Samuel Mwangi', team: 'Bravo Team', calls: 110, collections: 4100 },
    { rank: 5, name: 'Fatuma Ali', team: 'Bravo Team', calls: 90, collections: 3500 },
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
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" tickFormatter={(value) => `$${value/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">Collections</TableHead>
                        <TableHead className="text-right">Calls Made</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agentPerformanceData.map(agent => (
                        <TableRow key={agent.rank}>
                            <TableCell className="font-bold">{agent.rank}</TableCell>
                            <TableCell>{agent.name}</TableCell>
                            <TableCell>{agent.team}</TableCell>
                            <TableCell className="text-right">${agent.collections.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{agent.calls}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
