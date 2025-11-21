
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { dialerLeads, dispositionCategories } from "@/lib/data";
import type { CallDisposition, DialerLead } from "@/lib/types";
import { Phone, PhoneOff, Mic, MicOff, Pause, ArrowRightLeft, Bot, Save, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type CallStatus = "idle" | "dialing" | "active" | "wrap-up" | "ended";
// Mock of the current campaign setting. In a real app, this would come from a context or a fetch.
const currentCampaignDialMode: 'Auto' | 'Manual' = 'Auto'; 

export default function DialerPage() {
  const [callStatus, setCallStatus] = React.useState<CallStatus>("idle");
  const [currentLead, setCurrentLead] = React.useState<DialerLead | null>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [callNotes, setCallNotes] = React.useState("");
  const [disposition, setDisposition] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRpcConfirmed, setIsRpcConfirmed] = React.useState(false);
  const [campaignMode, setCampaignMode] = React.useState<'Auto' | 'Manual'>(currentCampaignDialMode);

  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useAuth();
  const router = useRouter();
  
  const startCall = (lead: DialerLead) => {
    setCallStatus("dialing");
    setCurrentLead(lead);
    setIsRpcConfirmed(false); // Reset RPC status for new call

    setTimeout(() => {
      setCallStatus("active");
      setIsRecording(true);
      setCallNotes("");
      setDisposition("");
    }, 1500);
  }

  const handleStartAutoDialing = () => {
    const nextLead = dialerLeads.find(lead => lead.id !== currentLead?.id) ?? dialerLeads[0];
    startCall(nextLead);
  };

  const handleManualCall = (lead: DialerLead) => {
    startCall(lead);
  }

  const handleEndCall = () => {
    setCallStatus("wrap-up");
    setIsRecording(false);
  };

  const handleRpcConfirm = () => {
    setIsRpcConfirmed(true);
    toast({
        title: "✅ RPC Confirmed",
        description: "You can now wrap the call.",
    });
    // Here you would also update Firestore for the current call log
    // For now, we just update the state
  };

  const handleDispositionSubmit = async () => {
    if (!disposition) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please select a call disposition.",
        });
        return;
    }
    if (disposition === "Other" && !callNotes) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Notes are required when 'Other' is selected.",
        });
        return;
    }

    setIsSubmitting(true);

    const dispositionData: Omit<CallDisposition, 'call_id' | 'timestamp' | 'rpc_timestamp'> = {
        agent_id: user?.uid ?? 'unknown_agent',
        lead_id: currentLead?.id ?? 'unknown_lead',
        disposition_type: disposition,
        disposition_notes: callNotes,
        call_duration: "3m 45s", // Mock duration
        campaign_id: "q3-push", // Mock campaign
        outcome_score: Math.floor(Math.random() * 5) + 1, // Mock score
        rpc_status: isRpcConfirmed,
    };
    
    const dataToSave = isRpcConfirmed 
      ? { ...dispositionData, timestamp: serverTimestamp(), rpc_timestamp: serverTimestamp() }
      : { ...dispositionData, timestamp: serverTimestamp() };

    // Non-blocking write to Firestore
    const dispositionsRef = collection(firestore, 'call_dispositions');
    addDocumentNonBlocking(dispositionsRef, dataToSave);

    console.log("Saving disposition:", dataToSave);
    
    setTimeout(() => {
        toast({
            title: "Disposition Saved",
            description: `Outcome for ${currentLead?.name} logged successfully.`,
        });

        setIsSubmitting(false);
        setCallStatus("ended");

        setTimeout(() => {
            setCallStatus("idle");
            setCurrentLead(null);
        }, 1000);
    }, 1000);
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Dialer Control</CardTitle>
          <CardDescription>Start the auto-dialer or manually call a lead.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-center">
                <p className="text-muted-foreground">Current Status</p>
                <p className="text-2xl font-bold capitalize">{callStatus}</p>
            </div>
            {(callStatus === 'active' || callStatus === 'wrap-up') && currentLead && (
                 <div className="text-center p-4 rounded-lg bg-muted w-full">
                    <p className="font-semibold text-lg">{currentLead.name}</p>
                    <p className="text-muted-foreground">{currentLead.phone}</p>
                 </div>
            )}
           <Button 
                size="lg" 
                onClick={handleStartAutoDialing} 
                disabled={callStatus !== 'idle' || campaignMode === 'Manual'}
                className="w-full"
            >
             <Bot className="mr-2 h-5 w-5"/>
             {campaignMode === 'Manual' ? 'Auto-Dialing Disabled' : (callStatus === 'idle' ? 'Start Auto-Dialing' : 'Auto-Dialer Running...')}
          </Button>
          {campaignMode === 'Manual' && <p className="text-xs text-muted-foreground text-center">The current campaign is in manual-only mode. Please select a lead from the list to start a call.</p>}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Manual Dial List</CardTitle>
          <CardDescription>Click to call a specific debtor.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dialerLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{lead.phone}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleManualCall(lead)}
                        disabled={callStatus !== 'idle'}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* In-Call Dialog */}
      <Dialog open={callStatus === 'active'} onOpenChange={(open) => !open && handleEndCall()}>
        <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>In Call with: {currentLead?.name}</DialogTitle>
            <DialogDescription>
              Account Balance: ${currentLead?.amountDue.toFixed(2)} | Last Contact: {currentLead?.lastContact}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="call-notes">Call Notes</Label>
                <Textarea 
                    id="call-notes" 
                    placeholder="Enter notes about the conversation..." 
                    rows={6}
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-2 h-2 rounded-full bg-red-500 ${isRecording ? 'animate-pulse' : ''}`}></div>
                    {isRecording ? 'Recording...' : 'Not Recording'}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <MicOff /> : <Mic />}
                    </Button>
                    <Button variant="outline" size="icon"><Pause /></Button>
                    <Button variant="outline" size="icon"><ArrowRightLeft /></Button>
                </div>
            </div>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button 
                            onClick={handleRpcConfirm} 
                            disabled={isRpcConfirmed} 
                            className={cn(
                                'w-full',
                                isRpcConfirmed && 'bg-green-600 hover:bg-green-700'
                            )}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {isRpcConfirmed ? "RPC Confirmed" : "Right Party Contact (RPC)"}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Mark this call as a Right Party Contact.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Button variant="destructive" onClick={handleEndCall} className="w-full">
              <PhoneOff className="mr-2 h-4 w-4" />
              End Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Wrap-Up Dialog */}
      <Dialog open={callStatus === 'wrap-up'} onOpenChange={(open) => !open && setCallStatus("idle")}>
        <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Call Wrap-Up: {currentLead?.name}</DialogTitle>
            <DialogDescription>
              {isRpcConfirmed
                ? "Select the call outcome and add any final notes before proceeding."
                : "Right Party Contact not confirmed. Select a non-contact outcome."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="disposition">Call Disposition</Label>
                <Select value={disposition} onValueChange={setDisposition} disabled={!isRpcConfirmed}>
                    <SelectTrigger id="disposition">
                        <SelectValue placeholder={isRpcConfirmed ? "Select call outcome..." : "RPC not confirmed"} />
                    </SelectTrigger>
                    <SelectContent>
                        {dispositionCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="wrap-up-notes">Final Notes</Label>
                <Textarea 
                    id="wrap-up-notes" 
                    placeholder="Add final notes here..." 
                    rows={4}
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                />
                 {disposition === 'Other' && <p className="text-xs text-destructive">Notes are required for 'Other' disposition.</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCallStatus("idle")}>Cancel</Button>
            <Button onClick={() => router.push('/wrap-matter')} disabled={isSubmitting || !isRpcConfirmed}>
                Wrap Matter
                <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
