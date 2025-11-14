
"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agentStats } from "@/lib/data";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--muted))"];

export function QueueProgress() {
  const { completed, total } = agentStats.queueProgress;
  const data = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: total - completed },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Queue Progress</CardTitle>
        <CardDescription>
          {completed} of {total} leads contacted today.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={90}
              endAngle={450}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold fill-foreground"
            >
              {`${((completed / total) * 100).toFixed(0)}%`}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
