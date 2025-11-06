"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, PlusCircle } from "lucide-react";
import { dialerLeads } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function DebtorProfilePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Leads</CardTitle>
          <CardDescription>A list of all leads assigned to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debtor</TableHead>
                <TableHead className="hidden md:table-cell">Amount Due</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dialerLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">${lead.amountDue.toFixed(2)}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">${lead.amountDue.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{lead.lastContact}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details: Emily White</DialogTitle>
            <DialogDescription>Update call outcome and manage lead information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm text-muted-foreground">Amount Due</Label>
                    <p className="font-semibold">$750.00</p>
                </div>
                 <div>
                    <Label className="text-sm text-muted-foreground">Last Contact</Label>
                    <p className="font-semibold">2024-07-20</p>
                </div>
             </div>
             <div className="space-y-2">
                <Label htmlFor="call-outcome">Call Outcome</Label>
                <Select>
                    <SelectTrigger id="call-outcome">
                        <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="no-answer">No Answer</SelectItem>
                        <SelectItem value="call-later">Call Later</SelectItem>
                        <SelectItem value="payment-promised">Payment Promised</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add call notes..."/>
             </div>
              <div className="space-y-2">
                <Label htmlFor="follow-up">Follow-up Date</Label>
                <Input id="follow-up" type="date"/>
             </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
