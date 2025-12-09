
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, MoreHorizontal, Loader2, Edit, Repeat, KeyRound, UserX, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/types";
import { Timestamp } from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTeams } from "@/lib/data";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";


const sampleUsers: UserProfile[] = [
    { id: 'user-1', fullName: 'Peris Wanyangi', username: 'peris.w', email: 'peris.w@example.com', role: 'Agent', languagePreference: 'en', themeMode: 'light', team_name: 'Team Alpha', createdAt: Timestamp.now(), status: 'Active' },
    { id: 'user-2', fullName: 'John Okoro', username: 'john.o', email: 'john.o@example.com', role: 'Agent', languagePreference: 'en', themeMode: 'light', team_name: 'Team Alpha', createdAt: Timestamp.now(), status: 'Active' },
    { id: 'user-3', fullName: 'Grace Akinyi', username: 'grace.a', email: 'grace.a@example.com', role: 'Agent', languagePreference: 'en', themeMode: 'light', team_name: 'Team Bravo', createdAt: Timestamp.now(), status: 'Active' },
    { id: 'user-4', fullName: 'Samuel Mwangi', username: 'samuel.m', email: 'samuel.m@example.com', role: 'Agent', languagePreference: 'en', themeMode: 'light', team_name: 'Team Bravo', createdAt: Timestamp.now(), status: 'Inactive' },
    { id: 'user-5', fullName: 'Andrew Mayaka', username: 'andrew.m', email: 'andrew.m@example.com', role: 'Supervisor', languagePreference: 'en', themeMode: 'light', team_name: 'N/A', createdAt: Timestamp.now(), status: 'Active' },
    { id: 'user-6', fullName: 'Beatrice Njeri', username: 'beatrice.n', email: 'beatrice.n@example.com', role: 'Supervisor', languagePreference: 'en', themeMode: 'light', team_name: 'N/A', createdAt: Timestamp.now(), status: 'Active' },
    { id: 'user-7', fullName: 'Admin User', username: 'admin.user', email: 'admin@example.com', role: 'Admin', languagePreference: 'en', themeMode: 'light', team_name: 'N/A', createdAt: Timestamp.now(), status: 'Active' },
];


const userFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters.").optional(),
    role: z.enum(['Agent', 'Supervisor', 'Admin']),
});

const assignTeamFormSchema = z.object({
  team: z.string().min(1, "Please select a team."),
});


type UserFormValues = z.infer<typeof userFormSchema>;
type AssignTeamFormValues = z.infer<typeof assignTeamFormSchema>;
type ActionType = "edit" | "assignTeam" | "resetPassword" | "deactivate" | "permissions";

