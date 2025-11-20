
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
import { ChevronDown, FileText, Landmark, User, Workflow, CheckCircle, PlusCircle, CalendarPlus, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

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
                            <AccordionContent>
                                More debtor details can be displayed here.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <Landmark className="mr-2 h-4 w-4" /> Payment History
                            </AccordionTrigger>
                            <AccordionContent>
                                A table or list of past payments can go here.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <Workflow className="mr-2 h-4 w-4" /> Linked Matters
                            </AccordionTrigger>
                            <AccordionContent>
                                Information about linked accounts.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <FileText className="mr-2 h-4 w-4" /> Document Upload
                            </AccordionTrigger>
                            <AccordionContent>
                                Interface for uploading documents related to the matter.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {/* Add to Queue Dialog */}
      <Dialog open={isQueueDialogOpen} onOpenChange={setIsQueueDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Debtor to Callback Queue</DialogTitle>
            <DialogDescription>
              Schedule a specific time to call this debtor back. They will be added to the appropriate queue automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="callback-date">Callback Date</Label>
              <Input id="callback-date" type="date" defaultValue={new Date().toISOString().split("T")[0]}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-time">Callback Time</Label>
              <Input id="callback-time" type="time" defaultValue="10:00" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="queue-select">Queue</Label>
                 <Select defaultValue="general-callback">
                    <SelectTrigger id="queue-select">
                        <SelectValue placeholder="Select a queue" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general-callback">General Callback</SelectItem>
                        <SelectItem value="high-priority-callback">High Priority Callback</SelectItem>
                        <SelectItem value="supervisor-review">Supervisor Review</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsQueueDialogOpen(false)} disabled={isScheduling}>Cancel</Button>
            <Button onClick={handleAddToQueue} disabled={isScheduling}>
                {isScheduling && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Schedule Callback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
