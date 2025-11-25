
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { dispositionCategories } from "@/lib/data";
import { PhoneOff, Mic, MicOff, Pause, ArrowRightLeft, Save, ArrowRight, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { useCall } from "@/context/CallProvider";

export function GlobalCallManager() {
  const { callStatus, setCallStatus, currentLead, clearCall } = useCall();
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [callNotes, setCallNotes] = React.useState("");
  const [disposition, setDisposition] = React.useState<string>("");
  const [isRpcConfirmed, setIsRpcConfirmed] = React.useState(false);

  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (callStatus === "dialing") {
      const timer = setTimeout(() => {
        setCallStatus("active");
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (callStatus === "active") {
        setIsRecording(true);
        setCallNotes("");
        setDisposition("");
        setIsRpcConfirmed(false);
    }
  }, [callStatus, setCallStatus]);

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
  };

  const resetAndClose = () => {
    setCallStatus("idle");
    clearCall();
  };

  return (
    <>
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
      <Dialog open={callStatus === 'wrap-up'} onOpenChange={(open) => !open && resetAndClose()}>
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
            <Button variant="secondary" onClick={resetAndClose}>Cancel</Button>
            <Button onClick={() => {
                // Here you would submit the wrap-up data.
                // For now, we just close and go to the wrap matter page.
                resetAndClose();
                router.push('/wrap-matter');
             }} disabled={!isRpcConfirmed}>
                Wrap Matter
                <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
