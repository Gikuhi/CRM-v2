
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save, CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { wrapMatterDispositions } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";


const wrapMatterSchema = z.object({
    disposition: z.string({ required_error: "You must select a disposition." }),
    notes: z.string().min(1, "Notes are required."),
    nextActionDate: z.date({ required_error: "Next action date is required." }),
});

export default function WrapMatterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const form = useForm<z.infer<typeof wrapMatterSchema>>({
        resolver: zodResolver(wrapMatterSchema),
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof wrapMatterSchema>) {
        if (!user) {
            toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in." });
            return;
        }

        try {
            await addDoc(collection(firestore, "interactions"), {
                debtor_id: "mock-debtor-123", // Replace with actual debtor ID from state/context
                agent_id: user.uid,
                call_id: `call-${Date.now()}`, // Replace with actual call ID
                wrap_matter: values.disposition,
                notes: values.notes,
                call_duration: 185, // Mock duration in seconds
                next_action_date: values.nextActionDate,
                timestamp: serverTimestamp(),
                created_at: serverTimestamp(),
            });

            toast({
                title: "Wrap Matter Saved",
                description: `The outcome "${values.disposition}" has been logged successfully.`,
            });
            
            // Auto-fetch next lead or return to dashboard
            router.push('/dashboard');

        } catch (error) {
            console.error("Error saving wrap matter:", error);
            toast({
                variant: "destructive",
                title: "Save Failed",
                description: "There was an error saving the call outcome.",
            });
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Wrap Matter / Call Disposition</CardTitle>
                            <CardDescription>Select the outcome of the call and schedule the next action to finalize the interaction.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <FormField
                                control={form.control}
                                name="disposition"
                                render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {Object.entries(wrapMatterDispositions).map(([category, options]) => (
                                            <div key={category} className="space-y-3">
                                                <h3 className="font-semibold text-primary">{category}</h3>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-2"
                                                    >
                                                        {options.map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value={option} />
                                                                </FormControl>
                                                                <Label className="font-normal">{option}</Label>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id="notes"
                                                    placeholder="Add any relevant details about the call..."
                                                    {...field}
                                                    className="h-32"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="nextActionDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                        <FormLabel>Next Action Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0,0,0,0))
                                                }
                                                initialFocus
                                            />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Wrap Matter
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
