import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { tasks } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  // In a real app, you'd manage selected date state here
  const today = new Date();

  const filteredTasks = tasks.filter(task => task.status === 'To-Do' || task.status === 'Completed');

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view tasks.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={today}
                    className="rounded-md"
                />
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Follow-up actions scheduled for today.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Task
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox id={`task-${task.id}`} className="mt-1" checked={task.status === 'Completed'}/>
                  <div className="grid gap-1">
                    <label htmlFor={`task-${task.id}`} className={cn("font-medium", task.status === 'Completed' && 'line-through text-muted-foreground')}>
                      {task.title}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Debtor: {task.debtorName}
                    </p>
                  </div>
                   <Badge 
                    className={cn("ml-auto", {
                      'bg-green-500/20 text-green-400 border-green-500/20': task.status === 'Completed',
                    })}
                    variant={task.status === 'Completed' ? 'outline' : 'secondary'}
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
