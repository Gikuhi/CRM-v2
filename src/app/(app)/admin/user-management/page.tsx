
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const supervisors = [
    { id: 'sup1', name: 'Andrew Mayaka', team: 'Alpha Team', status: 'Active', agents: 5 },
    { id: 'sup2', name: 'Beatrice Njeri', team: 'Bravo Team', status: 'Active', agents: 7 },
];

const agents = [
    { id: 'agent1', name: 'Peris Wanyangi', supervisor: 'Andrew Mayaka', status: 'Online' },
    { id: 'agent2', name: 'John Okoro', supervisor: 'Andrew Mayaka', status: 'Offline' },
    { id: 'agent3', name: 'Grace Akinyi', supervisor: 'Beatrice Njeri', status: 'On Call' },
    { id: 'agent4', name: 'Samuel Mwangi', supervisor: 'Beatrice Njeri', status: 'Online' },
    { id: 'agent5', name: 'Fatuma Ali', supervisor: 'Beatrice Njeri', status: 'Break' },
];


export default function UserManagementMasterPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold">User & Role Management</h1>
       <Tabs defaultValue="agents">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="supervisors">Supervisors</TabsTrigger>
            </TabsList>
             <TabsContent value="agents" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Agent Directory</CardTitle>
                        <CardDescription>Manage all agents in your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search agents..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Button><PlusCircle className="mr-2 h-4 w-4"/> Add Agent</Button>
                        </div>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Supervisor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.map(agent => (
                                <TableRow key={agent.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{agent.name}</span>
                                     </TableCell>
                                     <TableCell>{agent.supervisor}</TableCell>
                                     <TableCell><Badge variant={agent.status === 'Online' ? 'default' : 'outline'}>{agent.status}</Badge></TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Assign to Supervisor</DropdownMenuItem>
                                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                     </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                    </CardContent>
                </Card>
             </TabsContent>
              <TabsContent value="supervisors" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Supervisor Directory</CardTitle>
                        <CardDescription>Manage all supervisors in your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search supervisors..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Button><PlusCircle className="mr-2 h-4 w-4"/> Add Supervisor</Button>
                        </div>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Agents Managed</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supervisors.map(supervisor => (
                                <TableRow key={supervisor.id}>
                                     <TableCell className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>{supervisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{supervisor.name}</span>
                                     </TableCell>
                                     <TableCell>{supervisor.team}</TableCell>
                                     <TableCell>{supervisor.agents}</TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                     </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                    </CardContent>
                </Card>
             </TabsContent>
       </Tabs>
    </div>
  );
}
