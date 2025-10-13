
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export default function SettingsPage() {

  const handleSaveChanges = () => {
    // In a real app, you would handle form submission here
    toast({
        title: "Settings Saved",
        description: "Your changes have been successfully saved.",
    });
  }


  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                 <Avatar className="w-20 h-20">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Update your profile picture.</p>
                     <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                    </Button>
                  </div>
            </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Agent Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="agent.smith@collectpro.com" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Update your password and manage account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
      </Card>
      
      {/* Notification Settings */}
       <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity and updates.
              </p>
            </div>
            <Switch
              defaultChecked
              aria-label="Toggle email notifications"
            />
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get push notifications on your devices for important alerts.
              </p>
            </div>
            <Switch
              aria-label="Toggle push notifications"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="destructive" onClick={() => toast({variant: "destructive", title: "Action Required", description: "Account deletion initiated."})}>Delete Account</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>

    </div>
  );
}
