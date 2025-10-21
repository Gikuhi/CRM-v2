
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";

export default function ComprehensiveReportingCenterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reporting Center</h1>
        <Button>
            <FilePlus2 className="mr-2 h-4 w-4"/>
            Create Custom Report
        </Button>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Saved Reports</CardTitle>
            <CardDescription>Access organizational, financial, compliance, and custom-built reports.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center text-muted-foreground py-8">
                <p>A list of saved and pre-built reports will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
