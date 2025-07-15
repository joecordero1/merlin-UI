import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsOverviewTable from '@/pages/components/ui-elements/ProductsOverviewTable';

const mockProducts = [
  { id: 1, productName: 'Producto 1', imageUrl: '/image1.jpg' },
  { id: 2, productName: 'Producto 2', imageUrl: '/image2.jpg' },
];

describe('ProductsOverviewTable', () => {
  it('muestra la lista de productos', () => {
    render(<ProductsOverviewTable products={mockProducts} onDeleteProduct={jest.fn()} />);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en "Guardar Catálogo"', () => {
    render(<ProductsOverviewTable products={mockProducts} onDeleteProduct={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Catálogo' }));
    expect(screen.getByPlaceholderText('Nombre del catálogo')).toBeInTheDocument();
  });

  it('permite llenar y guardar el formulario', async () => {
    const { container } = render(
      <ProductsOverviewTable products={mockProducts} onDeleteProduct={jest.fn()} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Guardar Catálogo' }));

    // Llenar campo de nombre
    fireEvent.change(screen.getByPlaceholderText('Nombre del catálogo'), {
      target: { value: 'Mi Catálogo' },
    });

    // Llenar fechas
    const dateInputs = container.querySelectorAll('input[type="date"]');
    fireEvent.change(dateInputs[0], { target: { value: '2025-01-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2025-01-31' } });

    // Seleccionar programa
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: 'Socio Maestro' },
    });

    // Guardar
    fireEvent.click(screen.getByText('Guardar'));

    // Esperar a que se cierre el modal
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Nombre del catálogo')).not.toBeInTheDocument();
    });
  });

  it('puede cancelar el formulario', () => {
    render(<ProductsOverviewTable products={mockProducts} onDeleteProduct={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Catálogo' }));
    fireEvent.click(screen.getByText('Cancelar'));
    expect(screen.queryByPlaceholderText('Nombre del catálogo')).not.toBeInTheDocument();
  });

  it('ejecuta onDeleteProduct al hacer clic en eliminar', () => {
    const mockDelete = jest.fn();
    render(<ProductsOverviewTable products={mockProducts} onDeleteProduct={mockDelete} />);
    const deleteBtn = screen.getAllByTitle('Eliminar')[0];
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
