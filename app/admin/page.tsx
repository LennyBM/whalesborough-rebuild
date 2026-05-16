import type { Metadata } from "next";
import Link from "next/link";

import { StatCard } from "@/components/admin/stat-card";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Total Bookings",
    value: "1,247",
    trend: { direction: "up" as const, percentage: "+12.3%" },
  },
  {
    label: "Revenue MTD",
    value: "£84,520",
    trend: { direction: "up" as const, percentage: "+8.1%" },
  },
  {
    label: "Occupancy %",
    value: "78%",
    trend: { direction: "down" as const, percentage: "-2.4%" },
  },
  {
    label: "Active Leads",
    value: "34",
    trend: { direction: "up" as const, percentage: "+5.9%" },
  },
];

const recentBookings = [
  {
    ref: "WB-2847",
    guest: "James Hartley",
    property: "Meadow Lodge 4",
    dates: "24 May – 31 May",
    status: <Badge variant="success">Confirmed</Badge>,
    total: "£1,890",
  },
  {
    ref: "WB-2846",
    guest: "Sarah Mitchell",
    property: "Woodland Retreat 2",
    dates: "22 May – 25 May",
    status: <Badge variant="warning">Pending</Badge>,
    total: "£945",
  },
  {
    ref: "WB-2845",
    guest: "David Chen",
    property: "Coastal View 7",
    dates: "20 May – 27 May",
    status: <Badge variant="success">Confirmed</Badge>,
    total: "£2,310",
  },
  {
    ref: "WB-2844",
    guest: "Emma Richardson",
    property: "Spa Suite 1",
    dates: "19 May – 21 May",
    status: <Badge variant="info">Checked In</Badge>,
    total: "£680",
  },
  {
    ref: "WB-2843",
    guest: "Michael Torres",
    property: "Meadow Lodge 2",
    dates: "18 May – 25 May",
    status: <Badge variant="error">Cancelled</Badge>,
    total: "£1,750",
  },
];

const bookingColumns = [
  { key: "ref", label: "Ref", sortable: true },
  { key: "guest", label: "Guest", sortable: true },
  { key: "property", label: "Property", sortable: true },
  { key: "dates", label: "Dates" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total", sortable: true },
];

const quickActions = [
  { label: "New Booking", href: "/admin/bookings/new" },
  { label: "Add Guest", href: "/admin/guests/new" },
  { label: "Lodge Enquiry", href: "/admin/lodge-leads/new" },
  { label: "Spa Schedule", href: "/admin/spa" },
  { label: "Restaurant Covers", href: "/admin/restaurant" },
  { label: "Site Content", href: "/admin/content" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-h1 text-on-surface">Dashboard</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Overview of Whalesborough Farm Resort &amp; Spa
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-h3 text-on-surface">
            Recent Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-body-sm text-secondary hover:text-primary transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant">
          <DataTable columns={bookingColumns} rows={recentBookings} />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-display text-h3 text-on-surface mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center justify-center px-4 py-4 bg-surface-container-lowest border border-outline-variant text-body-sm text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors text-center"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
