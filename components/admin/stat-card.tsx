import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    direction: "up" | "down";
    percentage: string;
  };
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest border border-outline-variant p-6",
        className,
      )}
    >
      <p className="eyebrow text-on-surface-muted mb-2">{label}</p>
      <p className="font-display text-h2 text-on-surface">{value}</p>
      {trend && (
        <div
          className={cn(
            "flex items-center gap-1 mt-2 text-body-sm",
            trend.direction === "up"
              ? "text-success-container-fg"
              : "text-error-container-fg",
          )}
        >
          {trend.direction === "up" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          <span>{trend.percentage}</span>
        </div>
      )}
    </div>
  );
}
