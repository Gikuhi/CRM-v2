
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockDebtor, mockPtpRecords } from "@/lib/data";
import { cn } from "@/lib/utils";

const ptpSchema = z.object({
  ptp_amount: z.coerce.number().min(1, "Amount must be greater than 0."),
  ptp_date: z.date({ required_error: "A PTP date is required." }),
  payment_method: z.string().min(1, "Payment method is required."),
  notes: z.string().optional(),
  reminder: z.boolean().default(false),
});

type PtpFormValues = z.infer<typeof ptpSchema>;

export default function AddPtpPage() {
  const router = useRouter();
  const params = useParams();
  const debtorId = params.debtorId as string;

  // Fetch debtor and existing PTPs
  const debtor = mockDebtor; // Replace with actual Firestore fetch
  const existingPTPs = mockPtpRecords.map(ptp => ({
      ...ptp,
      date: new Date(ptp.ptp_date)
  })); // Replace and parse dates

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const form = useForm<PtpFormValues>({
    resolver: zodResolver(ptpSchema),
    defaultValues: {
      ptp_amount: 0,
      payment_method: "",
      notes: "",
      reminder: false,
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      form.setValue("ptp_date", date, { shouldValidate: true });
    }
  };

  async function onSubmit(data: PtpFormValues) {
    // In a real app, save to Firestore
    console.log("Saving PTP data:", {
      ...data,
      debtor_id: debtorId,
      agent_id: "current_agent_id", // Replace with actual logged-in user ID
      status: "Pending",
    });

    toast({
      title: "PTP Scheduled Successfully!",
      description: `A promise to pay for ${data.ptp_amount} on ${format(data.ptp_date, "PPP")} has been saved.`,
    });

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push(`/debtor/${debtorId}`);
  }

  const getDayColor = (date: Date) => {
      const ptp = existingPTPs.find(p => format(p.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
      if (ptp) {
          switch (ptp.status) {
              case 'Kept': return 'text-green-600 bg-green-100/80 rounded-md';
              case 'Broken': return 'text-red-600 bg-red-100/80 rounded-md';
              case 'Pending': return 'text-yellow-600 bg-yellow-100/80 rounded-md';
          }
      }
      return '';
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Button>
          <h1 className="text-3xl font-bold mt-2">Set Up Promise To Pay</h1>
          <p className="text-muted-foreground">
            Scheduling a payment for {debtor.full_name} (Acct: {debtor.account_number})
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>PTP Calendar</CardTitle>
                <CardDescription>Select a date to schedule the payment. Existing PTPs are colored.</CardDescription>
            </CardHeader>
             <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                    modifiers={{
                        kept: existingPTPs.filter(p => p.status === 'Kept').map(p => p.date),
                        broken: existingPTPs.filter(p => p.status === 'Broken').map(p => p.date),
                        pending: existingPTPs.filter(p => p.status === 'Pending').map(p => p.date),
                    }}
                    modifiersClassNames={{
                        kept: 'bg-green-100 text-green-800',
                        broken: 'bg-red-100 text-red-800',
                        pending: 'bg-yellow-100 text-yellow-800',
                    }}
                />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Schedule PTP</CardTitle>
                <CardDescription>Fill in the payment details.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="ptp_date"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>PTP Date</FormLabel>
                                <FormControl>
                                    <Input
                                        value={field.value ? format(field.value, 'PPP') : 'Select a date from calendar'}
                                        readOnly
                                        className="font-medium"
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="ptp_amount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>PTP Amount (KES)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g. 5000" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                                            <SelectItem value="Bank Deposit">Bank Deposit</SelectItem>
                                            <SelectItem value="Cash">Cash</SelectItem>
                                            <SelectItem value="Standing Order">Standing Order</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Notes (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Add any relevant notes..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="reminder"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Set Reminder</FormLabel>
                                    <FormDescription>
                                        Check this to receive a notification before the due date.
                                    </FormDescription>
                                </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save PTP
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

