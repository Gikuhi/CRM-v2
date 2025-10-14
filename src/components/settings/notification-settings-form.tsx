'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import type { NotificationPreferences } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Loader2 } from 'lucide-react';

const notificationsSchema = z.object({
  emailAlertsEnabled: z.boolean(),
  smsAlertsEnabled: z.boolean(),
  inAppNotificationsEnabled: z.boolean(),
});

type NotificationSettingsFormProps = {
  preferences: NotificationPreferences | null;
  userId?: string;
};

export function NotificationSettingsForm({ preferences, userId }: NotificationSettingsFormProps) {
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    values: {
      emailAlertsEnabled: preferences?.emailAlertsEnabled ?? false,
      smsAlertsEnabled: preferences?.smsAlertsEnabled ?? false,
      inAppNotificationsEnabled: preferences?.inAppNotificationsEnabled ?? false,
    },
  });

  const { isSubmitting } = form.formState;

  function onSubmit(data: z.infer<typeof notificationsSchema>) {
    if (!userId) return;
    const prefRef = doc(firestore, `users/${userId}/notification_preferences/${userId}`);
    setDocumentNonBlocking(prefRef, data, { merge: true });
    toast({
      title: 'Notification Settings Saved',
      description: 'Your notification preferences have been updated.',
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="emailAlertsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Alerts</FormLabel>
                    <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smsAlertsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">SMS Alerts</FormLabel>
                    <p className="text-sm text-muted-foreground">Get critical notifications via text message.</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inAppNotificationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In-App Notifications</FormLabel>
                    <p className="text-sm text-muted-foreground">Display notifications within the application.</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Notifications
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
