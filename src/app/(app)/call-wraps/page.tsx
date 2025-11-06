
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { dispositionLogs, dispositionCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CallWrapsPage() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filteredLogs, setFilteredLogs] = React.useState(dispositionLogs);

    const getBadgeVariant = (outcome: string) => {
        switch (outcome) {
            case 'Paid / Settled': return 'default';
            case 'Promise to Pay (PTP)': return 'secondary';
            case 'Do Not Call (DNC)': return 'destructive';
            case 'Call Back Later':
            case 'Follow-Up Scheduled':
                return 'outline';
            default:
                return 'outline';
        }
    };
    
    React.useEffect(() => {
        const results = dispositionLogs.filter(log =>
            log.debtorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.disposition_type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLogs(results);
    }, [searchTerm]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Wrap History</CardTitle>
        <CardDescription>A log of all your recent call dispositions.</CardDescription>
      </CardHeader>
      <CardContent>
         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by lead or outcome..."
                    className="w-full rounded-lg bg-background pl-8 lg:w-[336px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
               <Select defaultValue="this-week">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.call_id}>
                <TableCell>
                  <div className="font-medium">{log.debtorName}</div>
                  <div className="text-sm text-muted-foreground sm:hidden">{log.timestamp}</div>
                </TableCell>
                <TableCell>
                    <Badge variant={getBadgeVariant(log.disposition_type)}>{log.disposition_type}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{log.call_duration}</TableCell>
                <TableCell className="hidden sm:table-cell">{log.timestamp}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground max-w-xs truncate">
                    {log.disposition_notes || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

