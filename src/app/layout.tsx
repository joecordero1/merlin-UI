// app/layout.tsx
import './globals.css';
import { SidebarProvider } from '../components/SidebarContext';
import { Sidebar } from '@/components/Sidebar';
import { TopNavbar } from '@/components/TopNavbar';

export const metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <SidebarProvider>
  {children}
</SidebarProvider>
      </body>
    </html>
  );
}
