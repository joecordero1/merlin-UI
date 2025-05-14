'use client';

import Image from 'next/image';
import { useSidebar } from './SidebarContext';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

export const TopNavbar = () => {
  const { isCollapsed } = useSidebar();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  return (
    <header
      className={`
        h-14 bg-gray-100 fixed top-0 z-50 shadow transition-all duration-300
        ${isCollapsed ? 'ml-[60px] w-[calc(100%-60px)]' : 'ml-[240px] w-[calc(100%-240px)]'}
      `}
    >
      <div className="flex justify-between items-center px-6 h-14">
        <div className="w-40">
          <h2 className="text-md font-bold">Rabiul Islam</h2>
          <p className="text-gray-400 text-xs">Web Developer</p>
        </div>

        <ul className="flex items-center gap-4 relative">
          <li>
            <button className="bg-gray-200 px-3 py-2 rounded-sm">
              <FaBell />
            </button>
          </li>
          <li>
            <Image
              onClick={toggleUserDropdown}
              className="h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user"
              width={32}
              height={32}
            />
            {userDropdownOpen && (
              <ul className="absolute right-0 top-14 w-28 bg-white rounded shadow-md text-sm text-gray-700">
                <li className="hover:bg-gray-50 px-4 py-2"><a href="#">Profile</a></li>
                <li className="hover:bg-gray-50 px-4 py-2"><a href="#">Settings</a></li>
                <li className="hover:bg-gray-50 px-4 py-2"><a href="#">Logout</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
