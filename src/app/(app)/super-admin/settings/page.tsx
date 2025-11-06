
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SuperAdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global System Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="data">Data Retention</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Defaults</CardTitle>
              <CardDescription>Set default configurations for the entire platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Platform Name</Label>
                <Input id="app-name" defaultValue="CollectPro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Default Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@collectpro.com" />
              </div>
              <Button>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Enable or disable major features for all organizations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="qa-module">Quality Assurance Module</Label>
                <Switch id="qa-module" defaultChecked />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="ai-module">AI Dialer & Insights</Label>
                <Switch id="ai-module" defaultChecked />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="billing-module">Billing & Subscriptions</Label>
                <Switch id="billing-module" />
              </div>
              <Button>Save Feature Flags</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Data Retention</CardTitle>
              <CardDescription>Set default data retention rules. Organizations can override if permitted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="retention-period">Default Call Recording Retention (days)</Label>
                <Input id="retention-period" type="number" defaultValue="180" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="audit-log-retention">Audit Log Retention (days)</Label>
                <Input id="audit-log-retention" type="number" defaultValue="365" />
              </div>
              <Button>Save Data Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
