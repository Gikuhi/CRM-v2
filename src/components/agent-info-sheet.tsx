"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
import { Separator } from "./ui/separator";

const InfoRow = ({ label, value, valueColor }: { label: string; value: string, valueColor?: string }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm ${valueColor || 'text-foreground'}`}>{value}</p>
    </div>
);

export function AgentInfoSheet() {
  const [timers, setTimers] = React.useState({
    inboundPaused: 24,
    currentCall: 0,
    lastCall: 193, // 3m 13s
    wrapTime: 0,
    idleTime: 125, // 2m 5s
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => ({
        ...prev,
        inboundPaused: prev.inboundPaused + 1,
        // Example logic: if not in a call, idle time increases
        idleTime: prev.currentCall === 0 ? prev.idleTime + 1 : prev.idleTime,
        // Example logic: if in a call, current call time increases
        currentCall: prev.currentCall > 0 ? prev.currentCall + 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
    
  const formatTimeShort = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Info className="h-5 w-5" />
          <span className="sr-only">Show Agent Info</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Agent Info</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">QR Code</p>
                    </div>
                </div>
                 <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Queues Linked To Agent</h3>
                    <InfoRow label="NBA Kenya Inbound Position" value="(NA)" />
                    <InfoRow label="NBA Kenya Inbound 98005|RE Position" value="(NA)" />
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Agent Info</h3>
                    <InfoRow label="Employee" value="Peris Zubeda Wanyangi (12502)" valueColor="text-primary" />
                    <InfoRow label="Teamleader" value="Andrew Simiyu Mayaka" valueColor="text-primary" />
                    <InfoRow label="Matter" value="'Not on matter'" />
                    <InfoRow label="Extension" value="22502@thirsty-ken,nimblegroup.co.za" valueColor="text-primary" />
                    <InfoRow label="Version" value="Web:1.0.22902 Electron:2.0.2.3" />
                    <InfoRow label="Current Page" value="self-assessment(00:00:24)" valueColor="text-primary" />
                </div>
                 <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Inbound Calls</h3>
                    <InfoRow label="Inbound Calls Are Currently" value="Paused By User" valueColor="text-primary" />
                    <Separator className="my-2"/>
                    <h3 className="font-semibold text-sm">Phone Status</h3>
                     <InfoRow label="registered" value="(01:40:17)" valueColor="text-primary" />
                    <h3 className="font-semibold text-sm">Call Status</h3>
                     <InfoRow label="Terminated" value="(00:02:57)" valueColor="text-primary" />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold text-sm">Agent Status</h3>
                <div className="mt-2 p-3 bg-muted rounded-md space-y-3">
                    <InfoRow label="INBOUND PAUSED" value={`(${formatTime(timers.inboundPaused)})`} valueColor="text-primary"/>
                    <div className="grid grid-cols-2 gap-4">
                       <InfoRow label="Idle Time" value={formatTimeShort(timers.idleTime)} />
                       <InfoRow label="Current Call" value={formatTimeShort(timers.currentCall)} />
                       <InfoRow label="Last Call" value={formatTimeShort(timers.lastCall)} />
                       <InfoRow label="Wrap Time" value={formatTimeShort(timers.wrapTime)} />
                    </div>
                    <InfoRow label="Available For Calls" value="No" valueColor="text-primary"/>
                </div>
            </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
