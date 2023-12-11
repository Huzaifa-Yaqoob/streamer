import Header from "../pages/common/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-[100dvh] flex flex-col justify-stretch">
      <Header />
      {children}
    </main>
  );
}
