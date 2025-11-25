
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, Loader2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { mockCampaigns } from "@/lib/data";

export default function SupervisorCampaignManagementPage() {
  const [campaigns, setCampaigns] = React.useState(mockCampaigns.filter(c => c.supervisor === 'Beatrice Njeri'));
  const { toast } = useToast();

  const handleDialModeChange = (campaignId: number, newMode: 'Auto' | 'Manual') => {
    setCampaigns(campaigns.map(c => c.id === campaignId ? { ...c, dialMode: newMode } : c));
    const campaign = campaigns.find(c => c.id === campaignId);
    toast({
        title: `Campaign Updated`,
        description: `${campaign?.name} dial mode set to ${newMode}.`,
    });
  };

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Campaign Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>My Campaigns</CardTitle>
            <CardDescription>Configure and manage dialing campaigns assigned to your teams.</CardDescription>
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
                                    <DropdownMenuItem>View Performance</DropdownMenuItem>
                                    <DropdownMenuItem>Assign Agents</DropdownMenuItem>
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
