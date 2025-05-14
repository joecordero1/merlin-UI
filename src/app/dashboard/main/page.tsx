'use client';

import { FaChartLine, FaArrowUp, FaUserFriends, FaClock, FaGift } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';

export default function MainPage() {
  return (
    <div className="p-6 mt-20 grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Tarjetas métricas */}
      <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Tarjeta 1 */}
        <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaChartLine size={20} />
            </div>
            <div>
              <h4 className="text-gray-500 text-sm">Tasa de conversión de recomendaciones</h4>
              <h2 className="text-3xl font-bold text-gray-800">80%</h2>
              <p className="text-green-500 text-xs">▲ 1% vs. el mes pasado</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <FaArrowUp size={20} />
            </div>
            <div>
              <h4 className="text-gray-500 text-sm">Incremento en ventas por recomendaciones</h4>
              <h2 className="text-3xl font-bold text-gray-800">75%</h2>
              <p className="text-green-500 text-xs">▲ 2% vs. el mes pasado</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <FaGift size={20} />
            </div>
            <div>
              <h4 className="text-gray-500 text-sm">Productos más recomendados VS más comprados</h4>
              <h2 className="text-3xl font-bold text-gray-800">40%</h2>
              <p className="text-green-500 text-xs">▲ 1.5% vs. el mes pasado</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 4 */}
        <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <FaClock size={20} />
            </div>
            <div>
              <h4 className="text-gray-500 text-sm">Retención de usuarios</h4>
              <h2 className="text-3xl font-bold text-gray-800">6 min</h2>
              <p className="text-green-500 text-xs">▲ 2% vs. el mes pasado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados TSP */}
      <div className="bg-white rounded-xl shadow p-6 xl:col-span-2">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Resultados Top TSP</h3>
        <ul className="space-y-4">
          {[
            { nombre: 'Paez Maldonado', region: 'Sierra', porcentaje: 76, color: 'bg-blue-500' },
            { nombre: 'Distribuaxy', region: 'Austro', porcentaje: 65, color: 'bg-cyan-500' },
            { nombre: 'Jorge de la Cruz', region: 'Sierra', porcentaje: 54, color: 'bg-orange-500' },
            { nombre: 'Distrivillafuerte', region: 'Costa', porcentaje: 23, color: 'bg-lime-500' },
            { nombre: 'Distribelén', region: 'Costa', porcentaje: 16, color: 'bg-pink-500' },
          ].map((tsp, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">{tsp.nombre}</p>
                <p className="text-sm text-gray-500">Región {tsp.region}</p>
              </div>
              <div className="w-2/3">
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 ${tsp.color} rounded-full`}
                      style={{ width: `${tsp.porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{tsp.porcentaje}%</span>
                </div>
              </div>
              <button className="text-blue-600 text-sm hover:underline ml-4">Ver</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Pasivo Acumulado */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Pasivo Acumulado</h3>
        <p className="text-gray-500 text-sm mb-4">Lo que tus vendedores han alcanzado</p>
        <h2 className="text-4xl font-bold text-gray-800">$50,348</h2>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center">
            <p className="text-xs text-gray-400">Insignias Entregadas</p>
            <h4 className="font-bold text-lg">1.3M</h4>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Insignias Canjeadas</p>
            <h4 className="font-bold text-lg">352K</h4>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Insignias Pendientes</p>
            <h4 className="font-bold text-lg">85K</h4>
          </div>
        </div>

        <div className="mt-6 h-24 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-xl"></div>
      </div>

    </div>
  );
}
