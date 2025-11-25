"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { tasks as initialTasks, dialerLeads } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Task } from "@/lib/types";


const taskSchema = z.object({
  title: z.string().min(1, "Task title is required."),
  debtorName: z.string().min(1, "You must select a debtor."),
  dueDate: z.date({ required_error: "A due date is required." }),
});

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      debtorName: "",
    },
  });

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'Completed' ? 'To-Do' : 'Completed' }
        : task
    ));
  };
  
  const onSubmit = (data: z.infer<typeof taskSchema>) => {
     const newId = `t${tasks.length + 1}`;
     const newDebtor = dialerLeads.find(d => d.name === data.debtorName);
     
     if (!newDebtor) {
         toast({ variant: "destructive", title: "Error", description: "Selected debtor not found." });
         return;
     }

     const newTask: Task = {
         id: newId,
         title: data.title,
         dueDate: data.dueDate,
         status: 'To-Do',
         debtorName: newDebtor.name,
     };

     setTasks([newTask, ...tasks]);
     toast({
        title: "Task Created",
        description: `The task "${data.title}" has been successfully created.`,
     });
     setIsDialogOpen(false);
     form.reset();
  };

  const filteredTasks = tasks.filter(task => format(task.dueDate, 'yyyy-MM-dd') === (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''));


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
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                />
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Tasks for {selectedDate ? format(selectedDate, "PPP") : "..."}</CardTitle>
                    <CardDescription>Follow-up actions scheduled for the selected day.</CardDescription>
                </div>
                 <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Task
                    </Button>
                </DialogTrigger>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox 
                        id={`task-${task.id}`} 
                        className="mt-1" 
                        checked={task.status === 'Completed'}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                    />
                    <div className="grid gap-1 flex-1">
                        <label htmlFor={`task-${task.id}`} className={cn("font-medium cursor-pointer", task.status === 'Completed' && 'line-through text-muted-foreground')}>
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
                )) : (
                    <div className="text-center text-muted-foreground py-10">
                        <p>No tasks scheduled for this day.</p>
                    </div>
                )}
                </div>
            </CardContent>
            </Card>

            <DialogContent>
                 <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Fill out the details below to add a new follow-up task.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                       <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Task Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Follow up on payment promise" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="debtorName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Associate with Debtor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a debtor" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {dialerLeads.map(lead => (
                                        <SelectItem key={lead.id} value={lead.name}>
                                            {lead.name}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                        >
                                        {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                Save Task
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
