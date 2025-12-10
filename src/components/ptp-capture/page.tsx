
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ptpOffers, type PtpOffer } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const PtpOfferTable = ({ onSelectOffer }: { onSelectOffer: (offer: PtpOffer) => void }) => {
  const router = useRouter();
  const headers = [
    "Discount Offer",
    "Once Off Matter Level Settlement",
    "Once Off Book Level Settlement",
    "Multiperiod Settlement",
    "Amount Driven",
    "Period Driven",
  ];
  const labels = [
    { key: "frequency", name: "Frequency" },
    { key: "noPayments", name: "No. Payments" },
    { key: "settlementBal", name: "Settlement Bal" },
    { key: "initialAmount", name: "Initial Amount" },
    { key: "amount", name: "Amount" },
    { key: "capitalDiscount", name: "Capital Discount %" },
    { key: "interestDiscount", name: "Interest Discount %" },
    { key: "feeDiscount", name: "Fee Discount %" },
    { key: "discountAmount", name: "Discount Amount" },
    { key: "initialPaymentMethod", name: "Initial Payment Method" },
    { key: "monthlyInstallment", name: "Monthly Installment" },
    { key: "totalInterest", name: "Total Interest" },
    { key: "totalCost", name: "Total Cost" },
    { key: "totalPayment", name: "Total Payment" },
    { key: "totalSaving", name: "Total Saving" },
    { key: "paymentMethod", name: "Payment Method" },
  ];

  const getAction = (action: string, offer: PtpOffer) => {
    switch (action) {
      case "Use as PTP":
        return <Button className="w-full rounded-none" onClick={() => onSelectOffer(offer)}>Use as PTP</Button>;
      case "Request Auth":
        return <Button variant="secondary" className="w-full rounded-none">Request Auth</Button>;
      case "Validating":
        return <Button variant="destructive" className="w-full rounded-none" disabled>Validating...</Button>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Promise to Pay Offer</CardTitle>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary/80 text-primary-foreground">
                {headers.map((header, i) => (
                  <th key={i} className={cn("p-2 font-semibold border border-border", i === 0 && "bg-primary text-center")}>
                    {header === "Discount Offer" ? <div>2538 Off<br/>Discount Offer<br/><a href="#" className="underline">View Terms</a></div> : header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map(label => (
                <tr key={label.key}>
                  <td className="p-2 font-semibold border border-border bg-accent/30">{label.name}</td>
                  {ptpOffers.map(offer => (
                    <td key={offer.id} className={cn("p-2 border border-border text-center", (offer[label.key as keyof PtpOffer] === 0 || (typeof offer[label.key as keyof PtpOffer] === 'number' && offer[label.key as keyof PtpOffer] > 900)) && 'text-red-500')}>
                      {label.key === 'capitalDiscount' || label.key === 'interestDiscount' || label.key === 'feeDiscount' ? 
                       (offer[label.key as keyof PtpOffer] ? `${"''" + offer[label.key as keyof PtpOffer]}%` : '0%') :
                       offer[label.key as keyof PtpOffer]?.toLocaleString()
                      }
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-0 font-semibold border border-border bg-accent/30"><Button variant="ghost" className="w-full rounded-none justify-start p-2">View Payment Methods</Button></td>
                {ptpOffers.map(offer => (
                  <td key={offer.id} className="p-0 border border-border">
                    {getAction(offer.action, offer)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const PtpConfirmation = ({ onBack, onConclude }: { onBack: () => void; onConclude: () => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Confirm Promise to Pay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 border rounded-lg">
                         <h3 className="font-semibold text-lg text-accent">Payment Details</h3>
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
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg text-accent">Debtor Details</h3>
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
             <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={onConclude}>Conclude PTP</Button>
            </CardFooter>
        </Card>
    )
}

export default function PtpCapturePage() {
  const [step, setStep] = React.useState(1);
  const [selectedOffer, setSelectedOffer] = React.useState<PtpOffer | null>(null);
  const router = useRouter();

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
    router.push('/dashboard');
  };

  return (
    <div>
      {step === 1 && <PtpOfferTable onSelectOffer={handleSelectOffer} />}
      {step === 2 && <PtpConfirmation onBack={handleBack} onConclude={handleConclude} />}
    </div>
  );
}
