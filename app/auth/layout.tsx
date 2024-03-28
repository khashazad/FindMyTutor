type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-_4rem)] flex items-center justify-center">
      {children}
    </div>
  );
}
