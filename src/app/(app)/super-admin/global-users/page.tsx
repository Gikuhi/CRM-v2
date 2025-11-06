
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Upload, Download, MoreHorizontal } from "lucide-react";
import { users, organizations } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SuperAdminGlobalUsersPage() {
  const globalUsers = users.map((user, index) => ({
      ...user,
      organization: organizations[index % organizations.length].name,
      status: index % 3 === 0 ? 'Active' : 'Inactive'
  }));
    
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">Global User Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>Global User Directory</CardTitle>
            <CardDescription>Search, filter, and manage all users across all organizations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search users by name, email, org..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Import</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> Add User</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {globalUsers.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="font-medium">{user.name}</div>
                        </TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                         <TableCell className="hidden md:table-cell">
                            <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Impersonate User</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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

