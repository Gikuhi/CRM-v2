
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  CreditCard,
  CalendarDays,
  Phone,
  BookText,
  Edit,
  PlusCircle,
  MessageSquare,
  CheckCircle2,
  XCircle,
  CircleDot,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  mockDebtor,
  mockPtpRecords,
  mockInteractions,
  mockDebtorNotes,
} from "@/lib/data";
import type { PtpRecord, InteractionLog, DebtorNote } from "@/lib/types";
import { cn } from "@/lib/utils";

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium text-sm">{value || "N/A"}</p>
  </div>
);

export default function DebtorInformationPage() {
  const params = useParams();
  const debtorId = params.debtorId;

  // In a real app, you would fetch this data from Firestore based on debtorId
  const debtor = mockDebtor;
  const ptpRecords = mockPtpRecords;
  const interactions = mockInteractions;
  const debtorNotes = mockDebtorNotes;
  const repaymentProgress =
    (debtor.amount_paid / debtor.original_amount) * 100;

  const getPtpStatusBadge = (status: PtpRecord["status"]) => {
    switch (status) {
      case "Kept":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Broken":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="secondary">
            <CircleDot className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Button variant="ghost" asChild>
            <Link href="/debtor-profile">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mt-2">Debtor Information</h1>
          <p className="text-muted-foreground">
            Full profile view of {debtor.full_name}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Info
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add PTP
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem label="Full Name" value={debtor.full_name} />
              <InfoItem label="Account Number" value={debtor.account_number} />
              <InfoItem label="ID / Passport" value={debtor.id_number} />
              <InfoItem label="Phone Number" value={debtor.phone_numbers.join(", ")} />
              <InfoItem label="Email" value={debtor.email} />
              <InfoItem label="Address" value={debtor.address} />
              <InfoItem label="Employer" value={debtor.employer} />
              <InfoItem label="Occupation" value={debtor.occupation} />
            </CardContent>
          </Card>

          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard /> Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-3xl font-bold">
                  KES {debtor.remaining_balance.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Paid: KES {debtor.amount_paid.toLocaleString()}</span>
                  <span>
                    Total: KES {debtor.original_amount.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={repaymentProgress}
                  aria-label={`${repaymentProgress}% paid`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <InfoItem label="Total Debt" value={`KES ${debtor.total_debt.toLocaleString()}`} />
                <InfoItem label="Last Payment" value={debtor.last_payment_date} />
                <InfoItem label="Loan Type" value={debtor.loan_type} />
                <InfoItem label="Interest Rate" value={`${debtor.interest_rate}%`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* PTP Records */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays /> PTP Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount (KES)</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ptpRecords.map((ptp) => (
                    <TableRow key={ptp.ptp_id}>
                      <TableCell>{ptp.ptp_date}</TableCell>
                      <TableCell>{ptp.ptp_amount.toLocaleString()}</TableCell>
                      <TableCell>{ptp.payment_method}</TableCell>
                      <TableCell>{getPtpStatusBadge(ptp.status)}</TableCell>
                      <TableCell>{ptp.agent_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Call History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone /> Call History & Wrap Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>RPC</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interactions.map((log) => (
                    <TableRow key={log.interaction_id}>
                      <TableCell>
                        <div className="font-medium">{log.created_at}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.call_duration}
                        </div>
                      </TableCell>
                      <TableCell>{log.agent_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.wrap_matter}</Badge>
                      </TableCell>
                      <TableCell>
                        {log.rpc_status ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-xs max-w-xs truncate">
                        {log.notes || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText /> Notes & Remarks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {debtorNotes.map((note) => (
                  <div key={note.note_id} className="text-sm p-3 bg-muted/50 rounded-md">
                    <p className="font-medium">{note.note_text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      - {note.user_name} on {note.timestamp}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                 <Textarea placeholder="Add a new note..." />
                 <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Note
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    