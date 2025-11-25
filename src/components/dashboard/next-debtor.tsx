
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Loader2 } from "lucide-react";
import { agentStats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCall } from "@/context/CallProvider";

export function NextDebtor() {
  const nextDebtor = agentStats.nextDebtor;
  const { startCall, callStatus } = useCall();

  const handleCallClick = () => {
    if (callStatus === "idle") {
      startCall(nextDebtor);
    }
  };

  const getButtonContent = () => {
    switch (callStatus) {
      case "dialing":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Dialing...
          </>
        );
      case "active":
        return (
          <>
            <PhoneOff className="mr-2 h-4 w-4" />
            End Call
          </>
        );
      case "idle":
      default:
        return (
          <>
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Lead</CardTitle>
        <CardDescription>Your next debtor to contact.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-lg font-bold text-primary">{nextDebtor.name}</p>
          <p className="text-sm text-muted-foreground">
            Account: {nextDebtor.account}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-2xl font-bold">
            KES {nextDebtor.balance.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            "w-full",
            callStatus === "active" && "bg-destructive hover:bg-destructive/90"
          )}
          onClick={handleCallClick}
          disabled={callStatus === "dialing" || callStatus === "active"}
        >
          {getButtonContent()}
        </Button>
      </CardFooter>
    </Card>
  );
}
