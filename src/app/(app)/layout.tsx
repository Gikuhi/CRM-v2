

import { AppLayout } from "@/components/app-layout";
import { CallProvider } from "@/context/CallProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CallProvider>
      <AppLayout>{children}</AppLayout>
    </CallProvider>
  );
}
