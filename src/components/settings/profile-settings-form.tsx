'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/types';
import { useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Upload, Loader2 } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  phoneNumber: z.string().optional(),
  languagePreference: z.string(),
  themeMode: z.enum(['light', 'dark']),
});

type ProfileSettingsFormProps = {
  profile: UserProfile | null;
};

export function ProfileSettingsForm({ profile }: ProfileSettingsFormProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: profile?.fullName ?? '',
      username: profile?.username ?? '',
      email: profile?.email ?? user?.email ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
      languagePreference: profile?.languagePreference ?? 'en',
      themeMode: profile?.themeMode === 'dark' ? 'dark' : 'light',
    },
  });

  const { isSubmitting } = form.formState;

  function onSubmit(data: z.infer<typeof profileSchema>) {
    if (!user) return;
    const userRef = doc(firestore, `users/${user.uid}`);
    updateDocumentNonBlocking(userRef, data);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.profilePictureUrl} />
                <AvatarFallback>{profile?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Update your profile picture.</p>
                <Button variant="outline" type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
                </div>
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} readOnly disabled/>
                  </FormControl>
                  <FormDescription>Email address cannot be changed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="languagePreference"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="themeMode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                         <FormDescription>
                            Change the appearance of the application.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
