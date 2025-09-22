import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";

export default function PagesListPage() {
  const pages = [
    "Dashboard",
    "Debtor Profile",
    "Dialer",
    "Incoming Call",
    "PTP Capture",
    "Wrap Matter",
    "Matter Dashboard",
    "Call Logs",
    "Tasks",
    "Messaging",
    "Analytics",
    "Team Management",
    "Reports",
    "Call Monitoring",
    "User Management",
    "Pages List",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Pages</CardTitle>
        <CardDescription>A list of all the pages that have been created in this application.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page} className="flex items-center gap-3">
                <List className="h-5 w-5 text-primary" />
                <span className="font-medium">{page}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
