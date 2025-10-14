import { AppLayout } from "@/components/app-layout";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AppLayout>{children}</AppLayout>
    </FirebaseClientProvider>
  );
}
