"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function IncomingCallPage() {
  const [callAccepted, setCallAccepted] = React.useState(false);

  return (
    <div className="max-w-2xl mx-auto">
        {!callAccepted ? (
            <Card className="bg-card">
                 <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl text-foreground">INCOMING CALL</CardTitle>
                        <Button onClick={() => setCallAccepted(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">ACCEPT</Button>
                    </div>
                </CardHeader>
                <CardContent className="text-center p-8">
                    <p className="text-xl font-semibold text-primary">RICHARD MUSYOKA</p>
                    <p className="text-muted-foreground">LendPlus Account</p>
                    <p className="text-lg font-bold text-foreground mt-4">Today's Balance:</p>
                    <p className="text-3xl font-bold text-primary">Ksh XX,XXX</p>
                </CardContent>
            </Card>
        ) : (
             <Card className="bg-card text-foreground">
                <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                    <h2 className="text-2xl font-bold text-primary">RICHARD MUSYOKA</h2>
                    <p className="text-muted-foreground">LendPlus Account</p>
                    <p className="mt-2">
                        <span className="font-semibold">Today's Balance:</span>
                        <span className="text-primary font-bold ml-2">Ksh XX XXX</span>
                    </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/matter-dashboard">
                            <Button variant="outline">Matter</Button>
                        </Link>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">ACTIVATE</Button>
                    </div>
                </div>

                <div className="relative my-4">
                    <Button variant="outline" className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 absolute -left-4 top-1/2 -translate-y-1/2 z-10" style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)' }}>
                        Lost RPC had PTP
                    </Button>
                </div>


                <p className="text-sm text-center text-muted-foreground mb-6 pt-2">
                    I am calling about your LendPlus Account. I see you have not made a payment since the account was handed over on 1 November 2023
                </p>

                <div className="space-y-4">
                    {/* Matter Information */}
                    <div className="p-4 border rounded-lg bg-secondary/30">
                        <h3 className="font-semibold text-primary mb-3">Matter Information</h3>
                        <div className="flex gap-4 mb-3">
                            <Button className="bg-primary hover:bg-primary/90 flex-1">Urgently Update Employer</Button>
                            <Link href="/ptp-capture" className="flex-1">
                                <Button className="bg-primary hover:bg-primary/90 w-full">PTP Captured Info</Button>
                            </Link>
                            <Link href="/wrap-matter" className="flex-1">
                                <Button variant="secondary" className="w-full">Wrap Matter</Button>
                            </Link>
                        </div>
                        <div className="text-sm space-y-1 text-muted-foreground">
                        <p>Your account has been with us since November 2024</p>
                        <p>We have never had a payment?</p>
                        <p>We have not spoken to you in the last six months about repaying this account?</p>
                        </div>
                    </div>

                    {/* Gather Intelligence */}
                    <div className="p-4 border rounded-lg bg-secondary/30">
                        <h3 className="font-semibold text-primary mb-2">Gather Intelligence: Customer Information</h3>
                        <div className="text-sm space-y-1 text-muted-foreground">
                        <p>Total Brokens: 1</p>
                        <p>Last PTP: KSH 1,000 on 10 July 2024(Direct Deposit)</p>
                        <p>0 paying linked accounts</p>
                        <p>1 non paying linked accounts</p>
                        </div>
                    </div>

                    {/* Making the offer */}
                    <div className="p-4 border rounded-lg bg-secondary/30">
                        <h3 className="font-semibold text-primary mb-2">Making the offer and closing the deal:</h3>
                        <div className="text-sm space-y-1 text-muted-foreground">
                        <p>Optimal payment amount: Book avg between 841 and 1009</p>
                        <p>No bureau pay day info available</p>
                        <p>Payment Pattern: 000</p>
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
