// 1. Actualiza el componente ProductsOverviewTable para abrir el formulario al hacer clic en "Guardar Catálogo"

import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Image from "next/image";

interface Product {
	id: number;
	productName: string;
	imageUrl: string;
}

interface Props {
	products: Product[];
	onDeleteProduct: (id: number) => void;
}

const ProductsOverviewTable: React.FC<Props> = ({ products, onDeleteProduct }) => {
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		startDate: "",
		endDate: "",
		program: ""
	});

	const handleSave = () => {
		alert("Catálogo guardado correctamente");
		setShowModal(false);
		setFormData({ name: "", startDate: "", endDate: "", program: "" });
	};

	const columns = [
		{
			name: "Imagen",
			cell: (row: Product) => (
				<div className="w-10 h-10 relative">
					<Image
						src={row.imageUrl}
						alt={row.productName}
						fill={true}
						style={{ objectFit: "cover" }}
						className="rounded"
					/>
				</div>
			),
			sortable: false,
		},
		{
			name: "Nombre",
			selector: (row: Product) => row.productName,
			sortable: true,
		},
		{
			name: "Acciones",
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
		},
	];

	return (
		<div className="box">
			<div className="box-header justify-between">
				<div className="box-title">Productos Más Sugeridos</div>
				<button
					onClick={() => setShowModal(true)}
					className="ti-btn bg-primary text-white"
				>
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

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
						<h2 className="text-lg font-semibold mb-4">Guardar Catálogo</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Nombre del catálogo"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-3 py-2 border rounded"
							/>
							<input
								type="date"
								value={formData.startDate}
								onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
								className="w-full px-3 py-2 border rounded"
							/>
							<input
								type="date"
								value={formData.endDate}
								onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
								className="w-full px-3 py-2 border rounded"
							/>
							<select
								value={formData.program}
								onChange={(e) => setFormData({ ...formData, program: e.target.value })}
								className="w-full px-3 py-2 border rounded"
							>
								<option value="">Selecciona un programa</option>
								<option value="Socio Maestro">Socio Maestro</option>
								<option value="Adelca">Adelca</option>
								<option value="Nescare">Nescare</option>
								<option value="Vive Pronaca">Vive Pronaca</option>
								<option value="Conficlub">Conficlub</option>
							</select>
						</div>
						<div className="mt-6 flex justify-end gap-2">
							<button onClick={() => setShowModal(false)} className="ti-btn bg-gray-300">Cancelar</button>
							<button onClick={handleSave} className="ti-btn bg-primary text-white">Guardar</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsOverviewTable;
