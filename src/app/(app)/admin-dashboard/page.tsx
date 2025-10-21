
import { AdminCallStats } from "@/components/admin/admin-call-stats";
import { AdminCollectionsChart } from "@/components/admin/admin-collections-chart";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AdminCallStats />
      <AdminCollectionsChart />
    </div>
  );
}
