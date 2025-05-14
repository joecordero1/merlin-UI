'use client';

import { useSidebar } from './SidebarContext';
import { FaHome, FaCreditCard, FaBell, FaCog, FaQuestionCircle, FaUser, FaChartBar } from 'react-icons/fa';

const menu = [
  { icon: <FaHome />, label: 'Dashboard' },
  { icon: <FaCreditCard />, label: 'Payment' },
  { icon: <FaChartBar />, label: 'Transaction' },
  { icon: <FaCreditCard />, label: 'Bill & Tax' },
  { icon: <FaBell />, label: 'Notifications' },
  { icon: <FaUser />, label: 'Account' },
  { icon: <FaCreditCard />, label: 'My Card' },
  { icon: <FaCog />, label: 'Settings' },
  { icon: <FaQuestionCircle />, label: 'Call Center' },
  { icon: <FaQuestionCircle />, label: 'Help' },
];

export const SidebarV2 = () => {
  return (
    <aside className="fixed top-0 left-0 w-[240px] h-screen bg-black text-white flex flex-col pt-6 z-40">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold">Lala4 CRM</h1>
      </div>
      <ul className="space-y-2">
        {menu.map((item, index) => (
          <li key={index} className={`hover:bg-blue-500 hover:text-white px-6 py-3 cursor-pointer flex items-center gap-3 ${index === 0 ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
