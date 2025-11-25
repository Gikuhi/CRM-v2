
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type CampaignStatus = 'Active' | 'Paused' | 'Draft' | 'Stopped';

type Campaign = {
    id: string;
    name: string;
    organization: string;
    status: CampaignStatus;
    agents: number;
};

const initialCampaigns: Campaign[] = [
    { id: 'camp-1', name: 'USA National Campaign', organization: 'DebtSolve Inc.', status: 'Active', agents: 5 },
    { id: 'camp-2', name: 'UK Regional Campaign', organization: 'CreditRevive', status: 'Active', agents: 3 },
    { id: 'camp-3', name: 'Past Due Follow-ups', organization: 'DebtSolve Inc.', status: 'Paused', agents: 7 },
    { id: 'camp-4', name: 'New Client Onboarding', organization: 'FinRecovery LLC', status: 'Draft', agents: 0 },
];

type ActionType = 'details' | 'pause' | 'stop';

export default function SuperAdminCampaignsPage() {
    const [campaigns, setCampaigns] = React.useState<Campaign[]>(initialCampaigns);
    const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
    const [actionType, setActionType] = React.useState<ActionType | null>(null);
    const { toast } = useToast();

    const handleActionClick = (campaign: Campaign, type: ActionType) => {
        setSelectedCampaign(campaign);
        setActionType(type);
    };

    const closeDialog = () => {
        setSelectedCampaign(null);
        setActionType(null);
    };

    const handlePauseConfirm = () => {
        if (!selectedCampaign) return;
        setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? { ...c, status: 'Paused' } : c));
        toast({ title: "Campaign Paused", description: `"${selectedCampaign.name}" has been paused.` });
        closeDialog();
    };

    const handleStopConfirm = () => {
        if (!selectedCampaign) return;
        setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? { ...c, status: 'Stopped' } : c));
        toast({ title: "Campaign Stopped", description: `"${selectedCampaign.name}" has been stopped.` });
        closeDialog();
    };

    const renderDialogContent = () => {
        if (!selectedCampaign || !actionType) return null;

        switch (actionType) {
            case 'details':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Campaign Details: {selectedCampaign.name}</DialogTitle>
                            <DialogDescription>
                                An overview of the campaign's configuration and status.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2">
                            <p><strong>Organization:</strong> {selectedCampaign.organization}</p>
                            <p><strong>Status:</strong> <Badge variant={selectedCampaign.status === "Active" ? "default" : "secondary"}>{selectedCampaign.status}</Badge></p>
                            <p><strong>Active Agents:</strong> {selectedCampaign.agents}</p>
                        </div>
                        <DialogFooter>
                            <Button onClick={closeDialog}>Close</Button>
                        </DialogFooter>
                    </>
                );
            case 'pause':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Pause Campaign: {selectedCampaign.name}?</DialogTitle>
                            <DialogDescription>
                                Pausing this campaign will prevent agents from making new calls. Are you sure?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                            <Button variant="destructive" onClick={handlePauseConfirm}>Pause Campaign</Button>
                        </DialogFooter>
                    </>
                );
            case 'stop':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Stop Campaign: {selectedCampaign.name}?</DialogTitle>
                            <DialogDescription>
                                This will permanently stop the campaign. This action cannot be undone. Are you sure?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                            <Button variant="destructive" onClick={handleStopConfirm}>Stop Campaign</Button>
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
                      <DropdownMenuItem onClick={() => handleActionClick(camp, 'details')}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleActionClick(camp, 'pause')}>Pause Campaign</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleActionClick(camp, 'stop')}>Stop Campaign</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog open={!!actionType} onOpenChange={open => !open && closeDialog()}>
        <DialogContent>
            {renderDialogContent()}
        </DialogContent>
    </Dialog>
    </>
  );
}
