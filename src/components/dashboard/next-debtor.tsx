
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { agentStats } from "@/lib/data";

export function NextDebtor() {
  const nextDebtor = agentStats.nextDebtor;

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
        <Button className="w-full">
          <Phone className="mr-2 h-4 w-4" /> Call Now
        </Button>
      </CardFooter>
    </Card>
  );
}
