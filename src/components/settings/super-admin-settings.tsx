
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SuperAdminSettings() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Manage global settings for the entire platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Enable White-Label Mode</Label>
                        <p className="text-sm text-muted-foreground">
                            Remove all CollectPro branding from the application.
                        </p>
                    </div>
                    <Switch />
                </div>
                <Button>Save System Config</Button>
            </CardContent>
        </Card>
    </div>
  );
}
