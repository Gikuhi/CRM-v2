
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Play, Pause, Trash2, Filter, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockCampaigns } from "@/lib/data";
import { format } from "date-fns";

const initialCampaignQueues = [
    { id: 'q1', name: 'Q3 Broken PTPs', campaign: 'Q3 Financial Push', status: 'Active' as 'Active' | 'Scheduled' | 'Paused', filters: ['Broken PTP'], startTime: '2024-08-15 09:00', size: 125 },
    { id: 'q2', name: 'New Leads - First Contact', campaign: 'New Leads Outreach', status: 'Scheduled' as 'Active' | 'Scheduled' | 'Paused', filters: ['New Lead'], startTime: '2024-08-16 10:00', size: 850 },
    { id: 'q3', name: 'Past-Due Follow-up (No RPC)', campaign: 'Past-Due Follow-up', status: 'Paused' as 'Active' | 'Scheduled' | 'Paused', filters: ['No RPC'], startTime: '2024-08-14 14:00', size: 45 },
    { id: 'q4', name: 'Q3 High-Value Targets', campaign: 'Q3 Financial Push', status: 'Active' as 'Active' | 'Scheduled' | 'Paused', filters: ['Balance > 50k'], startTime: '2024-08-15 11:00', size: 30 },
];

export default function QueueAndRoutingPage() {
  const [queues, setQueues] = React.useState(initialCampaignQueues);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleCreateQueue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const newQueue = {
      id: `q${queues.length + 1}`,
      name: formData.get("name") as string,
      campaign: mockCampaigns.find(c => String(c.id) === (formData.get("campaign") as string))?.name || 'Unknown Campaign',
      status: 'Scheduled' as 'Active' | 'Scheduled' | 'Paused',
      filters: ['Custom'],
      startTime: `${formData.get("start-date")} ${formData.get("start-time")}`,
      size: Math.floor(Math.random() * 200) + 50, // Mock size
    };

    setTimeout(() => {
      setQueues(prev => [newQueue, ...prev]);
      setIsSubmitting(false);
      setIsFormOpen(false);
      toast({
        title: "Queue Created",
        description: `The queue "${newQueue.name}" has been successfully created.`,
      });
    }, 1500);
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), "yyyy-MM-dd, hh:mm a");
    } catch {
      return dateTimeString;
    }
  }


  return (
    <div className="space-y-6">
       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Campaign Queue Management</h1>
             <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Queue</Button>
            </DialogTrigger>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Active & Scheduled Queues</CardTitle>
            <CardDescription>Manage dialing queues for specific campaigns, filters, and start times.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Queue Name</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Filters</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {queues.map(queue => (
                        <TableRow key={queue.id}>
                            <TableCell className="font-medium">{queue.name}</TableCell>
                            <TableCell>{queue.campaign}</TableCell>
                            <TableCell>
                                <Badge variant={queue.status === 'Active' ? 'default' : 'secondary'}>{queue.status}</Badge>
                            </TableCell>
                            <TableCell>{queue.size}</TableCell>
                            <TableCell>{formatDateTime(queue.startTime)}</TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    {queue.filters.map(filter => <Badge key={filter} variant="outline"><Filter className="h-3 w-3 mr-1"/>{filter}</Badge>)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button variant="ghost" size="icon" title={queue.status === 'Active' ? 'Pause' : 'Start'}>
                                    {queue.status === 'Active' ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                                </Button>
                                <Button variant="ghost" size="icon" title="Delete" className="text-destructive">
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

         <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create New Campaign Queue</DialogTitle>
                <DialogDescription>
                Create a targeted queue for a campaign with specific start times and debtor filters.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateQueue}>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Queue Name</Label>
                        <Input id="name" name="name" placeholder="e.g., High-Value Broken PTPs" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="campaign">Target Campaign</Label>
                        <Select name="campaign" required>
                            <SelectTrigger id="campaign">
                                <SelectValue placeholder="Select a campaign" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockCampaigns.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" name="start-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input id="start-time" name="start-time" type="time" defaultValue="09:00" required/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="flex items-center gap-2"><Filter className="h-4 w-4"/> Disposition Filters</Label>
                        <div className="p-4 border rounded-md grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-broken-ptp" name="filter-broken-ptp"/>
                                <Label htmlFor="filter-broken-ptp">Broken PTPs</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-rpc-no-ptp" name="filter-rpc-no-ptp"/>
                                <Label htmlFor="filter-rpc-no-ptp">RPC without PTP</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-no-contact" name="filter-no-contact"/>
                                <Label htmlFor="filter-no-contact">No Contact (7+ days)</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="filter-disputed" name="filter-disputed"/>
                                <Label htmlFor="filter-disputed">Disputed Debt</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-busy" name="filter-busy"/>
                                <Label htmlFor="filter-busy">Line Busy</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-invalid" name="filter-invalid"/>
                                <Label htmlFor="filter-invalid">Invalid Number</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="filter-pay-today" name="filter-pay-today"/>
                                <Label htmlFor="filter-pay-today">Will Pay Today</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="filter-awaiting-payment" name="filter-awaiting-payment"/>
                                <Label htmlFor="filter-awaiting-payment">Awaiting Confirmation</Label>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Add a description for this queue..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Create Queue
                    </Button>
                </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
    </div>
  );
}
