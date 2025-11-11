"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, MoreHorizontal, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useFirestore, useAuth, useMemoFirebase } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import type { UserProfile } from "@/lib/types";

const newUserSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

type NewUserFormValues = z.infer<typeof newUserSchema>;
type UserRole = 'Agent' | 'Supervisor';

export default function UserManagementMasterPage() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [roleToAdd, setRoleToAdd] = React.useState<UserRole>('Agent');

  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();

  const usersRef = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const { data: users, isLoading } = useCollection<UserProfile>(usersRef);
  
  const supervisors = users?.filter(u => u.role === 'Supervisor' || u.role === 'Admin') || [];
  const agents = users?.filter(u => u.role === 'Agent') || [];

  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });
  
  const handleOpenForm = (role: UserRole) => {
    setRoleToAdd(role);
    form.reset();
    setIsFormOpen(true);
  };

  const onSubmit = async (values: NewUserFormValues) => {
    if (!auth || !firestore) {
        toast({
            variant: "destructive",
            title: "Firebase not initialized",
            description: "The Firebase services are not available.",
        });
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        const userDocRef = doc(firestore, "users", user.uid);
        
        await setDoc(userDocRef, {
            id: user.uid,
            fullName: values.fullName,
            username: values.email.split('@')[0],
            email: values.email,
            role: roleToAdd,
            languagePreference: 'en',
            themeMode: 'light',
            createdAt: serverTimestamp(),
        });

        toast({
            title: `${roleToAdd} Created Successfully`,
            description: `${values.fullName} has been added to the system.`,
        });

        setIsFormOpen(false);
    } catch (error: any) {
        console.error(`Error creating ${roleToAdd}:`, error);
        toast({
            variant: "destructive",
            title: `Failed to create ${roleToAdd}`,
            description: error.message || "An unknown error occurred.",
        });
    }
  };
  
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">User & Role Management</h1>
       <Tabs defaultValue="agents">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="supervisors">Supervisors</TabsTrigger>
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
                             <Button onClick={() => handleOpenForm('Agent')}><PlusCircle className="mr-2 h-4 w-4"/> Add Agent</Button>
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
                            {isLoading && <TableRow><TableCell colSpan={4} className="text-center">Loading agents...</TableCell></TableRow>}
                            {!isLoading && agents.map(agent => (
                                <TableRow key={agent.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{agent.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{agent.fullName}</span>
                                     </TableCell>
                                     <TableCell>{agent.team_name || 'N/A'}</TableCell>
                                     <TableCell><Badge variant={'outline'}>{'Offline'}</Badge></TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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
                        <CardTitle>Supervisor Directory</CardTitle>
                        <CardDescription>Manage all supervisors in your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search supervisors..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Button onClick={() => handleOpenForm('Supervisor')}><PlusCircle className="mr-2 h-4 w-4"/> Add Supervisor</Button>
                        </div>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Team(s) Managed</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && <TableRow><TableCell colSpan={3} className="text-center">Loading supervisors...</TableCell></TableRow>}
                            {!isLoading && supervisors.map(supervisor => (
                                <TableRow key={supervisor.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{supervisor.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{supervisor.fullName}</span>
                                     </TableCell>
                                     <TableCell>{supervisor.team_name || 'N/A'}</TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New {roleToAdd}</DialogTitle>
                    <DialogDescription>
                        Enter the details below to create a new {roleToAdd} account.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Jane Doe" {...field} />
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
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Create a secure password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create {roleToAdd}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
  );
}

    