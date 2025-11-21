
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Upload, MoreHorizontal, Loader2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const initialCampaigns = [
    { id: 1, name: 'Q3 Financial Push', type: 'Outbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: 5000, progress: 65, dialMode: 'Auto' as 'Auto' | 'Manual' },
    { id: 2, name: 'New Leads Outreach', type: 'Outbound', status: 'Active', supervisor: 'Beatrice Njeri', leads: 7500, progress: 40, dialMode: 'Auto' as 'Auto' | 'Manual' },
    { id: 3, name: 'Inbound Customer Service', type: 'Inbound', status: 'Active', supervisor: 'Andrew Mayaka', leads: 0, progress: 100, dialMode: 'Manual' as 'Auto' | 'Manual' },
    { id: 4, name: 'Past-Due Follow-up', type: 'Outbound', status: 'Paused', supervisor: 'Beatrice Njeri', leads: 2500, progress: 80, dialMode: 'Manual' as 'Auto' | 'Manual' },
];


export default function CampaignManagementPage() {
  const [campaigns, setCampaigns] = React.useState(initialCampaigns);
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedCampaign, setSelectedCampaign] = React.useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleDialModeChange = (campaignId: number, newMode: 'Auto' | 'Manual') => {
    setCampaigns(campaigns.map(c => c.id === campaignId ? { ...c, dialMode: newMode } : c));
    const campaign = campaigns.find(c => c.id === campaignId);
    toast({
        title: `Campaign Updated`,
        description: `${campaign?.name} dial mode set to ${newMode}.`,
    });
  };
  
  const handleUploadLeads = async () => {
      if (!selectedCampaign) {
          toast({ variant: 'destructive', title: 'Error', description: 'Please select a campaign.'});
          return;
      }
      setIsUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload
      
      const newLeadsCount = Math.floor(Math.random() * 500) + 100;

      setCampaigns(campaigns.map(c => c.id === parseInt(selectedCampaign) ? { ...c, leads: (c.leads || 0) + newLeadsCount } : c));

      setIsUploading(false);
      setIsUploadOpen(false);
      toast({
          title: "Leads Assigned Successfully",
          description: `${newLeadsCount} new leads have been assigned to agents in the "${campaigns.find(c => c.id === parseInt(selectedCampaign))?.name}" campaign.`,
      });
  }

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
                <Button variant="outline" onClick={() => setIsUploadOpen(true)}><Upload className="mr-2 h-4 w-4"/> Upload Lead List</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> New Campaign</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dial Mode</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead className="w-[20%]">Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {campaigns.map(campaign => (
                    <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.type}</TableCell>
                        <TableCell><Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>{campaign.status}</Badge></TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor={`dial-mode-${campaign.id}`} className="text-xs text-muted-foreground">Manual</Label>
                                <Switch
                                    id={`dial-mode-${campaign.id}`}
                                    checked={campaign.dialMode === 'Auto'}
                                    onCheckedChange={(checked) => handleDialModeChange(campaign.id, checked ? 'Auto' : 'Manual')}
                                    disabled={campaign.type === 'Inbound'}
                                />
                                <Label htmlFor={`dial-mode-${campaign.id}`} className="text-xs text-muted-foreground">Auto</Label>
                            </div>
                        </TableCell>
                        <TableCell>{campaign.leads?.toLocaleString() ?? 'N/A'}</TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                                <Progress value={campaign.progress} aria-label={`${campaign.progress}% complete`}/>
                                <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                            </div>
                        </TableCell>
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
      
      {/* Upload Leads Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Lead List</DialogTitle>
            <DialogDescription>
              Assign debtors to agents by uploading an Excel file. The file should contain primary keys for debtors and the assigned agent IDs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-select">Select Campaign</Label>
              <Select onValueChange={setSelectedCampaign}>
                <SelectTrigger id="campaign-select">
                  <SelectValue placeholder="Choose a campaign to add leads to" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.filter(c => c.type === 'Outbound').map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-file">Lead File (Excel)</Label>
              <Input id="lead-file" type="file" accept=".xls,.xlsx" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsUploadOpen(false)} disabled={isUploading}>Cancel</Button>
            <Button onClick={handleUploadLeads} disabled={isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
              Upload and Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
