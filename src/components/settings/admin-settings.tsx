'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc, collection } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { toast } from '@/hooks/use-toast';
import type { SystemConfiguration } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCollection } from '@/firebase/firestore/use-collection';
import { UserProfile } from '@/lib/types';

const systemConfigSchema = z.object({
  callTimeout: z.coerce.number().min(0, 'Must be a positive number'),
  maxConcurrentCalls: z.coerce.number().min(1, 'Must be at least 1'),
  recordingEnabled: z.boolean(),
});

const roleManagementSchema = z.object({
  users: z.array(z.object({
    id: z.string(),
    role: z.enum(['Agent', 'Supervisor', 'Admin']),
  })),
});


export function AdminSettings() {
  const firestore = useFirestore();

  const configRef = useMemoFirebase(() => doc(firestore, 'system_configurations/main'), [firestore]);
  const { data: systemConfig, isLoading: isConfigLoading } = useDoc<SystemConfiguration>(configRef);

  const usersRef = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const { data: users, isLoading: areUsersLoading } = useCollection<UserProfile>(usersRef);

  const configForm = useForm<z.infer<typeof systemConfigSchema>>({
    resolver: zodResolver(systemConfigSchema),
    values: {
      callTimeout: systemConfig?.callTimeout ?? 60,
      maxConcurrentCalls: systemConfig?.maxConcurrentCalls ?? 10,
      recordingEnabled: systemConfig?.recordingEnabled ?? false,
    },
    mode: 'onChange',
  });

  const roleForm = useForm<z.infer<typeof roleManagementSchema>>({
     resolver: zodResolver(roleManagementSchema),
     values: {
         users: users?.map(u => ({ id: u.id, role: u.role as any || 'Agent' })) || [],
     },
     mode: 'onChange'
  });

  const { fields } = useFieldArray({
    control: roleForm.control,
    name: "users"
  });


  function onConfigSubmit(data: z.infer<typeof systemConfigSchema>) {
    if (!configRef) return;
    updateDocumentNonBlocking(configRef, data);
    toast({
      title: 'System Settings Saved',
      description: 'System-wide configurations have been updated.',
    });
  }

  function onRoleSubmit(data: z.infer<typeof roleManagementSchema>) {
    data.users.forEach(user => {
        const userRef = doc(firestore, `users/${user.id}`);
        updateDocumentNonBlocking(userRef, { role: user.role });
    });

    toast({
        title: 'User Roles Saved',
        description: 'User roles have been updated successfully.',
    });
  }
  
  if (isConfigLoading || areUsersLoading) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                  <CardDescription>Loading admin settings...</CardDescription>
              </CardHeader>
          </Card>
      )
  }

  return (
    <div className="space-y-6">
        {/* System Configuration */}
        <Card>
            <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Manage system-wide settings for all users.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...configForm}>
                <form onSubmit={configForm.handleSubmit(onConfigSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                         <FormField
                            control={configForm.control}
                            name="callTimeout"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Call Timeout (seconds)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={configForm.control}
                            name="maxConcurrentCalls"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Max Concurrent Calls</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={configForm.control}
                        name="recordingEnabled"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                            <FormLabel className="text-base">Call Recording</FormLabel>
                            <p className="text-sm text-muted-foreground">
                                Enable or disable call recording across the system.
                            </p>
                            </div>
                            <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <Button type="submit">Save System Config</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
        {/* Role Management */}
        <Card>
             <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Assign roles to users.</CardDescription>
            </CardHeader>
             <CardContent>
                 <Form {...roleForm}>
                    <form onSubmit={roleForm.handleSubmit(onRoleSubmit)} className="space-y-6">
                         {fields.map((field, index) => {
                             const user = users?.find(u => u.id === field.id);
                             return (
                                 <div key={field.id} className="flex items-center justify-between p-2 rounded-lg border">
                                    <div>
                                        <p className="font-medium">{user?.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                    <FormField
                                        control={roleForm.control}
                                        name={`users.${index}.role`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue placeholder="Select a role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Agent">Agent</SelectItem>
                                                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                                                        <SelectItem value="Admin">Admin</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                             )
                         })}
                        <Button type="submit">Save Roles</Button>
                    </form>
                 </Form>
             </CardContent>
        </Card>
    </div>
  );
}
