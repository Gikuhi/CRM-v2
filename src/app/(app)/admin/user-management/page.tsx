
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Upload, Download } from "lucide-react";

export default function UserManagementMasterPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">User Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Search, filter, and manage all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search users..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Import</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4"/> Add User</Button>
            </div>
          </div>
          <div className="text-center text-muted-foreground py-8">
            <p>A data table with all users will be displayed here.</p>
            <p className="text-sm">Including columns for ID, Name, Email, Role, Team, Status, etc.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