export default function UserManagementMasterPage() {
  const [users, setUsers] = React.useState<UserProfile[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<ActionType | "createUser" | null>(null);

  const { toast } = useToast();
  
  const supervisors = users?.filter(u => u.role === 'Supervisor' || u.role === 'Admin') || [];
  const agents = users?.filter(u => u.role === 'Agent') || [];

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  const assignTeamForm = useForm<AssignTeamFormValues>({
    resolver: zodResolver(assignTeamFormSchema),
    defaultValues: { team: '' }
  });
  
  React.useEffect(() => {
    if (actionType === 'assignTeam' && selectedUser) {
        assignTeamForm.reset({
            team: selectedUser.team_name || ''
        });
    }
  }, [actionType, selectedUser, assignTeamForm]);

  const handleOpenDialog = (type: ActionType | "createUser", user: UserProfile | null = null) => {
    setActionType(type);
    setSelectedUser(user);

    if (type === 'createUser' || type === 'edit') {
        const defaultRole = user ? user.role : (type === 'createUser' ? 'Agent' : undefined);
        form.reset({
            fullName: user?.fullName || "",
            email: user?.email || "",
            password: "",
            role: defaultRole as 'Agent' | 'Supervisor' | 'Admin',
        });
    }

    setDialogOpen(true);
  };
  
  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
    setActionType(null);
  }

  const onUserFormSubmit = async (values: UserFormValues) => {
    // This is mock logic for frontend state update
    if (actionType === 'edit' && selectedUser) {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...values } : u));
        toast({ title: "User Updated", description: `${values.fullName} has been updated.` });
    } else {
        const newUser: UserProfile = {
            id: `user-${Date.now()}`,
            createdAt: Timestamp.now(),
            status: 'Active',
            languagePreference: 'en',
            themeMode: 'light',
            ...values,
            username: values.email.split('@')[0],
        };
        setUsers([newUser, ...users]);
        toast({ title: `${values.role} Created`, description: `${values.fullName} has been added.` });
    }
    closeDialog();
  };

  const handleDeactivate = () => {
    if (!selectedUser) return;
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    toast({ title: "User Status Updated", description: `${selectedUser.fullName}'s status has been changed.` });
    closeDialog();
  }

  const handleResetPassword = () => {
    if (!selectedUser) return;
    toast({ title: "Password Reset Link Sent", description: `A password reset link has been sent to ${selectedUser.email}.` });
    closeDialog();
  }
  
  const handleAssignTeam = (data: AssignTeamFormValues) => {
    if (!selectedUser) return;
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, team_name: data.team } : u));
    toast({ title: "Team Assigned", description: `${selectedUser.fullName} has been assigned to ${data.team}.` });
    closeDialog();
  }

  const renderDialog = () => {
    if (!actionType) return null;

    if (actionType === 'createUser' || actionType === 'edit') {
        const isEdit = actionType === 'edit';
        return (
             <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? `Edit ${selectedUser?.role}` : `Add New ${form.getValues('role') || 'User'}`}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? `Update details for ${selectedUser?.fullName}.` : `Enter details for the new user.`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onUserFormSubmit)} className="space-y-4 py-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input type="email" {...field} readOnly={isEdit}/> </FormControl> {isEdit && <FormDescription>Email cannot be changed.</FormDescription>} <FormMessage /> </FormItem> )} />
                        {!isEdit && ( <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl> <Input type="password" {...field} /> </FormControl> <FormMessage /> </FormItem> )} /> )}
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
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
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={closeDialog}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Save Changes' : 'Create User'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        );
    }
    
    if (actionType === 'assignTeam') {
      return (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign {selectedUser?.fullName} to a Team</DialogTitle>
          </DialogHeader>
          <Form {...assignTeamForm}>
            <form onSubmit={assignTeamForm.handleSubmit(handleAssignTeam)} className="py-4 space-y-4">
              <FormField
                control={assignTeamForm.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockTeams.map(team => <SelectItem key={team.team_id} value={team.team_name}>{team.team_name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={closeDialog}>Cancel</Button>
                <Button type="submit">Assign Team</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      );
    }

    if (actionType === 'resetPassword') {
        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to send a password reset link to {selectedUser?.fullName}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleResetPassword}>Send Link</Button>
                </DialogFooter>
            </DialogContent>
        )
    }
    
    if (actionType === 'deactivate') {
        return (
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedUser?.status === 'Active' ? 'Deactivate' : 'Activate'} User?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {selectedUser?.status === 'Active' ? 'deactivate' : 'activate'} {selectedUser?.fullName}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                    <Button variant={selectedUser?.status === 'Active' ? 'destructive' : 'default'} onClick={handleDeactivate}>
                         {selectedUser?.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        )
    }
    
    if (actionType === 'permissions') {
        return (
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Permissions for {selectedUser?.fullName}</DialogTitle>
                    <DialogDescription>
                       Adjust permissions for this supervisor.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="perm-campaigns">Create Campaigns</Label>
                        <Switch id="perm-campaigns" defaultChecked/>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="perm-billing">Manage Billing</Label>
                        <Switch id="perm-billing" />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="perm-reports">Access Global Reports</Label>
                        <Switch id="perm-reports" defaultChecked/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={closeDialog}>Save Permissions</Button>
                </DialogFooter>
            </DialogContent>
        )
    }

    return null;
  }
  
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">User & Role Management</h1>
       <Tabs defaultValue="agents">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="supervisors">Supervisors & Admins</TabsTrigger>
            </TabsList>
             <TabsContent value="agents" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Agent Directory</CardTitle>
                        <CardDescription>Manage all agents in your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search agents..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Button onClick={() => handleOpenDialog('createUser')}><PlusCircle className="mr-2 h-4 w-4"/> Add Agent</Button>
                        </div>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.map(agent => (
                                <TableRow key={agent.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{agent.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{agent.fullName}</span>
                                     </TableCell>
                                     <TableCell>{agent.team_name || 'N/A'}</TableCell>
                                     <TableCell><Badge variant={agent.status === 'Active' ? 'default' : 'destructive'}>{agent.status || 'Active'}</Badge></TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', agent)}><Edit className="mr-2 h-4 w-4" />Edit Agent</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('assignTeam', agent)}><Repeat className="mr-2 h-4 w-4" />Assign to Team</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('resetPassword', agent)}><KeyRound className="mr-2 h-4 w-4" />Reset Password</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleOpenDialog('deactivate', agent)} className="text-destructive"><UserX className="mr-2 h-4 w-4" />{agent.status === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                     </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                    </CardContent>
                </Card>
             </TabsContent>
              <TabsContent value="supervisors" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Supervisor & Admin Directory</CardTitle>
                        <CardDescription>Manage all supervisors and administrators in your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Button onClick={() => handleOpenDialog('createUser')}><PlusCircle className="mr-2 h-4 w-4"/> Add User</Button>
                        </div>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Team(s) Managed</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supervisors.map(supervisor => (
                                <TableRow key={supervisor.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{supervisor.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{supervisor.fullName}</span>
                                     </TableCell>
                                     <TableCell><Badge variant="secondary">{supervisor.role}</Badge></TableCell>
                                     <TableCell>{mockTeams.filter(t => t.leader_name === supervisor.fullName).map(t => t.team_name).join(', ') || 'N/A'}</TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleOpenDialog('edit', supervisor)}><Edit className="mr-2 h-4 w-4" />Edit User</DropdownMenuItem>
                                                {supervisor.role === 'Supervisor' && (
                                                  <DropdownMenuItem onClick={() => handleOpenDialog('permissions', supervisor)}><UserCog className="mr-2 h-4 w-4" />Manage Permissions</DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => handleOpenDialog('deactivate', supervisor)} className="text-destructive"><UserX className="mr-2 h-4 w-4" />{supervisor.status === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                     </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                    </CardContent>
                </Card>
             </TabsContent>
       </Tabs>
       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {renderDialog()}
       </Dialog>
    </div>
  );
}

    