
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { adminCallStats } from "@/lib/data";
import { Phone, PhoneIncoming, PhoneOff } from "lucide-react";

export function AdminCallStats() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Call Performance</CardTitle>
            <CardDescription>Summary of call activities over different periods.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
            {adminCallStats.map((stat) => (
                <div key={stat.period} className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold text-accent mb-4">{stat.period}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">{stat.callsMade.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Calls Made</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <PhoneIncoming className="h-6 w-6 text-green-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{stat.callsAnswered.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Calls Answered</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <PhoneOff className="h-6 w-6 text-destructive mx-auto mb-2" />
                            <p className="text-2xl font-bold">{stat.callsCancelled.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Calls Cancelled</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
    </Card>
  );
}
