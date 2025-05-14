'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  path: string;
  icon: ReactNode;
  label: string;
}

export const SidebarMenuItem = ({ path, icon, label }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <li className={`text-gray-500 ${isActive ? 'bg-[#1F4957] text-white-900' : ''} hover:bg-[#1F4957] hover:text-gray-900`}>
      <Link href={path} className="w-full flex items-center py-3">
        <div className="text-center px-5 text-xl">{icon}</div>
        <span className="pl-1 hidden lg:inline">{label}</span>
      </Link>
    </li>
  );
};
