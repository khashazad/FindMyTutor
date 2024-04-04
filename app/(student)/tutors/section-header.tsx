type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h1 className="space-y-1 flex justify-center pb-3 text-2xl leading-none font-semibold tracking-tight">
      {title}{" "}
    </h1>
  );
}
