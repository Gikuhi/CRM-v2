
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminBillingPage() {
    const currentPlan = {
        name: "Pro Plan",
        price: "$299/month",
        renewalDate: "2024-09-15",
        usage: {
            users: "15 / 20",
            campaigns: "8 / 10",
            callsThisMonth: "12,543",
        }
    };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing & Subscription</h1>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your organization's current subscription details and usage.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-muted rounded-lg space-y-4">
                <h3 className="text-2xl font-bold text-primary">{currentPlan.name}</h3>
                <p className="text-xl font-semibold">{currentPlan.price}</p>
                <p className="text-sm text-muted-foreground">Next renewal on {currentPlan.renewalDate}</p>
                <Button>Request Plan Upgrade</Button>
            </div>
            <div className="p-6 bg-muted rounded-lg space-y-4">
                 <h3 className="font-semibold">Current Usage</h3>
                 <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>Users:</span> <strong>{currentPlan.usage.users}</strong></li>
                    <li className="flex justify-between"><span>Campaigns:</span> <strong>{currentPlan.usage.campaigns}</strong></li>
                    <li className="flex justify-between"><span>Calls This Month:</span> <strong>{currentPlan.usage.callsThisMonth}</strong></li>
                 </ul>
                 <p className="text-xs text-muted-foreground">This is a summary of your usage for the current billing cycle.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
