

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
  BarChart3,
  Users2,
  FileBarChart,
  AudioLines,
  Settings,
  LayoutGrid,
  CalendarClock,
  Building,
  Activity,
  HeartPulse,
  Banknote,
  FileSearch,
  SlidersHorizontal,
  HelpCircle,
  TrendingUp,
  Save,
  BookUser,
  LifeBuoy,
  Settings2,
  Shield,
  UsersRound,
  ShieldCheck,
  LineChart,
  ListTodo,
  ShieldQuestion,
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
import { AgentInfoSheet } from "@/components/agent-info-sheet";
import { AgentStatusMenu } from "@/components/agent-status-menu";
import { useAuth, useUser } from "@/firebase";
import { useDoc } from "@/firebase/firestore/use-doc";
import { doc } from "firebase/firestore";
import { useFirestore, useMemoFirebase } from "@/firebase/provider";
import type { UserProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationBell } from "@/components/notifications/notification-bell";

const agentNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/debtor-profile", icon: Users, label: "Leads" },
  { href: "/dialer", icon: Phone, label: "Dialer" },
  { href: "/incoming-call", icon: Phone, label: "Incoming Call" },
  { href: "/ptp-capture", icon: Banknote, label: "PTP Capture" },
  { href: "/wrap-matter", icon: Save, label: "Wrap Matter" },
  { href: "/matter-dashboard", icon: LayoutGrid, label: "Matter Dashboard" },
  { href: "/call-logs", icon: Phone, label: "Call Logs" },
  { href: "/call-wraps", icon: Save, label: "Call Wraps" },
  { href: "/messaging", icon: MessageSquare, label: "Messages" },
  { href: "/analytics", icon: TrendingUp, label: "My Stats" },
  { href: "/tasks", icon: ListChecks, label: "Follow-ups" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help" },
];

const adminNavItems = [
    { href: "/admin/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/admin/teams", icon: UsersRound, label: "Teams" },
    { href: "/admin/user-management", icon: BookUser, label: "Users" },
    { href: "/admin/campaigns", icon: LifeBuoy, label: "Campaigns" },
    { href: "/admin/analytics", icon: LineChart, label: "Analytics" },
    { href: "/admin/call-monitoring", icon: AudioLines, label: "Call Monitoring" },
    { href: "/admin/reports", icon: FileBarChart, label: "Reports" },
    { href: "/admin/compliance", icon: ShieldCheck, label: "Compliance & QA"},
    { href: "/admin/queues", icon: ListTodo, label: "Queues & Routing"},
    { href: "/admin/audit-logs", icon: FileSearch, label: "Audit Logs"},
    { href: "/admin/roles", icon: Users, label: "Roles"},
    { href: "/admin/system-settings", icon: Settings2, label: "Org Settings" },
    { href: "/admin/billing", icon: Banknote, label: "Billing" },
    { href: "/settings", icon: Settings, label: "My Settings" },
]

