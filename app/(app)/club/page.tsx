/**
 * Club tab — membership hub (W Club + Lakeside Locals + Lodge Owners).
 * Wave 2: Digital membership card, Apple Wallet, tier progress, offers.
 */
export default function ClubPage() {
  return (
    <div className="px-5 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
        Your membership
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold italic text-app-on-surface">
        Club.
      </h1>
      <p className="mt-4 text-[13px] text-app-muted">
        Your digital membership card, tier status, loyalty points, and exclusive
        offers — all in one place.
      </p>
    </div>
  );
}
