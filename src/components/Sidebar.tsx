'use client';

import { SidebarMenuItem } from './SidebarMenuItem';
import { useSidebar } from './SidebarContext';
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoBarChartOutline,
  IoLogOutOutline,
  IoArrowBack,
  IoArrowForward,
} from 'react-icons/io5';

const menuItems = [
  { path: '/dashboard/main', icon: <IoHomeOutline />, label: 'Dashboard' },
  { path: '/dashboard/reports', icon: <IoBarChartOutline />, label: 'Reports' },
  { path: '/dashboard/users', icon: <IoPeopleOutline />, label: 'Users' },
];

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`
        fixed top-0 h-screen transition-all duration-300 z-40
        ${isCollapsed ? 'w-[60px]' : 'w-[240px]'}
        bg-[#0D3B4B] text-white
      `}
    >
      <div className="flex flex-col justify-between h-full">
        <ul className="mt-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </ul>

        <div className="flex flex-col gap-2 mb-4">
          <SidebarMenuItem
            path="/logout"
            icon={<IoLogOutOutline />}
            label="Logout"
          />

          <button
            onClick={toggleSidebar}
            className="mx-auto bg-white/10 p-2 rounded hover:bg-white/20"
          >
            {isCollapsed ? <IoArrowForward /> : <IoArrowBack />}
          </button>
        </div>
      </div>
    </aside>
  );
};
