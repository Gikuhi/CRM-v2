
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings & Configuration</h1>
      
      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data Retention</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input id="app-name" defaultValue="CollectPro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input id="logo" type="file" />
                <p className="text-sm text-muted-foreground">Upload a new logo (PNG, JPG, SVG).</p>
              </div>
              <Button>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & API Keys</CardTitle>
              <CardDescription>Configure third-party services.</CardDescription>
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

        <TabsContent value="data" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>Set rules for how long data is stored in the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="retention-period">Call Recording Retention (days)</Label>
                <Input id="retention-period" type="number" defaultValue="90" />
              </div>
              <Button>Save Data Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="mt-4">
             <div className="text-center text-muted-foreground py-8">
                <p>Other general system settings will be displayed here.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
