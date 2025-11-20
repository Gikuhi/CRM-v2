
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Play, Pause, Trash2, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const campaignQueues = [
    { id: 'q1', name: 'Q3 Broken PTPs', campaign: 'Q3 Financial Push', status: 'Active', filters: ['Broken PTP'], startTime: '2024-08-15 09:00 AM', size: 125 },
    { id: 'q2', name: 'New Leads - First Contact', campaign: 'New Leads Outreach', status: 'Scheduled', filters: ['New Lead'], startTime: '2024-08-16 10:00 AM', size: 850 },
    { id: 'q3', name: 'Past-Due Follow-up (No RPC)', campaign: 'Past-Due Follow-up', status: 'Paused', filters: ['No RPC'], startTime: '2024-08-14 02:00 PM', size: 45 },
    { id: 'q4', name: 'Q3 High-Value Targets', campaign: 'Q3 Financial Push', status: 'Active', filters: ['Balance > 50k'], startTime: '2024-08-15 11:00 AM', size: 30 },
];

export default function QueueAndRoutingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaign Queue Management</h1>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Queue</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active & Scheduled Queues</CardTitle>
          <CardDescription>Manage dialing queues for specific campaigns, filters, and start times.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Queue Name</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Filters</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {campaignQueues.map(queue => (
                    <TableRow key={queue.id}>
                        <TableCell className="font-medium">{queue.name}</TableCell>
                        <TableCell>{queue.campaign}</TableCell>
                        <TableCell>
                            <Badge variant={queue.status === 'Active' ? 'default' : 'secondary'}>{queue.status}</Badge>
                        </TableCell>
                        <TableCell>{queue.size}</TableCell>
                        <TableCell>{queue.startTime}</TableCell>
                        <TableCell>
                            <div className="flex gap-1">
                                {queue.filters.map(filter => <Badge key={filter} variant="outline"><Filter className="h-3 w-3 mr-1"/>{filter}</Badge>)}
                            </div>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" title={queue.status === 'Active' ? 'Pause' : 'Start'}>
                                {queue.status === 'Active' ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                            </Button>
                             <Button variant="ghost" size="icon" title="Delete" className="text-destructive">
                                <Trash2 className="h-4 w-4"/>
                            </Button>
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
