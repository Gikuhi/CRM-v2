import { DashboardStats } from "@/components/dashboard-stats";
import { PerformanceOverview } from "@/components/performance-overview";
import { DebtorQueue } from "@/components/debtor-queue";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { callLogs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <DashboardStats />
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-1 xl:col-span-2">
            <PerformanceOverview />
        </div>
        <div className="lg:col-span-1 xl:col-span-1">
            <DebtorQueue />
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Recent Call Logs</CardTitle>
          <CardDescription>A log of the most recent calls made.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debtor</TableHead>
                <TableHead className="hidden sm:table-cell">Outcome</TableHead>
                <TableHead className="hidden md:table-cell">Agent</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callLogs.slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="font-medium">{log.debtorName}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{log.outcome}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{log.agent}</TableCell>
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
