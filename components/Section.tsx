import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tinted ? "bg-mist" : "bg-white"}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-slate-600">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
