
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Check, X } from "lucide-react";
import { callLogs } from "@/lib/data";

export default function CallLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Logs</CardTitle>
        <CardDescription>A comprehensive log of all recorded calls.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Debtor</TableHead>
              <TableHead className="hidden md:table-cell">Agent</TableHead>
              <TableHead className="hidden sm:table-cell">Outcome</TableHead>
              <TableHead className="hidden md:table-cell">RPC</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Recording</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="font-medium">{log.debtorName}</div>
                  <div className="text-sm text-muted-foreground sm:hidden">{log.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{log.agent}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{log.outcome}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {log.rpc_status ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        <X className="h-5 w-5 text-red-500" />
                    }
                </TableCell>
                <TableCell className="hidden md:table-cell">{log.duration}</TableCell>
                <TableCell className="hidden sm:table-cell">{log.date}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <PlayCircle className="h-5 w-5" />
                    <span className="sr-only">Play recording</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
