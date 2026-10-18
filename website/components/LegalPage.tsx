export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        Draft placeholder. Have this reviewed by a qualified professional before launch.
      </p>
      <div className="mt-8 space-y-5 text-slate-600 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy">
        {children}
      </div>
    </div>
  );
}
