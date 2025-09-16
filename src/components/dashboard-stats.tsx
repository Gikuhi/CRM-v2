import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/data";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <p className="text-xs text-muted-foreground flex items-center">
                <span
                  className={cn(
                    "flex items-center",
                    stat.changeType === "increase"
                      ? "text-green-400"
                      : "text-red-400"
                  )}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
