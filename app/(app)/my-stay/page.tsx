/**
 * Stay tab — guest on-site experience hub.
 * Wave 2: Check-in details, wifi, lodge info, estate map, housekeeping.
 */
export default function StayPage() {
  return (
    <div className="px-5 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
        Your stay
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold italic text-app-on-surface">
        Welcome to Whalesborough.
      </h1>
      <p className="mt-4 text-[13px] text-app-muted">
        Your lodge details, wifi, estate map, and everything you need while
        you&apos;re here.
      </p>
    </div>
  );
}
