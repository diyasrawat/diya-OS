import Header from "@/components/layout/Header";
import AIDiyaPanel from "@/components/layout/AIDiyaPanel";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">{children}</main>
      <AIDiyaPanel />
    </div>
  );
}
