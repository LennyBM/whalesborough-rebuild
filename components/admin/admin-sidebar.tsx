"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Home,
  Users,
  Target,
  Sparkles,
  UtensilsCrossed,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Properties", href: "/admin/properties", icon: Home },
  { label: "Guests", href: "/admin/guests", icon: Users },
  { label: "Lodge Leads", href: "/admin/lodge-leads", icon: Target },
  { label: "Spa", href: "/admin/spa", icon: Sparkles },
  { label: "Restaurant", href: "/admin/restaurant", icon: UtensilsCrossed },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden h-11 w-11 inline-flex items-center justify-center bg-primary text-primary-fg"
        aria-label={collapsed ? "Close menu" : "Open menu"}
      >
        {collapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-surface-container-lowest border-r border-outline-variant",
          "w-64 transition-transform duration-200 ease-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          collapsed ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Branding */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-outline-variant">
          <div className="h-8 w-8 bg-primary rounded-none flex items-center justify-center">
            <span className="text-primary-fg font-display text-sm">W</span>
          </div>
          <div>
            <p className="font-display text-h4 text-on-surface leading-tight">
              Whalesborough
            </p>
            <p className="text-caption text-on-surface-muted uppercase tracking-wider">
              Admin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setCollapsed(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-body-sm transition-colors",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant">
          <p className="text-caption text-on-surface-muted">v0.1.0</p>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}
