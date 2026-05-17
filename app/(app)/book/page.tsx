/**
 * Book tab — transaction-first booking hub.
 * Wave 2: Bottom sheets for spa/restaurant/activity booking flows.
 */
export default function BookPage() {
  return (
    <div className="px-5 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
        Book
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold italic text-app-on-surface">
        What would you like to book?
      </h1>
      <p className="mt-4 text-[13px] text-app-muted">
        Spa treatments, restaurant tables, estate activities. All in three taps.
      </p>
    </div>
  );
}
