"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { dialerLeads } from "@/lib/data";
import type { DialerLead } from "@/lib/types";
import { Phone, PhoneOff, Mic, MicOff, Pause, ArrowRightLeft, Bot } from "lucide-react";

type CallStatus = "idle" | "dialing" | "active" | "ended";

export default function DialerPage() {
  const [callStatus, setCallStatus] = React.useState<CallStatus>("idle");
  const [currentLead, setCurrentLead] = React.useState<DialerLead | null>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [callNotes, setCallNotes] = React.useState("");

  const handleStartDialing = () => {
    // Simulate auto-dialer fetching the next lead
    setCallStatus("dialing");
    const nextLead = dialerLeads.find(lead => lead.id !== currentLead?.id) ?? dialerLeads[0];
    setCurrentLead(nextLead);

    // Simulate connection time
    setTimeout(() => {
      setCallStatus("active");
      setIsRecording(true);
      setCallNotes(""); // Reset notes for new call
    }, 2000);
  };

  const handleManualCall = (lead: DialerLead) => {
    setCallStatus("dialing");
    setCurrentLead(lead);
    setTimeout(() => {
      setCallStatus("active");
      setIsRecording(true);
      setCallNotes("");
    }, 1500);
  }

  const handleEndCall = () => {
    setCallStatus("ended");
    setIsRecording(false);
    // Simulate saving notes
    console.log("Call ended. Notes:", callNotes);
    setTimeout(() => {
      setCallStatus("idle");
      setCurrentLead(null);
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
            {callStatus === 'active' && currentLead && (
                 <div className="text-center p-4 rounded-lg bg-muted w-full">
                    <p className="font-semibold text-lg">{currentLead.name}</p>
                    <p className="text-muted-foreground">{currentLead.phone}</p>
                 </div>
            )}
           <Button 
                size="lg" 
                onClick={handleStartDialing} 
                disabled={callStatus !== 'idle'}
                className="w-full"
            >
             <Bot className="mr-2 h-5 w-5"/>
            {callStatus === 'idle' ? 'Start Auto-Dialing' : 'Auto-Dialer Running...'}
          </Button>
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
                    <Button variant="outline" size="icon">
                        <Pause />
                    </Button>
                     <Button variant="outline" size="icon">
                        <ArrowRightLeft />
                    </Button>
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleEndCall} className="w-full">
              <PhoneOff className="mr-2 h-4 w-4" />
              End Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
