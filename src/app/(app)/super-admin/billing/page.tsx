
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { organizations } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SuperAdminBillingPage() {
  const plans = [
    { name: "Basic", price: "$99/mo", features: "5 Users, 1 Campaign, Basic Reporting" },
    { name: "Pro", price: "$299/mo", features: "20 Users, 10 Campaigns, Advanced Reporting" },
    { name: "Enterprise", price: "Custom", features: "Unlimited Users, Unlimited Campaigns, Custom Features" },
  ];

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
                                    <DropdownMenuItem>Change Plan</DropdownMenuItem>
                                    <DropdownMenuItem>View Invoices</DropdownMenuItem>
                                    <DropdownMenuItem>Cancel Subscription</DropdownMenuItem>
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
    </div>
  );
}
