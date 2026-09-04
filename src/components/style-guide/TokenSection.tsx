export function TokenSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-xl font-semibold text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}
