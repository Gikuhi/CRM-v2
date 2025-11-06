
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SuperAdminSecurityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Security Management</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Password & Session Policy</CardTitle>
            <CardDescription>Enforce security policies for all users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="min-length">Minimum Password Length</Label>
              <Input id="min-length" type="number" defaultValue="12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Enforce 2FA</FormLabel>
                    <p className="text-sm text-muted-foreground">
                        Require Two-Factor Authentication for all users.
                    </p>
                </div>
                <Switch defaultChecked />
            </div>
            <Button>Save Policy</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>IP Whitelisting</CardTitle>
            <CardDescription>Restrict access to specified IP addresses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable IP Whitelisting</FormLabel>
                </div>
                <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip-addresses">Whitelisted IP Addresses</Label>
              <Textarea id="ip-addresses" placeholder="Enter one IP address per line..." rows={5} />
            </div>
            <Button>Save IP List</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dummy FormLabel component to avoid error
const FormLabel = ({ children, ...props }: React.ComponentProps<"label">) => (
    <label {...props}>{children}</label>
)
