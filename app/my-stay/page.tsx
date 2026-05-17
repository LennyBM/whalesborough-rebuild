"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Wifi,
  Key,
  Car,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Navigation,
} from "lucide-react"

export default function MyStayPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-4">
        {/* Page title */}
        <h1 className="font-display text-2xl text-on-surface">My Stay</h1>

        {/* Stay header card */}
        <div className="rounded-2xl bg-surface-container-low p-4 shadow-sm">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src="/images/cottages/the-farmhouse.webp"
                alt="The Farmhouse"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg text-on-surface truncate">
                  The Farmhouse
                </h2>
                <span className="inline-flex items-center rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  Upcoming
                </span>
              </div>
              <p className="mt-1 text-sm text-on-surface-muted">
                12–16 July 2026 · 4 nights
              </p>
              <div className="mt-2 flex flex-col gap-0.5 text-xs text-on-surface-variant">
                <span>Check-in: Sat 12 Jul, 4:00pm</span>
                <span>Check-out: Wed 16 Jul, 10:00am</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-surface-container-low p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-on-surface-muted uppercase tracking-wide">
                Wi-Fi
              </span>
            </div>
            <p className="text-sm font-medium text-on-surface">
              Whalesborough-Guest
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Password: coastal2026
            </p>
          </div>

          <div className="rounded-xl bg-surface-container-low p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-on-surface-muted uppercase tracking-wide">
                Entry
              </span>
            </div>
            <p className="text-sm font-medium text-on-surface">
              Key safe code
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">4857</p>
          </div>

          <div className="rounded-xl bg-surface-container-low p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Car className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-on-surface-muted uppercase tracking-wide">
                Parking
              </span>
            </div>
            <p className="text-sm font-medium text-on-surface">Space 12</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              By the farmhouse
            </p>
          </div>

          <div className="rounded-xl bg-surface-container-low p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-on-surface-muted uppercase tracking-wide">
                Emergency
              </span>
            </div>
            <a
              href="tel:01288361362"
              className="text-sm font-medium text-on-surface"
            >
              01288 361362
            </a>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="rounded-2xl bg-surface-container-low p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="font-display text-base text-on-surface">
              Today&apos;s Schedule
            </h3>
          </div>
          <ul className="space-y-2.5">
            {[
              { time: "7:30am", event: "Breakfast at The Weir", note: "included" },
              { time: "10:00am", event: "Farm animal feeding", note: null },
              { time: "12:00pm", event: "Lunch available", note: "The Weir" },
              { time: "3:30pm", event: "Guided estate walk", note: null },
              { time: "7:00am–8:00pm", event: "Pool open", note: null },
            ].map((item) => (
              <li key={item.time} className="flex items-start gap-3">
                <span className="text-xs font-medium text-on-surface-variant w-[5.5rem] flex-shrink-0 pt-0.5">
                  {item.time}
                </span>
                <span className="text-sm text-on-surface">
                  {item.event}
                  {item.note && (
                    <span className="ml-1.5 text-xs text-on-surface-muted">
                      ({item.note})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Add-ons */}
        <div className="rounded-2xl bg-surface-container-low p-4 shadow-sm">
          <h3 className="font-display text-base text-on-surface mb-3">
            Your Add-ons
          </h3>
          <ul className="space-y-2.5">
            {[
              { name: "Cornish Welcome Hamper", detail: "In cottage on arrival" },
              { name: "Dog Welcome Kit", detail: null },
              { name: "2x Spa Day Pass", detail: "Book at reception" },
            ].map((addon) => (
              <li key={addon.name} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm text-on-surface">{addon.name}</span>
                  {addon.detail && (
                    <p className="text-xs text-on-surface-muted mt-0.5">
                      {addon.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful links */}
        <div className="rounded-2xl bg-surface-container-low shadow-sm overflow-hidden">
          <h3 className="font-display text-base text-on-surface px-4 pt-4 pb-2">
            Useful Links
          </h3>
          <ul className="divide-y divide-on-surface/5">
            {[
              { label: "Estate Map", href: "/estate/map" },
              { label: "Restaurant Menus", href: "/dine/menus" },
              { label: "Spa Treatments", href: "/spa/treatments" },
              { label: "Local Walks", href: "/estate/dog-friendly" },
              { label: "Contact Reception", href: "tel:01288361361" },
              { label: "Report an Issue", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                {link.href.startsWith("tel:") ? (
                  <a
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-container transition-colors"
                  >
                    <span className="text-sm text-on-surface">{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-on-surface-muted" />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-container transition-colors"
                  >
                    <span className="text-sm text-on-surface">{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-on-surface-muted" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Directions card */}
        <div className="rounded-2xl bg-surface-container-low p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="h-4 w-4 text-primary" />
            <h3 className="font-display text-base text-on-surface">
              Finding The Farmhouse
            </h3>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            From the estate entrance, follow the main drive past reception and
            bear left at the fork. The Farmhouse is the stone building at the end
            of the lane with the green front door.
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface-container p-3">
            <MapPin className="h-4 w-4 text-on-surface-muted flex-shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant">
              Sat nav: <span className="font-medium text-on-surface">EX23 0HR</span>,
              then follow signs to The Farmhouse
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
