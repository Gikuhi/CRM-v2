
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FilePlus2, Loader2 } from "lucide-react";
import { PerformanceOverview } from "@/components/performance-overview";
import { AgentLeaderboard } from "@/components/agent-leaderboard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";


const reportSchema = z.object({
  name: z.string().min(3, "Report name is required."),
  description: z.string().optional(),
  metrics: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one metric.",
  }),
  dimensions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one dimension.",
  }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date." }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date." }),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
});


const metrics = [
  { id: "total_calls", label: "Total Calls" },
  { id: "total_collections", label: "Total Collections" },
  { id: "aht", label: "Avg. Handle Time" },
  { id: "rpc_rate", label: "RPC Rate (%)" },
  { id: "ptp_rate", label: "PTP Kept Rate (%)" },
];

const dimensions = [
  { id: "organization", label: "By Organization" },
  { id: "campaign", label: "By Campaign" },
  { id: "team", label: "By Team" },
  { id: "agent", label: "By Agent" },
];


export default function SuperAdminReportsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: "",
      description: "",
      metrics: [],
      dimensions: [],
      startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
    console.log("Custom Report Values:", values);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
        title: "Report Generation Started",
        description: `Your custom report "${values.name}" is being generated and will be available for download shortly.`,
    });
    setIsDialogOpen(false);
    form.reset();
  };


  const prebuiltReports = [
      { name: "All Organizations Performance", description: "Comparative metrics for all organizations." },
      { name: "Agent Performance Global Leaderboard", description: "Top agents across the entire platform." },
      { name: "Billing and Revenue Summary", description: "Monthly and annual revenue breakdown." },
      { name: "System Usage Report", description: "Call volumes, user activity, and campaign stats." },
  ]
  return (
    <div className="space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Global Reports & Analytics</h2>
          <p className="text-muted-foreground">Aggregated metrics and downloadable reports for all organizations.</p>
        </div>
        <DialogTrigger asChild>
            <Button>
                <FilePlus2 className="mr-2 h-4 w-4"/>
                Create Custom Report
            </Button>
        </DialogTrigger>
      </div>
      
      <PerformanceOverview />
      <AgentLeaderboard />

      <Card>
        <CardHeader>
            <CardTitle>Pre-built Global Reports</CardTitle>
            <CardDescription>Download platform-wide reports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {prebuiltReports.map(report => (
            <Card key={report.name}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <p className="font-semibold">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      
       <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
            <DialogDescription>
              Build a report by selecting the metrics and dimensions you want to analyze.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Report Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Q3 Agent Performance" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="A brief description of the report" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="metrics"
                        render={() => (
                            <FormItem>
                                <FormLabel>Metrics</FormLabel>
                                <div className="space-y-2 p-4 border rounded-lg">
                                {metrics.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="metrics"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, item.id])
                                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item.label}</FormLabel>
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions"
                        render={() => (
                            <FormItem>
                                <FormLabel>Group By (Dimensions)</FormLabel>
                                <div className="space-y-2 p-4 border rounded-lg">
                                {dimensions.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="dimensions"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, item.id])
                                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item.label}</FormLabel>
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={form.formState.isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileDown className="mr-2 h-4 w-4" />}
                   Generate Report
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
