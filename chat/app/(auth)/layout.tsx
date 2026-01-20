export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-color ml-[10%] mr-[15%]">{children}</div>
  );
}
