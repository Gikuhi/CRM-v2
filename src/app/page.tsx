import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <Card className="w-full max-w-sm text-center">
        <CardHeader>
           <div className="flex justify-center items-center gap-2 mb-4">
                <CreditCard className="w-10 h-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline">CollectPro</h1>
            </div>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            The efficient solution for debt collection management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="w-full">
              Proceed to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
