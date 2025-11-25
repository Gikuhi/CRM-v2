
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
import { organizations as initialOrganizations } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Organization } from "@/lib/types";

type ActionType = "changePlan" | "viewInvoices" | "cancelSubscription" | null;

export default function SuperAdminBillingPage() {
  const [organizations, setOrganizations] = React.useState<Organization[]>(initialOrganizations);
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | null>(null);
  const [actionType, setActionType] = React.useState<ActionType>(null);
  const [newPlan, setNewPlan] = React.useState<Organization['plan'] | "">("");

  const { toast } = useToast();

  const plans = [
    { name: "Basic", price: "$99/mo", features: "5 Users, 1 Campaign, Basic Reporting" },
    { name: "Pro", price: "$299/mo", features: "20 Users, 10 Campaigns, Advanced Reporting" },
    { name: "Enterprise", price: "Custom", features: "Unlimited Users, Unlimited Campaigns, Custom Features" },
  ];
  
  const handleActionClick = (org: Organization, type: ActionType) => {
    setSelectedOrg(org);
    setActionType(type);
    if (type === 'changePlan') {
        setNewPlan(org.plan);
    }
  };

  const closeDialog = () => {
    setSelectedOrg(null);
    setActionType(null);
    setNewPlan("");
  };

  const handleChangePlan = () => {
    if (!selectedOrg || !newPlan) return;
    setOrganizations(orgs => orgs.map(o => o.id === selectedOrg.id ? {...o, plan: newPlan as Organization['plan']} : o));
    toast({ title: "Plan Changed", description: `${selectedOrg.name}'s plan has been updated to ${newPlan}.`});
    closeDialog();
  };

  const handleCancelSubscription = () => {
    if (!selectedOrg) return;
    setOrganizations(orgs => orgs.map(o => o.id === selectedOrg.id ? {...o, status: 'Inactive'} : o));
    toast({ title: "Subscription Cancelled", description: `The subscription for ${selectedOrg.name} has been cancelled.`});
    closeDialog();
  };

  const renderDialogContent = () => {
    if (!selectedOrg || !actionType) return null;

    switch(actionType) {
        case 'changePlan':
            return (
                 <>
                    <DialogHeader>
                        <DialogTitle>Change Plan for {selectedOrg.name}</DialogTitle>
                        <DialogDescription>
                            Current plan: <Badge variant="secondary">{selectedOrg.plan}</Badge>. Select a new plan below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Select value={newPlan} onValueChange={(value) => setNewPlan(value as Organization['plan'])}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a new plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Basic">Basic - $99/mo</SelectItem>
                                <SelectItem value="Pro">Pro - $299/mo</SelectItem>
                                <SelectItem value="Enterprise">Enterprise - Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                        <Button onClick={handleChangePlan}>Confirm Change</Button>
                    </DialogFooter>
                </>
            );
        case 'viewInvoices':
            return (
                <>
                    <DialogHeader>
                        <DialogTitle>Invoice History for {selectedOrg.name}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>2024-08-01</TableCell>
                                    <TableCell>$299.00</TableCell>
                                    <TableCell className="text-right"><Badge>Paid</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2024-07-01</TableCell>
                                    <TableCell>$299.00</TableCell>
                                    <TableCell className="text-right"><Badge>Paid</Badge></TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell>2024-06-01</TableCell>
                                    <TableCell>$299.00</TableCell>
                                    <TableCell className="text-right"><Badge>Paid</Badge></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        <Button onClick={closeDialog}>Close</Button>
                    </DialogFooter>
                </>
            );
        case 'cancelSubscription':
             return (
                <>
                    <DialogHeader>
                        <DialogTitle>Cancel Subscription for {selectedOrg.name}?</DialogTitle>
                        <DialogDescription>
                            This will mark the organization as inactive at the end of the current billing cycle. Are you sure?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={closeDialog}>Keep Subscription</Button>
                        <Button variant="destructive" onClick={handleCancelSubscription}>Confirm Cancellation</Button>
                    </DialogFooter>
                </>
             );
        default:
            return null;
    }
  }


  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
        <Tabs defaultValue="organizations">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="organizations">Organization Plans</TabsTrigger>
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="organizations" className="mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Organization Subscriptions</CardTitle>
                        <CardDescription>Manage the subscription plan for each organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Organization</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Renewal Date</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {organizations.map((org) => (
                            <TableRow key={org.id}>
                                <TableCell className="font-medium">{org.name}</TableCell>
                                <TableCell><Badge variant="secondary">{org.plan}</Badge></TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant={org.status === "Active" ? "default" : "destructive"}>{org.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">2024-09-01</TableCell>
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
                                    <DropdownMenuItem onClick={() => handleActionClick(org, 'changePlan')}>Change Plan</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleActionClick(org, 'viewInvoices')}>View Invoices</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleActionClick(org, 'cancelSubscription')} className="text-destructive">Cancel Subscription</DropdownMenuItem>
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

            <TabsContent value="plans" className="mt-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Manage Plans</CardTitle>
                            <CardDescription>Create and edit subscription plans for organizations.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/> New Plan</Button>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-3">
                       {plans.map(plan => (
                         <Card key={plan.name}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{plan.features}</p>
                                <Button className="mt-4 w-full">Edit Plan</Button>
                            </CardContent>
                        </Card>
                       ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        
        <Dialog open={!!actionType} onOpenChange={(open) => !open && closeDialog()}>
            <DialogContent>
                {renderDialogContent()}
            </DialogContent>
        </Dialog>
    </div>
  );
}
