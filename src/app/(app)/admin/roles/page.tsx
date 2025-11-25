
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Check, X } from "lucide-react";
import { roles, Permission } from '@/lib/permissions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const permissionGroups = {
    'Campaigns': ['campaign:create', 'campaign:view', 'campaign:edit', 'campaign:delete'],
    'Users & Roles': ['user:manage', 'role:manage'],
    'System': ['settings:access'],
    'Reporting': ['report:view', 'report:export'],
    'Agent Actions': ['debtor:view', 'debtor:update', 'ptp:create', 'ptp:update', 'wrapup:create']
};

const getPermissionDisplayName = (permission: Permission) => {
    return permission.replace(/[:]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function RoleManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Role & Permission Management</h1>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Custom Role</Button>
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
