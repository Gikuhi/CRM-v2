
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Upload, Download, MoreHorizontal, Loader2 } from "lucide-react";
import { users as initialUsers, organizations } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type GlobalUser = typeof initialUsers[0] & { organization: string, status: 'Active' | 'Inactive' };
type ActionType = "edit" | "impersonate" | "resetPassword" | "delete";

const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name is required."),
  organization: z.string().min(1, "Organization is required."),
  role: z.enum(['Agent', 'Supervisor', 'Admin', 'Super Admin']),
});

export default function SuperAdminGlobalUsersPage() {
  const [users, setUsers] = React.useState<GlobalUser[]>(() => 
    initialUsers.map((user, index) => ({
      ...user,
      organization: organizations[index % organizations.length].name,
      status: index % 3 === 0 ? 'Active' : 'Inactive'
    }))
  );
  
  const [selectedUser, setSelectedUser] = React.useState<GlobalUser | null>(null);
  const [actionType, setActionType] = React.useState<ActionType | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });
  
  const handleActionClick = (user: GlobalUser, type: ActionType) => {
    setSelectedUser(user);
    if (type === 'edit') {
        form.reset({
            id: user.id,
            name: user.name,
            organization: user.organization,
            role: user.role,
        });
        setIsFormOpen(true);
    } else {
        setActionType(type);
    }
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setActionType(null);
  };

  const onEditSubmit = (values: z.infer<typeof userSchema>) => {
    setUsers(users.map(u => u.id === values.id ? { ...u, ...values } : u));
    toast({ title: "User Updated", description: `${values.name}'s information has been updated.` });
    setIsFormOpen(false);
  };
  
  const handleImpersonate = () => {
    if(!selectedUser) return;
    toast({ title: "Impersonating User", description: `You are now impersonating ${selectedUser.name}.` });
    closeDialog();
  }

  const handleResetPassword = () => {
    if(!selectedUser) return;
    toast({ title: "Password Reset", description: `A password reset link has been sent to ${selectedUser.name}.` });
    closeDialog();
  }

  const handleDelete = () => {
    if(!selectedUser) return;
    setUsers(users.filter(u => u.id !== selectedUser.id));
    toast({ title: "User Deleted", description: `${selectedUser.name} has been removed from the system.` });
    closeDialog();
  }

  const renderActionDialog = () => {
      if (!selectedUser) return null;

      switch(actionType) {
          case 'impersonate':
              return (
                  <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Impersonate {selectedUser.name}?</DialogTitle>
                          <DialogDescription>
                              You will be logged in as this user and will see the application from their perspective. Are you sure?
                          </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                          <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                          <Button onClick={handleImpersonate}>Impersonate</Button>
                      </DialogFooter>
                  </DialogContent>
              )
          case 'resetPassword':
              return (
                   <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Reset Password for {selectedUser.name}?</DialogTitle>
                          <DialogDescription>
                              This will send a password reset link to the user's registered email. They will be required to create a new password.
                          </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                          <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                          <Button onClick={handleResetPassword}>Send Reset Link</Button>
                      </DialogFooter>
                  </DialogContent>
              )
          case 'delete':
                return (
                   <DialogContent>
                      <DialogHeader>
                          <DialogTitle>Delete {selectedUser.name}?</DialogTitle>
                          <DialogDescription>
                              This action cannot be undone. This will permanently delete the user's account and remove their data.
                          </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                          <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                          <Button variant="destructive" onClick={handleDelete}>Delete User</Button>
                      </DialogFooter>
                  </DialogContent>
              )
          default:
            return null;
      }
  }

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Global User Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>Global User Directory</CardTitle>
            <CardDescription>Search, filter, and manage all users across all organizations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search users by name, email, org..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Import</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> Add User</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="font-medium">{user.name}</div>
                        </TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                         <TableCell className="hidden md:table-cell">
                            <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleActionClick(user, 'edit')}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleActionClick(user, 'impersonate')}>Impersonate User</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleActionClick(user, 'resetPassword')}>Reset Password</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleActionClick(user, 'delete')}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit User: {form.getValues('name')}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="organization" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent>
                                    {organizations.map(org => <SelectItem key={org.id} value={org.name}>{org.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Agent">Agent</SelectItem>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
      </Dialog>

      {/* Other Action Dialogs */}
      <Dialog open={!!actionType} onOpenChange={closeDialog}>
        {renderActionDialog()}
      </Dialog>
    </div>
  );
}
    