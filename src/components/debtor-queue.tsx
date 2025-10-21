import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";
import { debtorQueue } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DebtorQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Debtor Queue</CardTitle>
        <CardDescription>Next debtors to contact.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Amount Due</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debtorQueue.map((debtor) => (
              <TableRow key={debtor.id}>
                <TableCell>
                  <div className="font-medium">{debtor.name}</div>
                  <div className="text-sm text-muted-foreground md:hidden">${debtor.amountDue.toFixed(2)}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">${debtor.amountDue.toFixed(2)}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge 
                    className={cn({
                      'bg-accent-danger/20 text-accent-danger border-accent-danger/20': debtor.status === 'High Risk',
                      'bg-accent-success/20 text-accent-success border-accent-success/20': debtor.status === 'Promise',
                      'bg-accent-warning/20 text-accent-warning border-accent-warning/20': debtor.status === 'Pending',
                    })}
                    variant="outline"
                  >
                    {debtor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Click to Call
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
