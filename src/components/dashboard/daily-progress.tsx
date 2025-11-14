
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DailyProgress() {
  const dailyTarget = {
    calls: { current: 68, target: 100 },
    collections: { current: 2350, target: 4000 },
    successRate: { current: 12, target: 15 },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Progress</CardTitle>
        <CardDescription>Your performance towards today's goals.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Calls Made</span>
            <span className="text-sm text-muted-foreground">
              {dailyTarget.calls.current} / {dailyTarget.calls.target}
            </span>
          </div>
          <Progress
            value={(dailyTarget.calls.current / dailyTarget.calls.target) * 100}
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Collections</span>
            <span className="text-sm text-muted-foreground">
              ${dailyTarget.collections.current.toLocaleString()} / $
              {dailyTarget.collections.target.toLocaleString()}
            </span>
          </div>
          <Progress
            value={
              (dailyTarget.collections.current /
                dailyTarget.collections.target) *
              100
            }
          />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm text-muted-foreground">
              {dailyTarget.successRate.current}% /{" "}
              {dailyTarget.successRate.target}%
            </span>
          </div>
          <Progress
            value={
              (dailyTarget.successRate.current /
                dailyTarget.successRate.target) *
              100
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
