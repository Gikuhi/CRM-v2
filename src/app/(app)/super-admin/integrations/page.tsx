
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Zap, Bot, Waypoints } from "lucide-react";

export default function SuperAdminIntegrationsPage() {
    const integrations = [
        { name: "Stripe", description: "Payment processing for subscriptions.", icon: <Zap className="h-6 w-6 text-primary"/> },
        { name: "Twilio", description: "SMS and Voice call gateway.", icon: <Bot className="h-6 w-6 text-primary"/> },
        { name: "SendGrid", description: "Email delivery service.", icon: <Waypoints className="h-6 w-6 text-primary"/> },
        { name: "Zapier", description: "Workflow automation.", icon: <Zap className="h-6 w-6 text-primary"/> },
    ]
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Integrations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Services</CardTitle>
          <CardDescription>Manage global API keys and service integrations for the entire platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {integrations.map(integration => (
            <Card key={integration.name}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        {integration.icon}
                        <div>
                            <CardTitle>{integration.name}</CardTitle>
                            <CardDescription>{integration.description}</CardDescription>
                        </div>
                    </div>
                    <Switch defaultChecked={integration.name === 'Stripe' || integration.name === 'Twilio'} />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor={`${integration.name}-key`}>API Key</Label>
                        <Input id={`${integration.name}-key`} type="password" placeholder="******************" defaultValue="filledin" />
                    </div>
                </CardContent>
            </Card>
          ))}
          <Button>Save All Integrations</Button>
        </CardContent>
      </Card>
    </div>
  );
}
