
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "KES 8,000",
        period: "/month",
        features: [
            "Up to 10 agents",
            "1 Team Manager",
            "5,000 calls/month",
            "Basic CRM features",
            "Email support only"
        ],
        isCurrent: false,
        buttonText: "Select Plan",
        buttonVariant: "outline"
    },
    {
        name: "Professional",
        price: "KES 25,000",
        period: "/month",
        features: [
            "Up to 50 agents",
            "Multiple teams",
            "Unlimited calls",
            "Advanced analytics",
            "Priority chat support"
        ],
        isCurrent: true,
        buttonText: "Current Plan",
        buttonVariant: "default"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "Pricing",
        features: [
            "Unlimited agents",
            "Dedicated support",
            "API integrations",
            "Full Dialer + Recording",
            "Advanced reporting"
        ],
        isCurrent: false,
        buttonText: "Contact Sales",
        buttonVariant: "outline"
    }
];

const addOns = [
    { id: "sms-reminders", title: "SMS/Email Reminders", description: "Automated debtor notifications.", cost: "KES 3,000/mo" },
    { id: "twilio-dialer", title: "Twilio Dialer Integration", description: "Enable click-to-call and auto-dialing.", cost: "KES 7,500/mo" },
    { id: "extra-storage", title: "Extra Storage (10GB)", description: "Additional storage for call recordings.", cost: "KES 1,000/mo" },
    { id: "sso", title: "MFA + SSO", description: "Enhanced security with single sign-on.", cost: "KES 4,000/mo" },
];

const billingHistory = [
    { date: "Nov 1, 2025", plan: "Professional", amount: "KES 25,000", method: "Card ending in 4242", status: "Paid" },
    { date: "Oct 1, 2025", plan: "Professional", amount: "KES 25,000", method: "Card ending in 4242", status: "Paid" },
    { date: "Sep 1, 2025", plan: "Professional", amount: "KES 25,000", method: "Card ending in 4242", status: "Paid" },
    { date: "Aug 1, 2025", plan: "Professional", amount: "KES 25,000", method: "Card ending in 4242", status: "Paid" },
];


export default function AdminBillingPage() {
    const plansRef = React.useRef<HTMLDivElement>(null);

    const handleManagePlanClick = () => {
        plansRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            
            {/* Current Plan Overview */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle>Current Plan Overview</CardTitle>
                    <CardDescription>Your organization's subscription details.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
                        <div>
                            <div className="text-sm text-muted-foreground">Organization Name</div>
                            <div className="font-semibold">CollectPro Inc.</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Current Plan</div>
                            <div className="font-semibold text-primary">Professional</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Billing Cycle</div>
                            <div className="font-semibold">Monthly</div>
                        </div>
                         <div>
                            <div className="text-sm text-muted-foreground">Next Payment</div>
                            <div className="font-semibold">Dec 1, 2025</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Total Cost</div>
                            <div className="font-semibold">KES 25,000</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Status</div>
                            <Badge variant="default">Active</Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <Button onClick={handleManagePlanClick} size="lg">Manage Plan</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Available Plans */}
            <div ref={plansRef} className="space-y-6 scroll-mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Available Plans & Add-ons</h2>
                    <p className="text-muted-foreground">Choose the best plan for your team's needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <Card key={plan.name} className={cn("flex flex-col hover:scale-105 transition-transform", plan.isCurrent && "border-2 border-primary ring-4 ring-primary/20")}>
                            {plan.isCurrent && <Badge className="absolute -top-3 right-4">Current Plan</Badge>}
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">{plan.name}</CardTitle>
                                <CardDescription className="text-3xl font-bold text-foreground">{plan.price}</CardDescription>
                                <p className="text-sm text-muted-foreground">{plan.period}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    className="w-full"
                                    variant={plan.buttonVariant as any}
                                    disabled={plan.isCurrent}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-4">
                 <h3 className="text-xl font-bold text-center">Optional Add-ons</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {addOns.map(addon => (
                        <Card key={addon.id} className="flex items-center justify-between p-4">
                            <div>
                                <Label htmlFor={addon.id} className="font-semibold">{addon.title}</Label>
                                <p className="text-sm text-muted-foreground">{addon.description}</p>
                                <div className="text-sm font-medium text-primary mt-1">{addon.cost}</div>
                            </div>
                            <Switch id={addon.id} />
                        </Card>
                     ))}
                 </div>
            </div>

            {/* Billing History */}
             <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>Review your past invoices and payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {billingHistory.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.date}</TableCell>
                                    <TableCell>{item.plan}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{item.method}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="default" className="bg-green-600">{item.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
