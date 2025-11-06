
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { recentSuperAdminActivities } from "@/lib/data";

export default function SuperAdminAuditPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Audit & Compliance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Global Audit Trail</CardTitle>
          <CardDescription>Track all significant actions taken by any user across all organizations.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative flex-1 md:grow-0 mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Filter logs by user, action, organization, or date..."
                    className="w-full rounded-lg bg-background pl-8 lg:w-[400px]"
                />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Organization</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSuperAdminActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="font-medium">{activity.action}</div>
                    </TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell className="hidden md:table-cell">FinCorp</TableCell>
                    <TableCell className="text-right">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
