"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const demoAccounts = [
  {
    role: "Guest",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    password: "guest123",
    badge: "bg-on-surface/10 text-on-surface",
    description: "Has upcoming booking",
  },
  {
    role: "W Club Member",
    name: "James Thornton",
    email: "james.thornton@email.com",
    password: "member123",
    badge: "bg-amber-100 text-amber-900",
    description: "Spa member · Gold tier",
  },
  {
    role: "Staff - Reception",
    name: "Sarah Reynolds",
    email: "sarah.r@whalesborough.co.uk",
    password: "staff123",
    badge: "bg-secondary/15 text-secondary",
    description: "Front desk",
  },
  {
    role: "Staff - Housekeeping",
    name: "Mike Thomas",
    email: "mike.t@whalesborough.co.uk",
    password: "staff123",
    badge: "bg-secondary/15 text-secondary",
    description: "Housekeeping team",
  },
  {
    role: "Director",
    name: "Stuart Lobb",
    email: "stuart@whalesborough.co.uk",
    password: "admin123",
    badge: "bg-primary/15 text-primary",
    description: "Full access",
  },
];

function loginUser(account: (typeof demoAccounts)[number]) {
  const user = {
    name: account.name,
    email: account.email,
    role: account.role,
    avatarInitial: account.name
      .split(" ")
      .map((n) => n[0])
      .join(""),
  };
  localStorage.setItem("wb_user", JSON.stringify(user));
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleManualLogin(e: React.FormEvent) {
    e.preventDefault();
    const match = demoAccounts.find(
      (a) => a.email === email && a.password === password
    );
    if (match) {
      loginUser(match);
      router.push("/account");
    } else {
      alert("Invalid credentials. Try a demo account below.");
    }
  }

  function handleDemoLogin(account: (typeof demoAccounts)[number]) {
    loginUser(account);
    router.push("/account");
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-5 pt-12">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <span className="font-display text-xl text-white">W</span>
          </div>
          <h1 className="mt-4 font-display text-2xl text-on-surface">
            Whalesborough
          </h1>
          <p className="mt-1 font-body text-sm text-on-surface-muted">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleManualLogin} className="mb-10">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-body text-sm text-on-surface-variant mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl border border-on-surface/10 bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-body text-sm text-on-surface-variant mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-on-surface/10 bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-on-surface/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 font-body text-xs text-on-surface-muted uppercase tracking-wider">
              Demo Accounts
            </span>
          </div>
        </div>

        {/* Demo Login Buttons */}
        <div className="space-y-3">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => handleDemoLogin(account)}
              className="w-full rounded-2xl bg-surface-container-low p-4 text-left transition-all hover:bg-surface-container active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-display text-sm text-primary">
                    {account.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm font-medium text-on-surface">
                      {account.name}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs font-medium ${account.badge}`}
                    >
                      {account.role}
                    </span>
                  </div>
                  <p className="font-body text-xs text-on-surface-muted mt-0.5">
                    {account.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-xs text-on-surface-muted">
          This is a demo environment. No real authentication is performed.
        </p>
      </div>
    </main>
  );
}
