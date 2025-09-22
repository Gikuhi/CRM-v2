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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Info className="h-5 w-5" />
          <span className="sr-only">Show IT Info</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>IT Info</SheetTitle>
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
                    <InfoRow label="Employee" value="Peris Zubeda Wanyangi (12502)" valueColor="text-accent" />
                    <InfoRow label="Teamleader" value="Andrew Simiyu Mayaka" valueColor="text-accent" />
                    <InfoRow label="Matter" value="'Not on matter'" />
                    <InfoRow label="Extension" value="22502@thirsty-ken,nimblegroup.co.za" valueColor="text-accent" />
                    <InfoRow label="Version" value="Web:1.0.22902 Electron:2.0.2.3" />
                    <InfoRow label="Current Page" value="self-assessment(00:00:24)" valueColor="text-accent" />
                </div>
                 <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Inbound Calls</h3>
                    <InfoRow label="Inbound Calls Are Currently" value="Paused By User" valueColor="text-accent" />
                    <Separator className="my-2"/>
                    <h3 className="font-semibold text-sm">Phone Status</h3>
                     <InfoRow label="registered" value="(01:40:17)" valueColor="text-accent" />
                    <h3 className="font-semibold text-sm">Call Status</h3>
                     <InfoRow label="Terminated" value="(00:02:57)" valueColor="text-accent" />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold text-sm">Agent Status</h3>
                <div className="mt-2 p-3 bg-muted rounded-md space-y-3">
                    <InfoRow label="INBOUND PAUSED" value="(00:00:24)" valueColor="text-accent"/>
                    <div className="grid grid-cols-3 gap-2">
                        <InfoRow label="Current Call" value="00:00" />
                        <InfoRow label="Last Call" value="03:13" />
                        <InfoRow label="Wrap Time" value="00:00" />
                    </div>
                    <InfoRow label="Available For Calls" value="No" valueColor="text-accent"/>
                </div>
            </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
