"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  AlertTriangle,
  Clock,
  BedDouble,
  Bath,
  ChevronDown,
  Send,
} from "lucide-react";
import { BackButton } from "@/components/app-shell/back-button";

/* ─── Types ─── */
type Status = "ready" | "in-progress" | "waiting" | "flagged";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface Cottage {
  id: string;
  name: string;
  status: Status;
  checkoutTime: string;
  arrivalTime: string;
  assignedTo: string;
  bedrooms: number;
  bathrooms: number;
  sameDayTurnaround: boolean;
  checklist: ChecklistItem[];
}

/* ─── Mock Data ─── */
const defaultChecklist = (): ChecklistItem[] => [
  { id: "beds", label: "Beds", done: false },
  { id: "bathrooms", label: "Bathrooms", done: false },
  { id: "kitchen", label: "Kitchen", done: false },
  { id: "living", label: "Living areas", done: false },
  { id: "outside", label: "Outside", done: false },
  { id: "welcome", label: "Welcome pack", done: false },
];

const initialCottages: Cottage[] = [
  {
    id: "1",
    name: "The Farmhouse",
    status: "in-progress",
    checkoutTime: "10:00",
    arrivalTime: "15:00",
    assignedTo: "Sarah M.",
    bedrooms: 4,
    bathrooms: 2,
    sameDayTurnaround: true,
    checklist: defaultChecklist(),
  },
  {
    id: "2",
    name: "Eagle's Nest",
    status: "waiting",
    checkoutTime: "10:00",
    arrivalTime: "16:00",
    assignedTo: "Jo R.",
    bedrooms: 3,
    bathrooms: 2,
    sameDayTurnaround: true,
    checklist: defaultChecklist(),
  },
  {
    id: "3",
    name: "Trelowen",
    status: "waiting",
    checkoutTime: "10:00",
    arrivalTime: "15:00",
    assignedTo: "Sarah M.",
    bedrooms: 2,
    bathrooms: 1,
    sameDayTurnaround: true,
    checklist: defaultChecklist(),
  },
  {
    id: "4",
    name: "The Dairy",
    status: "ready",
    checkoutTime: "10:00",
    arrivalTime: "16:00",
    assignedTo: "Karen T.",
    bedrooms: 2,
    bathrooms: 1,
    sameDayTurnaround: false,
    checklist: defaultChecklist().map((i) => ({ ...i, done: true })),
  },
  {
    id: "5",
    name: "Meadow Lodge",
    status: "ready",
    checkoutTime: "10:00",
    arrivalTime: "17:00",
    assignedTo: "Jo R.",
    bedrooms: 3,
    bathrooms: 2,
    sameDayTurnaround: false,
    checklist: defaultChecklist().map((i) => ({ ...i, done: true })),
  },
  {
    id: "6",
    name: "Penhallow Barn",
    status: "flagged",
    checkoutTime: "10:00",
    arrivalTime: "15:00",
    assignedTo: "Karen T.",
    bedrooms: 3,
    bathrooms: 2,
    sameDayTurnaround: true,
    checklist: defaultChecklist(),
  },
];

/* ─── Helpers ─── */
const statusConfig: Record<Status, { label: string; bg: string; text: string }> = {
  ready: { label: "Ready", bg: "bg-emerald-100", text: "text-emerald-700" },
  "in-progress": { label: "In Progress", bg: "bg-amber-100", text: "text-amber-700" },
  waiting: { label: "Waiting", bg: "bg-gray-100", text: "text-gray-600" },
  flagged: { label: "Flagged", bg: "bg-red-100", text: "text-red-700" },
};

