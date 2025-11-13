
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
import { Input } from '../ui/input';

type AgentSettingsTabsProps = {
  userProfile: UserProfile | null;
  notificationPreferences: NotificationPreferences | null;
  userId?: string;
};

function DialerPreferences() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dialer Preferences</CardTitle>
                <CardDescription>Customize your dialing experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="dial-mode">Default Dial Mode</Label>
                    <Select defaultValue="manual">
                        <SelectTrigger id="dial-mode">
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="preview">Preview</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="wrap-up-timeout">Wrap-up Timeout (seconds)</Label>
                    <Input id="wrap-up-timeout" type="number" defaultValue={15} />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="sound-alerts" className="text-base">Sound Alerts</Label>
                    <Switch id="sound-alerts" defaultChecked/>
                </div>
                <Button>Save Dialer Preferences</Button>
            </CardContent>
        </Card>
    )
}

export function AgentSettingsTabs({ userProfile, notificationPreferences, userId }: AgentSettingsTabsProps) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="dialer">Dialer</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettingsForm profile={userProfile} />
      </TabsContent>
      <TabsContent value="dialer">
        <DialerPreferences />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationSettingsForm preferences={notificationPreferences} userId={userId} />
      </TabsContent>
       <TabsContent value="security">
        <SecuritySettingsForm />
      </TabsContent>
    </Tabs>
  );
}
