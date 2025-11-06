
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { tasks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AgentStatusMenu } from "@/components/agent-status-menu";

export default function DashboardPage() {
  const dailyTarget = {
    calls: { current: 68, target: 100 },
    collections: { current: 2350, target: 4000 },
    successRate: { current: 12, target: 15 },
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
                <CardDescription>Your performance towards today's goals.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Calls Made</span>
                        <span className="text-sm text-muted-foreground">{dailyTarget.calls.current} / {dailyTarget.calls.target}</span>
                    </div>
                    <Progress value={(dailyTarget.calls.current / dailyTarget.calls.target) * 100} />
                 </div>
                  <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Collections</span>
                        <span className="text-sm text-muted-foreground">${dailyTarget.collections.current.toLocaleString()} / ${dailyTarget.collections.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(dailyTarget.collections.current / dailyTarget.collections.target) * 100} />
                 </div>
                  <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-sm text-muted-foreground">{dailyTarget.successRate.current}% / {dailyTarget.successRate.target}%</span>
                    </div>
                    <Progress value={(dailyTarget.successRate.current / dailyTarget.successRate.target) * 100} />
                 </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>My Status</CardTitle>
                 <CardDescription>Your current availability and actions.</CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center h-full gap-4">
                <Badge variant="default" className="text-lg px-4 py-2">Available</Badge>
                <p className="text-muted-foreground text-sm">Working Time: 04:32:10</p>
                <AgentStatusMenu />
                <Button variant="outline" size="sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Issue
                </Button>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Upcoming Follow-ups</CardTitle>
          <CardDescription>Your highest priority tasks that are due soon.</CardDescription>
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
                  <TableCell className="text-right space-x-2">
                     <Button size="sm" variant="outline">
                        <Clock className="mr-2 h-4 w-4" />
                        Snooze
                     </Button>
                     <Button size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Complete
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <Link href="/tasks" className="ml-auto">
                <Button variant="secondary">View All Tasks</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
