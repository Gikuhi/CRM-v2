
"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, Coffee, Pause, Play, Utensils, Users, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type BreakType = "Tea Time" | "Break Time" | "Meeting Time" | "Lunch Break";

export function AgentStatusMenu() {
  const [isPaused, setIsPaused] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [breakType, setBreakType] = React.useState<BreakType | null>(null);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showTimer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showTimer]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleBreakStart = (type: BreakType) => {
    setBreakType(type);
    setShowTimer(true);
    setIsPaused(true);
  };

  const handleBreakEnd = () => {
    setShowTimer(false);
    setBreakType(null);
    setTime(0);
  };

  const getIconForBreak = (type: BreakType | null) => {
    switch (type) {
        case "Tea Time": return <Coffee className="mr-2" />;
        case "Break Time": return <Timer className="mr-2" />;
        case "Meeting Time": return <Users className="mr-2" />;
        case "Lunch Break": return <Utensils className="mr-2" />;
        default: return null;
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden sm:inline">Agent Status</span>
            <ChevronDown className="ml-0 sm:ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Manage Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? <Play className="mr-2" /> : <Pause className="mr-2" />}
            {isPaused ? "Resume Inbound Calls" : "Pause Inbound Calls"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleBreakStart("Tea Time")}>
            <Coffee className="mr-2" />
            Tea Time
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleBreakStart("Break Time")}>
            <Timer className="mr-2" />
            Break Time
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleBreakStart("Meeting Time")}>
            <Users className="mr-2" />
            Meeting Time
          </DropdownMenuItem>
           <DropdownMenuItem onSelect={() => handleBreakStart("Lunch Break")}>
            <Utensils className="mr-2" />
            Lunch Break
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showTimer} onOpenChange={setShowTimer}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
                {getIconForBreak(breakType)}
                {breakType}
            </DialogTitle>
            <DialogDescription>
              Your status is set to "{breakType}". This timer shows the elapsed time.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <p className="text-6xl font-mono font-bold tracking-widest">{formatTime(time)}</p>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleBreakEnd} className="w-full">
              End Break and Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
