// components/ui-elements/TopSuggestedProducts.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

const filterOptions = [
  { label: 'Hoy', value: 'today' },
  { label: 'Últimos 7 días', value: 'last7' },
  { label: 'Este mes', value: 'month' },
  { label: 'Personalizado', value: 'custom' },
];

export const TopSuggestedProducts = () => {
  const [filter, setFilter] = useState('today');
  const [products, setProducts] = useState<any[]>([]);
  const [customStart, setCustomStart] = useState('2024-05-01');
  const [customEnd, setCustomEnd] = useState('2024-05-15');

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `http://localhost:4000/api/top-suggested?filter=${filter}`;
      if (filter === 'custom') {
        url += `&start=${customStart}&end=${customEnd}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.slice(0, 5));
    };

    fetchProducts();
  }, [filter, customStart, customEnd]);

  return (
    <div className="box">
      <div className="box-header justify-between">
        <div className="box-title">Top Premios Sugeridos</div>
        <div className="hs-dropdown ti-dropdown">
          <button className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50" aria-expanded="false">
            {filterOptions.find(f => f.value === filter)?.label}
            <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
          </button>
          <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
            {filterOptions.map(opt => (
              <li key={opt.value}>
                <button onClick={() => setFilter(opt.value)}
                  className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block">
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {filter === 'custom' && (
        <div className="flex gap-2 px-4 pb-2">
          <div>
            <label className="block text-xs text-[#8c9097] dark:text-white/50">Inicio</label>
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="form-input text-xs w-full" />
          </div>
          <div>
            <label className="block text-xs text-[#8c9097] dark:text-white/50">Fin</label>
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="form-input text-xs w-full" />
          </div>
        </div>
      )}

      <div className="box-body">
        <ul className="list-none mb-0">
          {products.map((prod, index) => (
            <li className={index !== products.length - 1 ? 'mb-4' : 'mb-0'} key={index}>
              <Link href="#">
                <div className="flex items-center justify-between">
                  <div className="flex items-start justify-center">
                    <img src={prod.image || '/default-product.png'} alt={prod.name} className="avatar avatar-md avatar-rounded !mb-0 me-2" />
                    <div>
                      <p className="mb-0 font-semibold">{prod.name}</p>
                      <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                        {prod.suggestedCount} Sugerencias
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};