"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { agentPerformance } from "@/lib/data";
import { Crown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AgentLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Leaderboard</CardTitle>
        <CardDescription>Top performing agents this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Collections</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Calls Made</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentPerformance.map((agent, index) => (
              <TableRow key={agent.id}>
                <TableCell className="font-bold text-lg text-muted-foreground">
                    <div className="flex items-center gap-2">
                        {index === 0 && <Crown className="h-5 w-5 text-accent-warning" />}
                        <span>{agent.rank}</span>
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={agent.avatarUrl} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{agent.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${agent.collections.toLocaleString()}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right">{agent.callsMade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
