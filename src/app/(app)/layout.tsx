

"use client"

import * as React from "react";
import { AppLayout } from "@/components/app-layout";
import { CallProvider } from "@/context/CallProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <CallProvider>
      <AppLayout>{children}</AppLayout>
    </CallProvider>
  );
}
