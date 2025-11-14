
"use client";

import * as React from "react";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockNotifications } from "@/lib/data";
import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";

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
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-64">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex items-start gap-3 whitespace-normal",
                !notification.read && "font-semibold"
              )}
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex-shrink-0 mt-1">
                <span
                  className={cn(
                    "block h-2 w-2 rounded-full",
                    !notification.read ? "bg-primary" : "bg-transparent"
                  )}
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm">{notification.text}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </DropdownMenuItem>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No new notifications.
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
