
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettingsForm } from './profile-settings-form';
import { SecuritySettingsForm } from './security-settings-form';
import { NotificationSettingsForm } from './notification-settings-form';
import type { UserProfile, NotificationPreferences } from '@/lib/types';


type SettingsTabsProps = {
  userProfile: UserProfile | null;
  notificationPreferences: NotificationPreferences | null;
  userId?: string;
};

export function SettingsTabs({ userProfile, notificationPreferences, userId }: SettingsTabsProps) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettingsForm profile={userProfile} />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettingsForm />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationSettingsForm preferences={notificationPreferences} userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
