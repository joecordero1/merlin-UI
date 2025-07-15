import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TopSuggestedProducts } from '@/pages/components/ui-elements/TopSuggestedProducts';

const mockData = Array.from({ length: 10 }, (_, i) => ({
  name: `Producto ${i + 1}`,
  suggestedCount: (i + 1) * 10,
  src: `/image${i + 1}.jpg`,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TopSuggestedProducts', () => {
  it('renderiza correctamente y muestra productos', async () => {
    // Simula fetch exitoso
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    render(<TopSuggestedProducts model="bert" />);

    // Espera que aparezca un producto
    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
    });

    // Verifica que se muestren 5 productos (products1)
    expect(screen.getAllByText(/Sugerencias/).length).toBe(5);
  });

  it('cambia el filtro a personalizado y muestra inputs de fecha', async () => {
    // Simula fetch vacío
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    ) as jest.Mock;

    render(<TopSuggestedProducts model="dnn" />);

    // Abrir el dropdown y seleccionar "Personalizado"
    const toggleButtons = screen.getAllByRole('button', { name: /Hoy/i });
    const toggleButton = toggleButtons[0];

    fireEvent.click(toggleButton);

    const customOption = screen.getByText('Personalizado');
    fireEvent.click(customOption);

    // Verifica inputs de fecha
    await waitFor(() => {
      expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
      expect(screen.getByLabelText('Fin')).toBeInTheDocument();
    });
  });

  it('maneja errores en la llamada fetch', async () => {
    // Simula error de red
    global.fetch = jest.fn(() => Promise.reject('Error')) as jest.Mock;

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<TopSuggestedProducts model="bert" />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalled(); // Espera un error en consola
    });

    spy.mockRestore();
  });

  it('maneja respuesta no válida', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ error: true }) })
    ) as jest.Mock;

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<TopSuggestedProducts model="bert" />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Respuesta inesperada:', { error: true });
    });

    spy.mockRestore();
  });
});
