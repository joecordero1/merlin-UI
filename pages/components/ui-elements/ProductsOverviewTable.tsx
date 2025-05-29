// components/ProductsOverviewExport.tsx

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Product {
  name: string;
  suggestedCount: number;
  image: string;
}

const ProductsOverviewExport = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/top-suggested?filter=month')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const columns = [
    {
      name: 'Imagen',
      selector: (row: Product) => <img src={row.src} className="w-10 h-10" alt={row.name} />,
      sortable: false,
    },
    {
      name: 'Nombre',
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: 'Sugerencias',
      selector: (row: Product) => row.suggestedCount,
      sortable: true,
    },
  ];

  const exportCSV = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'productos_sugeridos.csv');
  };

  return (
    <div className="box">
      <div className="box-header justify-between">
        <div className="box-title">Productos Más Sugeridos</div>
        <button onClick={exportCSV} className="ti-btn bg-primary text-white">
          Exportar CSV
        </button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        dense
      />
    </div>
  );
};

export default ProductsOverviewExport;
