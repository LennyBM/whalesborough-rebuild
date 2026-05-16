import type { Metadata } from "next";

import { DataTable } from "@/components/admin/data-table";

export const metadata: Metadata = {
  title: "Guests",
};

const guests = [
  {
    name: "James Hartley",
    email: "james.hartley@email.com",
    bookings: "7",
    lastStay: "24 May 2026",
    totalSpent: "£12,430",
  },
  {
    name: "Sarah Mitchell",
    email: "s.mitchell@email.com",
    bookings: "3",
    lastStay: "22 May 2026",
    totalSpent: "£4,890",
  },
  {
    name: "David Chen",
    email: "dchen@email.com",
    bookings: "12",
    lastStay: "20 May 2026",
    totalSpent: "£28,750",
  },
  {
    name: "Emma Richardson",
    email: "emma.r@email.com",
    bookings: "5",
    lastStay: "19 May 2026",
    totalSpent: "£8,640",
  },
  {
    name: "Michael Torres",
    email: "m.torres@email.com",
    bookings: "2",
    lastStay: "18 May 2026",
    totalSpent: "£3,500",
  },
  {
    name: "Lisa Pemberton",
    email: "lisa.p@email.com",
    bookings: "9",
    lastStay: "17 May 2026",
    totalSpent: "£18,920",
  },
  {
    name: "Robert Ainsworth",
    email: "r.ainsworth@email.com",
    bookings: "4",
    lastStay: "16 May 2026",
    totalSpent: "£7,560",
  },
  {
    name: "Catherine Blake",
    email: "c.blake@email.com",
    bookings: "6",
    lastStay: "15 May 2026",
    totalSpent: "£11,200",
  },
];

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "bookings", label: "Bookings", sortable: true },
  { key: "lastStay", label: "Last Stay", sortable: true },
  { key: "totalSpent", label: "Total Spent", sortable: true },
];

export default function GuestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-h1 text-on-surface">Guests</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Guest profiles and stay history
        </p>
      </div>

      {/* Search */}
      <div>
        <input
          type="search"
          placeholder="Search by guest name or email..."
          className="w-full max-w-md h-11 px-4 bg-surface-container-lowest border border-outline-variant text-body-sm text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant">
        <DataTable columns={columns} rows={guests} />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-body-sm text-on-surface-muted">
        <p>Showing 1–8 of 342 guests</p>
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
