import type { Metadata } from "next";

import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Bookings",
};

const tabs = ["All", "Pending", "Confirmed", "Checked In", "Cancelled"];

const bookings = [
  {
    ref: "WB-2847",
    guest: "James Hartley",
    property: "Meadow Lodge 4",
    dates: "24 May – 31 May 2026",
    status: <Badge variant="success">Confirmed</Badge>,
    total: "£1,890",
  },
  {
    ref: "WB-2846",
    guest: "Sarah Mitchell",
    property: "Woodland Retreat 2",
    dates: "22 May – 25 May 2026",
    status: <Badge variant="warning">Pending</Badge>,
    total: "£945",
  },
  {
    ref: "WB-2845",
    guest: "David Chen",
    property: "Coastal View 7",
    dates: "20 May – 27 May 2026",
    status: <Badge variant="success">Confirmed</Badge>,
    total: "£2,310",
  },
  {
    ref: "WB-2844",
    guest: "Emma Richardson",
    property: "Spa Suite 1",
    dates: "19 May – 21 May 2026",
    status: <Badge variant="info">Checked In</Badge>,
    total: "£680",
  },
  {
    ref: "WB-2843",
    guest: "Michael Torres",
    property: "Meadow Lodge 2",
    dates: "18 May – 25 May 2026",
    status: <Badge variant="error">Cancelled</Badge>,
    total: "£1,750",
  },
  {
    ref: "WB-2842",
    guest: "Lisa Pemberton",
    property: "Coastal View 3",
    dates: "17 May – 22 May 2026",
    status: <Badge variant="success">Confirmed</Badge>,
    total: "£1,540",
  },
  {
    ref: "WB-2841",
    guest: "Robert Ainsworth",
    property: "Meadow Lodge 1",
    dates: "16 May – 23 May 2026",
    status: <Badge variant="warning">Pending</Badge>,
    total: "£1,890",
  },
  {
    ref: "WB-2840",
    guest: "Catherine Blake",
    property: "Woodland Retreat 5",
    dates: "15 May – 19 May 2026",
    status: <Badge variant="info">Checked In</Badge>,
    total: "£1,120",
  },
];

const columns = [
  { key: "ref", label: "Ref", sortable: true },
  { key: "guest", label: "Guest", sortable: true },
  { key: "property", label: "Property", sortable: true },
  { key: "dates", label: "Dates", sortable: true },
  { key: "status", label: "Status" },
  { key: "total", label: "Total", sortable: true },
];

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-h1 text-on-surface">Bookings</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage all property and experience bookings
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search by guest name, reference, or property..."
            className="w-full h-11 px-4 bg-surface-container-lowest border border-outline-variant text-body-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b border-outline-variant">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2.5 text-body-sm transition-colors border-b-2 ${
              i === 0
                ? "border-primary text-primary font-medium"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant">
        <DataTable columns={columns} rows={bookings} />
      </div>

      {/* Pagination hint */}
      <div className="flex items-center justify-between text-body-sm text-on-surface-muted">
        <p>Showing 1–8 of 1,247 bookings</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-outline-variant bg-surface-container-lowest text-on-surface-variant">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-outline-variant bg-surface-container-lowest text-on-surface">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
