
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { AgentStatusMenu } from "@/components/agent-status-menu";

export function AgentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Status</CardTitle>
        <CardDescription>Your current availability and actions.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full gap-4">
        <Badge variant="default" className="text-lg px-4 py-2">
          Available
        </Badge>
        <p className="text-muted-foreground text-sm">Working Time: 04:32:10</p>
        <AgentStatusMenu />
        <Button variant="outline" size="sm">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </CardContent>
    </Card>
  );
}
