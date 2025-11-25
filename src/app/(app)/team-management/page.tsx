
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teamMembers, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MoreHorizontal, X, MessageSquare, Repeat, History, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { TeamMember } from "@/lib/types";

type ActionType = "activity" | "reassign" | "message";

export default function TeamManagementPage() {
  const [selectedAgent, setSelectedAgent] = React.useState<TeamMember | null>(null);
  const [actionType, setActionType] = React.useState<ActionType | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const handleActionClick = (agent: TeamMember, type: ActionType) => {
    setSelectedAgent(agent);
    setActionType(type);
  };

  const closeDialog = () => {
    setSelectedAgent(null);
    setActionType(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async action
    
    let toastTitle = "";
    let toastDescription = "";

    if (actionType === 'reassign') {
        toastTitle = "Leads Reassigned";
        toastDescription = `Leads have been successfully reassigned from ${selectedAgent?.name}.`;
    } else if (actionType === 'message') {
        toastTitle = "Message Sent";
        toastDescription = `Your message has been sent to ${selectedAgent?.name}.`;
    }

    toast({ title: toastTitle, description: toastDescription });
    setIsSubmitting(false);
    closeDialog();
  };

  const agents = users.filter(u => u.role === 'Agent');

  const renderDialogContent = () => {
    if (!selectedAgent) return null;

    switch (actionType) {
      case "activity":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Recent Activity for {selectedAgent.name}</DialogTitle>
              <DialogDescription>A log of the agent's recent actions.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="text-sm"><strong>Today:</strong> Logged in at 8:05 AM</div>
              <div className="text-sm"><strong>10m ago:</strong> Completed call with J. Doe (PTP)</div>
              <div className="text-sm"><strong>30m ago:</strong> Started break (15 mins)</div>
              <div className="text-sm"><strong>1h ago:</strong> Made 12 calls</div>
            </div>
            <DialogFooter>
                <Button onClick={closeDialog}>Close</Button>
            </DialogFooter>
          </>
        );
      case "reassign":
        return (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Reassign Leads from {selectedAgent.name}</DialogTitle>
              <DialogDescription>Transfer leads to another agent.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reassign-to">Reassign to</Label>
                <Select>
                  <SelectTrigger id="reassign-to">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.filter(a => a.id !== selectedAgent.id).map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-count">Number of Leads to Transfer</Label>
                <Input id="lead-count" type="number" placeholder="e.g. 50" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeDialog} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Repeat className="mr-2 h-4 w-4" />}
                Reassign
              </Button>
            </DialogFooter>
          </form>
        );
      case "message":
        return (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Send Message to {selectedAgent.name}</DialogTitle>
              <DialogDescription>Compose and send a direct message.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <Label htmlFor="message-content">Message</Label>
              <Textarea id="message-content" placeholder="Type your message here..." rows={4} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeDialog} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MessageSquare className="mr-2 h-4 w-4" />}
                Send Message
              </Button>
            </DialogFooter>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Team</CardTitle>
          <CardDescription>Manage your agents, assign leads, and monitor their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Accounts Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Badge 
                        className={cn({
                            'bg-green-500/20 text-green-400 border-green-500/20': member.status === 'Online',
                            'bg-red-500/20 text-red-400 border-red-500/20': member.status === 'Offline',
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/20': member.status === 'On Call',
                            'bg-blue-500/20 text-blue-400 border-blue-500/20': member.status === 'Break',
                        })}
                        variant="outline"
                    >
                        {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.accountsAssigned}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost"><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleActionClick(member, 'activity')}>
                                <History className="mr-2 h-4 w-4"/> View Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleActionClick(member, 'reassign')}>
                                <Repeat className="mr-2 h-4 w-4"/> Reassign Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleActionClick(member, 'message')}>
                                <MessageSquare className="mr-2 h-4 w-4"/> Send Message
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!actionType} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
            {renderDialogContent()}
        </DialogContent>
      </Dialog>
    </>
  );
}
