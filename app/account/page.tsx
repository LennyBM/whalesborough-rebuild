"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import {
  CalendarDays,
  Heart,
  ChevronRight,
  CreditCard,
  Bell,
  Phone,
  HelpCircle,
  FileText,
  LogOut,
  ClipboardList,
  LayoutDashboard,
  BedDouble,
  Sparkles,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  avatarInitial: string;
}

const quickActions = [
  {
    label: "My Bookings",
    icon: CalendarDays,
    href: "/account/bookings",
  },
  {
    label: "Saved Properties",
    icon: Heart,
    href: "#",
  },
  {
    label: "Guest Preferences",
    icon: ClipboardList,
    href: "#",
  },
  {
    label: "Payment Methods",
    icon: CreditCard,
    href: "#",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "#",
  },
];

const supportLinks = [
  {
    label: "Contact Reception",
    icon: Phone,
    href: "tel:01288361361",
  },
  {
    label: "Help & FAQs",
    icon: HelpCircle,
    href: "/contact",
  },
  {
    label: "Cancellation Policy",
    icon: FileText,
    href: "/legal/terms-of-use",
  },
];

function getRoleBadgeClasses(role: string) {
  if (role === "Director") return "bg-primary/15 text-primary";
  if (role.startsWith("Staff")) return "bg-secondary/15 text-secondary";
  if (role === "W Club Member") return "bg-amber-100 text-amber-900";
  return "bg-on-surface/10 text-on-surface";
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wb_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  function handleSignOut() {
    localStorage.removeItem("wb_user");
    setUser(null);
    router.push("/login");
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-lg px-5 pt-10">
          <div className="animate-pulse h-20 w-20 mx-auto rounded-full bg-surface-container" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-5 pt-10">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <span className="font-display text-2xl text-white">
              {user ? user.avatarInitial : "?"}
            </span>
          </div>
          <h1 className="mt-4 font-display text-2xl text-on-surface">
            {user ? user.name : "Guest"}
          </h1>
          {user ? (
            <>
              <span
                className={`mt-2 inline-flex items-center rounded-full px-3 py-1 font-body text-xs font-medium ${getRoleBadgeClasses(user.role)}`}
              >
                {user.role}
              </span>
              <p className="mt-1 font-body text-sm text-on-surface-muted">
                {user.email}
              </p>
            </>
          ) : (
            <Link
              href="/login"
              className="mt-3 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          )}
        </section>

        {/* Director: Staff Portal Card */}
        {user?.role === "Director" && (
          <section className="mb-6">
            <Link
              href="/staff"
              className="flex items-center gap-4 rounded-2xl bg-primary/10 p-5 transition-all hover:bg-primary/15"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-on-surface">
                  Staff Portal
                </p>
                <p className="font-body text-xs text-on-surface-muted mt-0.5">
                  Dashboard, housekeeping & operations
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary shrink-0" />
            </Link>
          </section>
        )}

        {/* Housekeeping Staff: Direct link */}
        {user?.role === "Staff - Housekeeping" && (
          <section className="mb-6">
            <Link
              href="/staff/housekeeping"
              className="flex items-center gap-4 rounded-2xl bg-secondary/10 p-5 transition-all hover:bg-secondary/15"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <BedDouble className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-on-surface">
                  Housekeeping
                </p>
                <p className="font-body text-xs text-on-surface-muted mt-0.5">
                  Room status & turnover tasks
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-secondary shrink-0" />
            </Link>
          </section>
        )}

        {/* Reception Staff: Staff Portal link */}
        {user?.role === "Staff - Reception" && (
          <section className="mb-6">
            <Link
              href="/staff"
              className="flex items-center gap-4 rounded-2xl bg-secondary/10 p-5 transition-all hover:bg-secondary/15"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-on-surface">
                  Staff Portal
                </p>
                <p className="font-body text-xs text-on-surface-muted mt-0.5">
                  Housekeeping & bookings
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-secondary shrink-0" />
            </Link>
          </section>
        )}

        {/* W Club Member: Membership details */}
        {user?.role === "W Club Member" && (
          <section className="mb-6">
            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <p className="font-display text-lg text-on-surface">
                  W Club Gold
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-on-surface-muted">
                    Membership Tier
                  </p>
                  <p className="font-body text-sm font-medium text-amber-900 mt-0.5">
                    Gold
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs text-on-surface-muted">
                    Spa Credits
                  </p>
                  <p className="font-body text-sm font-medium text-amber-900 mt-0.5">
                    3 remaining
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-amber-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="mt-2 font-body text-xs text-on-surface-muted">
                2 stays until Platinum
              </p>
            </div>
          </section>
        )}

        {/* Upcoming Bookings */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Upcoming Booking
          </h2>
          <div className="rounded-2xl bg-surface-container-low p-5">
            <p className="font-display text-lg text-on-surface">
              The Farmhouse
            </p>
            <p className="mt-1 font-body text-sm text-on-surface-variant">
              12–16 Jul 2026 · 4 nights
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="/account/bookings"
                className="font-body text-sm font-medium text-primary underline underline-offset-2"
              >
                View booking
              </Link>
              <Link
                href="/stay/booking/dates"
                className="font-body text-sm font-medium text-secondary underline underline-offset-2"
              >
                Book again
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="rounded-2xl bg-surface-container-low overflow-hidden divide-y divide-on-surface/5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-container"
                >
                  <Icon className="h-5 w-5 text-on-surface-variant shrink-0" />
                  <span className="flex-1 font-body text-sm text-on-surface">
                    {action.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-on-surface-muted shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Loyalty / Membership (for non-members) */}
        {user?.role !== "W Club Member" && (
          <section className="mb-6">
            <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
              Membership
            </h2>
            <div className="rounded-2xl bg-surface-container-low p-5">
              <p className="font-display text-lg text-on-surface">
                Whalesborough Club
              </p>
              <p className="mt-1 font-body text-sm text-on-surface-variant">
                3 stays completed · Next reward at 5
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-surface-container overflow-hidden">
                <div
                  className="h-full rounded-full bg-secondary transition-all"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Settings */}
        <section className="mb-6">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Settings
          </h2>
          <div className="rounded-2xl bg-surface-container-low overflow-hidden">
            <DarkModeToggle />
          </div>
        </section>

        {/* Support */}
        <section className="mb-8">
          <h2 className="mb-3 font-display text-base text-on-surface-muted uppercase tracking-wide">
            Support
          </h2>
          <div className="rounded-2xl bg-surface-container-low overflow-hidden divide-y divide-on-surface/5">
            {supportLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-container"
                >
                  <Icon className="h-5 w-5 text-on-surface-variant shrink-0" />
                  <span className="flex-1 font-body text-sm text-on-surface">
                    {link.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-on-surface-muted shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Sign Out */}
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-on-surface/10 px-5 py-4 font-body text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-body text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        )}
      </div>
    </main>
  );
}
