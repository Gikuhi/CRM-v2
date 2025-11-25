

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";

export default function PagesListPage() {
  const agentPages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leads", path: "/debtor-profile" },
    { name: "Debtor Information", path: "/debtor/1" },
    { name: "Add PTP", path: "/debtor/1/add-ptp" },
    { name: "Dialer", path: "/dialer" },
    { name: "Incoming Call", path: "/incoming-call" },
    { name: "PTP Capture", path: "/ptp-capture" },
    { name: "Wrap Matter", path: "/wrap-matter" },
    { name: "Matter Dashboard", path: "/matter-dashboard" },
    { name: "Call Logs", path: "/call-logs" },
    { name: "Call Wraps History", path: "/call-wraps" },
    { name: "My Stats", path: "/analytics" },
    { name: "Follow-up Tasks", path: "/tasks" },
    { name: "Messaging", path: "/messaging" },
    { name: "Notifications", path: "/notifications" },
    { name: "Help & Support", path: "/help" },
  ];

  const teamManagerPages = [
    { name: "Supervisor Dashboard", path: "/supervisor/dashboard" },
    { name: "Agent Management", path: "/supervisor/team-management" },
    { name: "Campaign Management", path: "/supervisor/campaigns" },
    { name: "Call Monitoring", path: "/call-monitoring" },
    { name: "Reports & Analytics", path: "/reports" },
    { name: "Schedule Management", path: "/tasks" },
  ];

  const adminPages = [
      { name: "Admin Dashboard", path: "/admin/dashboard" },
      { name: "Teams Management", path: "/admin/teams"},
      { name: "User & Role Management", path: "/admin/user-management" },
      { name: "Campaign Management", path: "/admin/campaigns" },
      { name: "Cross-Team Analytics", path: "/admin/analytics" },
      { name: "System-Wide Call Monitoring", path: "/admin/call-monitoring" },
      { name: "Reporting Center", path: "/admin/reports" },
      { name: "Compliance & QA", path: "/admin/compliance" },
      { name: "Queue & Routing Control", path: "/admin/queues" },
      { name: "User Activity & Audit Logs", path: "/admin/audit-logs" },
      { name: "Role & Permission Management", path: "/admin/roles" },
      { name: "Organization Settings", path: "/admin/system-settings" },
      { name: "Billing & Subscription", path: "/admin/billing" },
  ];

  const superAdminPages = [
      { name: "Super Admin Overview", path: "/super-admin/overview" },
      { name: "Organization Management", path: "/super-admin/organizations" },
      { name: "Global User Management", path: "/super-admin/global-users" },
      { name: "Global Campaign Management", path: "/super-admin/campaigns" },
      { name: "System Health Monitoring", path: "/super-admin/system-health" },
      { name: "Billing & Subscriptions", path: "/super-admin/billing" },
      { name: "Security Management", path: "/super-admin/security" },
      { name: "Global Integrations", path: "/super-admin/integrations" },
      { name: "Global Reports", path: "/super-admin/reports" },
      { name: "Audit & Compliance Center", path: "/super-admin/audit" },
      { name: "Global Settings", path: "/super-admin/settings" },
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
        <PageList title="Supervisor / Team Manager Pages" pages={teamManagerPages} />
        <PageList title="Admin Pages" pages={adminPages} />
        <PageList title="Super Admin Pages" pages={superAdminPages} />
        <PageList title="Utility Pages" pages={utilityPages} />
      </CardContent>
    </Card>
  );
}
