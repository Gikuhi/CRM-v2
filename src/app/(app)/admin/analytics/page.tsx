
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";

const teamPerformanceData = [
  { name: 'Alpha Team', collections: 45000, csat: 85, aht: 320, color: "hsl(var(--chart-1))" },
  { name: 'Bravo Team', collections: 52000, csat: 92, aht: 280, color: "hsl(var(--chart-2))" },
  { name: 'Charlie Team', collections: 38000, csat: 88, aht: 350, color: "hsl(var(--chart-3))" },
  { name: 'Delta Team', collections: 48000, csat: 90, aht: 300, color: "hsl(var(--chart-4))" },
];

const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
]

export default function CrossTeamAnalyticsPage() {
  const [metric, setMetric] = React.useState('collections');

  const metricConfig = {
    collections: { label: 'Total Collections (KES)', formatter: (value: number) => `KES ${value.toLocaleString()}` },
    csat: { label: 'Customer Satisfaction (CSAT %)', formatter: (value: number) => `${value}%` },
    aht: { label: 'Average Handle Time (secs)', formatter: (value: number) => `${value}s` },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cross-Team Analytics</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Team Performance Comparison</CardTitle>
                <CardDescription>Analyze and compare key performance indicators across all teams.</CardDescription>
            </div>
            <div className="w-[180px]">
                <Select value={metric} onValueChange={setMetric}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Metric" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="collections">Collections</SelectItem>
                        <SelectItem value="csat">CSAT</SelectItem>
                        <SelectItem value="aht">Avg. Handle Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => metricConfig[metric as keyof typeof metricConfig].formatter(value as number)} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))'
                        }}
                         formatter={(value) => [metricConfig[metric as keyof typeof metricConfig].formatter(value as number), metricConfig[metric as keyof typeof metricConfig].label]}
                    />
                    <Legend />
                    <Bar dataKey={metric} name={metricConfig[metric as keyof typeof metricConfig].label}>
                        {teamPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
