
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Upload, MoreHorizontal } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const campaigns = [
    { id: 1, name: 'Q3 Financial Push', type: 'Outbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: 5000 },
    { id: 2, name: 'New Leads Outreach', type: 'Outbound', status: 'Active', supervisor: 'Beatrice Njeri', leads: 7500 },
    { id: 3, name: 'Inbound Customer Service', type: 'Inbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: null },
    { id: 4, name: 'Past-Due Follow-up', type: 'Outbound', status: 'Paused', supervisor: 'Beatrice Njeri', leads: 2500 },
];


export default function CampaignManagementPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Campaign Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>Campaigns</CardTitle>
            <CardDescription>Create, configure, and manage all dialing campaigns for your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload Lead List</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> New Campaign</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {campaigns.map(campaign => (
                    <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.type}</TableCell>
                        <TableCell><Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>{campaign.status}</Badge></TableCell>
                        <TableCell>{campaign.supervisor}</TableCell>
                        <TableCell>{campaign.leads?.toLocaleString() ?? 'N/A'}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Assign Supervisor</DropdownMenuItem>
                                    <DropdownMenuItem>View Performance</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