function formatDate(offset: number = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/* ─── Components ─── */

function StatusBadge({ status }: { status: Status }) {
  const { label, bg, text } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${bg} ${text}`}>
      {label}
    </span>
  );
}

function CottageCard({
  cottage,
  onMarkComplete,
  onToggleChecklist,
  onFlag,
}: {
  cottage: Cottage;
  onMarkComplete: (id: string) => void;
  onToggleChecklist: (cottageId: string, itemId: string) => void;
  onFlag: (id: string, note: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [flagMode, setFlagMode] = useState(false);
  const [flagNote, setFlagNote] = useState("");
  const [justCompleted, setJustCompleted] = useState(false);

  const completedItems = cottage.checklist.filter((i) => i.done).length;
  const totalItems = cottage.checklist.length;

  const handleMarkComplete = () => {
    setJustCompleted(true);
    onMarkComplete(cottage.id);
    setTimeout(() => setJustCompleted(false), 1500);
  };

  const handleFlag = () => {
    if (flagNote.trim()) {
      onFlag(cottage.id, flagNote.trim());
      setFlagNote("");
      setFlagMode(false);
    }
  };

  return (
    <motion.div
      layout
      className={`bg-surface-container-low rounded-2xl overflow-hidden border ${
        cottage.sameDayTurnaround && cottage.status !== "ready"
          ? "border-amber-300 ring-1 ring-amber-200"
          : "border-transparent"
      }`}
    >
      {/* Priority indicator */}
      {cottage.sameDayTurnaround && cottage.status !== "ready" && (
        <div className="bg-amber-50 px-4 py-1.5 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium font-body text-amber-700">
            Same-day turnaround
          </span>
        </div>
      )}

      {/* Main card content */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3.5 focus:outline-none"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display italic text-base text-on-surface truncate">
                {cottage.name}
              </h3>
              <StatusBadge status={cottage.status} />
            </div>

            <div className="flex items-center gap-3 text-sm text-on-surface/60 font-body">
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {cottage.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {cottage.bathrooms}
              </span>
              <span className="text-xs">
                Out {cottage.checkoutTime} → In {cottage.arrivalTime}
              </span>
            </div>

            <p className="text-xs text-on-surface/50 font-body mt-1">
              Assigned: {cottage.assignedTo}
            </p>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-2 mt-1"
          >
            <ChevronDown className="h-5 w-5 text-on-surface/40" />
          </motion.div>
        </div>

        {/* Progress bar */}
        {cottage.status !== "ready" && (
          <div className="mt-2.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={false}
              animate={{ width: `${(completedItems / totalItems) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </button>

      {/* Expanded section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              {/* Checklist */}
              <div className="space-y-2 mb-4">
                {cottage.checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onToggleChecklist(cottage.id, item.id)}
                    className="flex items-center gap-3 w-full text-left py-1.5 px-2 rounded-xl hover:bg-surface-container transition-colors"
                  >
                    <motion.div
                      className={`flex-shrink-0 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        item.done
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-300 bg-white"
                      }`}
                      whileTap={{ scale: 0.85 }}
                    >
                      {item.done && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <span
                      className={`text-sm font-body ${
                        item.done ? "text-on-surface/40 line-through" : "text-on-surface"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {cottage.status !== "ready" && (
                  <motion.button
                    onClick={handleMarkComplete}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium font-body transition-all ${
                      justCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-600 text-white active:bg-emerald-700"
                    }`}
                  >
                    <motion.span
                      className="flex items-center justify-center gap-2"
                      animate={justCompleted ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {justCompleted ? (
                        <>
                          <Check className="h-4 w-4" />
                          Done!
                        </>
                      ) : (
                        "Mark Complete"
                      )}
                    </motion.span>
                  </motion.button>
                )}

                {cottage.status !== "flagged" && (
                  <motion.button
                    onClick={() => setFlagMode(!flagMode)}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium font-body bg-red-50 text-red-700 active:bg-red-100 transition-colors"
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              {/* Flag input */}
              <AnimatePresence>
                {flagMode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        value={flagNote}
                        onChange={(e) => setFlagNote(e.target.value)}
                        placeholder="Describe the issue..."
                        className="flex-1 px-3 py-2 text-sm font-body rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
                        autoFocus
                      />
                      <button
                        onClick={handleFlag}
                        disabled={!flagNote.trim()}
                        className="px-3 py-2 rounded-xl bg-red-600 text-white disabled:opacity-40 transition-opacity"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed animation overlay */}
      <AnimatePresence>
        {justCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-emerald-500/5 rounded-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─── */

export default function HousekeepingPage() {
  const [dayFilter, setDayFilter] = useState<"today" | "tomorrow">("today");
  const [cottages, setCottages] = useState<Cottage[]>(initialCottages);

  const handleMarkComplete = (id: string) => {
    setCottages((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "ready" as Status, checklist: c.checklist.map((i) => ({ ...i, done: true })) }
          : c
      )
    );
  };

  const handleToggleChecklist = (cottageId: string, itemId: string) => {
    setCottages((prev) =>
      prev.map((c) =>
        c.id === cottageId
          ? {
              ...c,
              checklist: c.checklist.map((i) =>
                i.id === itemId ? { ...i, done: !i.done } : i
              ),
            }
          : c
      )
    );
  };

  const handleFlag = (id: string, _note: string) => {
    setCottages((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "flagged" as Status } : c))
    );
  };

  // Summary counts
  const totalTurnarounds = cottages.length;
  const inProgress = cottages.filter((c) => c.status === "in-progress").length;
  const waiting = cottages.filter((c) => c.status === "waiting").length;
  const completed = cottages.filter((c) => c.status === "ready").length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-gray-100">
        <div className="px-4 pt-4 pb-3">
          <BackButton label="Staff" href="/staff" />

          <div className="flex items-end justify-between mb-3">
            <div>
              <h1 className="font-display italic text-2xl text-on-surface">
                Housekeeping
              </h1>
              <p className="text-sm font-body text-on-surface/60 mt-0.5">
                {formatDate(dayFilter === "today" ? 0 : 1)}
              </p>
            </div>
          </div>

          {/* Day filter */}
          <div className="flex gap-2">
            {(["today", "tomorrow"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setDayFilter(day)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium font-body transition-all ${
                  dayFilter === day
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-container text-on-surface/60 active:bg-surface-container-low"
                }`}
              >
                {day === "today" ? "Today" : "Tomorrow"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary bar */}
        <div className="px-4 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide border-t border-gray-50">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-surface-container text-on-surface">
            {totalTurnarounds} turnarounds
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-amber-100 text-amber-700">
            {inProgress} in progress
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-gray-100 text-gray-600">
            {waiting} waiting
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-emerald-100 text-emerald-700">
            {completed} complete
          </span>
        </div>
      </div>

      {/* Cottage list */}
      <div className="px-4 pt-4 space-y-3">
        {cottages.map((cottage) => (
          <CottageCard
            key={cottage.id}
            cottage={cottage}
            onMarkComplete={handleMarkComplete}
            onToggleChecklist={handleToggleChecklist}
            onFlag={handleFlag}
          />
        ))}
      </div>

      {/* Bottom stats */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-xs font-body text-on-surface/50">Avg turnaround</p>
            <p className="text-sm font-medium font-body text-on-surface">2h 15m</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center flex-1">
            <p className="text-xs font-body text-on-surface/50">Completed today</p>
            <p className="text-sm font-medium font-body text-emerald-600">{completed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
