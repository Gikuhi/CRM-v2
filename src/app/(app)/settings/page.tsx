
'use client';
import { useMemo } from 'react';
import { doc } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { SettingsTabs } from '@/components/settings/settings-tabs';
import { AdminSettings } from '@/components/settings/admin-settings';
import { SupervisorSettingsTabs } from '@/components/settings/supervisor-settings-tabs';
import { AgentSettingsTabs } from '@/components/settings/agent-settings-tabs';
import { SuperAdminSettings } from '@/components/settings/super-admin-settings';

import { Skeleton } from '@/components/ui/skeleton';
import { type UserProfile, type NotificationPreferences } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/firebase';

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  const userProfileRef = useMemo(
    () => (user ? doc(firestore, `users/${user.uid}`) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const notificationsRef = useMemo(
    () => (user ? doc(firestore, `users/${user.uid}/notification_preferences/${user.uid}`) : null),
    [firestore, user]
  );
  const { data: notificationPreferences, isLoading: areNotificationsLoading } = useDoc<NotificationPreferences>(notificationsRef);
  
  const isLoading = isUserLoading || isProfileLoading || areNotificationsLoading;
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  }

  const renderSettingsForRole = () => {
    if (isLoading) {
      return <SettingsPageSkeleton />;
    }

    switch (userProfile?.role) {
      case 'Super Admin':
        return <SuperAdminSettings />;
      case 'Admin':
        return <AdminSettings />;
      case 'Supervisor':
        return <SupervisorSettingsTabs userProfile={userProfile} notificationPreferences={notificationPreferences} userId={user?.uid} />;
      case 'Agent':
      default:
        return <AgentSettingsTabs userProfile={userProfile} notificationPreferences={notificationPreferences} userId={user?.uid} />;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, preferences, and system settings.
        </p>
      </div>
      <Separator />

      {renderSettingsForRole()}
      
      <div className="mt-6 flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}


function SettingsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72 mt-2" />
            </div>
            <Separator />
            <div className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <div className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        </div>
    )
}
