"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PhoneIncoming, User, Info, FileText, Bot, DollarSign, HandHelping } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const InfoBlock = ({ icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => {
    const Icon = icon;
    return (
        <Card className="bg-secondary/30">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <Icon className="h-5 w-5 text-primary"/>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
                {children}
            </CardContent>
        </Card>
    )
}

export default function IncomingCallPage() {
  const [callAccepted, setCallAccepted] = React.useState(false);

  return (
    <div className="max-w-6xl mx-auto">
        {!callAccepted ? (
            <Card className="border-primary/50 ring-4 ring-primary/10">
                 <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-4">
                        <PhoneIncoming className="h-8 w-8 text-primary animate-pulse" />
                        <CardTitle className="text-3xl text-primary">Incoming Call</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="text-center p-8 space-y-4">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">
                        <AvatarFallback className="text-4xl bg-muted">RM</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-2xl font-semibold">RICHARD MUSYOKA</p>
                        <p className="text-muted-foreground">LendPlus Account</p>
                    </div>
                    <div className="py-2">
                        <p className="text-lg font-bold text-foreground">Today's Balance:</p>
                        <p className="text-4xl font-bold text-primary">Ksh XX,XXX</p>
                    </div>
                    <Button onClick={() => setCallAccepted(true)} size="lg" className="w-full max-w-xs mx-auto">
                        Accept Call
                    </Button>
                </CardContent>
            </Card>
        ) : (
             <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-2xl bg-muted">RM</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-3xl">Richard Musyoka</CardTitle>
                                <CardDescription className="text-base">LendPlus Account | Balance: <span className="text-primary font-bold">Ksh XX,XXX</span></CardDescription>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/matter-dashboard">
                                <Button variant="outline">View Full Matter</Button>
                            </Link>
                             <Link href="/wrap-matter">
                                <Button>Wrap Up Call</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="italic text-muted-foreground">"I am calling about your LendPlus Account. I see you have not made a payment since the account was handed over on 1 November 2023"</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <InfoBlock icon={FileText} title="Matter Information">
                                <p>Your account has been with us since November 2024.</p>
                                <p>We have never had a payment.</p>
                                <p>We have not spoken to you in the last six months about repaying this account.</p>
                                <div className="pt-2">
                                     <Link href="/ptp-capture">
                                        <Button size="sm">View PTP Offers</Button>
                                    </Link>
                                </div>
                            </InfoBlock>
                             <InfoBlock icon={HandHelping} title="Offer & Closing">
                                <p><span className="font-semibold text-foreground">Optimal payment amount:</span> Book avg between 841 and 1009</p>
                                <p><span className="font-semibold text-foreground">Bureau Pay Day:</span> No info available</p>
                                <p><span className="font-semibold text-foreground">Payment Pattern:</span> 000</p>
                            </InfoBlock>
                        </div>
                        <div className="space-y-6">
                             <InfoBlock icon={Bot} title="Gather Intelligence">
                                <p><span className="font-semibold text-foreground">Total Broken PTPs:</span> 1</p>
                                <p><span className="font-semibold text-foreground">Last PTP:</span> KSH 1,000 on 10 July 2024 (Direct Deposit)</p>
                                <p><span className="font-semibold text-foreground">Paying Linked Accounts:</span> 0</p>
                                <p><span className="font-semibold text-foreground">Non-paying Linked Accounts:</span> 1</p>
                            </InfoBlock>
                             <InfoBlock icon={DollarSign} title="Financial Summary">
                                 <div className="grid grid-cols-2 gap-4">
                                    <div><p className="font-semibold text-foreground">Total Capital:</p><p>Ksh 15,000</p></div>
                                    <div><p className="font-semibold text-foreground">Total Interest:</p><p>Ksh 3,500</p></div>
                                    <div><p className="font-semibold text-foreground">Total Fees:</p><p>Ksh 1,200</p></div>
                                    <div><p className="font-semibold text-foreground">Total Payments:</p><p>Ksh 500</p></div>
                                 </div>
                             </InfoBlock>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
