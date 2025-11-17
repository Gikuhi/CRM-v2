

"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Check, Clock, UserPlus, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuFooter
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockNotifications } from "@/lib/data";
import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";


const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'PTP':
            return <Clock className="h-4 w-4 text-yellow-500" />;
        case 'Assignment':
            return <UserPlus className="h-4 w-4 text-blue-500" />;
        case 'Success':
            return <CircleDollarSign className="h-4 w-4 text-green-500" />;
        case 'System':
        default:
            return <Bell className="h-4 w-4 text-slate-500" />;
    }
}


export function NotificationBell() {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-destructive ring-2 ring-background" />
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span className="font-bold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {notifications.length > 0 ? notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex items-start gap-3 whitespace-normal p-3",
                !notification.read && "bg-blue-50 dark:bg-blue-900/20"
              )}
              onSelect={(e) => e.preventDefault()}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-secondary">
                    {getNotificationIcon(notification.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className={cn("text-sm", !notification.read && "font-semibold")}>{notification.text}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => handleMarkAsRead(notification.id)}
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </DropdownMenuItem>
          )) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No new notifications.
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuFooter>
            <Button variant="ghost" className="w-full" asChild>
                <Link href="/notifications">
                    View all notifications
                </Link>
            </Button>
        </DropdownMenuFooter>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
