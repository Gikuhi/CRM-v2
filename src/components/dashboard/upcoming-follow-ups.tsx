
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
import { tasks } from "@/lib/data";

export function UpcomingFollowUps() {
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
            {tasks.slice(0, 3).map((task) => (
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
  );
}
