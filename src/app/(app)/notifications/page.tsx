
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockNotifications } from "@/lib/data";
import type { Notification } from "@/lib/types";
import { Bell, Check, CircleDollarSign, Clock, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'PTP':
            return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'Assignment':
            return <UserPlus className="h-5 w-5 text-blue-500" />;
        case 'Success':
            return <CircleDollarSign className="h-5 w-5 text-green-500" />;
        case 'System':
        default:
            return <Bell className="h-5 w-5 text-slate-500" />;
    }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Here are all your recent notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end">
            <Button variant="link" onClick={handleMarkAllAsRead}>Mark all as read</Button>
        </div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
                "flex items-center gap-4 rounded-lg border p-4 transition-colors",
                !notification.read ? "bg-primary/5 border-primary/20" : "bg-transparent"
            )}
          >
            <Avatar className="h-10 w-10">
                <AvatarFallback className={cn(!notification.read ? "bg-primary/10" : "bg-secondary")}>
                    {getNotificationIcon(notification.type)}
                </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className={cn("font-medium", !notification.read && "font-bold")}>{notification.text}</p>
              <p className="text-sm text-muted-foreground">{notification.time}</p>
            </div>
            { !notification.read && 
                <Button size="sm" variant="ghost" onClick={() => handleMarkAsRead(notification.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark as read
                </Button>
            }
          </div>
        ))}
        {notifications.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

