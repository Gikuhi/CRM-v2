
import { AdminCallStats } from "@/components/admin/admin-call-stats";
import { AdminCollectionsChart } from "@/components/admin/admin-collections-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const liveCampaigns = [
    { id: 1, name: 'Q3 Financial Push', status: 'Active', agents: 5, progress: 65 },
    { id: 2, name: 'New Leads Outreach', status: 'Active', agents: 8, progress: 40 },
    { id: 3, name: 'Past-Due Follow-up', status: 'Paused', agents: 3, progress: 80 },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCallStats />
        <AdminCollectionsChart />
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Live Campaigns</CardTitle>
              <CardDescription>Real-time overview of ongoing campaigns in your organization.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Active Agents</TableHead>
                          <TableHead className="w-[30%]">Progress</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {liveCampaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                              <TableCell className="font-medium">{campaign.name}</TableCell>
                              <TableCell>
                                  <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>{campaign.status}</Badge>
                              </TableCell>
                              <TableCell>{campaign.agents}</TableCell>
                              <TableCell>
                                  <div className="flex items-center gap-2">
                                      <div className="w-full bg-muted rounded-full h-2.5">
                                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
                                      </div>
                                      <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                                  </div>
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
