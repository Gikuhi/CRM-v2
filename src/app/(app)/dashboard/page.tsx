import { DashboardStats } from "@/components/dashboard-stats";
import { DebtorQueue } from "@/components/debtor-queue";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { tasks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Your performance for today.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Calls Made</span>
                        <span className="text-sm text-muted-foreground">68 / 100</span>
                    </div>
                    <Progress value={68} />
                 </div>
                  <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Collections</span>
                        <span className="text-sm text-muted-foreground">$2,350 / $4,000</span>
                    </div>
                    <Progress value={58} />
                 </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Status</CardTitle>
                 <CardDescription>Your current availability.</CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center h-full gap-4">
                <Badge variant="default" className="text-lg px-4 py-2">Available</Badge>
                <p className="text-muted-foreground text-sm">Working Time: 04:32:10</p>
                <Button variant="destructive">Report Issue</Button>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Upcoming Follow-ups</CardTitle>
          <CardDescription>Tasks that are due soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debtor</TableHead>
                <TableHead className="hidden sm:table-cell">Task</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.slice(0, 3).map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.debtorName}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{task.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                     <Button size="sm" variant="outline">
                        <Clock className="mr-2 h-4 w-4" />
                        Snooze
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
