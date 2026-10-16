import { statusLabel, type Status } from "@/lib/site";

const styles: Record<Status, string> = {
  working: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  prototype: "bg-sky-50 text-sky-700 ring-sky-200",
  planned: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
