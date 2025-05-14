import { SidebarProvider } from '@/components/SidebarContext';
import { Sidebar } from '@/components/Sidebar';
import { TopNavbar } from '@/components/TopNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <TopNavbar />
      <main className="pt-14 ml-[240px] px-4 bg-slate-100 min-h-screen">
        {children}
      </main>
    </SidebarProvider>
  );
}
