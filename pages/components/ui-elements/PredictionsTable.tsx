import Link from 'next/link';
import React from 'react';
import DataTable from 'react-data-table-component';

export interface Prediccion {
    id: number;
    fecha: string;
    participante: string;
    premioSugerido: string;
}

interface Props {
    predicciones: Prediccion[];
}

const PredictionsTable: React.FC<Props> = ({ predicciones }) => {
    const columns = [
        {
            name: 'ID',
            selector: (row: Prediccion) => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: 'Fecha',
            selector: (row: Prediccion) => new Date(row.fecha).toLocaleDateString('es-EC', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}),

            sortable: true,
        },
        {
            name: 'Participante',
            selector: (row: Prediccion) => row.participante,
            sortable: true,
        },
        {
            name: 'Premio Sugerido',
            selector: (row: Prediccion) => row.premioSugerido,
            sortable: true,
        },
        {
            name: 'Opciones',
            cell: (row: Prediccion) => (
                <button
                    className="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary hover:text-white transition"
                    onClick={() => console.log("Ver detalle de predicción", row.id)}
                >
                    Ver
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];

    return (
        <div className="box">
            <div className="box-header justify-between">
                <div className="box-title">Historial de Predicciones</div>
            </div>
            <div className="flex items-center flex-wrap">
                                <div className="me-3 my-1">
                                    <input className="ti-form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                </div>
                                
                            </div>
            <DataTable
                columns={columns}
                data={predicciones}
                pagination
                highlightOnHover
                dense
            />
        </div>
    );
};

export default PredictionsTable;
