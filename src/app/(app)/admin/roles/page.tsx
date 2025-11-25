
'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check, X, Loader2 } from "lucide-react";
import { roles as initialRoles, Permission } from '@/lib/permissions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { Role } from '@/lib/permissions';

const permissionGroups: Record<string, Permission[]> = {
    'Campaigns': ['campaign:create', 'campaign:view', 'campaign:edit', 'campaign:delete'],
    'Users & Roles': ['user:manage', 'role:manage'],
    'System': ['settings:access'],
    'Reporting': ['report:view', 'report:export'],
    'Agent Actions': ['debtor:view', 'debtor:update', 'ptp:create', 'ptp:update', 'wrapup:create']
};

const getPermissionDisplayName = (permission: Permission) => {
    return permission.replace(/[:]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const customRoleSchema = z.object({
  name: z.string().min(1, "Role name is required."),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "At least one permission must be selected."),
});

type CustomRoleFormValues = z.infer<typeof customRoleSchema>;

export default function RoleManagementPage() {
  const [roles, setRoles] = React.useState<Record<string, Role>>(initialRoles);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<CustomRoleFormValues>({
    resolver: zodResolver(customRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const onSubmit = (values: CustomRoleFormValues) => {
    const newRole: Role = {
      description: values.description || 'Custom role',
      permissions: new Set(values.permissions as Permission[]),
    };
    setRoles(prevRoles => ({
      ...prevRoles,
      [values.name]: newRole,
    }));
    toast({
      title: "Custom Role Created",
      description: `The role "${values.name}" has been successfully created.`,
    });
    setIsFormOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Role & Permission Management</h1>
         <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Custom Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Custom Role</DialogTitle>
                    <DialogDescription>
                        Define a new role and select the permissions it should have.
                    </DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., QA Analyst" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="A brief description of the role" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="permissions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Permissions</FormLabel>
                                    <FormDescription>Select the permissions for this role.</FormDescription>
                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 border rounded-lg max-h-64 overflow-y-auto">
                                        {Object.entries(permissionGroups).map(([groupName, groupPermissions]) => (
                                            <div key={groupName} className="space-y-3">
                                                <h4 className="font-semibold text-primary">{groupName}</h4>
                                                {groupPermissions.map((permission) => (
                                                    <FormField
                                                        key={permission}
                                                        control={form.control}
                                                        name="permissions"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem key={permission} className="flex flex-row items-start space-x-3 space-y-0">
                                                                     <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(permission)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                ? field.onChange([...field.value, permission])
                                                                                : field.onChange(field.value?.filter((value) => value !== permission));
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-sm font-normal">
                                                                        {getPermissionDisplayName(permission)}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Create Role
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>Review the predefined roles and their associated permissions within the system.</CardDescription>
        </CardHeader>
        <CardContent>
           <Accordion type="single" collapsible className="w-full" defaultValue="Admin">
            {Object.entries(roles).map(([roleName, roleDetails]) => (
                <AccordionItem key={roleName} value={roleName}>
                    <AccordionTrigger className="text-xl">
                        <div className="flex items-center gap-4">
                            <span>{roleName}</span>
                            <Badge variant="secondary">{roleDetails.description}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="p-4 bg-muted/50 rounded-lg">
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {Object.entries(permissionGroups).map(([groupName, groupPermissions]) => (
                                <div key={groupName} className="space-y-3">
                                    <h4 className="font-semibold text-primary">{groupName}</h4>
                                    <ul className="space-y-2">
                                        {groupPermissions.map(permission => (
                                            <li key={permission} className="flex items-center text-sm">
                                                {roleDetails.permissions.has(permission as Permission) ? (
                                                     <Check className="h-4 w-4 mr-2 text-green-500" />
                                                ) : (
                                                     <X className="h-4 w-4 mr-2 text-red-500" />
                                                )}
                                                <span>{getPermissionDisplayName(permission as Permission)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             ))}
                           </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
           </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
