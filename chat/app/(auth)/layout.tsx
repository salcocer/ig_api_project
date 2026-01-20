export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-color ml-[400px] mr-[400px]">
      {children}
    </div>
  );
}
