
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Mic, VolumeX, Loader2 } from "lucide-react";
import { mockLiveCalls as initialLiveCalls } from "@/lib/data";
import type { LiveCall } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SystemWideCallMonitoringPage() {
  const [liveCalls, setLiveCalls] = React.useState<LiveCall[]>(initialLiveCalls);

  // Simulate time progression for call durations
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveCalls(currentCalls => 
        currentCalls.map(call => {
          if (call.status === 'In Progress') {
            const parts = call.duration.split(':').map(Number);
            const totalSeconds = parts[0] * 60 + parts[1] + 1;
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            return { ...call, duration: `${minutes}:${seconds}` };
          }
          return call;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System-Wide Call Monitoring</h1>
      <Card>
        <CardHeader>
          <CardTitle>Live Call Center View</CardTitle>
          <CardDescription>Real-time view of all active calls across the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Debtor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liveCalls.map(call => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.agentName}</TableCell>
                  <TableCell>{call.teamName}</TableCell>
                  <TableCell>{call.debtorName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                        call.status === 'In Progress' && "text-green-500 border-green-500/50",
                        call.status === 'Ringing' && "text-yellow-500 border-yellow-500/50 animate-pulse"
                    )}>
                        {call.status === 'Ringing' && <Loader2 className="mr-2 h-3 w-3 animate-spin"/>}
                        {call.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="outline" size="sm"><Headphones className="mr-2 h-4 w-4"/>Listen</Button>
                    <Button variant="outline" size="sm"><Mic className="mr-2 h-4 w-4"/>Whisper</Button>
                    <Button variant="destructive" size="sm"><VolumeX className="mr-2 h-4 w-4"/>Barge In</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
