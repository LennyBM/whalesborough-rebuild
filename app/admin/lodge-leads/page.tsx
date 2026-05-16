import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lodge Leads",
};

interface Lead {
  name: string;
  collection: string;
  date: string;
  budget?: string;
}

const pipeline: Record<string, Lead[]> = {
  New: [
    { name: "Thomas & Claire Wright", collection: "Coastal Collection", date: "15 May 2026", budget: "£450k" },
    { name: "Andrew Pemberton", collection: "Woodland Collection", date: "14 May 2026", budget: "£380k" },
    { name: "Rachel Dunn", collection: "Meadow Collection", date: "12 May 2026" },
  ],
  Contacted: [
    { name: "Mark & Susan Foster", collection: "Coastal Collection", date: "10 May 2026", budget: "£500k" },
    { name: "Jennifer Holt", collection: "Woodland Collection", date: "8 May 2026", budget: "£350k" },
  ],
  "Viewing Booked": [
    { name: "David & Emma Lawrence", collection: "Coastal Collection", date: "6 May 2026", budget: "£480k" },
    { name: "Patrick O'Brien", collection: "Meadow Collection", date: "4 May 2026", budget: "£300k" },
  ],
  Reserved: [
    { name: "Charlotte & James Reed", collection: "Woodland Collection", date: "1 May 2026", budget: "£420k" },
  ],
  Lost: [
    { name: "Gregory Barnes", collection: "Coastal Collection", date: "28 Apr 2026" },
    { name: "Amanda Sinclair", collection: "Meadow Collection", date: "25 Apr 2026" },
  ],
};

const columnColors: Record<string, string> = {
  New: "border-t-secondary",
  Contacted: "border-t-primary",
  "Viewing Booked": "border-t-accent-gold",
  Reserved: "border-t-success-container-fg",
  Lost: "border-t-error-container-fg",
};

export default function LodgeLeadsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-h1 text-on-surface">Lodge Leads</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Lodge ownership pipeline &mdash; track prospects through to reservation
        </p>
      </div>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(pipeline).map(([stage, leads]) => (
          <div key={stage} className="space-y-3">
            {/* Column Header */}
            <div
              className={`bg-surface-container-lowest border border-outline-variant border-t-4 ${columnColors[stage]} px-4 py-3`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-body-sm font-medium text-on-surface">
                  {stage}
                </h3>
                <span className="text-caption text-on-surface-muted">
                  {leads.length}
                </span>
              </div>
            </div>

            {/* Lead Cards */}
            {leads.map((lead) => (
              <div
                key={lead.name}
                className="bg-surface-container-lowest border border-outline-variant p-4 space-y-2"
              >
                <p className="text-body-sm font-medium text-on-surface">
                  {lead.name}
                </p>
                <p className="text-caption text-on-surface-variant">
                  {lead.collection}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-caption text-on-surface-muted">
                    {lead.date}
                  </span>
                  {lead.budget && (
                    <span className="text-caption font-medium text-primary">
                      {lead.budget}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
