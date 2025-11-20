
"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAuditLogs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function SuperAdminAuditPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredLogs = mockAuditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resourceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.organization && log.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Audit & Compliance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Global Audit Trail</CardTitle>
          <CardDescription>Track all significant actions taken by any user across all organizations.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative flex-1 md:grow-0 mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Filter logs by user, action, organization, or resource..."
                    className="w-full rounded-lg bg-background pl-8 lg:w-[400px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource ID</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.organization}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs">{log.resourceId}</div>
                    </TableCell>
                    <TableCell className="text-right">{log.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
