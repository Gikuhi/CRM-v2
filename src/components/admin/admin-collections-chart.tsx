
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminCollectionsData } from "@/lib/data";

export function AdminCollectionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Collections Overview</CardTitle>
        <CardDescription>Total collections from different periods.</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adminCollectionsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickFormatter={(value) => `$${new Intl.NumberFormat('en-US').format(value)}`}
            />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                }}
                formatter={(value: number) => [`$${new Intl.NumberFormat('en-US').format(value)}`, 'Collections']}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey="amount" fill="hsl(var(--chart-1))" name="Collections" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
