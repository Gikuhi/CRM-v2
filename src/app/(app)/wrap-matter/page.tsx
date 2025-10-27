"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Flag, MessageCircle, User, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { placeholderImages } from "@/lib/placeholder-images";

const StatItem = ({ label, value }: { label: string, value: string }) => (
    <div className="text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

export default function WrapMatterPage() {
    const router = useRouter();
    const debtorAvatar = placeholderImages.find(p => p.id === 'debtor-avatar');

    return (
        <div className="p-4 md:p-6 bg-background text-foreground space-y-4">

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                     <Card>
                        <CardContent className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                     {debtorAvatar && <Image src={debtorAvatar.imageUrl} alt={debtorAvatar.description} width={80} height={80} data-ai-hint={debtorAvatar.imageHint} />}
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">Joyce Wanjohi Maina</h2>
                                    <p className="text-muted-foreground">Bal. Ksh 7,606.00</p>
                                </div>
                            </div>
                            <Button variant="outline">Add Tag</Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardContent className="p-4 flex flex-wrap gap-4 items-center justify-between">
                           <div className="flex flex-wrap gap-4">
                             <Button className="bg-secondary hover:bg-secondary/80">Edson Payment</Button>
                             <Button className="bg-secondary hover:bg-secondary/80">Marquis Apology Installment</Button>
                             <Button className="bg-secondary hover:bg-secondary/80">Pay from Home Assist</Button>
                           </div>
                        </CardContent>
                    </Card>

                     <div className="flex justify-end items-center gap-4 my-2">
                        <Button variant="outline" size="sm" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Wrap Matter
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-4 space-y-2">
                                <h3 className="font-semibold">Document The Matter</h3>
                                <p className="text-xs text-muted-foreground">Describe the matter situation for future reference or use the default notes below the text area.</p>
                                <Textarea placeholder="Add a quick note:"/>
                                <div className="flex justify-around items-center pt-2">
                                    <Button variant="ghost" size="icon"><MessageCircle /></Button>
                                    <Button variant="ghost" size="icon"><User /></Button>
                                    <Button variant="ghost" size="icon"><Flag /></Button>
                                    <Button variant="ghost" size="icon"><ArrowRight /></Button>
                                </div>
                                <Button variant="outline" className="w-full">Attach Note To Matter</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 space-y-2">
                                <h3 className="font-semibold">Add Automated Actions</h3>
                                <p className="text-xs text-muted-foreground">Add and initiate actions on the matter.</p>
                                 <Button variant="outline" className="w-full justify-start text-primary border-primary bg-primary/10">Add Action</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <Card>
                         <CardContent className="p-4 space-y-2">
                             <Button variant="outline" className="w-full">Manage Contacts</Button>
                             <Link href="/matter-dashboard" className="w-full">
                                <Button variant="outline" className="w-full">Back to Matter</Button>
                             </Link>
                         </CardContent>
                    </Card>
                </div>
            </div>

            {/* Linked Accounts */}
            <Card>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">Linked Accounts</h3>
                    <p className="text-sm text-muted-foreground">You must first wrap the current matter to settle a linked account. This will open a new matter.</p>
                    <p className="my-2">Outstanding Amount <span className="text-primary font-bold">Ksh 0.00</span></p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-primary/90">
                                <TableRow>
                                    <TableHead className="text-primary-foreground">Matter No.</TableHead>
                                    <TableHead className="text-primary-foreground">Status Class</TableHead>
                                    <TableHead className="text-primary-foreground">Client Name</TableHead>
                                    <TableHead className="text-primary-foreground">Handover Balance</TableHead>
                                    <TableHead className="text-primary-foreground">Interest & Fees</TableHead>
                                    <TableHead className="text-primary-foreground">Current Balance</TableHead>
                                    <TableHead className="text-primary-foreground">Payments</TableHead>
                                    <TableHead className="text-primary-foreground">Last Pay Date</TableHead>
                                    <TableHead className="text-primary-foreground">Next Date</TableHead>
                                    <TableHead className="text-primary-foreground">View</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>BBK3258742</TableCell>
                                    <TableCell>Channel</TableCell>
                                    <TableCell>Terrance</TableCell>
                                    <TableCell>Ksh 0.00</TableCell>
                                    <TableCell>Ksh 0.00</TableCell>
                                    <TableCell>Ksh 0.00</TableCell>
                                    <TableCell>Ksh 0.00</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell><Button variant="ghost" size="icon" className="text-primary">👁️</Button></TableCell>
                                </TableRow>
                                <TableRow className="bg-muted/50">
                                     <TableCell colSpan={3}></TableCell>
                                     <TableCell>Ksh 0.00</TableCell>
                                     <TableCell>Ksh 0.00</TableCell>
                                     <TableCell></TableCell>
                                     <TableCell></TableCell>
                                     <TableCell></TableCell>
                                     <TableCell></TableCell>
                                     <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
