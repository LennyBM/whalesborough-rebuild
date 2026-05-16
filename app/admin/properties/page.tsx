import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Properties",
};

const properties = [
  {
    name: "Meadow Lodge 1",
    type: "Premium Lodge",
    status: "occupied",
    nextAvailable: "23 May 2026",
    price: "£270/night",
  },
  {
    name: "Meadow Lodge 2",
    type: "Premium Lodge",
    status: "available",
    nextAvailable: "Now",
    price: "£270/night",
  },
  {
    name: "Meadow Lodge 3",
    type: "Premium Lodge",
    status: "maintenance",
    nextAvailable: "28 May 2026",
    price: "£270/night",
  },
  {
    name: "Meadow Lodge 4",
    type: "Premium Lodge",
    status: "occupied",
    nextAvailable: "31 May 2026",
    price: "£270/night",
  },
  {
    name: "Woodland Retreat 1",
    type: "Woodland Collection",
    status: "available",
    nextAvailable: "Now",
    price: "£320/night",
  },
  {
    name: "Woodland Retreat 2",
    type: "Woodland Collection",
    status: "occupied",
    nextAvailable: "25 May 2026",
    price: "£320/night",
  },
  {
    name: "Coastal View 3",
    type: "Coastal Collection",
    status: "occupied",
    nextAvailable: "22 May 2026",
    price: "£380/night",
  },
  {
    name: "Coastal View 7",
    type: "Coastal Collection",
    status: "occupied",
    nextAvailable: "27 May 2026",
    price: "£380/night",
  },
  {
    name: "Spa Suite 1",
    type: "Spa Suite",
    status: "occupied",
    nextAvailable: "21 May 2026",
    price: "£450/night",
  },
  {
    name: "Woodland Retreat 5",
    type: "Woodland Collection",
    status: "occupied",
    nextAvailable: "19 May 2026",
    price: "£320/night",
  },
];

function statusBadge(status: string) {
  switch (status) {
    case "available":
      return <Badge variant="success">Available</Badge>;
    case "occupied":
      return <Badge variant="info">Occupied</Badge>;
    case "maintenance":
      return <Badge variant="warning">Maintenance</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-h1 text-on-surface">Properties</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Manage lodges, suites, and accommodation units
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div
            key={property.name}
            className="bg-surface-container-lowest border border-outline-variant p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-h4 text-on-surface">
                  {property.name}
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  {property.type}
                </p>
              </div>
              {statusBadge(property.status)}
            </div>

            <div className="space-y-2 pt-2 border-t border-outline-variant/50">
              <div className="flex justify-between text-body-sm">
                <span className="text-on-surface-muted">Next available</span>
                <span className="text-on-surface">{property.nextAvailable}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-on-surface-muted">Rate</span>
                <span className="text-on-surface font-medium">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
