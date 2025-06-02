import React from 'react';
import DataTable from 'react-data-table-component';
import Image from 'next/image';

interface Product {
  id: number;
  productName: string;
  imageUrl: string;
  price: number;
  points: number;
}

interface Props {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}


const ProductsOverviewTable: React.FC<Props> = ({ products, onDeleteProduct }) => {

  const columns = [
    {
      name: 'Imagen',
      selector: (row: Product) => (
        <div className="w-10 h-10 relative">
          <Image
            src={row.imageUrl}
            alt={row.productName}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Nombre',
      selector: (row: Product) => row.productName,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: (row: Product) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Puntos',
      selector: (row: Product) => row.points,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row: Product) => (
        <div className="flex flex-row items-center gap-2 text-sm">
          <button
            className="ti-btn ti-btn-wave h-[1.75rem] w-[1.75rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
            title="Eliminar"
            onClick={() => onDeleteProduct(row.id)}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="box">
      <div className="box-header justify-between">
        <div className="box-title">Productos Más Sugeridos</div>
        <button onClick={() => console.log('Exportar CSV')} className="ti-btn bg-primary text-white">
          Guardar Catálogo
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

export default ProductsOverviewTable;
