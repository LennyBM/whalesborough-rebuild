"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const timeSlots = [
  { value: "breakfast", label: "Breakfast", time: "7:30–10:00", note: "Guests only" },
  { value: "lunch", label: "Lunch", time: "12:00–15:00", note: "" },
  { value: "sunday", label: "Sunday Lunch", time: "12:00–15:00", note: "" },
];

const seatingOptions = ["Inside", "Lakeside terrace", "No preference"];
const occasionOptions = ["None", "Birthday", "Anniversary", "Celebration"];

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "lunch",
    partySize: "2",
    seating: "No preference",
    dogDining: false,
    dietary: "",
    name: "",
    email: "",
    phone: "",
    occasion: "None",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const selectedSlot = timeSlots.find((s) => s.value === formData.time);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-16">
                <p className="eyebrow text-on-surface-muted">The Weir Restaurant</p>
                <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg text-on-surface">
                  Reserve a <span className="italic">table</span>
                </h1>
                <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
                  Lakeside dining on the Whalesborough estate. Fresh, seasonal menus
                  prepared with produce from our kitchen garden and local suppliers.
                </p>
              </div>

              {/* Grid: Form + Sidebar */}
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-20">
                {/* Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-10">
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="time">Service</Label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="flex h-12 w-full bg-surface-container px-4 py-3 text-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label} — {slot.time}
                            {slot.note ? ` (${slot.note})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Party Size & Seating */}
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="partySize">Party size</Label>
                      <select
                        id="partySize"
                        name="partySize"
                        value={formData.partySize}
                        onChange={handleChange}
                        className="flex h-12 w-full bg-surface-container px-4 py-3 text-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="seating">Seating preference</Label>
                      <select
                        id="seating"
                        name="seating"
                        value={formData.seating}
                        onChange={handleChange}
                        className="flex h-12 w-full bg-surface-container px-4 py-3 text-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {seatingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dog Dining */}
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="dogDining"
                      name="dogDining"
                      checked={formData.dogDining}
                      onChange={handleChange}
                      className="h-5 w-5 accent-primary"
                    />
                    <Label htmlFor="dogDining" className="cursor-pointer">
                      We will be dining with a dog
                    </Label>
                  </div>

                  {/* Dietary */}
                  <div className="space-y-3">
                    <Label htmlFor="dietary">
                      Dietary requirements{" "}
                      <span className="text-on-surface-muted font-normal">(optional)</span>
                    </Label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Allergies, intolerances, or preferences..."
                      className="flex w-full bg-surface-container px-4 py-3 text-body text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  {/* Guest Details */}
                  <div className="space-y-3">
                    <p className="eyebrow text-on-surface-muted">Your details</p>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 pt-2">
                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="07xxx xxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="space-y-3">
                    <Label htmlFor="occasion">
                      Special occasion{" "}
                      <span className="text-on-surface-muted font-normal">(optional)</span>
                    </Label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="flex h-12 w-full bg-surface-container px-4 py-3 text-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {occasionOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button type="submit" size="lg">
                      Confirm Reservation
                    </Button>
                  </div>
                </form>

                {/* Sidebar */}
                <aside className="space-y-10 lg:col-span-1">
                  <div className="bg-surface-container-low p-8 space-y-6">
                    <p className="eyebrow text-on-surface-muted">Opening hours</p>
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <p className="text-body font-medium text-on-surface">Breakfast</p>
                        <p className="text-body text-on-surface-variant">7:30–10:00</p>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-body font-medium text-on-surface">Lunch</p>
                        <p className="text-body text-on-surface-variant">12:00–15:00</p>
                      </div>
                    </div>
                    <p className="text-body text-on-surface-variant">
                      Open seven days a week.
                    </p>
                  </div>

                  <div className="bg-surface-container-low p-8 space-y-4">
                    <p className="eyebrow text-on-surface-muted">Good to know</p>
                    <ul className="space-y-3 text-body text-on-surface-variant">
                      <li>Non-guests welcome for lunch</li>
                      <li>Breakfast is for staying guests only</li>
                      <li>Private dining available for 8–20 guests</li>
                      <li>Dogs welcome at all tables</li>
                    </ul>
                  </div>

                  <div className="bg-surface-container-low p-8 space-y-3">
                    <p className="eyebrow text-on-surface-muted">Prefer to call?</p>
                    <p className="text-h3 text-on-surface">01288 361363</p>
                    <p className="text-body text-on-surface-variant">
                      Our team can assist with group bookings, private dining,
                      and any special arrangements.
                    </p>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center py-20"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center bg-primary/10"
                >
                  <svg
                    className="h-10 w-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>

              <h1 className="heading-editorial text-display-md text-on-surface">
                Table <span className="italic">reserved</span>
              </h1>
              <p className="mt-4 max-w-md text-body-lg text-on-surface-variant">
                We look forward to welcoming you at The Weir.
                A confirmation has been sent to {formData.email}.
              </p>

              <div className="mt-12 bg-surface-container-low p-8 max-w-md w-full text-left space-y-4">
                <div className="flex justify-between">
                  <p className="text-body text-on-surface-muted">Date</p>
                  <p className="text-body font-medium text-on-surface">
                    {new Date(formData.date + "T00:00").toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-on-surface-muted">Service</p>
                  <p className="text-body font-medium text-on-surface">
                    {selectedSlot?.label} ({selectedSlot?.time})
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-on-surface-muted">Guests</p>
                  <p className="text-body font-medium text-on-surface">{formData.partySize}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-on-surface-muted">Seating</p>
                  <p className="text-body font-medium text-on-surface">{formData.seating}</p>
                </div>
                {formData.dogDining && (
                  <div className="flex justify-between">
                    <p className="text-body text-on-surface-muted">Dog dining</p>
                    <p className="text-body font-medium text-on-surface">Yes</p>
                  </div>
                )}
                {formData.occasion !== "None" && (
                  <div className="flex justify-between">
                    <p className="text-body text-on-surface-muted">Occasion</p>
                    <p className="text-body font-medium text-on-surface">{formData.occasion}</p>
                  </div>
                )}
              </div>

              <div className="mt-10">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      date: "",
                      time: "lunch",
                      partySize: "2",
                      seating: "No preference",
                      dogDining: false,
                      dietary: "",
                      name: "",
                      email: "",
                      phone: "",
                      occasion: "None",
                    });
                  }}
                >
                  Make another reservation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
