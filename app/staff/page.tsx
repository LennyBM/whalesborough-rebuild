"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Wrench,
  ShieldAlert,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  avatarInitial: string;
}

const staffLinks = [
  {
    label: "Dashboard",
    description: "Overview, occupancy & revenue",
    icon: LayoutDashboard,
    href: "/staff/dashboard",
    requiredRoles: ["Director"],
  },
  {
    label: "Housekeeping",
    description: "Room status & turnover tasks",
    icon: BedDouble,
    href: "/staff/housekeeping",
    requiredRoles: ["Director", "Staff - Housekeeping", "Staff - Reception"],
  },
  {
    label: "Bookings",
    description: "Coming soon",
    icon: CalendarDays,
    href: "#",
    requiredRoles: ["Director", "Staff - Reception"],
    comingSoon: true,
  },
  {
    label: "Maintenance",
    description: "Coming soon",
    icon: Wrench,
    href: "#",
    requiredRoles: ["Director", "Staff - Housekeeping"],
    comingSoon: true,
  },
];

export default function StaffPortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("wb_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-lg px-5 pt-10">
          <div className="animate-pulse h-8 w-48 bg-surface-container rounded" />
        </div>
      </main>
    );
  }

  const isStaff =
    user &&
    (user.role === "Director" ||
      user.role.startsWith("Staff"));

  if (!isStaff) {
    return (
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-lg px-5 pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="mt-6 font-display text-2xl text-on-surface">
              Access Denied
            </h1>
            <p className="mt-2 font-body text-sm text-on-surface-muted max-w-xs">
              The staff portal is only available to Whalesborough team members.
            </p>
            <Link
              href="/account"
              className="mt-6 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white"
            >
              Back to Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const visibleLinks = staffLinks.filter((link) =>
    link.requiredRoles.includes(user.role)
  );

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-5 pt-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl text-on-surface">
            Staff Portal
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-muted">
            Signed in as {user.name}
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-4">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-2xl bg-surface-container-low p-5 transition-all hover:bg-surface-container ${
                  link.comingSoon ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-on-surface">
                      {link.label}
                    </p>
                    <p className="font-body text-xs text-on-surface-muted mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/account"
            className="font-body text-sm text-primary underline underline-offset-2"
          >
            Back to Account
          </Link>
        </div>
      </div>
    </main>
  );
}
