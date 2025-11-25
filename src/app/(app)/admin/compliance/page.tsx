
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Trash2, PlayCircle, Filter } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { callLogs, mockAuditLogs } from "@/lib/data";

const dncList = [
    { id: 'dnc1', phone: '555-0104', debtorName: 'Chris Taylor', dateAdded: '2024-07-31' },
    { id: 'dnc2', phone: '555-0111', debtorName: 'New Request', dateAdded: '2024-07-28' },
];

export default function ComplianceAndQAPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredLogs = mockAuditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resourceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compliance & QA</h1>
      
      <Tabs defaultValue="recordings">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recordings">Call Recordings</TabsTrigger>
          <TabsTrigger value="dnc">Do Not Call List</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recordings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Recordings</CardTitle>
              <CardDescription>Access and playback call recordings for quality assurance and compliance checks.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative flex-1 md:grow-0 mb-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Filter by debtor or agent..."
                        className="w-full rounded-lg bg-background pl-8 lg:w-[400px]"
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Debtor</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {callLogs.slice(0, 5).map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{log.debtorName}</TableCell>
                                <TableCell>{log.agent}</TableCell>
                                <TableCell>{log.date}</TableCell>
                                <TableCell>{log.duration}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <PlayCircle className="h-5 w-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dnc" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Do Not Call (DNC) List</CardTitle>
              <CardDescription>Manage the DNC list to ensure compliance with regulations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search DNC list..."
                            className="w-full rounded-lg bg-background pl-8 lg:w-[400px]"
                        />
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4"/> Add Number</Button>
                </div>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Debtor Name</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dncList.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono">{item.phone}</TableCell>
                                <TableCell>{item.debtorName}</TableCell>
                                <TableCell>{item.dateAdded}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="mt-4">
            <Card>
                <CardHeader>
                <CardTitle>Full Audit Log</CardTitle>
                <CardDescription>Track all significant user actions and system events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative flex-1 md:grow-0 mb-6">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Filter logs by user, action, or resource..."
                            className="w-full rounded-lg bg-background pl-8 lg:w-[400px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Resource</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.user}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{log.action}</Badge>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
