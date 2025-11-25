
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dialerLeads } from "@/lib/data";
import type { DialerLead } from "@/lib/types";
import { Phone, Bot } from "lucide-react";
import { useCall } from "@/context/CallProvider";


// Mock of the current campaign setting. In a real app, this would come from a context or a fetch.
const currentCampaignDialMode: 'Auto' | 'Manual' = 'Auto'; 

export default function DialerPage() {
  const { startCall, callStatus } = useCall();
  const [campaignMode, setCampaignMode] = React.useState<'Auto' | 'Manual'>(currentCampaignDialMode);
  
  const handleStartAutoDialing = () => {
    // In a real app, you'd fetch the next lead from a queue.
    // For this mock, we'll just grab a random one that isn't the current lead.
    const nextLead = dialerLeads.find(lead => lead.id !== 'd1') ?? dialerLeads[0];
    startCall(nextLead);
  };

  const handleManualCall = (lead: DialerLead) => {
    startCall(lead);
  }

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
    </div>
  );
}
