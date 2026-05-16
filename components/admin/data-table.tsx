import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  className?: string;
}

export function DataTable({ columns, rows, className }: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-outline-variant">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 eyebrow text-on-surface-muted font-normal",
                  col.className,
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && (
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-body-sm text-on-surface",
                    col.className,
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
