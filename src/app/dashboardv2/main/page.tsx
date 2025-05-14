'use client';

import { FaDownload, FaSave, FaPrint, FaShareAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function DashboardV2Page() {
  return (
    <div className="mt-20 px-4 grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Tarjeta de recomendaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-500 mb-2">Número de recomendaciones realizadas el día de hoy:</p>
        <h2 className="text-5xl font-bold text-blue-700">3456</h2>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Premio con mayor conversión</p>
            <h4 className="font-bold text-blue-900">Infinix 20</h4>
            <p className="text-sm text-blue-400">Tecnología</p>
          </div>
          <div className="text-center">
            <Image
              src="https://southeast-asia.pro.infinixmobility.com/media/catalog/product/x/6/x6532_smart-9_base1.png"
              alt="Infinix 20"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <p className="text-xs mt-1 text-gray-500">2399 puntos</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded font-semibold text-sm">
            <FaDownload /> Histórico
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded font-semibold text-sm">
            <FaSave /> Guardar
          </button>
        </div>
      </div>

      {/* Tarjeta de últimas conversiones */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-700">Últimas conversiones</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm text-gray-500"><FaPrint /> Print</button>
            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm text-gray-500"><FaShareAlt /> Share</button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr className="border-b">
              <th className="py-2">Premio</th>
              <th>Fecha</th>
              <th>Amount</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { premio: 'KFC Combo 1', fecha: 'Hoy', hora: '2m ago', monto: '$500', tipo: 'QR Code' },
              { premio: 'KFC Combo 2', fecha: 'Hoy', hora: '5m ago', monto: '$1.000', tipo: 'Transfer' },
              { premio: 'KFC Combo 1', fecha: 'Hoy', hora: '2h ago', monto: '$500', tipo: 'QR Code' },
              { premio: 'KFC Combo 2', fecha: 'Hoy', hora: '2h ago', monto: '$1.000', tipo: 'Transfer' },
              { premio: 'KFC Combo 1', fecha: 'Ayer', hora: '08:00 AM', monto: '$500', tipo: 'Transfer' },
              { premio: 'KFC Combo 2', fecha: 'Ayer', hora: '08:00 AM', monto: '$1.000', tipo: 'QR Code' },
            ].map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2">
                  <p className="font-medium text-gray-800">{item.premio}</p>
                  <p className="text-xs text-gray-500">Alimentos</p>
                </td>
                <td>{item.fecha} <span className="text-xs text-gray-400">{item.hora}</span></td>
                <td>{item.monto}<br /><span className="text-xs text-gray-500">{item.tipo}</span></td>
                <td className="text-blue-500 font-medium">Done</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-blue-600 text-center text-sm mt-3 cursor-pointer hover:underline">
          Ver conversiones anteriores
        </div>
      </div>

    </div>
  );
}
