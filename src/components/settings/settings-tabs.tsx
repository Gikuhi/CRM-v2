'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettingsForm } from './profile-settings-form';
import { SecuritySettingsForm } from './security-settings-form';
import { NotificationSettingsForm } from './notification-settings-form';
import type { UserProfile, NotificationPreferences } from '@/lib/types';
import { useAuth } from '@/firebase';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type SettingsTabsProps = {
  userProfile: UserProfile | null;
  notificationPreferences: NotificationPreferences | null;
  userId?: string;
};

export function SettingsTabs({ userProfile, notificationPreferences, userId }: SettingsTabsProps) {
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/login');
    }

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
      <div className="mt-6 flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    </Tabs>
  );
}
