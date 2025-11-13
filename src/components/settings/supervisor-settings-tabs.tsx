
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettingsForm } from './profile-settings-form';
import { SecuritySettingsForm } from './security-settings-form';
import { NotificationSettingsForm } from './notification-settings-form';
import type { UserProfile, NotificationPreferences } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

type SupervisorSettingsTabsProps = {
  userProfile: UserProfile | null;
  notificationPreferences: NotificationPreferences | null;
  userId?: string;
};


function TeamPreferences() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Preferences</CardTitle>
                <CardDescription>Manage settings for your team's workflow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="team-dial-mode">Default Team Dial Mode</Label>
                    <Select defaultValue="preview">
                        <SelectTrigger id="team-dial-mode">
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="preview">Preview</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="call-monitoring" className="text-base">Call Monitoring</Label>
                    <Switch id="call-monitoring" defaultChecked/>
                </div>
                <Button>Save Team Preferences</Button>
            </CardContent>
        </Card>
    )
}

function PerformanceSettings() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Set defaults for performance dashboards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="dashboard-filter">Default Dashboard Filter</Label>
                    <Select defaultValue="weekly">
                        <SelectTrigger id="dashboard-filter">
                            <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button>Save Performance Settings</Button>
            </CardContent>
        </Card>
    )
}


export function SupervisorSettingsTabs({ userProfile, notificationPreferences, userId }: SupervisorSettingsTabsProps) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettingsForm profile={userProfile} />
      </TabsContent>
      <TabsContent value="team">
        <TeamPreferences />
      </TabsContent>
      <TabsContent value="performance">
       <PerformanceSettings />
      </TabsContent>
       <TabsContent value="security">
        <SecuritySettingsForm />
      </TabsContent>
    </Tabs>
  );
}
