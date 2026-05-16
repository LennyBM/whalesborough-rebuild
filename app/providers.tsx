"use client";

/**
 * Root client providers wrapper.
 *
 * Currently a pass-through fragment — structured and ready for
 * SessionProvider, QueryClientProvider, or tRPC when needed in later waves.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
