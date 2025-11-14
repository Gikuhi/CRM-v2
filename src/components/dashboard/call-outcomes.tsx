
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agentStats } from "@/lib/data";

export function CallOutcomes() {
  const outcomes = agentStats.callOutcomes;
  const totalCalls = Object.values(outcomes).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Call Outcomes</CardTitle>
        <CardDescription>A summary of your call dispositions today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-3xl font-bold">{outcomes.rpc}</p>
            <p className="text-sm text-muted-foreground">RPC</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-3xl font-bold">{outcomes.noAnswer}</p>
            <p className="text-sm text-muted-foreground">No Answer</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-3xl font-bold">{outcomes.voicemail}</p>
            <p className="text-sm text-muted-foreground">Voicemail</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-3xl font-bold">{outcomes.wrongNumber}</p>
            <p className="text-sm text-muted-foreground">Wrong Number</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
