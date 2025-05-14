'use client';

import Image from 'next/image';

export const TopNavbarV2 = () => {
  return (
    <header className="fixed top-0 left-[240px] w-[calc(100%-240px)] h-14 bg-gradient-to-r from-blue-500 to-indigo-400 text-white flex justify-between items-center px-6 z-30">
      <div>
        <h2 className="text-md font-bold">Bienvenido Lucia Gutierrez</h2>
        <p className="text-sm text-white/80">Vamos a echar un vistazo a las últimas conversiones</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Ingresa una sugerencia"
          className="px-4 py-1 rounded text-black text-sm"
        />
        <div className="flex items-center gap-2">
          <span>Lucia Gutierrez</span>
          <Image
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-white"
          />
        </div>
      </div>
    </header>
  );
};
