
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Manage your organization's basic details and defaults.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="CollectPro Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                 <Input id="timezone" defaultValue="Africa/Nairobi" />
              </div>
              <Button>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize the look and feel of the application for your organization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Organization Logo</Label>
                <Input id="logo" type="file" />
                <p className="text-sm text-muted-foreground">Upload a new logo (PNG, JPG, SVG).</p>
              </div>
              <Button>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Hours & Statuses</CardTitle>
              <CardDescription>Define working hours and custom call statuses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                <Label htmlFor="working-hours">Working Hours</Label>
                <Input id="working-hours" defaultValue="Mon-Fri, 8:00 AM - 6:00 PM" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="break-duration">Default Break Duration (minutes)</Label>
                <Input id="break-duration" type="number" defaultValue="15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-statuses">Custom Statuses</Label>
                <Textarea id="custom-statuses" placeholder="Enter one status per line, e.g., 'Follow-up Required'" defaultValue="Follow-up Required\nInterested - Send Info\nWrong Number"/>
                <p className="text-sm text-muted-foreground">These statuses will be available for agents to use during call wrap-up.</p>
              </div>
              <Button>Save Operational Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & API Keys</CardTitle>
              <CardDescription>Configure third-party services for your organization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-key">SMTP Server</Label>
                <Input id="smtp-key" placeholder="smtp.example.com" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="sms-key">SMS Gateway API Key</Label>
                <Input id="sms-key" type="password" placeholder="**************" />
              </div>
              <Button>Save Integrations</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
