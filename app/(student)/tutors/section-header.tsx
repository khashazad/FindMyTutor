type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h1 className="space-y-1 flex justify-center pb-3 text-3xl font-bold leading-none tracking-tight mt-2 mb-3">
      {title}{" "}
    </h1>
  );
}
