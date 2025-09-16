import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { callLogs } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CallMonitoringPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Monitoring</CardTitle>
        <CardDescription>Review call recordings and assess compliance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Call Details</TableHead>
              <TableHead className="hidden md:table-cell">Agent</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead className="hidden md:table-cell">Compliance Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="font-medium">{log.debtorName}</div>
                  <div className="text-sm text-muted-foreground">{log.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{log.agent}</TableCell>
                <TableCell className="hidden sm:table-cell">{log.duration}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-1">
                     <Select defaultValue="4">
                      <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue placeholder="Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5].map(rate => (
                            <SelectItem key={rate} value={String(rate)}>{rate} Stars</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
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
