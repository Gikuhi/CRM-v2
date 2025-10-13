
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Search,
  LayoutDashboard,
  Users,
  Phone,
  ListChecks,
  MessageSquare,
  FileText,
  CreditCard,
  PhoneForwarded,
  BarChart3,
  Users2,
  FileBarChart,
  AudioLines,
  UserCog,
  PhoneIncoming,
  HandCoins,
  FileStack,
  Info,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AgentInfoSheet } from "./agent-info-sheet";
import { AgentStatusMenu } from "./agent-status-menu";

const agentNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/debtor-profile", icon: Users, label: "Debtor Profile" },
  { href: "/dialer", icon: PhoneForwarded, label: "Dialer" },
  { href: "/incoming-call", icon: PhoneIncoming, label: "Incoming Call" },
  { href: "/ptp-capture", icon: HandCoins, label: "PTP Capture" },
  { href: "/wrap-matter", icon: FileStack, label: "Wrap Matter" },
  { href: "/matter-dashboard", icon: LayoutDashboard, label: "Matter Dashboard" },
  { href: "/call-logs", icon: Phone, label: "Call Logs" },
  { href: "/tasks", icon: ListChecks, label: "Tasks" },
  { href: "/messaging", icon: MessageSquare, label: "Messaging" },
];

const supervisorNavItems = [
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/team-management", icon: Users2, label: "Team Management" },
    { href: "/reports", icon: FileBarChart, label: "Reports" },
    { href: "/call-monitoring", icon: AudioLines, label: "Call Monitoring" },
    { href: "/user-management", icon: UserCog, label: "User Management" },
    { href: "/settings", icon: Settings, label: "Settings" },
];

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/debtor-profile": "Debtor Profile Enhancement",
  "/dialer": "Dialer",
  "/incoming-call": "Incoming Call",
  "/ptp-capture": "Promise to Pay Capture",
  "/wrap-matter": "Wrap Matter",
  "/matter-dashboard": "Matter Dashboard",
  "/call-logs": "Call Logs",
  "/tasks": "Task Management",
  "/messaging": "Secure Messaging",
  "/analytics": "Analytics Overview",
  "/team-management": "Team Management",
  "/reports": "Reports & Analytics",
  "/call-monitoring": "Call Monitoring",
  "/user-management": "User Management",
  "/settings": "Settings",
  "/pages-list": "Pages List",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <CreditCard className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">CollectPro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Agent</SidebarGroupLabel>
            <SidebarMenu>
                {agentNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
             <SidebarGroupLabel>Supervisor</SidebarGroupLabel>
             <SidebarMenu>
                {supervisorNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname === item.href}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
             </SidebarMenu>
          </SidebarGroup>
           <SidebarGroup>
             <SidebarGroupLabel>Development</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/pages-list">
                    <SidebarMenuButton
                        isActive={pathname === "/pages-list"}
                        tooltip="Pages List"
                    >
                        <FileText />
                        <span>Pages List</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              </SidebarMenu>
           </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          {isClient && <SidebarTrigger />}
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">
              {pageTitles[pathname] || "CollectPro"}
            </h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search debtors..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <AgentStatusMenu />
            <AgentInfoSheet />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
