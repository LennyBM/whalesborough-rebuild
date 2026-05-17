"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Constants ─── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Simulated unavailable dates for realism */
const UNAVAILABLE_DATES = new Set([
  "2026-07-04", "2026-07-05", "2026-07-11", "2026-07-18", "2026-07-19",
  "2026-07-25", "2026-07-26", "2026-08-01", "2026-08-02", "2026-08-08",
  "2026-08-15", "2026-08-16", "2026-08-22", "2026-08-23", "2026-08-29",
]);

/* ─── Helpers ─── */
function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(str: string): string {
  const d = parseDate(str);
  const day = d.getDate();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  return `${weekday} ${day} ${SHORT_MONTHS[d.getMonth()]}`;
}

function daysBetween(a: string, b: string): number {
  const da = parseDate(a);
  const db = parseDate(b);
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday = 0, Sunday = 6
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  return { daysInMonth, startDay };
}

/* ─── Progress Stepper ─── */
function BookingStepper({ current }: { current: number }) {
  const steps = ["Dates", "Select", "Add-ons", "Details", "Payment"];
  return (
    <nav aria-label="Booking progress" className="mb-12">
      <ol className="flex items-center gap-2">
        {steps.map((label, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isComplete = step < current;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center font-body text-sm ${
                  isActive
                    ? "bg-primary text-white"
                    : isComplete
                      ? "bg-secondary text-white"
                      : "bg-surface-container text-on-surface-muted"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {step}
              </span>
              <span
                className={`hidden sm:inline font-body text-sm uppercase tracking-wide ${
                  isActive ? "text-on-surface" : "text-on-surface-muted"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 h-px w-4 bg-surface-container sm:w-8" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Calendar Month ─── */
function CalendarMonth({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
  today,
}: {
  year: number;
  month: number;
  startDate: string | null;
  endDate: string | null;
  hoverDate: string | null;
  onDateClick: (dateStr: string) => void;
  onDateHover: (dateStr: string | null) => void;
  today: string;
}) {
  const { daysInMonth, startDay } = getMonthDays(year, month);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function getDateState(day: number) {
    const dateStr = toDateStr(year, month, day);
    const isPast = dateStr < today;
    const isUnavailable = UNAVAILABLE_DATES.has(dateStr);
    const isStart = dateStr === startDate;
    const isEnd = dateStr === endDate;

    // Determine if in range
    let inRange = false;
    if (startDate && endDate) {
      inRange = dateStr > startDate && dateStr < endDate;
    } else if (startDate && !endDate && hoverDate && hoverDate > startDate) {
      inRange = dateStr > startDate && dateStr <= hoverDate;
    }

    return { dateStr, isPast, isUnavailable, isStart, isEnd, inRange };
  }

  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-center font-body text-lg text-on-surface mb-4">
        {MONTHS[month]} {year}
      </h3>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs text-on-surface-muted font-body py-1">
            {d}
          </div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="h-11" />;
          }

          const { dateStr, isPast, isUnavailable, isStart, isEnd, inRange } = getDateState(day);
          const disabled = isPast || isUnavailable;

          let cellClasses = "h-11 flex items-center justify-center text-sm font-body relative transition-colors duration-150 ";

          if (isStart || isEnd) {
            cellClasses += "bg-secondary text-white z-10 ";
          } else if (inRange) {
            cellClasses += "bg-secondary/15 text-on-surface ";
          } else if (disabled) {
            cellClasses += "text-on-surface-muted/40 cursor-not-allowed ";
          } else {
            cellClasses += "text-on-surface hover:bg-surface-container cursor-pointer ";
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onDateClick(dateStr)}
              onMouseEnter={() => !disabled && onDateHover(dateStr)}
              onMouseLeave={() => onDateHover(null)}
              className={cellClasses}
              aria-label={`${day} ${MONTHS[month]} ${year}${isUnavailable ? ", unavailable" : ""}${isStart ? ", check-in" : ""}${isEnd ? ", check-out" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Number Stepper ─── */
function NumberStepper({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-5">
      <div>
        <span className="font-body text-base text-on-surface">{label}</span>
        {hint && (
          <span className="block text-sm text-on-surface-muted mt-0.5">{hint}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-low"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-body text-lg text-on-surface tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-10 w-10 items-center justify-center bg-surface-container text-on-surface disabled:opacity-30 transition-colors hover:bg-surface-container-low"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BookingDatesPage() {
  const today = "2026-05-17";

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [dogs, setDogs] = useState(0);

  // Calendar navigation: start at July 2026
  const [calendarStart, setCalendarStart] = useState({ year: 2026, month: 6 });

  const secondMonth = useMemo(() => {
    let m = calendarStart.month + 1;
    let y = calendarStart.year;
    if (m > 11) { m = 0; y++; }
    return { year: y, month: m };
  }, [calendarStart]);

  function handlePrevMonth() {
    setCalendarStart((prev) => {
      let m = prev.month - 1;
      let y = prev.year;
      if (m < 0) { m = 11; y--; }
      // Don't go before current month
      if (y < 2026 || (y === 2026 && m < 4)) return prev;
      return { year: y, month: m };
    });
  }

  function handleNextMonth() {
    setCalendarStart((prev) => {
      let m = prev.month + 1;
      let y = prev.year;
      if (m > 11) { m = 0; y++; }
      return { year: y, month: m };
    });
  }

  function handleDateClick(dateStr: string) {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(dateStr);
      setEndDate(null);
    } else if (dateStr <= startDate) {
      // Clicked before start — reset
      setStartDate(dateStr);
      setEndDate(null);
    } else {
      // Set end date
      setEndDate(dateStr);
    }
  }

  // Build summary text
  const nights = startDate && endDate ? daysBetween(startDate, endDate) : null;
  const totalGuests = adults + children;
  const summaryParts: string[] = [];
  if (nights) summaryParts.push(`${nights} night${nights !== 1 ? "s" : ""}`);
  if (startDate && endDate) {
    summaryParts.push(`${formatDate(startDate)} – ${formatDate(endDate)} 2026`);
  }
  const guestParts: string[] = [];
  guestParts.push(`${adults} adult${adults !== 1 ? "s" : ""}`);
  if (children > 0) guestParts.push(`${children} child${children !== 1 ? "ren" : ""}`);
  if (infants > 0) guestParts.push(`${infants} infant${infants !== 1 ? "s" : ""}`);
  if (dogs > 0) guestParts.push(`${dogs} dog${dogs !== 1 ? "s" : ""}`);
  summaryParts.push(guestParts.join(", "));
  const summary = summaryParts.join(" · ");

  return (
    <article className="bg-background min-h-screen">
      <header className="mx-auto max-w-5xl px-6 pt-24 lg:px-12 lg:pt-32">
        <BookingStepper current={1} />
        <p className="eyebrow text-on-surface-muted">Step 1 of 5</p>
        <h1 className="heading-editorial mt-4 text-on-surface" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
          When would you like to stay?
        </h1>
        <p className="mt-4 max-w-2xl text-body text-on-surface-variant">
          Select your check-in and check-out dates, then tell us about your party.
        </p>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-32 pt-12 lg:px-12">
        {/* Calendar */}
        <div className="bg-surface-container-low p-6 sm:p-8 lg:p-10">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-10 w-10 items-center justify-center text-on-surface-muted hover:text-on-surface transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-10 w-10 items-center justify-center text-on-surface-muted hover:text-on-surface transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Two-month grid */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <CalendarMonth
              year={calendarStart.year}
              month={calendarStart.month}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
              today={today}
            />
            <CalendarMonth
              year={secondMonth.year}
              month={secondMonth.month}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
              today={today}
            />
          </div>

          {/* Selection hint */}
          {!startDate && (
            <p className="mt-6 text-center text-sm text-on-surface-muted font-body">
              Click a date to select your check-in
            </p>
          )}
          {startDate && !endDate && (
            <p className="mt-6 text-center text-sm text-on-surface-muted font-body">
              Now select your check-out date
            </p>
          )}
        </div>

        {/* Guest counts */}
        <div className="mt-10 max-w-lg">
          <h2 className="text-h3 text-on-surface mb-2">Guests</h2>
          <div className="divide-y divide-surface-container">
            <NumberStepper
              label="Adults"
              value={adults}
              min={1}
              max={8}
              onChange={setAdults}
              hint="Ages 16+"
            />
            <NumberStepper
              label="Children"
              value={children}
              min={0}
              max={6}
              onChange={setChildren}
              hint="Ages 2–15"
            />
            <NumberStepper
              label="Infants"
              value={infants}
              min={0}
              max={2}
              onChange={setInfants}
              hint="Under 2"
            />
            <NumberStepper
              label="Dogs"
              value={dogs}
              min={0}
              max={2}
              onChange={setDogs}
              hint="Up to 2 per property"
            />
          </div>
        </div>

        {/* Summary & CTA */}
        <div className="mt-12 max-w-lg">
          {/* Dynamic summary */}
          <div className="bg-surface-container-low p-5 mb-6">
            <p className="font-body text-base text-on-surface">
              {nights ? summary : `Select dates · ${guestParts.join(", ")}`}
            </p>
          </div>

          {/* Pricing hint */}
          <p className="text-sm text-on-surface-muted font-body mb-6">
            From <span className="text-on-surface">£155/night</span> for 2 guests
          </p>

          {/* Search button */}
          <Link href="/stay/booking/select">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Search available properties
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
