"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from "lucide-react";

const EnhanceDebtorProfileInputSchema = z.object({
  debtorName: z.string().min(2, { message: "Debtor name must be at least 2 characters." }),
  debtorContactInfo: z.string().min(5, { message: "Contact info is required." }),
  debtDetails: z.string().min(10, { message: "Debt details must be at least 10 characters." }),
  availableDatabaseInfo: z.string().min(10, { message: "Database info must be at least 10 characters." }),
});

type FormValues = z.infer<typeof EnhanceDebtorProfileInputSchema>;

type DebtorProfileFormProps = {
  getEnhancedProfile: (
    prevState: any,
    data: FormValues
  ) => Promise<{ summary: string } | { error: string } | null>;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Enhance Profile
        </Button>
    )
}

export function DebtorProfileForm({ getEnhancedProfile }: DebtorProfileFormProps) {
  const [state, formAction] = useActionState(getEnhancedProfile, null);

  const form = useForm<FormValues>({
    resolver: zodResolver(EnhanceDebtorProfileInputSchema),
    defaultValues: {
      debtorName: "",
      debtorContactInfo: "",
      debtDetails: "",
      availableDatabaseInfo: "",
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Enhance Debtor Profile</CardTitle>
          <CardDescription>
            Enter debtor information to generate an AI-powered summary for better collection strategies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={form.handleSubmit(data => formAction(data))} className="space-y-6">
              <FormField
                control={form.control}
                name="debtorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debtor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debtorContactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com, 555-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="debtDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debt Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Outstanding balance of $1500 for credit card ending in 1234..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableDatabaseInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Database Info</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Credit score: 650. Last payment: 90 days ago. Employment: Stable..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Include information from credit history, past payments, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {state && 'summary' in state && (
          <Card className="bg-primary/10 border-primary/40 animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-accent" />
                AI-Enhanced Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{state.summary}</p>
            </CardContent>
          </Card>
        )}
        {state && 'error' in state && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
