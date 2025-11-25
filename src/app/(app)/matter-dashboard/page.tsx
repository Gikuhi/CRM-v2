
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, FileText, Landmark, User, Workflow, CheckCircle, PlusCircle, CalendarPlus, Loader2, Filter, Phone, Mail, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const DetailRow = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string }) => {
    const Icon = icon;
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
                <span className="font-medium">{label}:</span> {value}
            </div>
        </div>
    )
};

export default function MatterDashboardPage() {
  const [isRpcConfirmed, setIsRpcConfirmed] = React.useState(false);
  const [isQueueDialogOpen, setIsQueueDialogOpen] = React.useState(false);
  const [isScheduling, setIsScheduling] = React.useState(false);
  const { toast } = useToast();
  const debtorId = "mock-debtor-123"; // Mock debtorId for navigation

  const handleRpcConfirm = () => {
    setIsRpcConfirmed(true);
    toast({
        title: "✅ RPC Confirmed",
        description: "You can now wrap the call.",
    });
  };

  const handleAddToQueue = async () => {
    setIsScheduling(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate async operation
    setIsScheduling(false);
    setIsQueueDialogOpen(false);
    toast({
        title: "Debtor Scheduled",
        description: "Joyce Wanjohi Maina has been added to the callback queue.",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Matter Dashboard</h1>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setIsQueueDialogOpen(true)}>
                <CalendarPlus className="mr-2 h-4 w-4" /> Add to Queue
            </Button>
          <Button asChild>
            <Link href={`/debtor/${debtorId}/add-ptp`}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add PTP
            </Link>
          </Button>
          <Link href="/wrap-matter">
            <Button>Wrap Matter</Button>
          </Link>
          <Button variant="secondary">Query</Button>
          <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button 
                            onClick={handleRpcConfirm} 
                            disabled={isRpcConfirmed} 
                            variant="secondary"
                            className={cn(
                                isRpcConfirmed && 'bg-green-600 hover:bg-green-700 text-white'
                            )}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {isRpcConfirmed ? "RPC Confirmed" : "RPC"}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Mark this call as a Right Party Contact.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Main Content Column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Matter Description</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3">
              <InfoItem label="Debtor" value="Joyce Wanjohi Maina" />
              <InfoItem label="Matter State" value="Broken PTP - Voicemail" />
              <InfoItem label="Pay@ No" value="-" />
              <InfoItem label="Account no" value="Tim74375049584" />
              <InfoItem label="Client Name" value="Absa Kenya - Timiza" />
              <InfoItem label="Group Name" value="Absa Bank Kenya" />
              <InfoItem label="Branch" value="CONTINGENT - [NIKE]" />
              <InfoItem label="Department" value="Call Centre" />
              <InfoItem label="Product" value="Absa Timiza Loan" />
              <InfoItem label="Class & Suite" value="Default - N/A" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PTP Captured Info</CardTitle>
              <CardDescription>
                Existing Payment Plan (Amount Driven Captured by "Name of
                Agent")
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <InfoItem label="PTP Captured Date" value="10 Jul 2024" />
                <InfoItem
                  label="Initial Payment Date"
                  value="10 Jul 2024"
                />
                <InfoItem label="PTP Captured by" value="Agent Name" />
                <InfoItem label="Initial Payment Amount" value="Ksh. XXXXX" />
                <InfoItem label="PTP Status" value="Broken PTP - No payment" />
                <InfoItem
                  label="Initial Payment Method"
                  value="Direct Deposit"
                />
                <div className="col-span-2">
                   <Button variant="outline" size="sm">
                        Transactions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <InfoItem
                  label="Recurring Payment Date"
                  value="10 Jul 2025"
                />
                <InfoItem
                  label="Recurring Payment Amount"
                  value="Ksh. XXXXX"
                />
                <InfoItem
                  label="Recurring Payment Method"
                  value="Direct Deposit"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6 lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Verification & Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-start space-x-2">
                        <Checkbox id="verify-debtor" className="mt-1" />
                        <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="verify-debtor"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Verify Debtors Details
                        </label>
                        <p className="text-sm text-muted-foreground">
                            In order for me to validate that I am talking to the right person.
                        </p>
                        </div>
                    </div>
                     <div>
                        <Label>Select Preferred Communication Channels</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                           <Input placeholder="SMS" disabled/>
                           <Input placeholder="Email"/>
                        </div>
                    </div>
                     <div>
                        <Label>Select Incoming Call Reason</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                           <Select>
                               <SelectTrigger><SelectValue placeholder="SMS Category"/></SelectTrigger>
                               <SelectContent><SelectItem value="cat1">Category 1</SelectItem></SelectContent>
                           </Select>
                            <Select>
                               <SelectTrigger><SelectValue placeholder="Call Reason"/></SelectTrigger>
                               <SelectContent><SelectItem value="reason1">Reason 1</SelectItem></SelectContent>
                           </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Additional Actions</CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <User className="mr-2 h-4 w-4"/> Debtor Information
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pt-2">
                                <DetailRow icon={Phone} label="Phone" value="0712 345 678" />
                                <DetailRow icon={Mail} label="Email" value="joyce.maina@example.com" />
                                <DetailRow icon={MapPin} label="Address" value="123 Nairobi, Kenya" />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <Landmark className="mr-2 h-4 w-4" /> Payment History
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pt-2">
                                <p className="text-sm">Last Payment: <strong>KES 1,000</strong> on <strong>15 May 2024</strong></p>
                                <p className="text-sm">Total Paid: <strong>KES 5,500</strong></p>
                                <p className="text-sm">PTPs Kept: <strong>2 / 5</strong></p>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <Workflow className="mr-2 h-4 w-4" /> Linked Matters
                            </AccordionTrigger>
                            <AccordionContent className="pt-2">
                                <p className="text-sm text-muted-foreground">No linked matters for this debtor.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {/* Add to Queue Dialog */}
      <Dialog open={isQueueDialogOpen} onOpenChange={setIsQueueDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Campaign Queue</DialogTitle>
            <DialogDescription>
              Create a targeted queue for a campaign with specific start times and debtor filters.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-select">Target Campaign</Label>
              <Select defaultValue="q3-financial-push">
                <SelectTrigger id="campaign-select">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q3-financial-push">Q3 Financial Push</SelectItem>
                  <SelectItem value="new-leads-outreach">New Leads Outreach</SelectItem>
                  <SelectItem value="past-due-follow-up">Past-Due Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="callback-date">Queue Start Date</Label>
                    <Input id="callback-date" type="date" defaultValue={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="callback-time">Queue Start Time</Label>
                    <Input id="callback-time" type="time" defaultValue="09:00" />
                </div>
             </div>
             <div className="space-y-4">
                <Label className="flex items-center gap-2"><Filter className="h-4 w-4"/> Disposition Filters</Label>
                <div className="p-4 border rounded-md space-y-4">
                   <div className="flex items-center space-x-2">
                        <Checkbox id="filter-broken-ptp" />
                        <Label htmlFor="filter-broken-ptp">Broken PTPs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filter-rpc-no-ptp" />
                        <Label htmlFor="filter-rpc-no-ptp">RPC without PTP</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="filter-no-contact" />
                        <Label htmlFor="filter-no-contact">No Contact in Last 7 Days</Label>
                    </div>
                </div>
                 <Textarea placeholder="Add a description for this queue..."/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsQueueDialogOpen(false)} disabled={isScheduling}>Cancel</Button>
            <Button onClick={handleAddToQueue} disabled={isScheduling}>
                {isScheduling && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Create Queue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    