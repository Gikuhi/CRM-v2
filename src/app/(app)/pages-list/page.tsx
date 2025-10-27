
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";

export default function PagesListPage() {
  const agentPages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Debtor Profile", path: "/debtor-profile" },
    { name: "Dialer", path: "/dialer" },
    { name: "Incoming Call", path: "/incoming-call" },
    { name: "PTP Capture", path: "/ptp-capture" },
    { name: "Wrap Matter", path: "/wrap-matter" },
    { name: "Matter Dashboard", path: "/matter-dashboard" },
    { name: "Call Logs", path: "/call-logs" },
    { name: "Tasks", path: "/tasks" },
    { name: "Messaging", path: "/messaging" },
  ];

  const teamManagerPages = [
    { name: "Team Manager Dashboard", path: "/admin-dashboard" },
    { name: "Agent Management", path: "/team-management" },
    { name: "Call Monitoring", path: "/call-monitoring" },
    { name: "Performance Analytics", path: "/analytics" },
    { name: "Schedule Management", path: "/tasks" },
    { name: "Quality Assurance", path: "/reports" },
  ];

  const adminPages = [
      { name: "Admin Dashboard", path: "/admin/dashboard" },
      { name: "User Management", path: "/admin/user-management" },
      { name: "Campaign Management", path: "/admin/campaigns" },
      { name: "Queues & Routing", path: "/admin/queues" },
      { name: "Reports & Analytics", path: "/admin/reports" },
      { name: "Compliance & QA", path: "/admin/compliance" },
      { name: "System Settings", path: "/admin/system-settings" },
      { name: "Cross-Team Analytics", path: "/admin/analytics" },
      { name: "System-Wide Call Monitoring", path: "/admin/call-monitoring" },
      { name: "User Activity & Audit Logs", path: "/admin/audit-logs" },
      { name: "Role & Permission Management", path: "/admin/roles" },
  ];
  
  const utilityPages = [
    { name: "Login", path: "/login" },
    { name: "Settings", path: "/settings" },
    { name: "Pages List (This Page)", path: "/pages-list" },
  ]

  const PageList = ({ title, pages }: { title: string, pages: { name: string, path: string }[] }) => (
    <div>
        <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page.path} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                <List className="h-5 w-5 text-primary" />
                <div>
                    <span className="font-medium">{page.name}</span>
                    <p className="text-sm text-muted-foreground font-mono">{page.path}</p>
                </div>
            </li>
          ))}
        </ul>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Pages</CardTitle>
        <CardDescription>A list of all pages in the application, grouped by user role.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <PageList title="Agent Pages" pages={agentPages} />
        <PageList title="Team Manager Pages" pages={teamManagerPages} />
        <PageList title="Admin / Super User Pages" pages={adminPages} />
        <PageList title="Utility Pages" pages={utilityPages} />
      </CardContent>
    </Card>
  );
}
