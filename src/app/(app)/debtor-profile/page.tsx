

"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Phone } from "lucide-react";
import { dialerLeads } from "@/lib/data";
import React from "react";
import Link from "next/link";
import { useCall } from "@/context/CallProvider";

export default function DebtorProfilePage() {
  const { startCall } = useCall();

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
                <TableHead className="hidden sm:table-cell">Last Contact</TableHead>
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
                  <TableCell className="text-right space-x-2">
                    <Link href={`/debtor/${lead.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                     <Button size="sm" onClick={() => startCall(lead)}>
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
    </>
  );
}
