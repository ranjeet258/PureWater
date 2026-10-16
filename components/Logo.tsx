import { Droplet } from "lucide-react";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
        <Droplet className="h-4 w-4" fill="currentColor" aria-hidden />
      </span>
      <span className={light ? "text-white" : "text-navy"}>PureWater</span>
    </span>
  );
}
