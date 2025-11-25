
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
import { organizations as initialOrganizations } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Organization } from "@/lib/types";


const orgSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Organization name must be at least 2 characters."),
  admin: z.string().min(2, "Admin name is required."),
  adminEmail: z.string().email("A valid email for the admin is required.").optional(),
  password: z.string().min(8, "Password must be at least 8 characters.").optional(),
  plan: z.enum(["Basic", "Pro", "Enterprise"]),
});

type OrgFormValues = z.infer<typeof orgSchema>;
type ActionType = "edit" | "billing" | "disable" | "details" | null;

export default function SuperAdminOrganizationsPage() {
  const [organizations, setOrganizations] = React.useState<Organization[]>(initialOrganizations);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | null>(null);
  const [actionType, setActionType] = React.useState<ActionType>(null);
  const [editingOrg, setEditingOrg] = React.useState<Organization | null>(null);
  
  const { toast } = useToast();

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: "",
      admin: "",
      adminEmail: "",
      password: "",
      plan: "Basic",
    },
  });
  
  const handleOpenForm = (org: Organization | null) => {
    setEditingOrg(org);
    if (org) {
      form.reset({
        id: org.id,
        name: org.name,
        admin: org.admin,
        plan: org.plan,
        adminEmail: '',
        password: '',
      });
    } else {
      form.reset({
        name: "",
        admin: "",
        adminEmail: "",
        password: "",
        plan: "Basic",
      });
    }
    setIsFormOpen(true);
  };

  const onSubmit = (values: OrgFormValues) => {
    if (editingOrg) { // Update existing organization
      setOrganizations(prevOrgs =>
        prevOrgs.map(org =>
          org.id === editingOrg.id ? { ...org, name: values.name, plan: values.plan, admin: values.admin } : org
        )
      );
      toast({
        title: "Organization Updated",
        description: `${values.name} has been successfully updated.`,
      });

    } else { // Create new organization
        const newOrg: Organization = {
            id: `org-${Date.now()}`,
            name: values.name,
            admin: values.admin,
            userCount: 1, // Start with one user (the admin)
            status: "Active",
            plan: values.plan,
        };
        setOrganizations(prevOrgs => [newOrg, ...prevOrgs]);
        toast({
            title: "Organization Created",
            description: `${values.name} has been successfully created.`,
        });
    }
    setIsFormOpen(false);
    setEditingOrg(null);
  };
  
  const handleActionClick = (org: Organization, type: ActionType) => {
    setSelectedOrg(org);
    setActionType(type);
    
    if (type === 'edit') {
        handleOpenForm(org);
    } else if (type === 'details') {
        console.log("Viewing details for:", org);
        toast({ title: "Details Logged", description: "Organization details logged to the console."});
    } else {
        setIsActionDialogOpen(true);
    }
  };
  
  const handleDisableConfirm = () => {
    if (selectedOrg) {
        setOrganizations(prev => prev.map(o => o.id === selectedOrg.id ? {...o, status: 'Inactive'} : o));
        toast({ title: "Organization Disabled", description: `${selectedOrg.name} has been deactivated.`});
    }
    closeActionDialog();
  }

  const closeActionDialog = () => {
    setIsActionDialogOpen(false);
    setSelectedOrg(null);
    setActionType(null);
  };

  const renderActionDialogContent = () => {
    if (!selectedOrg) return null;

    switch (actionType) {
      case "billing":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Manage Billing for {selectedOrg.name}</DialogTitle>
              <DialogDescription>Current plan: <Badge variant="secondary">{selectedOrg.plan}</Badge></DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h4 className="font-semibold mb-2">Invoice History</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-08-01</TableCell>
                    <TableCell>$299.00</TableCell>
                    <TableCell><Badge>Paid</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell>$299.00</TableCell>
                    <TableCell><Badge>Paid</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={closeActionDialog}>Close</Button>
            </DialogFooter>
          </>
        );
      case "disable":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Disable {selectedOrg.name}?</DialogTitle>
              <DialogDescription>
                This will deactivate the organization and prevent its users from logging in. Are you sure?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={closeActionDialog}>Cancel</Button>
              <Button variant="destructive" onClick={handleDisableConfirm}>Disable Organization</Button>
            </DialogFooter>
          </>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Organizations</CardTitle>
            <CardDescription>Manage all companies and call centers on the platform.</CardDescription>
          </div>
          <Button onClick={() => handleOpenForm(null)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Organization
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead className="hidden md:table-cell">Users</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="font-medium">{org.name}</div>
                    <div className="text-sm text-muted-foreground">{org.id}</div>
                  </TableCell>
                  <TableCell>{org.admin}</TableCell>
                  <TableCell className="hidden md:table-cell">{org.userCount}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={org.status === "Active" ? "default" : "destructive"}>{org.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleActionClick(org, 'edit')}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleActionClick(org, 'details')}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleActionClick(org, 'billing')}>Manage Billing</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleActionClick(org, 'disable')}>Disable</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>{editingOrg ? 'Edit Organization' : 'Create New Organization'}</DialogTitle>
            <DialogDescription>
                {editingOrg ? `Update details for ${editingOrg.name}.` : 'Fill out the details to add a new organization to the platform.'}
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="admin"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Admin Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {!editingOrg && (
                    <>
                        <FormField
                        control={form.control}
                        name="adminEmail"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Admin Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="e.g., admin@acme.com" {...field} />
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
                            <FormLabel>Admin Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Create a strong password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </>
                )}
                <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subscription Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={form.formState.isSubmitting}>Cancel</Button>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        {editingOrg ? 'Save Changes' : 'Create Organization'}
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
      </Dialog>
      
      {/* Action Dialog (for billing and disable) */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="sm:max-w-md">
            {renderActionDialogContent()}
        </DialogContent>
      </Dialog>
    </>
  );
}