const teamManagerNavItems = [
    { href: "/admin-dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/team-management", icon: Users2, label: "Agents" },
    { href: "/call-monitoring", icon: AudioLines, label: "Call Monitoring" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
    { href: "/tasks", icon: CalendarClock, label: "Schedule" },
    { href: "/settings", icon: Settings, label: "Settings" },
];

const superAdminNavItems = [
  { href: "/super-admin/overview", icon: LayoutDashboard, label: "Overview" },
  { href: "/super-admin/organizations", icon: Building, label: "Organizations" },
  { href: "/super-admin/global-users", icon: Users, label: "Global Users" },
  { href: "/super-admin/campaigns", icon: Activity, label: "Campaigns" },
  { href: "/super-admin/system-health", icon: HeartPulse, label: "System Health" },
  { href: "/super-admin/billing", icon: Banknote, label: "Billing" },
  { href: "/super-admin/security", icon: Shield, label: "Security" },
  { href: "/super-admin/integrations", icon: SlidersHorizontal, label: "Integrations" },
  { href: "/super-admin/reports", icon: FileBarChart, label: "Reports" },
  { href: "/super-admin/audit", icon: FileSearch, label: "Audit & Compliance" },
  { href: "/super-admin/settings", icon: Settings, label: "Settings" },
];


const pageTitles: { [key: string]: string } = {
  "/dashboard": "Agent Dashboard",
  "/debtor-profile": "Lead Management",
  "/debtor": "Debtor Information",
  "/dialer": "Dialer",
  "/incoming-call": "Incoming Call",
  "/ptp-capture": "Promise to Pay Capture",
  "/wrap-matter": "Wrap Matter",
  "/matter-dashboard": "Matter Dashboard",
  "/call-logs": "Call Logs",
  "/call-wraps": "Call Wrap History",
  "/tasks": "Follow-up Tasks",
  "/messaging": "Communication Hub",
  "/analytics": "My Stats",
  "/help": "Help & Support",
  "/team-management": "Agent Management",
  "/reports": "Reports & Analytics",
  "/call-monitoring": "Call Monitoring",
  "/user-management": "User Management",
  "/settings": "Settings",
  "/admin-dashboard": "Supervisor Dashboard",
  "/pages-list": "Pages List",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/teams": "Teams Management",
  "/admin/user-management": "User & Role Management",
  "/admin/analytics": "Cross-Team Analytics",
  "/admin/call-monitoring": "System-Wide Call Monitoring",
  "/admin/reports": "Reporting Center",
  "/admin/audit-logs": "User Activity & Audit Logs",
  "/admin/roles": "Role & Permission Management",
  "/admin/campaigns": "Campaign Management",
  "/admin/queues": "Queue & Routing Control",
  "/admin/compliance": "Compliance & QA",
  "/admin/system-settings": "Organization Settings",
  "/admin/billing": "Billing & Subscription",
  "/super-admin/overview": "Super Admin Overview",
  "/super-admin/organizations": "Organization Management",
  "/super-admin/global-users": "Global User Management",
  "/super-admin/campaigns": "Global Campaign Management",
  "/super-admin/system-health": "System Health Monitoring",
  "/super-admin/billing": "Billing & Subscriptions",
  "/super-admin/security": "Security Management",
  "/super-admin/integrations": "Global Integrations",
  "/super-admin/reports": "Global Reports",
  "/super-admin/audit": "Audit & Compliance Center",
  "/super-admin/settings": "Global Settings",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(
    () => (user ? doc(firestore, `users/${user.uid}`) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  React.useEffect(() => {
    // We are skipping authentication checks now
    // if (isUserLoading || isProfileLoading) {
    //   return; 
    // }

    // if (!user) {
    //   router.replace('/login');
    // }
  }, [user, isUserLoading, isProfileLoading, router]);

  const isLoading = isUserLoading || isProfileLoading;

  // Since authentication is removed, we don't need a loading screen,
  // but we can keep a skeleton UI for fetching profile data if needed.
  // For now, we will render the layout immediately.
  
  const handleLogout = async () => {
    // Since we removed auth, logout just redirects to login page
    router.push("/login");
  };

  const getPageTitle = (path: string): string => {
    if (path.startsWith('/debtor/')) {
        return 'Debtor Information';
    }
    return pageTitles[path] || "CollectPro";
  }

  const renderSidebarMenu = () => {
    const allNavGroups = [
      { label: "Agent", items: agentNavItems },
      { label: "Supervisor", items: teamManagerNavItems },
      { label: "Admin", items: adminNavItems },
      { label: "Super Admin", items: superAdminNavItems },
    ];
    
    return (
        <>
            {isLoading ? (
                 <div className="space-y-4 p-2">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                 </div>
            ) : (
              allNavGroups.map((group) => (
                <SidebarGroup key={group.label}>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                          <SidebarMenuButton
                            isActive={pathname.startsWith(item.href)}
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
              ))
            )}
        </>
    )
  }

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
           {renderSidebarMenu()}
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
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">
              {getPageTitle(pathname)}
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
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={userProfile?.profilePictureUrl} />
                    <AvatarFallback>{userProfile?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
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
