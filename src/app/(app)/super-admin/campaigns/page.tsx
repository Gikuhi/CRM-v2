
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SuperAdminCampaignsPage() {
    const campaigns = [
        { id: 'camp-1', name: 'USA National Campaign', organization: 'DebtSolve Inc.', status: 'Active', agents: 5 },
        { id: 'camp-2', name: 'UK Regional Campaign', organization: 'CreditRevive', status: 'Active', agents: 3 },
        { id: 'camp-3', name: 'Past Due Follow-ups', organization: 'DebtSolve Inc.', status: 'Paused', agents: 7 },
        { id: 'camp-4', name: 'New Client Onboarding', organization: 'FinRecovery LLC', status: 'Draft', agents: 0 },
    ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Global Campaigns</CardTitle>
          <CardDescription>View and manage all campaigns across every organization.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="hidden md:table-cell">Agents</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((camp) => (
              <TableRow key={camp.id}>
                <TableCell>
                  <div className="font-medium">{camp.name}</div>
                  <div className="text-sm text-muted-foreground">{camp.id}</div>
                </TableCell>
                <TableCell>{camp.organization}</TableCell>
                <TableCell className="hidden md:table-cell">{camp.agents}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={camp.status === "Active" ? "default" : "secondary"}>{camp.status}</Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Stop Campaign</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

