
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ptpOffers as initialPtpOffers, type PtpOffer } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader2, Banknote, ShieldAlert, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";


const PtpOfferCard = ({ offer, onSelectOffer }: { offer: PtpOffer, onSelectOffer: (offer: PtpOffer) => void }) => {
    
    const getAction = (action: string, offer: PtpOffer) => {
        switch (action) {
        case "Use as PTP":
            return <Button className="w-full" onClick={() => onSelectOffer(offer)}>Use as PTP</Button>;
        case "Request Auth":
            return <Button variant="secondary" className="w-full"><ShieldAlert className="mr-2 h-4 w-4"/>Request Auth</Button>;
        case "Validating":
            return <Button variant="outline" className="w-full" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Validating...</Button>;
        default:
            return null;
        }
    };
    
    return (
        <Card className={cn("flex flex-col hover:shadow-lg transition-shadow", offer.action === "Use as PTP" && "border-primary ring-2 ring-primary/20")}>
             {offer.action === "Use as PTP" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-md flex items-center gap-1">
                    <Star className="h-3 w-3"/> Recommended
                </div>
            )}
            <CardHeader className="text-center">
                <CardTitle>{offer.id === 1 ? 'Once-Off Settlement' : offer.id === 2 ? 'Once-Off Book Settlement' : offer.id === 3 ? 'Multiperiod Settlement' : 'Standard Installment'}</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">{offer.monthlyInstallment}</CardDescription>
                <p className="text-sm text-muted-foreground">{offer.noPayments} {offer.frequency === "Once Off" ? 'Payment' : 'Payments'}</p>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Saving</span>
                    <span className="font-semibold text-green-600">{offer.totalSaving}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="font-semibold">{offer.totalPayment}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Capital Discount</span>
                    <span className="font-semibold">{offer.capitalDiscount}%</span>
                </div>
            </CardContent>
            <CardFooter>
                 {getAction(offer.action, offer)}
            </CardFooter>
        </Card>
    )
};

const PtpConfirmation = ({ onBack, onConclude }: { onBack: () => void; onConclude: () => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Confirm Promise to Pay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                         <h3 className="font-semibold text-lg flex items-center"><Banknote className="mr-2 h-5 w-5 text-primary"/>Payment Details</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="payment-method">Payment Method</Label>
                                <Select defaultValue="direct-deposit">
                                    <SelectTrigger id="payment-method"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
                                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="frequency">Frequency</Label>
                                <Select defaultValue="monthly">
                                    <SelectTrigger id="frequency"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="once-off">Once Off</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input id="start-date" type="date" defaultValue="2024-07-26"/>
                            </div>
                             <div>
                                <Label htmlFor="payment-day">Payment Day</Label>
                                <Input id="payment-day" type="number" defaultValue="26" />
                            </div>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="installments">No of Installments</Label>
                                    <Input id="installments" type="number" defaultValue="3"/>
                                </div>
                                <div>
                                    <Label htmlFor="installment-amount">Installment</Label>
                                    <Input id="installment-amount" type="text" defaultValue="Ksh 7,614.00" readOnly/>
                                </div>
                            </div>
                         </div>
                    </div>
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                        <h3 className="font-semibold text-lg text-primary">Debtor Details</h3>
                        <div>
                            <Label htmlFor="debtor-name">Debtor Name</Label>
                            <Input id="debtor-name" defaultValue="RICHARD MUSYOKA" readOnly/>
                        </div>
                        <div>
                            <Label htmlFor="debtor-contact">Contact</Label>
                            <Input id="debtor-contact" defaultValue="+254..." />
                        </div>
                        <div>
                            <Label htmlFor="debtor-email">Email</Label>
                            <Input id="debtor-email" type="email" placeholder="Enter email address" />
                        </div>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onBack}> <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offers</Button>
                <Button onClick={onConclude}>Conclude PTP</Button>
            </CardFooter>
        </Card>
    )
}

export default function PtpCapturePage() {
  const [step, setStep] = React.useState(1);
  const [selectedOffer, setSelectedOffer] = React.useState<PtpOffer | null>(null);
  const [offers, setOffers] = React.useState<PtpOffer[]>(initialPtpOffers);
  const router = useRouter();

  React.useEffect(() => {
    const validatingOffers = offers.filter(o => o.action === 'Validating');
    if (validatingOffers.length > 0) {
        const timer = setTimeout(() => {
            setOffers(currentOffers =>
                currentOffers.map(o => 
                    o.action === 'Validating' ? { ...o, action: 'Use as PTP' } : o
                )
            );
            toast({
                title: "Offers Validated",
                description: "Additional payment offers are now available.",
            })
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [offers]);

  const handleSelectOffer = (offer: PtpOffer) => {
    setSelectedOffer(offer);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedOffer(null);
  };
  
  const handleConclude = () => {
    // Here you would typically save the data
    console.log("PTP Concluded with offer:", selectedOffer);
    toast({
        title: "PTP Successfully Captured",
        description: "The payment plan has been saved and is now pending.",
    });
    router.push('/dashboard');
  };

  return (
    <div className="space-y-6">
        {step === 1 && (
             <div>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Promise to Pay Offers</h1>
                    <p className="text-muted-foreground">Select the best payment plan for the debtor.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map(offer => (
                        <PtpOfferCard key={offer.id} offer={offer} onSelectOffer={handleSelectOffer} />
                    ))}
                </div>
            </div>
        )}
        {step === 2 && <PtpConfirmation onBack={handleBack} onConclude={handleConclude} />}
    </div>
  );
}
