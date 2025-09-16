import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function TeamManagementPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>Assign accounts and monitor agent status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Accounts Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                     <Badge 
                        className={cn({
                            'bg-green-500/20 text-green-400 border-green-500/20': member.status === 'Online',
                            'bg-red-500/20 text-red-400 border-red-500/20': member.status === 'Offline',
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/20': member.status === 'On Call',
                        })}
                        variant="outline"
                    >
                        {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{member.accountsAssigned}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Assign Accounts</Button>
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
