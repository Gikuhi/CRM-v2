
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { wrapMatterDispositions } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const wrapMatterSchema = z.object({
    disposition: z.string({ required_error: "You must select a disposition." }),
    notes: z.string().optional(),
}).refine(data => {
    if (data.disposition === 'Other' || data.disposition === 'Disputed Debt' || data.disposition === 'Requires Manager Call-Back') {
        return data.notes && data.notes.length > 0;
    }
    return true;
}, {
    message: "Notes are required for this disposition.",
    path: ["notes"],
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
    const selectedDisposition = form.watch("disposition");

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
                notes: values.notes || "",
                call_duration: 185, // Mock duration in seconds
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
                            <CardDescription>Select the outcome of the call to finalize the interaction.</CardDescription>
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
                            
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="notes">Optional Notes</Label>
                                        <FormControl>
                                            <Textarea
                                                id="notes"
                                                placeholder="Add any relevant details about the call..."
                                                {...field}
                                            />
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
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
