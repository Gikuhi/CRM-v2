
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Peris W.", calls: 150, collections: 5200 },
  { name: "John O.", calls: 120, collections: 4800 },
  { name: "Grace A.", calls: 180, collections: 6100 },
  { name: "Samuel M.", calls: 140, collections: 4500 },
  { name: "Fatuma A.", calls: 130, collections: 4200 },
];

export function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Agent collections and calls this month.</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis yAxisId="left" stroke="var(--color-chart-1)" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-chart-2)" fontSize={12} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                }}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar yAxisId="left" dataKey="collections" fill="hsl(var(--chart-1))" name="Collections" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="calls" fill="hsl(var(--chart-2))" name="Calls Made" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
