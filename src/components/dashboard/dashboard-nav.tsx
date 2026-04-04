"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  LayoutDashboard,
  Settings,
  Route,
} from "lucide-react";

const iconMap = {
  dashboard: LayoutDashboard,
  bookings: Briefcase,
  settings: Settings,
  planner: Route,
};

type DashboardNavItem = {
  title: string;
  href: string;
  icon: keyof typeof iconMap;
};

export function DashboardNav({ items }: { items: DashboardNavItem[] }) {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <Link key={item.href} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                path === item.href ? "bg-accent" : "transparent"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
