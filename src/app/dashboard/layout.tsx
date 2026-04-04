import Header from "@/components/layout/header";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { dashboardNavItems } from "@/lib/data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 py-10">
        <aside>
          <DashboardNav items={dashboardNavItems} />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
