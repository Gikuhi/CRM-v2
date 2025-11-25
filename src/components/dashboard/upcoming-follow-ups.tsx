
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";
import { tasks as initialTasks } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function UpcomingFollowUps() {
  const [tasks, setTasks] = React.useState(initialTasks.slice(0, 3));
  const { toast } = useToast();

  const handleComplete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task Completed",
      description: "The follow-up has been marked as complete.",
    });
  };

  const handleSnooze = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task Snoozed",
      description: "The follow-up has been snoozed for later.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Follow-ups</CardTitle>
        <CardDescription>
          Your highest priority tasks that are due soon.
        </CardDescription>
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
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.debtorName}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {task.dueDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSnooze(task.id)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Snooze
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleComplete(task.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No upcoming follow-ups.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Link href="/tasks" className="ml-auto">
          <Button variant="secondary">View All Tasks</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
