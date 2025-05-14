import { SidebarProvider } from '../../components/SidebarContext';
import { SidebarV2 } from '../../components/SidebarV2';
import { TopNavbarV2 } from '../../components/TopNavbarV2';

export default function DashboardV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarV2 />
      <TopNavbarV2 />
      <main className="pt-14 ml-[240px] px-4 bg-gray-50 min-h-screen">{children}</main>
    </SidebarProvider>
  );
}
